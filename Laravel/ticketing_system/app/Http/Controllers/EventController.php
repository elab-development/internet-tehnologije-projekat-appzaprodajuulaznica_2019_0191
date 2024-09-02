<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\TicketType;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::paginate(8);
        return response()->json($events);
    }

    public function adminIndex()
    {
        $events = Event::all();
        return response()->json($events);
    }

    public function addTicket(Request $request, $id)
    {
        $request->validate([
            'type' => 'required|string|in:VIP,REGULAR,GENERAL',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
        ]);

        $event = Event::findOrFail($id);
        $ticketType = new TicketType($request->all());
        $event->ticketTypes()->save($ticketType);

        return response()->json($ticketType, 201);
    }
   public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'required|date',
        ]);

        $event = Event::create($request->all());

        return response()->json($event, 201);
    }

    public function show($id)
    {
        $event = Event::with('ticketTypes')->findOrFail($id);
        return response()->json($event);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'required|date',
        ]);

        $event->update($request->all());

        return response()->json($event, 200);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json(null, 204);
    }
}
