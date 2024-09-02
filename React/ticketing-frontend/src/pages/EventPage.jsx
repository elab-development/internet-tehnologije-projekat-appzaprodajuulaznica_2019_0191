import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, TextField, Alert } from '@mui/material';
import http from '../utils/http';

const EventPage = () => {
  const [event, setEvent] = useState(null);
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await http.get(`/api/events/${id}`);
      setEvent(response.data);
      const quantities = {};
      response.data.ticket_types.forEach(type => {
        quantities[type.id] = 0;
      });
      setTicketQuantities(quantities);
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to fetch event details');
      }
    }
  };

  const handleQuantityChange = (typeId, value) => {
    setTicketQuantities(prev => ({
      ...prev,
      [typeId]: Math.max(0, parseInt(value) || 0)
    }));
  };

  const handlePurchase = async () => {
    // Implement purchase logic here
    console.log('Purchase tickets:', ticketQuantities);
  };

  if (!event) return <Typography>Loading... </Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>{event.name}</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Date: {new Date(event.event_date).toLocaleDateString()}
      </Typography>
      <Typography variant="body1" paragraph>{event.description}</Typography>
      <Typography variant="h5" gutterBottom>Available Tickets</Typography>
      {event.ticket_types?.map(type => (
        <Card key={type.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{type.type}</Typography>
            <Typography>Price: ${type.price}</Typography>
            <Typography>Available: {type.quantity}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <TextField
                type="number"
                label="Quantity"
                value={ticketQuantities[type.id]}
                onChange={(e) => handleQuantityChange(type.id, e.target.value)}
                InputProps={{ inputProps: { min: 0, max: type.quantity } }}
                sx={{ width: 100, mr: 2 }}
              />
              <Typography>
                Total: ${(type.price * ticketQuantities[type.id]).toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Button variant="contained" onClick={handlePurchase} sx={{ mt: 2 }}>
        Purchase Tickets
      </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default EventPage;