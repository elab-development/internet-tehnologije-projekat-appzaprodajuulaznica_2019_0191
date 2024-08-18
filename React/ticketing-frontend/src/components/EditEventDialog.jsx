import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Button } from '@mui/material';

const EditEventDialog = ({ open, onClose, onEventUpdate, event }) => {
  const [editedEvent, setEditedEvent] = useState({
    name: '',
    description: '',
    event_date: ''
  });

  useEffect(() => {
    if (event) {
      setEditedEvent({
        ...event,
        event_date: event.event_date ? event.event_date.split('T')[0] : ''
      });
    }
  }, [event]);

  const handleChange = (e) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEventUpdate(editedEvent);
  };

  if (!event) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Event Name"
            value={editedEvent.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="description"
            label="Event Description"
            value={editedEvent.description}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="event_date"
            label="Event Date"
            type="date"
            value={editedEvent.event_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Update Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEventDialog;