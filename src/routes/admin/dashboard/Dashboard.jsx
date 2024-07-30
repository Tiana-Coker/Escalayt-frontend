/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CreateTicket from "../../../components/modals/createTicket/CreateTicket";
import CreateCategory from "../../../components/modals/createCategory/CreateTicketCategory";
import CreateDepartment from "../../../components/modals/createDepartment/CreateDepartment";
import CreateUser from "../../../components/modals/createUser/CreateUser";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  // handle create department state modal
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  // handle create new user by admin
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOpenModal3 = () => {
    setIsModalOpen3(true);
  };
  const handleOpenModal4 = () => {
    setIsModalOpen4(true);
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
  const handleCloseModal4 = () => {
    setIsModalOpen4(false);
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

      {/* handle create New User modal */}
      <div className={`relative ${isModalOpen4 ? "filter-blurred" : ""}`}>
        <p>.</p>
        <br />
        <button
          onClick={handleOpenModal4}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create New User
        </button>
        {isModalOpen4 && <CreateUser onClose={handleCloseModal4} />}
      </div>
    </>
  );
}
