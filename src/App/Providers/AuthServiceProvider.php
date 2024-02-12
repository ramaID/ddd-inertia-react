<?php

namespace App\Providers;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerGates();
    }

    protected function registerGates(): void
    {
        try {
            foreach (Permission::query()->get()->pluck('name') as $permission) {
                Gate::define($permission, fn (User $user) => $user->hasPermission($permission));
            }
        } catch (\Exception) {
            info('registerGates(): Ignoring user permissions while booting app.');
        }
    }
}
