import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [payment, setPayment] = useState({
    paymentMode: "",
    organization: "",
    studentName: "",
    aadharNumber: "",
    incomeCertificate: "",
    caste: "bc",
  });
  const navigate = useNavigate();

  const { mutate: makePayment, isLoading } = useMutation({
    mutationFn: async (newPayment) => {
      const response = await axios.post(
        "http://localhost:5000/v1/payment/makepayment",
        newPayment
      );
      return response.data;
    },
    onSuccess: () => {
      alert("Your application has been approved");
      navigate("/scholarship");
    },
  });

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Payment Form</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
          marginTop: "50px",
        }}
      >
        <TextField
          label="Payment method "
          value={payment.paymentMode}
          onChange={(e) =>
            setPayment({ ...payment, paymentMode: e.target.value })
          }
          variant="outlined"
          color="secondary"
          required
          fullWidth
        />
        <TextField
          label="Organization"
          value={payment.organization}
          onChange={(e) =>
            setPayment({ ...payment, organization: e.target.value })
          }
          variant="outlined"
          color="secondary"
          required
          fullWidth
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <TextField
          label="Student Name"
          value={payment.studentName}
          onChange={(e) =>
            setPayment({ ...payment, studentName: e.target.value })
          }
          variant="outlined"
          color="secondary"
          required
          fullWidth
        />
        <TextField
          label="Aadhar"
          value={payment.aadharNumber}
          onChange={(e) =>
            setPayment({ ...payment, aadharNumber: e.target.value })
          }
          variant="outlined"
          color="secondary"
          required
          fullWidth
        />
      </div>
      <div>
        <TextField
          label="Income Certificate"
          value={payment.incomeCertificate}
          onChange={(e) =>
            setPayment({ ...payment, incomeCertificate: e.target.value })
          }
          variant="outlined"
          color="secondary"
          required
          fullWidth
        />
      </div>
      <br />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Caste</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="bc"
          name="radio-buttons-group"
          onChange={(e) => setPayment({ ...payment, caste: e.target.value })}
        >
          <FormControlLabel value="bc" control={<Radio />} label="BC" />
          <FormControlLabel
            value="general"
            control={<Radio />}
            label="General"
          />
          <FormControlLabel value="sc/st" control={<Radio />} label="SC/ST" />
        </RadioGroup>
      </FormControl>
      <div style={{ marginTop: "20px" }}>
        <button style={styles.button}>View Memo</button>
        <button style={styles.button}>View Caste Certificate</button>
        <button style={styles.button}>View Aadhar</button>
        <button style={styles.button}>View Income Certificate</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          style={styles.approveButton}
          onClick={() => makePayment(payment)}
        >
          {isLoading ? "Loading..." : "Approve"}
        </button>
        <button
          style={styles.rejectButton}
          onClick={() => {
            alert("Your application has been rejected");

            navigate("/scholarship");
          }}
        >
          Reject
        </button>
      </div>
    </form>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    margin: "5px",
    backgroundColor: "grey",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  approveButton: {
    padding: "10px 20px",
    margin: "5px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  rejectButton: {
    padding: "10px 20px",
    margin: "5px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PaymentForm;
