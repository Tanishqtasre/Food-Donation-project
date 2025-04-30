import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const VolunteerDashboard = () => {
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const response = await axios.get('/api/volunteers/profile');
        setVolunteer(response.data);
      } catch (err) {
        console.error('Error fetching volunteer data:', err);
        setError('Failed to load volunteer data');
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerData();
  }, []);

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.post(`/api/volunteers/complete-task/${taskId}`);
      // Refresh volunteer data
      const response = await axios.get('/api/volunteers/profile');
      setVolunteer(response.data);
    } catch (err) {
      console.error('Error completing task:', err);
      setError('Failed to complete task');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!volunteer) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 2 }}>
          You are not registered as a volunteer. Please register to start helping.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Welcome, {volunteer.name}!
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Status: <Chip label={volunteer.status} color={volunteer.status === 'active' ? 'success' : 'warning'} />
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Availability: {volunteer.availability}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Vehicle: {volunteer.vehicle}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Assigned Tasks
            </Typography>
            {volunteer.assignedTasks.length === 0 ? (
              <Typography color="text.secondary">No tasks assigned yet</Typography>
            ) : (
              volunteer.assignedTasks.map((task) => (
                <Card key={task._id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{task.foodType}</Typography>
                    <Typography color="text.secondary">
                      Quantity: {task.quantity} {task.unit}
                    </Typography>
                    <Typography color="text.secondary">
                      Pickup Location: {task.pickupLocation}
                    </Typography>
                    <Typography color="text.secondary">
                      Delivery Location: {task.deliveryLocation}
                    </Typography>
                    <Typography color="text.secondary">
                      Status: <Chip label={task.status} color="primary" />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleCompleteTask(task._id)}
                    >
                      Mark as Completed
                    </Button>
                  </CardActions>
                </Card>
              ))
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Completed Tasks
            </Typography>
            {volunteer.completedTasks.length === 0 ? (
              <Typography color="text.secondary">No completed tasks yet</Typography>
            ) : (
              volunteer.completedTasks.map((task) => (
                <Card key={task._id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{task.foodType}</Typography>
                    <Typography color="text.secondary">
                      Quantity: {task.quantity} {task.unit}
                    </Typography>
                    <Typography color="text.secondary">
                      Pickup Location: {task.pickupLocation}
                    </Typography>
                    <Typography color="text.secondary">
                      Delivery Location: {task.deliveryLocation}
                    </Typography>
                    <Typography color="text.secondary">
                      Status: <Chip label="Completed" color="success" />
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VolunteerDashboard; 