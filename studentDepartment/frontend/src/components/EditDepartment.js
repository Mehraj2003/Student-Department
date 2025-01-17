import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
  Typography,
  Stack,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const EditDepartment = () => {
  const departmentId = useParams().departmentId;
  const queryClient = useQueryClient();
  const [department, setDepartment] = useState({
    name: "",
    description: "",
    icon: "",
    status: false,
  });
  const navigate = useNavigate();

  const { mutate: editDepartment, isLoading } = useMutation({
    mutationFn: async (newDepartment) => {
      const response = await axios.put(
        `http://localhost:5000/v1/department/editDepartment/${departmentId}`,
        newDepartment
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("departments");
      navigate("/departments");
    },
    enabled: !!departmentId,
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 5,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 3,
            fontWeight: "bold",
            color: "maroon",
          }}
        >
          Edit Department
        </Typography>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField
            label="Department Name"
            value={department.name}
            onChange={(e) => setDepartment({ ...department, name: e.target.value })}
            fullWidth
            required
          />

          <TextField
            label="Description"
            value={department.description}
            onChange={(e) =>
              setDepartment({ ...department, description: e.target.value })
            }
            fullWidth
            required
          />

          <TextField
            label="Icon"
            value={department.icon}
            onChange={(e) => setDepartment({ ...department, icon: e.target.value })}
            fullWidth
            required
          />

          <FormControl fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select
              value={department.status}
              onChange={(e) => setDepartment({ ...department, status: e.target.value })}
            >
              <MenuItem value={true}>Enabled</MenuItem>
              <MenuItem value={false}>Disabled</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" justifyContent="space-between" spacing={2} mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate("/departments")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              onClick={() => editDepartment(department)}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default EditDepartment;
