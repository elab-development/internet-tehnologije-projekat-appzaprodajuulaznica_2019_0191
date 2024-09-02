<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TicketTypeFactory extends Factory
{
    protected $model = \App\Models\TicketType::class;

    public function definition()
    {
        return [
            'event_id' => \App\Models\Event::factory(),
            'type' => $this->faker->randomElement(['VIP', 'REGULAR', 'GENERAL']),
            'price' => $this->faker->randomFloat(2, 10, 500),
            'quantity' => $this->faker->numberBetween(50, 200),
        ];
    }
}
