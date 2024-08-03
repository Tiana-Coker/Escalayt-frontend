/* eslint-disable no-unused-vars */

// Components
import Navbar from "../../../components/dashboard/navbar/Navbar";
import TicketCountCards from "../../../components/dashboard/ticketCount/TicketCountCards";
import CreateTicket from "../../../components/modals/createTicket/CreateTicket";
import IMAGES from "../../../assets";

// utility methods
import { fetchTicketCount } from "../../../utils/dashboard-methods/dashboardMethods";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

import axios from "axios";
import TicketTable from "../../../components/dashboard/ticketTable/TicketTable";
import UserNotification from "../../../components/modals/notification/UserNotification";

// import url from .env file
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Dashboard() {
  const token = localStorage.getItem("token");


   // samuel modal for notification
   const [isModalOpen, setIsModalOpen] = useState(false);

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

  // State for sorting
  const [sort, setSort] = useState("priority");
  const [sortedActivities, setSortedActivities] = useState([]);

  // General loading state
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/ticket/view-all-tickets`,
          {
            params: { page },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data } = response;

        const formattedTickets = data.map((ticket) => ({
          ...ticket,
          ticketNumber: ticket.id,
          assignee: ticket.assigneeFullName || "Unassigned",
          dateCreated: formatDate(ticket.createdAt),
        }));

        console.log("Fetched tickets:", formattedTickets);
        setActivities(formattedTickets);

        setHasMore(fetchTickets.length > 0);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);

        const promises = [
          fetchTickets(),
          fetchTicketCount(
            token,
            setTicketTotalCount,
            setOpenTicketCount,
            setResolvedTicketCount,
            setOngoingTicketCount
          ),
        ];

        await Promise.all(promises);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // Sorting function
  const sortTickets = (tickets) => {
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

  // Sort activities whenever `sort` or `activities` change
  useEffect(() => {
    setSortedActivities(sortTickets(activities));
  }, [sort, activities]);

  // Handle sort change
  const handleSortChange = (e) => {
    const { value } = e.target;
    setSort(value);
  };

  if (loading) {
    return <div>Loading...</div>; // Add your loading spinner here if you have one
  }

  // notification modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar
        onOpen={handleOpenModal}
        setProfileDropdown={setProfileDropdown}
        profileDropdown={profileDropdown}
      />

      {isModalOpen && (
        <UserNotification
          onClose={handleCloseModal}
        />
      )}

      {/* Sort and Add user row */}
      <div className="flex flex-wrap mt-10 mb-20 justify-end">
        <div className="flex border">
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
          <button
            onClick={() => openModalHandler("createTicket")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Ticket
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

      {/* Ticket Table */}
      <TicketTable
        activities={sortedActivities}
        setActivities={setActivities}
        setPage={setPage}
        page={page}
      />

      {/* Modals */}

      <CreateTicket
        isOpen={openModal === "createTicket"}
        onClose={closeModalHandler}
        // closeOnOutsideClick={true}
      />

      {/* Profile Dropdown */}
      {profileDropdown && (
        <div className="position-absolute sm_text bg-white border w-40">
          <div className="mb-4">
            <div>Notification</div>
          </div>
          <div className="mb-4" style={{ color: "#1F2937" }}>
            Profile
          </div>
          <div className="mb-4" style={{ color: "#1F2937" }}>
            Logout
          </div>
        </div>
      )}
    </>
  );
}
