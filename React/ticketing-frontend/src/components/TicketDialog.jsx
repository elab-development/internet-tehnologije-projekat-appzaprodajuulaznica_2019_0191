import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Button, MenuItem, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import http from '../utils/http';

const TicketDialog = ({ open, onClose, onTicketSubmit, eventId }) => {
  const [ticket, setTicket] = useState({ type: '', price: '', quantity: '' });
  const [tickets, setTickets] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingTicketId, setEditingTicketId] = useState(null);

  useEffect(() => {
    if (open) {
      fetchTickets();
    }
  }, [open, eventId]);

  const fetchTickets = async () => {
    try {
      const response = await http.get(`/api/events/${eventId}`);
      setTickets(response.data.ticket_types);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    }
  };

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketData = {
      eventId,
      ...ticket,
      price: parseFloat(ticket.price),
      quantity: parseInt(ticket.quantity)
    };

    if (editMode) {
      await http.put(`/api/tickets/${editingTicketId}`, ticketData);
    } else {
      await http.post(`/api/events/${eventId}/tickets`, ticketData);
    }

    onTicketSubmit();
    resetForm();
    fetchTickets();
  };

  const handleEdit = (ticketToEdit) => {
    setTicket({
      type: ticketToEdit.type,
      price: ticketToEdit.price.toString(),
      quantity: ticketToEdit.quantity.toString()
    });
    setEditMode(true);
    setEditingTicketId(ticketToEdit.id);
  };

  const handleDelete = async (ticketId) => {
    await http.delete(`/api/tickets/${ticketId}`);
    fetchTickets();
  };

  const resetForm = () => {
    setTicket({ type: '', price: '', quantity: '' });
    setEditMode(false);
    setEditingTicketId(null);
  };

  const availableTypes = ['VIP', 'REGULAR', 'GENERAL'].filter(
    type => !tickets.some(ticket => ticket.type === type)
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editMode ? 'Edit Ticket' : 'Add Ticket'} for Event</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          {availableTypes.length > 0 && (
            <>
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
                {availableTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
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
            </>
          )}
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>Existing Tickets</Typography>
        {tickets.map(t => (
          <Box key={t.id} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Typography>{t.type} - ${t.price} (Quantity: {t.quantity})</Typography>
            <IconButton onClick={() => handleEdit(t)}><EditIcon /></IconButton>
            <IconButton onClick={() => handleDelete(t.id)}><DeleteIcon /></IconButton>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {availableTypes.length > 0 && (
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? 'Update Ticket' : 'Add Ticket'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TicketDialog;