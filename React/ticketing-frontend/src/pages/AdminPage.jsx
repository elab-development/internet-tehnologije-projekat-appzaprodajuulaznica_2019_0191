import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import EventForm from '../components/EventForm';
import EventTable from '../components/EventTable';
import TicketDialog from '../components/TicketDialog';
import EditEventDialog from '../components/EditEventDialog';
import AdminUserCreate from '../components/AdminUserCreate';
import http from '../utils/http';

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const getEvents = async () => {
    try {
      const { data } = await http.get('api/adminevents');
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  useEffect(() => {
    getEvents();
  }, [])

  const handleEventSubmit = async (newEvent) => {
    try {
      const { data } = await http.post('api/events', newEvent);
      setEvents([...events, data]);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleTicketSubmit = async (newTicket) => {
    try {
      await http.post(`api/events/${newTicket.eventId}/tickets`, newTicket);
      setOpenTicketDialog(false);
      getEvents();
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const handleEditEvent = async (updatedEvent) => {
    try {
      await http.put(`api/events/${updatedEvent.id}`, updatedEvent);
      setOpenEditDialog(false);
      getEvents();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await http.delete(`api/events/${eventId}`);
      getEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleOpenTicketDialog = (eventId) => {
    setSelectedEventId(eventId);
    setOpenTicketDialog(true);
  };

  const handleOpenEditDialog = (event) => {
    setSelectedEvent(event);
    setOpenEditDialog(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Page
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Manage Events" />
        <Tab label="Register Admin" />
      </Tabs>

      {tabValue === 0 && (
        <>
          <EventForm onEventSubmit={handleEventSubmit} />
          <EventTable
            events={events}
            onAddTicket={handleOpenTicketDialog}
            onEditEvent={handleOpenEditDialog}
            onDeleteEvent={handleDeleteEvent}
          />
          <TicketDialog
            open={openTicketDialog}
            onClose={() => setOpenTicketDialog(false)}
            onTicketSubmit={handleTicketSubmit}
            eventId={selectedEventId}
          />
          <EditEventDialog
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)}
            onEventUpdate={handleEditEvent}
            event={selectedEvent}
          />
        </>
      )}

      {tabValue === 1 && (
        <AdminUserCreate />
      )}
    </Box>
  );
};

export default AdminPage;