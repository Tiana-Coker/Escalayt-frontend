import React from 'react';

const TicketCard = ({ticket, button}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-xs">
      <div className="flex flex-wrap justify-between items-center mb-2">
        <span className="font-medium sm_text">Ticket #002</span>
        <span className="sm_text" style={{color:'#828282'}}>20 mins</span>
      </div>
      <h2 className="no_text font-medium mb-2 text-center">{ticket.title}</h2>
      <p className="sm_text mb-4 text-center">
        "Sophie Adebayo created a new ticket #002 - Install new office chairs."
      </p>
     <div className='flex justify-center border'>
        <button style = {{color:"#344054"}} className="bg-white w-full hover:bg-gray-100 no_text font-semibold py-2 rounded">
            Assign
        </button>
     </div>
    </div>
  );
}

export default TicketCard;