import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardActions, Pagination, Snackbar } from '@mui/material';
import http from '../utils/http';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext'; 

const TicketSale = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const fetchEvents = async (page) => {
    try {
      const response = await http.get(`/api/events?page=${page}`);
      setEvents(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleBuyTicket = (eventId) => {
    if (isAuthenticated) {
      navigate(`/event/${eventId}`);
    } else {
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/signup', { state: { message: 'Please register or log in to buy tickets.' } });
      }, 2000);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Event Ticket Sales
      </Typography>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={3} key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  {event.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {new Date(event.event_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  {event.description.slice(0, 100)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => handleBuyTicket(event.id)}>
                  Buy Ticket
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Please log in to buy tickets. Redirecting to registration page..."
      />
    </Box>
  );
};

export default TicketSale;