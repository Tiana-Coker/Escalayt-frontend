/* eslint-disable no-unused-vars */

// Components
import Navbar from '../../../components/dashboard/navbar/Navbar';
import TicketCountCards from '../../../components/dashboard/ticketCount/TicketCountCards';
import CreateTicket from "../../../components/modals/createTicket/CreateTicket";
import CreateUser from "../../../components/modals/createUser/CreateUser";
import TicketCard from '../../../components/dashboard/ticketCard/TicketCard';
import IMAGES from "../../../assets";

// utility methods
import { 
  fetchLatestThreeOpenTickets, 
  fetchLatestThreeResolvedTickets, 
  fetchLatestThreeInprogressTickets, 
  fetchTicketCount 
} from '../../../utils/dashboard-methods/dashboardMethods';

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import axios from "axios";
import TicketTable from "../../../components/dashboard/ticketTable/TicketTable";

// import url from .env file
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Dashboard() {
  // State values for profile dropdown
  const [profileDropdown, setProfileDropdown] = useState(false);

  //State values for ticket count
  const [totalTicketCount, setTicketTotalCount] = useState(0);
  const [openTicketCount, setOpenTicketCount] = useState(0);
  const [resolvedTicketCount, setResolvedTicketCount] = useState(0);
  const [ongoingTicketCount, setOngoingTicketCount] = useState(0);
  const navigate = useNavigate();

  // State for Recent Activities - Tickets
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // State values for tickets card
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [ticketsError, setTicketsError] = useState(null);

  // State for sorting
  const [sort, setSort] = useState('priority');
  const [sortedActivities, setSortedActivities] = useState([]);

  // Values for the style of ticket card titles - New, Ongoing, Resolved
  const defaultStyle = { color: '#BDBDBD' };
  const clickedStyle = { backgroundColor: "white", color: "#828282", borderRadius: '5px' };
  const [buttonStyles, setButtonStyles] = useState({
    newTickets: clickedStyle,
    ongoingTickets: defaultStyle,
    resolvedTickets: defaultStyle,
  });

  // Method to fetch the latest 3 Open tickets
  const fetchNewTickets = () => {
    console.log('Fetching new tickets...');
    fetchLatestThreeOpenTickets(setTickets, setLoadingTickets, setTicketsError);
    // Update styles and reset others to default
    setButtonStyles({
      newTickets: clickedStyle,
      ongoingTickets: defaultStyle,
      resolvedTickets: defaultStyle,
    });
  }

  const fetchOngoingTickets = () => {
    console.log('Fetching ongoing tickets...');
    fetchLatestThreeInprogressTickets(setTickets, setLoadingTickets, setTicketsError);
    // Update styles and reset others to default
    setButtonStyles({
      newTickets: defaultStyle,
      ongoingTickets: clickedStyle,
      resolvedTickets: defaultStyle,
    });
  };

  const fetchResolvedTickets = () => {
    console.log('Fetching resolved tickets...');
    fetchLatestThreeResolvedTickets(setTickets, setLoadingTickets, setTicketsError);
    // Update styles and reset others to default
    setButtonStyles({
      newTickets: defaultStyle,
      ongoingTickets: defaultStyle,
      resolvedTickets: clickedStyle
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const timeDiff = today - date;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      return "Today";
    } else if (daysDiff === 1) {
      return "1 day ago";
    } else {
      return `${daysDiff} days ago`;
    }
  };

  // Modal State
  const [openModal, setOpenModal] = useState(null);

  const openModalHandler = (modalName) => {
    setOpenModal(modalName);
  };

  const closeModalHandler = () => {
    setOpenModal(null);
  };

  // Fetch tickets and sort them
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${apiUrl}/api/v1/ticket/view-all-tickets`, {
          params: { page },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { data } = response;

        const formattedTickets = data.map((ticket) => ({
          ...ticket,
          ticketNumber: ticket.id,
          assignee: ticket.assigneeFullName || "Unassigned",
          dateCreated: formatDate(ticket.createdAt),
        }));

        setActivities(formattedTickets);
        setHasMore(fetchTickets.length > 0);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [page]);

  // Fetch Ticket Count
  useEffect(() => {
    // Method to fetch ticket count
    fetchTicketCount(
      setTicketTotalCount,
      setOpenTicketCount,
      setResolvedTicketCount,
      setOngoingTicketCount
    );
  }, []);

  // Sorting function
  const sortTickets = (tickets) => {
    const priorityOrder = ['HIGH', 'MEDIUM', 'LOW'];
    const statusOrder = ['OPEN', 'IN_PROGRESS', 'RESOLVE'];

    return [...tickets].sort((a, b) => {
      if (sort === 'priority') {
        return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
      }
      if (sort === 'status') {
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      }
      if (sort === 'assigneeId') {
        return a.assignee.localeCompare(b.assignee);
      }
      if (sort === 'categoryId') {
        return a.ticketCategoryName.localeCompare(b.ticketCategoryName);
      }
      return 0;
    });
  };

  // Sort activities whenever `sort` or `activities` change
  useEffect(() => {
    setSortedActivities(sortTickets(activities));
  }, [sort, activities]);

  // Handle sort change
  const handleSortChange = (e) => {
    const { value } = e.target;
    setSort(value);
  };

  const handleButtonClick = (type) => {
    navigate(`/tickets/${type}`);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar setProfileDropdown={setProfileDropdown} profileDropdown={profileDropdown} />

      {/* Sort and Add user row */}
      <div className='flex flex-wrap mt-10 mb-20 justify-end'>
        <div className='flex border'>
          <div>
            <div>Sort by</div>
            <div>
              <select value={sort} onChange={handleSortChange}>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
                <option value="assigneeId">Assignee</option>
                <option value="categoryId">Category</option>
              </select>
            </div>
          </div>

          <button onClick={() => openModalHandler('createUser')} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add New User
          </button>
        </div>
      </div>

      {/* Ticket Count Cards */}
      <TicketCountCards
        totalTicketCount={totalTicketCount}
        openTicketCount={openTicketCount}
        resolvedTicketCount={resolvedTicketCount}
        ongoingTicketCount={ongoingTicketCount}
      />

      {/* Ticket Card title widget */}
      <div style={{ backgroundColor: "#F2F2F2" }} className='flex flex-wrap mb-2 px-3 py-2 border-radius'>
        <div className='flex flex-wrap w-full lg:w-8/12 gap-x-9 justify-between lg:justify-start'>
          <button className={`focus:outline-none border-none sm_text px-4`} style={buttonStyles.newTickets} onClick={fetchNewTickets}>New Tickets</button>
          <button className={`focus:outline-none border-none sm_text px-4`} style={buttonStyles.ongoingTickets} onClick={fetchOngoingTickets}>Ongoing Tickets</button>
          <button className={`focus:outline-none border-none sm_text px-4`} style={buttonStyles.resolvedTickets} onClick={fetchResolvedTickets}>Resolved Tickets</button>
        </div>

        <div className='w-full lg:w-4/12 hidden lg:flex gap-x-6'>
          <button className='ml-auto bg-white px-2 sm_text rounded-md' style={{ color: "#828282", borderRadius: '5px' }}>Today</button>
          <button className='bg-white px-2 sm_text rounded-md' style={{ color: "#828282", borderRadius: '5px' }}>This week</button>
          <button className='bg-white px-2 sm_text rounded-md' style={{ color: "#828282", borderRadius: '5px' }}>This month</button>
        </div>
      </div>

      <div className='px-5'>
        {/* ticket table */}
        <TicketTable activities={sortedActivities} hasMore={hasMore} fetchMore={() => setPage((prevPage) => prevPage + 1)} />
      </div>

      {openModal === "createTicket" && (
        <CreateTicket onClose={closeModalHandler} />
      )}

      {openModal === "createUser" && (
        <CreateUser onClose={closeModalHandler} />
      )}
    </>
  );
}
