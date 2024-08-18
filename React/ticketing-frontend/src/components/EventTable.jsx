import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const EventTable = ({ events, onAddTicket, onEditEvent, onDeleteEvent }) => {
  return (
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
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.id}</TableCell>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.description}</TableCell>
              <TableCell>{new Date(event.event_date).toLocaleDateString()}</TableCell>
              <TableCell sx={{display:'flex', flexDirection:'column'}}>
                <Button onClick={() => onAddTicket(event.id)}>Add Ticket</Button>
                <Button onClick={() => onEditEvent(event)}>Edit</Button>
                <Button onClick={() => onDeleteEvent(event.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventTable;