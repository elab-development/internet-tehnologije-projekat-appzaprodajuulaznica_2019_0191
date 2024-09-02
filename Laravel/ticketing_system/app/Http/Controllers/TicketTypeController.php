<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TicketType;
use App\Models\Event;

class TicketTypeController extends Controller
{
    public function index(Request $request)
    {
        $eventId = $request->query('event_id');
        if ($eventId) {
            return TicketType::where('event_id', $eventId)->get();
        }
        return TicketType::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
            'type' => 'required|string|in:VIP,REGULAR,GENERAL',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
        ]);

        $event = Event::findOrFail($request->event_id);
        $existingTypes = $event->ticketTypes->pluck('type')->toArray();

        if (in_array($request->type, $existingTypes)) {
            return response()->json(['message' => 'This ticket type already exists for the event'], 422);
        }

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
            'type' => 'sometimes|required|string|in:VIP,REGULAR,GENERAL',
            'price' => 'sometimes|required|numeric|min:0',
            'quantity' => 'sometimes|required|integer|min:1',
        ]);

        $ticketType = TicketType::findOrFail($id);

        if ($request->has('type') && $request->type !== $ticketType->type) {
            $existingTypes = TicketType::where('event_id', $ticketType->event_id)
                                       ->where('id', '!=', $id)
                                       ->pluck('type')
                                       ->toArray();
            if (in_array($request->type, $existingTypes)) {
                return response()->json(['message' => 'This ticket type already exists for the event'], 422);
            }
        }

        $ticketType->update($request->all());
        return response()->json($ticketType, 200);
    }

    public function destroy($id)
    {
        TicketType::destroy($id);
        return response()->json(null, 204);
    }
}
