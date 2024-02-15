<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Data\RoleData;
use App\Models\User as Model;
use Illuminate\Support\Facades\DB;
use App\Data\UserData as DataObject;
use App\Data\UserData;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Spatie\LaravelData\PaginatedDataCollection;

class UsersController extends Controller
{
    public function __construct(public Model $model)
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return PaginatedDataCollection<array-key, DataObject>
     */
    public function index()
    {
        $this->authorize('user.viewAny');

        $queries = $this->model->query()->with('roles')->latest('created_at')->paginate(15);
        $payload = DataObject::collect($queries);

        return Inertia::render('Users/Management', compact('payload'));
    }

    public function create()
    {
        $this->authorize('user.create');

        $roles = RoleData::collect(Role::query()->get());

        return Inertia::render('Users/Create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DataObject $data): RedirectResponse
    {
        $this->authorize('user.create');

        DB::transaction(function () use ($data) {
            /** @var User */
            $user = $this->model->query()->create($data->toArray());

            $rolesID = array_map(fn (RoleData $role) => $role->id, $data->roles);
            $roles = Role::query()->whereIn('id', $rolesID)->get();

            $user->roles()->sync($roles);
        });

        return to_route('users.index');
    }

    public function edit(Model $user)
    {
        $this->authorize('user.update');

        $user->load('roles');

        $user = UserData::fromModel($user);
        $roles = RoleData::collect(Role::query()->get());

        return Inertia::render('Users/Edit', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DataObject $data, Model $user): RedirectResponse
    {
        $this->authorize('user.update');

        Cache::forget('permissions-'.$user->id);

        DB::transaction(function () use ($data, $user) {
            $user->update($data->only('name', 'email')->toArray());

            $rolesID = array_map(fn (RoleData $role) => $role->id, $data->roles);
            $roles = Role::query()->whereIn('id', $rolesID)->get();

            $user->fresh()->roles()->sync($roles, true);
        });

        return to_route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Model $user): RedirectResponse
    {
        $this->authorize('user.delete');

        abort_if($user->id === auth()->id(), 403, 'You cannot delete yourself.');

        DB::transaction(function () use ($user) {
            $user->roles()->detach();
            $user->delete();
        });

        return redirect()->back();
    }
}
