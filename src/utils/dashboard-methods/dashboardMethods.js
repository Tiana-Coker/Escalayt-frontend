import axios from "axios";
const token = localStorage.getItem("token");

const apiUrl = import.meta.env.VITE_APP_API_URL + '/api/v1/ticket';

export const fetchLatestThreeOpenTickets = async (setTickets, setLoading, setError) => {
  try {
    const response = await axios.get(`${apiUrl}/admin/open-tickets`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    setTickets(response.data);
  } catch (error) {
    console.error('Error fetching latest three open tickets:', error);
    setError(error);
  } finally {
    setLoading(false);
  }
};

export const fetchLatestThreeResolvedTickets = async (setTickets, setLoading, setError) => {
  try {
    const response = await axios.get(`${apiUrl}/admin/resolved-tickets`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    setTickets(response.data);
    console.log(response);
  } catch (error) {
    console.error('Error fetching latest three open tickets:', error);
    setError(error);
  } finally {
    setLoading(false);
  }
};

export const fetchLatestThreeInprogressTickets = async (setTickets, setLoading, setError) => {
  try {
    const response = await axios.get(`${apiUrl}/admin/inprogres-tickets`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    setTickets(response.data);
    console.log(response);
  } catch (error) {
    console.error('Error fetching latest three open tickets:', error);
    setError(error);
  } finally {
    setLoading(false);
  }
};

export const fetchTicketCount = async (setTicketTotalCount, setOpenTicketCount, setResolvedTicketCount, setOngoingTicketCount) => {
  try {
    const response = await axios.get(`${apiUrl}/count`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
 
    setTicketTotalCount(response.data.totalTickets);
    setOpenTicketCount(response.data.openTickets);
    setResolvedTicketCount(response.data.resolvedTickets);
    setOngoingTicketCount(response.data.inProgressTickets);
  } catch (error) {
    console.error('Error:', error);
    // setError(error);
  } finally {
    // setLoading(false);
  }
}


// eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJBRE1JTiJdLCJzdWIiOiJuZWNoZTIzNCIsImlhdCI6MTcyMjQwMjE1MSwiZXhwIjoxNzIyNDg4NTUxfQ.GcpeLFdr6UhW6bB4rKNIeajWu0HJXPlamEuH5l_wE2c