import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './TicketTable.module.css';
import updown from '../../../assets/images/updown.png';
import thcell from '../../../assets/images/Checkbox.svg';
import redellipse from '../../../assets/images/redellipse.png';
import orangeellipse from '../../../assets/images/orangellipse.png';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



 // import url from .env file
 const apiUrl = import.meta.env.VITE_APP_API_URL;

const TicketTable = ({ activities, setActivities, setPage, page }) => {

  // Token from local storage
  // const token = localStorage.getItem("token");

  // State to track which dropdown is open
  const [openDropdownId, setOpenDropdownId] = useState(null);

  function handleDelete(id) {
    setActivities(activities.filter(ticket => ticket.id !== id));
  }

  function handleCheckboxChange(id) {
    setActivities(activities.map(ticket =>
      ticket.id === id ? { ...ticket, checked: !ticket.checked } : ticket
    ));
  }

  const handleNextPage = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleTableDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleResolve = async (ticketId) => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  
    try {
      const response = await axios.post(`${apiUrl}/api/v1/ticket/${ticketId}/resolve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Ticket resolved successfully:', response.data);
      toast.success('Ticket resolved successfully');
      // Handle the success scenario, e.g., updating the UI or notifying the user
    } catch (error) {
      console.error('Error resolving ticket:', error.response ? error.response.data : error.message);
      toast.error('Error resolving ticket');
      // Handle the error scenario, e.g., showing an error message to the user
    }
  };

  // const handleResolve = (id) => {
  //   console.log("Resolve ticket", id);
    
  //   // Your logic for resolving the ticket
  // };

  return (
    <div className={styles.ticketTableContainer}>
      <h2 className={styles.recentActivitiesHeader}>Recent Activities</h2>
      <table className={styles.ticketTable}>
        <thead >
          <tr>
            <th><img src={thcell} alt="Checkbox" /></th>
            <th>Ticket Number</th>
            <th>Title</th>
            <th>
              <div className={styles.flexContainer}>
                Priority
                <img src={updown} alt="updown" className={styles.iconRight} />
              </div>
            </th>
            <th>
              <div className={styles.flexContainer}>
                Assignee
                <img src={updown} alt="updown" className={styles.iconRight} />
              </div>
            </th>
            <th>
              <div className={styles.flexContainer}>
                Status
                <img src={updown} alt="updown" className={styles.iconRight} />
              </div>
            </th>
            <th>
              <div className={styles.flexContainer}>
                Category
                <img src={updown} alt="updown" className={styles.iconRight} />
              </div>
            </th>
            <th>Date Created</th>
            <th>Location</th>
            <th>⋮</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(ticket => (
            <tr key={ticket.id}>
              <td>
                <input
                  type="checkbox"
                  checked={ticket.checked}
                  onChange={() => handleCheckboxChange(ticket.id)}
                />
              </td>
              <td>{ticket.ticketNumber}</td>
              <td>{ticket.title}</td>
              <td>
                <div className={styles.flexContainer}>
                  <img
                    src={ticket.priority === 'HIGH' ? redellipse : orangeellipse}
                    alt={ticket.priority}
                    className={styles.priorityIcon}
                  />
                  {ticket.priority}
                </div>
              </td>
              <td>{ticket.assignee}</td>
              <td>{ticket.status}</td>
              <td>{ticket.ticketCategoryName}</td>
              <td>{ticket.dateCreated}</td>
              <td>{ticket.location}</td>
              <td>
                <button className='bg-gray-400' onClick={() => handleTableDropdown(ticket.id)}>⋮</button>
                {openDropdownId === ticket.id && (
                  <div className={`${styles.dropdown} border absolute bg-white p-3`}>
                    <Link to={`/admin/tickets/${ticket.id}`}>View</Link>
                    <div style={{cursor:"pointer"}} onClick={() => handleResolve(ticket.id)}>Resolve</div>
                    <div onClick={() => handleDelete(ticket.id)}>Delete</div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </button>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>
      */}
       <ToastContainer />
    </div>
  );
}

export default TicketTable;
