<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TicketType;

class TicketTypeController extends Controller
{
    public function index()
    {
        return TicketType::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
            'type' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
        ]);

        $ticketType = TicketType::create($request->all());
        return response()->json($ticketType, 201);
    }

    public function show($id)
    {
        return TicketType::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'event_id' => 'sometimes|required|exists:events,id',
            'type' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
            'quantity' => 'sometimes|required|integer',
        ]);

        $ticketType = TicketType::findOrFail($id);
        $ticketType->update($request->all());
        return response()->json($ticketType, 200);
    }

    public function destroy($id)
    {
        TicketType::destroy($id);
        return response()->json(null, 204);
    }
}
