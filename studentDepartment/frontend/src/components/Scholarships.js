import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const ActionScho = ({editAction, viewAction}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton size="medium" onClick={viewAction}>
        <RemoveRedEyeIcon fontSize="inherit" />
      </IconButton>
      <Link to={editAction} style={{ textDecoration: "none" }}>
      <IconButton size="medium" >
        <CreateIcon fontSize="inherit" />
      </IconButton>
      </Link>
    </Stack>
  );
};

const Scholarship = () => {
  const [studentId, setStudentId] = React.useState('');
  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:5000/v1/student/getAllStudents"
      );
      return data;
    },
  });


  const rows = students?.students?.map((student) => {
    return {
      id: student._id,
      first_name: student.firstName,
      last_name: student.lastName,
      dateOfBirth: student.dateOfBirth,
      applicationStatus: student.applicationStatus,
      gender: student.gender,
      createdAt: student.createdAt,
    };
  });



  const { data } = useQuery({
    queryKey: ["students", studentId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/v1/student/getSingleStudentById/${studentId}`
      );
      return data;
    },
    enabled: !!studentId,
  });








  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "createdAt", headerName: "Created At", width: 150 },

    {
      field: "applicationStatus",
      headerName: "Application Status",
      width: 150,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 300,
      renderCell: (value) => {
        return <ActionScho  editAction={`/scholarship/studentdetails/${value.row.id}`} viewAction={()=>setStudentId(value.row.id)}/>;
      },
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
    <Modal
        open={!!studentId}
        handleClose={() => setStudentId("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Department Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {data?.student?.firstName}
            {data?.student?.lastName}
            {data?.student?.age}
            {data?.student?.gender}
          </Typography>
          <div onClick={()=>setStudentId("")} style={{marginTop:"60px"}}>Close</div>
        </Box>
      </Modal>
    <div
      style={{
        height: 400,
        width: "100%",
        alignContent: "center",
        marginTop: "60px",
      }}
    >
      <h1>Student Application</h1>
      <DataGrid columns={columns} rows={rows || []} pageSize={5} />
    </div>
    </>
  );
};

export default Scholarship;
