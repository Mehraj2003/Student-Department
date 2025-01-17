import React from "react";
import {
  IconButton,
  Modal,
  Stack,
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const ActionBtn = ({ editAction, deleteAction, viewAction }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton size="medium" onClick={viewAction} title="View Details">
        <RemoveRedEyeIcon fontSize="inherit" />
      </IconButton>
      <Link to={editAction} style={{ textDecoration: "none" }}>
        <IconButton size="medium" title="Edit Department">
          <CreateIcon fontSize="inherit" />
        </IconButton>
      </Link>
      <IconButton size="medium" onClick={deleteAction} title="Delete Department">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
};

export default function Departments() {
  const queryClient = useQueryClient();
  const [departmentId, setDepartmentId] = React.useState("");
  const [page, setPage] = React.useState(0); // Current page
  const [pageSize, setPageSize] = React.useState(5); // Page size

  const { mutate: deleteDepart } = useMutation({
    mutationFn: async (departmentId) => {
      const response = await axios.delete(
        `http://localhost:5000/v1/department/deleteDepartment/${departmentId}`
      );
      return response.data;
    },
    onSuccess: () => {
      alert("Department Deleted Successfully");
      queryClient.invalidateQueries("departments");
    },
  });

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "Name", headerName: "Name", width: 250 },
    { field: "Description", headerName: "Description", width: 300 },
    { field: "Icon", headerName: "Icon", width: 200 },
    {
      field: "Actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <ActionBtn
          editAction={`/departments/EditDepartments/${params.row.id}`}
          deleteAction={() => deleteDepart(params.row.id)}
          viewAction={() => setDepartmentId(params.row.id)}
        />
      ),
    },
  ];

  const { data: departments } = useQuery({
    queryKey: ["departments", page, pageSize],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/v1/department/getAllDepartments?page=${page}&limit=${pageSize}`
      );
      return data;
    },
  });

  const { data: departmentDetails } = useQuery({
    queryKey: ["department", departmentId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/v1/department/getSingleDepartmentById/${departmentId}`
      );
      return data;
    },
    enabled: !!departmentId,
  });

  const rows = departments?.departments?.map((department) => ({
    id: department._id,
    Name: department.name,
    Description: department.description,
    Icon: department.icon,
  }));

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 3, fontWeight: "bold", color: "maroon" }}
      >
        Departments Management
      </Typography>

      <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows || []}
            columns={columns}
            pagination
            paginationMode="server"
            rowCount={departments?.totalCount || 0}
            page={page}
            pageSize={pageSize}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>

      <Modal
        open={!!departmentId}
        onClose={() => setDepartmentId("")}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-title"
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Department Details
          </Typography>
          <Typography id="modal-description" sx={{ mb: 2 }}>
            <strong>Name:</strong> {departmentDetails?.department?.name}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <strong>Description:</strong> {departmentDetails?.department?.description}
          </Typography>
          <Typography>
            <strong>Icon:</strong> {departmentDetails?.department?.icon}
          </Typography>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setDepartmentId("")}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
