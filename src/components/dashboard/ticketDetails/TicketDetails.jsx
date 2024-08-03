import React from 'react';



export default function TicketDetails({ticket}) {
    console.log("ticket here",ticket)
  return (
    <div className='flex flex-wrap w-10/12 mx-auto  justify-between no_text'>

            {/* User Details */}
            <div className='w-full lg:w-6/12'>

                <div className='font-medium mb-4'>User Details</div>
                <div className='flex flex-wrap  gap-6'>
                    {/* Details */}
                    <div style={{color:"#828282"}}>
                        <div>Name</div>
                        <div>Email</div>
                        <div>Role</div>
                        <div>Department</div>
                        <div>Phone Number</div>
                    </div>
                    {/* Values */}
                    <div >
                      <div>John Doe</div>
                      <div>johndoe@escalayt.com</div> 
                      <div>Senior Manager</div>
                      <div>Finance</div>
                      <div>08036281933</div>
                    </div>
                </div>


            </div>

            {/* Ticket Details */}
            <div className='w-full lg:w-6/12  flex lg:justify-end'>
                <div className=''>
                    <div className='font-medium mb-4 '>Ticket Details</div>
                    <div className='flex flex-wrap gap-6'>
                        {/* Details */}
                        <div style={{color:"#828282"}}>
                            <div>Title</div>
                            <div>Location</div>
                            <div>Priority</div>
                            <div>Category</div>
                            <div>Description</div>
                        </div>
                        {/* Values */}
                        <div>
                        <div>{ticket.title}</div>
                        <div>{ticket.location}</div> 
                        <div>{ticket.priority}</div>
                        <div>{ticket.ticketCategoryName}</div>
                        <div>{ticket.description}</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

  )
}