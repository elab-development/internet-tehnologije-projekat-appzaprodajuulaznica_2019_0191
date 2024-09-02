<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use app\Models\Role;
use app\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            UsersTableSeeder::class,
            EventSeeder::class,
            TicketSeeder::class,         
        ]);

        Role::create(['name' => 'guest']);
        Role::create(['name' => 'user']);
        Role::create(['name' => 'admin']);

        User::find(1)->roles()->attach(3);
        
    }
}
