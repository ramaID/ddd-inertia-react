<?php

namespace App\Http\Controllers;

use App\Data\UserData as DataObject;
use App\Models\User as Model;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Spatie\LaravelData\PaginatedDataCollection;

class UsersController extends Controller
{
    public function __construct(public Model $model)
    {
        $this->middleware('auth')->only(['store', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return PaginatedDataCollection<array-key, DataObject>
     */
    public function index()
    {
        $payload = DataObject::collect($this->model->query()->paginate(15));

        return Inertia::render('Users/Management', compact('payload'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DataObject $data): DataObject
    {
        $model = $this->model->query()->create($data->toArray());

        return DataObject::from($model);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DataObject $data, Model $user): Response
    {
        $user->update($data->toArray());

        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Model $user): Response
    {
        $user->delete();

        return response()->noContent();
    }
}
