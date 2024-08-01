
import { Box, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';

const TicketSale = () => {
 

  const tickets = [
    {
      title: "General Admission",
      description: "Access to main event area",
      fullDescription: "Enjoy the full event experience with access to all main stages and common areas. Perfect for those who want to be in the heart of the action.",
      price: 50
    },
    {
      title: "VIP Pass",
      description: "Premium viewing areas and complimentary drinks",
      fullDescription: "Get the VIP treatment with access to exclusive viewing areas, complimentary drinks, and special meet-and-greet opportunities with performers.",
      price: 150
    },
    {
      title: "Backstage Pass",
      description: "All VIP benefits plus backstage tour",
      fullDescription: "The ultimate event experience. Enjoy all VIP benefits and get a behind-the-scenes tour of the event. Limited availability.",
      price: 300
    },
    {
      title: "Backstage Pass",
      description: "All VIP benefits plus backstage tour",
      fullDescription: "The ultimate event experience. Enjoy all VIP benefits and get a behind-the-scenes tour of the event. Limited availability.",
      price: 300
    },
    {
      title: "Backstage Pass",
      description: "All VIP benefits plus backstage tour",
      fullDescription: "The ultimate event experience. Enjoy all VIP benefits and get a behind-the-scenes tour of the event. Limited availability.",
      price: 300
    }
  ];

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Event Ticket Sales
      </Typography>
      <Grid container spacing={2}>
        {tickets.map((ticket, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ minHeight: 314 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {ticket.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {ticket.description}
                </Typography>
                <Typography variant="body2">
                  {ticket.fullDescription.slice(0, 100)}...
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Price: ${ticket.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Show More</Button>
                <Button size="small" variant="contained">Buy Now</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TicketSale;