import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const AddDepartment = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    name: '',
    description: '',
    icon: '',
    status: false,
  });

  const { mutate: addDepartment, isLoading } = useMutation({
    mutationFn: async (newDepartment) => {
      const response = await axios.post(
        `http://localhost:5000/v1/department/addDepartment`,
        newDepartment
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('departments');
      navigate('/departments');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addDepartment(department);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        minHeight: 'screnHeight',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Add Student
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Student Name"
              variant="outlined"
              fullWidth
              value={department.name}
              onChange={(e) =>
                setDepartment({ ...department, name: e.target.value })
              }
              required
            />
            <TextField
              label="Student Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={department.description}
              onChange={(e) =>
                setDepartment({ ...department, description: e.target.value })
              }
              required
            />
            <TextField
              label="Icon"
              variant="outlined"
              fullWidth
              value={department.icon}
              onChange={(e) =>
                setDepartment({ ...department, icon: e.target.value })
              }
              required
            />
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={department.status}
                onChange={(e) =>
                  setDepartment({ ...department, status: e.target.value })
                }
                required
              >
                <MenuItem value={true}>Enabled</MenuItem>
                <MenuItem value={false}>Disabled</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Add Department'}
            </Button>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default AddDepartment;
