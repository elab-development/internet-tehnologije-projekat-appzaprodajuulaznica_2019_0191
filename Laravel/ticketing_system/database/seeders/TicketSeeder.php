<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TicketType;

class TicketSeeder extends Seeder
{
    public function run()
    {
        TicketType::factory()->count(50)->create();
    }
}
