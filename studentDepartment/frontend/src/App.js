import "./App.css";
import Sidebar from "./components/Sidebar";
import SearchAppBar from "./components/Navbar";
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Departments from "./components/Departments";
import Scholarships from "./components/Scholarships";
import AddDepartment from "./components/AddDepartment";
import EditDepartment from "./components/EditDepartment";
import ScholarshipForm from "./components/ScholarshipsForm";
import PaymentForm from "./components/PaymentForm";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import SearchResults from "./components/SearchResults";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchAppBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Routes>
          <Route path="/home" element={<Navigate to="/departments" />} />
          <Route exact path="/departments" element={<Departments />} />
          <Route exact path="/departments/AddDepartments" element={<AddDepartment />} />
          <Route exact path="/departments/EditDepartments/:departmentId" element={<EditDepartment />} />
          <Route exact path="/scholarship" element={<Scholarships />} />
          <Route exact path="/scholarship/studentdetails/:studentId" element={<ScholarshipForm />} />
          <Route exact path="/scholarship/payment" element={<PaymentForm />} />
          <Route exact path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;