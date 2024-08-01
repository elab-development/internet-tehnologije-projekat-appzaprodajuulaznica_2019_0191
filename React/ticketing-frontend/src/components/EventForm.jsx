import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const EventForm = ({ onEventSubmit }) => {
  const [event, setEvent] = useState({ name: '', description: '', date: '' });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEventSubmit({
      ...event,
      date: new Date(event.date).toISOString()
    });
    setEvent({ name: '', description: '', date: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create Event
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        name="name"
        label="Event Name"
        value={event.name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="description"
        label="Event Description"
        value={event.description}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="date"
        label="Event Date"
        type="date"
        value={event.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Create Event
      </Button>
    </Box>
  );
};

export default EventForm;