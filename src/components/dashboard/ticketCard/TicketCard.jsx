import React, {useState, useEffect}  from'react';
import AssignTicket from '../../modals/assignTicket/AssignTicket';
import styles from './TicketCard.module.css';
import { formatDate, newFormatDate } from '../../../utils/formatDate';

const TicketCard = ({ticket, button}) => {

  console.log("ticket card", ticket);


  const [isAssignTicketModalOpen, setIsAssignTicketModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in effect after component mounts
    setIsVisible(true);
  }, []);


  const handleAssignTicketOpenModal = () => {
    setIsAssignTicketModalOpen(true);
  };

  const handleAssignTicketCloseModal = () => {
    setIsAssignTicketModalOpen(false);
  };

  return (
    <div className={`bg-gray-100 p-4 rounded-lg shadow-md max-w-xs`}>
      <div className="flex flex-wrap justify-between items-center mb-2">
        <span className="font-medium sm_text">Ticket #{ticket.id}</span>
        <span className="sm_text" style={{color:'#828282'}}>{newFormatDate(ticket.createdAt)}</span>
      </div>
      {
          ticket.status === "OPEN" ? (
            <>
                <h2 className="no_text font-medium mb-2 text-center">{ticket.title}</h2>
                <p className="sm_text mb-4 text-center">
                  "{ticket.createdByAdmin ? ticket.createdByAdmin : ticket.createdByUser} created a new ticket #{ticket.id} - {ticket.title}."
                </p>
                <div className='flex justify-center border'>
                    <button style = {{color:"#344054"}} className="bg-white w-full hover:bg-gray-100 no_text font-semibold py-2 rounded"
                    onClick={handleAssignTicketOpenModal}
                    >
                        Assign
                    </button>
                </div>
            </>
          ) : ticket.status === "IN_PROGRESS" ?

          (
            <>
                <h2 className="no_text font-medium mb-2 text-center">{ticket.title}</h2>
                <p className="sm_text mb-4 text-center">
                  "{ticket.createdByAdmin ? ticket.createdByAdmin : ticket.createdByUser} created a new ticket #{ticket.id} - {ticket.title}."
                </p>
                <div className='flex justify-center border'>
                    <button style = {{color:"#344054"}} className="bg-white w-full hover:bg-gray-100 no_text font-semibold py-2 rounded"
                    onClick={handleAssignTicketOpenModal}
                    >
                        Assign
                    </button>
                </div>
            </>
          ) :

          (
            <>
                <h2 className="no_text font-medium mb-2 text-center">{ticket.title}</h2>
                <p className="sm_text mb-4 text-center">
                  "{ticket.resolvedByAdmin ? ticket.resolvedByAdmin : ticket.resolvedByUser} resolved ticket #{ticket.id} - {ticket.title}."
                </p>
                <div className='flex justify-center border'>
                    <button style = {{color:"#344054"}} className="bg-white w-full hover:bg-gray-100 no_text font-semibold py-2 rounded"
                    onClick={handleAssignTicketOpenModal}
                    >
                        Completed
                    </button>
                </div>
            </>
          )
        
      }

     {isAssignTicketModalOpen && (
          <AssignTicket onAssignTicketClose={handleAssignTicketCloseModal} ticketId={ticket.id} />
        )}
    </div>
  );
}

export default TicketCard;

/*

*/