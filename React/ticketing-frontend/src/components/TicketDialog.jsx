import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Button, MenuItem } from '@mui/material';

const TicketDialog = ({ open, onClose, onTicketSubmit, eventId }) => {
  const [ticket, setTicket] = useState({ type: '', price: '', quantity: '' });

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onTicketSubmit({
      eventId,
      ...ticket,
      price: parseFloat(ticket.price),
      quantity: parseInt(ticket.quantity)
    });
    setTicket({ type: '', price: '', quantity: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Ticket for Event</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            margin="normal"
            name="type"
            label="Ticket Type"
            value={ticket.type}
            onChange={handleChange}
            required
          >
            <MenuItem value="VIP">VIP</MenuItem>
            <MenuItem value="REGULAR">REGULAR</MenuItem>
            <MenuItem value="GENERAL">GENERAL</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            name="price"
            label="Price"
            type="number"
            value={ticket.price}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="quantity"
            label="Quantity"
            type="number"
            value={ticket.quantity}
            onChange={handleChange}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Ticket
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDialog;