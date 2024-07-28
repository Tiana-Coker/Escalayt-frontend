/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CreateTicket from "../../../components/modals/createTicket/CreateTicket";

export default function Dashboard() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  
  return (
    <>
      <div className={`relative ${isModalOpen ? "filter-blurred" : ""}`}>
      <p>Hello, this is the User Dashboard </p>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Ticket
        </button>
        {isModalOpen && <CreateTicket onClose={handleCloseModal} />}
      </div>
      {/* <div className={`relative ${isModalOpen ? "filter-blurred" : ""}`}>
        <p>.</p>
        <br />
        <button
          onClick={handleOpenModal2}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Category
        </button>
        {isModalOpen2 && <CreateCategory onClose={handleCloseModal2} />}

        <p>Hello, this is the Escalayt Dashboard </p>
      </div> */}
    </>
  )
}
