import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL + '/api/v1/ticket';

export const fetchLatestThreeOpenTickets = async (token, setTickets, setLoading, setError,) => {
  setLoading(true);
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

export const fetchLatestThreeResolvedTickets = async (token, setTickets, setLoading, setError) => {
  setLoading(true);
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

export const fetchLatestThreeInprogressTickets = async (token, setTickets, setLoading, setError) => {
  setLoading(true);
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

export const fetchTicketCount = async (token, setTicketTotalCount, setOpenTicketCount, setResolvedTicketCount, setOngoingTicketCount) => {
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


 // Sorting function
export const sortTickets = (sort, tickets) => {
  const priorityOrder = ["HIGH", "MEDIUM", "LOW"];
  const statusOrder = ["OPEN", "IN_PROGRESS", "RESOLVE"];

  return [...tickets].sort((a, b) => {
    if (sort === "priority") {
      return (
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
      );
    }
    if (sort === "status") {
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    }
    if (sort === "assigneeId") {
      return a.assignee.localeCompare(b.assignee);
    }
    if (sort === "categoryId") {
      return a.ticketCategoryName.localeCompare(b.ticketCategoryName);
    }
    return 0;
  });
};
