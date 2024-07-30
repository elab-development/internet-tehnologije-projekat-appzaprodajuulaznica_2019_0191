<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password')
        ]);

        $authenticatedUser = User::create([
            'name' => 'Authenticated User',
            'email' => 'user@example.com',
            'password' => Hash::make('password')
        ]);

        $guest = User::create([
            'name' => 'Guest User',
            'email' => 'guest@example.com',
            'password' => Hash::make('password')
        ]);

        $adminRole = Role::where('name', 'admin')->first();
        $userRole = Role::where('name', 'authenticated_user')->first();
        $guestRole = Role::where('name', 'guest')->first();

        $admin->roles()->attach($adminRole);
        $authenticatedUser->roles()->attach($userRole);
        $guest->roles()->attach($guestRole);

        User::factory()->count(10)->create();
    }
}
