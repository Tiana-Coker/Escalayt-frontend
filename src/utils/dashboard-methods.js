import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJBRE1JTiJdLCJzdWIiOiJNdWdpZG8xIiwiaWF0IjoxNzIyMjcxMjg2LCJleHAiOjE3MjIzNTc2ODZ9.UFQyj8DhPYqtHovlE--gqkV2t7mkNtlIVOwSe_DpfyA";

const apiUrl = 'http://localhost:8080/api/v1/ticket';

export const fetchTicketCount = async (setTicketTotalCount, setOpenTicketCount, setResolvedTicketCount, setOngoingTicketCount) => {
  console.log('Fetching ticket count...');
  try {
    const response = await axios.get(`${apiUrl}/count`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
 
    console.log("ticket count",response);
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