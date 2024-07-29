import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import folderImg from '../../../assets/images/folder.png';
import frameImg from '../../../assets/images/frame.png';
import engineImg from '../../../assets/images/engine.png';
import goodImg from '../../../assets/images/good.png';



const Dashboard = () => {
  const [totalTickets, setTotalTickets] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);
  const [inProgressTickets, setInProgressTickets] = useState(0);
  const [resolvedTickets, setResolvedTickets] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch ticket counts from an API or a data source
    // Replace the following with your data fetching logic
    const fetchData = async () => {
      const total = 50; // Example data
      const open = 10;
      const inProgress = 8;
      const resolved = 32;

      setTotalTickets(total);
      setOpenTickets(open);
      setInProgressTickets(inProgress);
      setResolvedTickets(resolved);
    };

    fetchData();
  }, []);

  const handleButtonClick = (type) => {
    navigate(`/tickets/${type}`);
  };

  return (
    <div className={styles.dashboardContainer}>

      {/* Ticket Count Card */}
      <div className={styles.buttonGroup}>
        <div className={`${styles.dashboardButton} ${styles.totalTicketsButton}`} onClick={() => handleButtonClick('total')}>
          <div className={styles.buttonContent}>
            <div className={styles.buttonText}>Total Tickets</div>
            <img src={folderImg} alt="Total Tickets" className={styles.buttonImg} />
          </div>
          <div className={styles.ticketCount} style={{ color: '#0070FF' }}>{totalTickets}</div>
        </div>

        <div className={`${styles.dashboardButton} ${styles.openTicketsButton}`} onClick={() => handleButtonClick('open')}>
          <div className={styles.buttonContent}>
            <div className={styles.buttonText}>Open Tickets</div>
            <img src={frameImg} alt="Open Tickets" className={styles.buttonImg} />
          </div>
          <div className={styles.ticketCount} style={{ color: '#FF4C4C' }}>{openTickets}</div>
        </div>

        <div className={`${styles.dashboardButton} ${styles.inProgressTicketsButton}`} onClick={() => handleButtonClick('in-progress')}>
          <div className={styles.buttonContent}>
            <div className={styles.buttonText}>In-Progress Tickets</div>
            <img src={engineImg} alt="In-Progress Tickets" className={styles.buttonImg} />
          </div>
          <div className={styles.ticketCount} style={{ color: '#FFA500' }}>{inProgressTickets}</div>
        </div>

        <div className={`${styles.dashboardButton} ${styles.resolvedTicketsButton}`} onClick={() => handleButtonClick('resolved')}>
          <div className={styles.buttonContent}>
            <div className={styles.buttonText}>Resolved Tickets</div>
            <img src={goodImg} alt="Resolved Tickets" className={styles.buttonImg} />
          </div>
          <div className={styles.ticketCount} style={{ color: '#32CD32' }}>{resolvedTickets}</div>
        </div>
      </div>



    </div>
  );
};

export default Dashboard;
