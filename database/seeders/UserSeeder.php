<?php

namespace Database\Seeders;

use App\Enums\RoleName;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createAdminUser();
    }

    public function createAdminUser()
    {
        $adminRole = Role::query()->where('name', RoleName::ADMIN->value)->first();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@laravel.dev',
        ])->roles()->sync($adminRole);
    }
}
