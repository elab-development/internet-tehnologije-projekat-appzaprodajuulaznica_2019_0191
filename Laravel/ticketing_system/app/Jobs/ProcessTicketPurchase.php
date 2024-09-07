<?php
namespace App\Jobs;

use App\Models\TicketType;
use App\Models\Order;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ProcessTicketPurchase implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    protected $ticketType;
    protected $quantity;

    public function __construct(User $user, TicketType $ticketType, $quantity)
    {
        $this->user = $user;
        $this->ticketType = $ticketType;
        $this->quantity = $quantity;
    }

    public function handle()
    {
        DB::beginTransaction();
        try {
            $this->ticketType = TicketType::lockForUpdate()->find($this->ticketType->id);
            
            if ($this->ticketType->quantity >= $this->quantity) {
                $this->ticketType->quantity -= $this->quantity;
                $this->ticketType->save();

                Order::create([
                    'ticket_type_id' => $this->ticketType->id,
                    'user_email' => $this->user->email,
                    'quantity' => $this->quantity
                ]);

                DB::commit();
                Log::info("Ticket purchase successful for user {$this->user->email}");
                // Notify user of success (you can implement this later)
            } else {
                DB::rollBack();
                Log::warning("Not enough tickets available for user {$this->user->email}");
                // Handle "not enough tickets" case (you can implement this later)
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error processing ticket purchase: " . $e->getMessage());
            throw $e;
        }
    }
}
