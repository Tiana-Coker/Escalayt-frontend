import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TicketTable.module.css';
import updown from '../../../assets/images/updown.png';
import thcell from '../../../assets/images/thcell.png';
import redellipse from '../../../assets/images/redellipse.png';
import orangeellipse from '../../../assets/images/orangellipse.png';



const TicketTable = ({tickets, setTickets, setPage, page}) => {




 

  function handleDelete(id) {
    setTickets(tickets.filter(ticket => ticket.id !== id));
  }

  function handleCheckboxChange(id) {
    setTickets(tickets.map(ticket =>
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

  return (
    <div className={styles.ticketTableContainer}>
      <h2 className={styles.recentActivitiesHeader}>Recent Activities</h2>
      <table className={styles.ticketTable}>
        <thead>
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
          {tickets.map(ticket => (
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
              <td>⋮</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 0}> 
          Previous
        </button> 
        <button onClick={handleNextPage}> 
          Next 
        </button> 
      </div>
    </div>
  );
}

export default TicketTable;
