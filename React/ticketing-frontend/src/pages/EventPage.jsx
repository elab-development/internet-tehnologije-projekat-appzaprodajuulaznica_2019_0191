import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, TextField, Alert, Select, MenuItem, Grid, FormControl, InputLabel, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import http from '../utils/http';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const EventPage = () => {
  const [event, setEvent] = useState(null);
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [weather, setWeather] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const currencies = ['USD', 'EUR', 'CHF', 'GBP', 'RSD'];

  useEffect(() => {
    fetchEvent();
    fetchExchangeRates();
    fetchWeather();
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

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      setError('Failed to fetch exchange rates');
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Belgrade&appid=253682c0bd759acfb4255d4aa08c3dd7&units=metric`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError('Failed to fetch weather data');
    }
  };

  const handleQuantityChange = (typeId, value) => {
    setTicketQuantities(prev => ({
      ...prev,
      [typeId]: Math.max(0, parseInt(value) || 0)
    }));
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const convertPrice = (price) => {
    if (!exchangeRates[currency]) return price;
    return (price * exchangeRates[currency]).toFixed(2);
  };

  const handlePurchase = async () => {
    setError('');
    try {
      const purchases = Object.entries(ticketQuantities)
        .filter(([_, quantity]) => quantity > 0)
        .map(async ([ticketTypeId, quantity]) => {
          const response = await http.post(`/api/events/${id}/purchase-ticket`, {
            ticket_type_id: ticketTypeId,
            quantity: quantity,
          });
          return response.data.message;
        });
  
      const results = await Promise.all(purchases);
      alert(results.join('\n'));
      fetchEvent();
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'An error occurred while processing your purchase.');
      } else {
        setError('An error occurred while processing your purchase.');
      }
    }
  };

  if (!event) return <Typography>Loading... </Typography>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 2 }}>
        <Container maxWidth="lg" >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="currency-select-label">Currency</InputLabel>
              <Select
                labelId="currency-select-label"
                id="currency-select"
                value={currency}
                label="Currency"
                onChange={handleCurrencyChange}
              >
                {currencies.map((cur) => (
                  <MenuItem key={cur} value={cur}>{cur}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {weather && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WbSunnyIcon sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Belgrade: {weather.main.temp}°C, {weather.weather[0].description}
                </Typography>
              </Box>
            )}
          </Box>

          <Typography variant="h3" gutterBottom>{event.name}</Typography>
          <Typography variant="h6" gutterBottom color="text.secondary">
            Date: {new Date(event.event_date).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>{event.description}</Typography>
          
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Available Tickets</Typography>
          <Grid container spacing={3}>
            {event.ticket_types?.map(type => (
              <Grid item xs={12} sm={6} md={4} key={type.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>{type.type}</Typography>
                    <Typography variant="h5" color="primary.main" gutterBottom>
                      {currency} {convertPrice(type.price)}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>Available: {type.quantity}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <TextField
                        type="number"
                        label="Quantity"
                        value={ticketQuantities[type.id]}
                        onChange={(e) => handleQuantityChange(type.id, e.target.value)}
                        InputProps={{ inputProps: { min: 0, max: type.quantity } }}
                        sx={{ width: '100%', mr: 2 }}
                      />
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" align="right">
                      Total: {currency} {convertPrice(type.price * ticketQuantities[type.id])}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" size="large" onClick={handlePurchase}>
              Purchase Tickets
            </Button>
          </Box>

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EventPage;