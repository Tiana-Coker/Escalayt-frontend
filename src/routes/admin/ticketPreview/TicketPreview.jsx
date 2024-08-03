/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../../../components/dashboard/navbar/Navbar";
import TicketDetails from "../../../components/dashboard/ticketDetails/TicketDetails";
import { Comment } from '../../../components/dashboard/comment/Comment';

// import url from .env file
const base = import.meta.env.VITE_APP_API_URL;

export default function TicketPreview() {
  const token = localStorage.getItem("token");

  const { id } = useParams();

  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    const apiUrl = `${base}/api/v1/ticket/preview-ticket/${id}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setTicket(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching ticket");
      setLoading(false);
      console.error("Error fetching ticket", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <Navbar />

      <TicketDetails ticket={ticket} />
      {console.log("id now", ticket.id)}
      <Comment ticketId={id} />
    </div>
  );
}
