import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import FormTextField from './FormTextField';
import ConfirmDialog from './ConfirmDialog';

const EventTable = ({ events, onAddTicket, onEditEvent, onDeleteEvent, searchTerm, onSearchChange }) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (eventId) => {
    setEventToDelete(eventId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteEvent(eventToDelete);
    setDeleteConfirmOpen(false);
  };

  return (
    <Box>
      <FormTextField
        label="Search events"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.id}</TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{new Date(event.event_date).toLocaleDateString()}</TableCell>
                <TableCell sx={{display:'flex', flexDirection:'column'}}>
                  <Button onClick={() => onAddTicket(event.id)}>Add Ticket</Button>
                  <Button onClick={() => onEditEvent(event)}>Edit</Button>
                  <Button onClick={() => handleDeleteClick(event.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        content="Are you sure you want to delete this event?"
      />
    </Box>
  );
};

export default EventTable;