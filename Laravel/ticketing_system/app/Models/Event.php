<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';
    use HasFactory;

    protected $fillable = ['name', 'description', 'event_date'];

    public function ticketTypes()
    {
        return $this->hasMany(TicketType::class);
    }
}
