/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CreateTicket from "../../../components/modals/createTicket/CreateTicket";
import CreateCategory from "../../../components/modals/createCategory/CreateTicketCategory";
import CreateDepartment from "../../../components/modals/createDepartment/CreateDepartment";


export default function Dashboard() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

   // handle create department state modal
   const [isModalOpen3, setIsModalOpen3] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOpenModal3 = () => {
    setIsModalOpen3(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };

  const handleCloseModal3 = () => {
    setIsModalOpen3(false);
  };

  return (
    <>
      <div className={`relative ${isModalOpen ? "filter-blurred" : ""}`}>
      <p>Hello, this is the Admin Dashboard </p>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Ticket
        </button>
        {isModalOpen && <CreateTicket onClose={handleCloseModal} />}
      </div>
      <div className={`relative ${isModalOpen2 ? "filter-blurred" : ""}`}>
        <p>.</p>
        <br />
        <button
          onClick={handleOpenModal2}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Category
        </button>
        {isModalOpen2 && <CreateCategory onClose={handleCloseModal2} />}
      </div>

       {/* handle create department modal */}
       <div className={`relative ${isModalOpen3 ? "filter-blurred" : ""}`}>
        <p>.</p>
        <br />
        <button
          onClick={handleOpenModal3}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Department
        </button>
        {isModalOpen3 && <CreateDepartment onClose={handleCloseModal3} />}
      </div>

    </>
  );
}