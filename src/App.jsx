import { useState } from "react";

import "./App.css";

import LandingPage from "./routes/landingPage/LandingPage";
import ForgotPassword from "./routes/forgotPassword/ForgotPassword";
import Login from "./routes/login/Login";
import ResetPassword from "./routes/resetPassword/ResetPassword";
import Signup from "./routes/signup/Signup";

import AdminDashboard from "./routes/admin/dashboard/Dashboard";
import AdminTicket from "./routes/admin/tickets/Ticket";

import UserDashboard from "./routes/user/dashboard/Dashboard";
import UserTicket from "./routes/user/tickets/Ticket";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./components/modals/createUser/CreateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/ticket" element={<AdminTicket />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/ticket" element={<UserTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
