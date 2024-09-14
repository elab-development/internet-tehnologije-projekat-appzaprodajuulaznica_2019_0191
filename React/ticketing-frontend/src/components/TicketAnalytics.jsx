import React, { useMemo } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TicketAnalytics = ({ orders, events }) => {
  const analytics = useMemo(() => {
    const eventMap = new Map(events.map(event => [event.id, event.name]));
    const analytics = {};

    orders.forEach(order => {
      const eventName = eventMap.get(order.ticket_type_id) || 'Unknown Event';
      if (!analytics[eventName]) {
        analytics[eventName] = { totalSold: 0 };
      }
      analytics[eventName].totalSold += order.quantity;
    });

    return Object.entries(analytics).map(([eventName, data]) => ({
      eventName,
      totalSold: data.totalSold,
    }));
  }, [orders, events]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>Ticket Sales Analytics</Typography>
      
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell align="right">Total Tickets Sold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {analytics.map((row) => (
              <TableRow key={row.eventName}>
                <TableCell component="th" scope="row">{row.eventName}</TableCell>
                <TableCell align="right">{row.totalSold}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom>Tickets Sold by Event</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={analytics}>
          <XAxis dataKey="eventName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSold" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TicketAnalytics;