<?php

namespace App\Http\Controllers;

use App\Data\UserData as DataObject;
use App\Models\User as Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Inertia\Inertia;
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
        $payload = DataObject::collect($this->model->query()->latest('created_at')->paginate(15));

        return Inertia::render('Users/Management', compact('payload'));
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DataObject $data): RedirectResponse
    {
        $this->model->query()->create($data->toArray());

        return to_route('users.index');
    }

    public function edit(Model $user)
    {
        return Inertia::render('Users/Edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DataObject $data, Model $user): RedirectResponse
    {
        $user->update($data->only('name', 'email')->toArray());

        return to_route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Model $user): RedirectResponse
    {
        abort_if($user->id === auth()->id(), 403, 'You cannot delete yourself.');

        $user->delete();

        return redirect()->back();
    }
}
