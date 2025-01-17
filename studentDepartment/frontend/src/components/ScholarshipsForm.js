import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const ScholarshipForm = () => {
  const studentId = useParams().studentId;
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/v1/student/getSingleStudentById/${studentId}`
      );
      return data;
    },
    enabled: !!studentId,
  });
  const studentData = data?.student;
  return (
    <>
      <Stack spacing={5} direction="row" sx={{ marginBottom: 5 }}>
        
        <form>
          <FormControl fullWidth margin="normal">
          
            <Input id="firstName"  style={{fontWeight:'bold', color:'black'}} value={studentData?.firstName} disabled />
          </FormControl>

          <FormControl fullWidth margin="normal">
         
            <Input id="lastName" style={{fontWeight:'bold', color:'black'}} value={studentData?.lastName} disabled />
          </FormControl>

          <FormControl fullWidth margin="normal">
          
            <Input id="age" style={{fontWeight:'bold', color:'black'}} value={studentData?.age} disabled />
          </FormControl>

          <FormControl fullWidth margin="normal">
          
            <Input id="gender" style={{fontWeight:'bold', color:'black'}} value={studentData?.gender} disabled />
          </FormControl>

          <FormControl fullWidth margin="normal">
           
            <Input id="dateOfBirth" style={{fontWeight:'bold', color:'black'}} value={studentData?.dateOfBirth} disabled />
          </FormControl>

          <FormControl fullWidth margin="normal">
           
            <Input id="address" style={{fontWeight:'bold', color:'black'}} value={studentData?.address} disabled />
          </FormControl>

          <FormControl fullWidth margin="normal">
          
            <Input id="email" style={{fontWeight:'bold', color:'black'}} value={studentData?.email} disabled />
          </FormControl>

          <FormControl fullWidth margin="normal">
           
            <Input id="school" style={{fontWeight:'bold', color:'black'}} value={studentData?.school} disabled />
          </FormControl>

          <FormControl fullWidth margin="normal">
          
            <Input id="college" style={{fontWeight:'bold', color:'black'}} value={studentData?.college} disabled />
          </FormControl>

          <FormControl fullWidth margin="normal">
          
            <Input id="rollNo" style={{fontWeight:'bold', color:'black'}} value={studentData?.rollNo} disabled />
          </FormControl>

          <Button style={{background:"grey"}} type="button" variant="contained" color="primary" onClick={()=>navigate('/scholarship/payment')}>
          Next
          </Button>
        </form>
      </Stack>
    </>
  );
};

export default ScholarshipForm;
