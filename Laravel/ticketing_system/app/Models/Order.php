<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['ticket_type_id', 'user_email', 'quantity'];

    public function ticketType()
    {
        return $this->belongsTo(TicketType::class);
    }
}
