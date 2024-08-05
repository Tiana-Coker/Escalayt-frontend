import React, {useState, useEffect}  from'react';
import AssignTicket from '../../modals/assignTicket/AssignTicket';
import styles from './TicketCard.module.css';

const TicketCard = ({ticket, button}) => {

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
    <div className={`bg-gray-100 p-4 rounded-lg shadow-md max-w-xs transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} ${styles.fadeIn}`}>
      <div className="flex flex-wrap justify-between items-center mb-2">
        <span className="font-medium sm_text">Ticket #002</span>
        <span className="sm_text" style={{color:'#828282'}}>20 mins</span>
      </div>
      <h2 className="no_text font-medium mb-2 text-center">{ticket.title}</h2>
      <p className="sm_text mb-4 text-center">
        "Sophie Adebayo created a new ticket #002 - Install new office chairs."
      </p>
     <div className='flex justify-center border'>
        <button style = {{color:"#344054"}} className="bg-white w-full hover:bg-gray-100 no_text font-semibold py-2 rounded"
        onClick={handleAssignTicketOpenModal}
        >
            Assign
        </button>
        
        {isAssignTicketModalOpen && (
          <AssignTicket onAssignTicketClose={handleAssignTicketCloseModal} ticketId={ticket.id} />
        )}
     </div>
    </div>
  );
}

export default TicketCard;

/*

*/