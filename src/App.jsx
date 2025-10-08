import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Divider,
} from '@mui/material';

export default function App() {
  const [form, setForm] = useState({
    direction: '',
    size_sqft: '',
    rooms: '',
    city: '',
  });

  const [plan, setPlan] = useState('');
  const [estimate, setEstimate] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [loadingEstimate, setLoadingEstimate] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return (
      form.direction.trim() &&
      form.size_sqft.trim() &&
      form.rooms.trim() &&
      form.city.trim()
    );
  };

  const submitPlan = async () => {
    if (!validateForm()) {
      setError('Please fill out all fields.');
      return;
    }

    setError('');
    setLoadingPlan(true);
    try {
      const res = await axios.post('http://localhost:8000/generate_plan', form);
      setPlan(res.data.plan_svg);
    } catch (err) {
      console.error(err);
      setError('Failed to generate plan.');
    } finally {
      setLoadingPlan(false);
    }
  };

  const submitEstimate = async () => {
    if (!validateForm()) {
      setError('Please fill out all fields.');
      return;
    }

    setError('');
    setLoadingEstimate(true);
    try {
      const res = await axios.post('http://localhost:8000/api/estimate', form);
      setEstimate(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to get estimate.');
    } finally {
      setLoadingEstimate(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🏠 Home Plan & Estimator
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Direction"
            name="direction"
            value={form.direction}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Size (sqft)"
            name="size_sqft"
            value={form.size_sqft}
            onChange={handleChange}
            type="number"
            fullWidth
          />
          <TextField
            label="Rooms"
            name="rooms"
            value={form.rooms}
            onChange={handleChange}
            type="number"
            fullWidth
          />
          <TextField
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            fullWidth
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={submitPlan}
              disabled={loadingPlan}
              fullWidth
            >
              {loadingPlan ? <CircularProgress size={24} /> : 'Generate Plan'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={submitEstimate}
              disabled={loadingEstimate}
              fullWidth
            >
              {loadingEstimate ? <CircularProgress size={24} /> : 'Get Estimate'}
            </Button>
          </Box>
        </Box>
      </Paper>

      {plan && (
        <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
          <Typography variant="h6" gutterBottom>
            Generated Plan
          </Typography>
          <Box dangerouslySetInnerHTML={{ __html: plan }} />
        </Paper>
      )}

      {estimate && (
        <Paper sx={{ p: 3 }} elevation={2}>
          <Typography variant="h6" gutterBottom>
            Cost Estimate
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>Material: ₹{estimate.material_cost}</Typography>
          <Typography>Labor: ₹{estimate.labor_cost}</Typography>
          <Typography>Total: ₹{estimate.total_cost}</Typography>
          <Typography>Duration: {estimate.duration_days} days</Typography>
        </Paper>
      )}
    </Container>
  );
}
