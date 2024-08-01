import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import EventForm from '../components/EventForm';
import EventTable from '../components/EventTable';
import TicketDialog from '../components/TicketDialog';
import http from '../utils/http';

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const getEvents = async () => {
    const {data} = await http.get('api/events');
    setEvents(data);
  }

  useEffect(() => {
    getEvents();
  }, [])



  const handleEventSubmit = (newEvent) => {
    setEvents([...events, { id: events.length + 1, ...newEvent }]);
  };

  const handleTicketSubmit = (newTicket) => {
    setTickets([...tickets, { id: tickets.length + 1, ...newTicket }]);
    setOpenDialog(false);
  };

  const openTicketDialog = (eventId) => {
    setSelectedEventId(eventId);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Page
      </Typography>

      <EventForm onEventSubmit={handleEventSubmit} />
      <EventTable events={events} onAddTicket={openTicketDialog} />
      <TicketDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onTicketSubmit={handleTicketSubmit}
        eventId={selectedEventId}
      />
    </Box>
  );
};

export default AdminPage;