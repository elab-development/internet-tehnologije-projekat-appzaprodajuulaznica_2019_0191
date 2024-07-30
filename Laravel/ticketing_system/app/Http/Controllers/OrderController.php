<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\TicketType;

class OrderController extends Controller
{
    public function index()
    {
        return Order::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'ticket_type_id' => 'required|exists:ticket_types,id',
            'user_email' => 'required|string|email|max:255',
            'quantity' => 'required|integer|min:1',
        ]);

        $ticketType = TicketType::findOrFail($request->ticket_type_id);

        if ($ticketType->quantity < $request->quantity) {
            return response()->json(['error' => 'Not enough tickets available'], 400);
        }

        $order = Order::create($request->all());

        // Decrease the quantity of available tickets
        $ticketType->quantity -= $request->quantity;
        $ticketType->save();

        return response()->json($order, 201);
    }

    public function show($id)
    {
        return Order::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'ticket_type_id' => 'sometimes|required|exists:ticket_types,id',
            'user_email' => 'sometimes|required|string|email|max:255',
            'quantity' => 'sometimes|required|integer|min:1',
        ]);

        $order = Order::findOrFail($id);
        $order->update($request->all());
        return response()->json($order, 200);
    }

    public function destroy($id)
    {
        Order::destroy($id);
        return response()->json(null, 204);
    }
}
