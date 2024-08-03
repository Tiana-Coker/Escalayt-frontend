import React from 'react';

import styles from './TicketCountCards.module.css';

export default function TicketCountCards({totalTicketCount, openTicketCount, ongoingTicketCount, resolvedTicketCount}) {
  return (
 
   
    <div className={styles.buttonGroup}>
        
      <div className={`${styles.dashboardButton} ${styles.totalTicketsButton}`}  >
        <div className={styles.buttonContent}>
          <div className={styles.buttonText}>Total Tickets</div>
          {/* <img src={folderImg} alt="Total Tickets" className={styles.buttonImg} /> */}
        </div>
        <div className={styles.ticketCount} style={{ color: "#0070FF" }}>
          {totalTicketCount}
        </div>
      </div>

      <div className={`${styles.dashboardButton} ${styles.openTicketsButton}`}>
        <div className={styles.buttonContent}>
          <div className={styles.buttonText}>Open Tickets</div>
          {/* <img src={frameImg} alt="Open Tickets" className={styles.buttonImg} /> */}
        </div>
        <div className={styles.ticketCount} style={{ color: "#FF4C4C" }}>
          {openTicketCount}
        </div>
      </div>

      <div className={`${styles.dashboardButton} ${styles.inProgressTicketsButton}`}>
        <div className={styles.buttonContent}>
          <div className={styles.buttonText}>In-Progress Tickets</div>
             {/* <img src={engineImg} alt="In-Progress Tickets" className={styles.buttonImg} /> */}
        </div>
        <div className={styles.ticketCount} style={{ color: "#FFA500" }}>
          {ongoingTicketCount}
        </div>
      </div>

      <div className={`${styles.dashboardButton} ${styles.resolvedTicketsButton}`} >
        <div className={styles.buttonContent}>
          <div className={styles.buttonText}>Resolved Tickets</div>
          {/* <img src={goodImg} alt="Resolved Tickets" className={styles.buttonImg} /> */}
        </div>
        <div className={styles.ticketCount} style={{ color: "#32CD32" }}>
          {resolvedTicketCount}
        </div>
      </div>
    </div>

  )
}
