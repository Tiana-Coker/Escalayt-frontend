/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PdfIcon from "./../../../assets/Pdf";
import DownloadIcon from "./../../../assets/DownloadIcon";
import TrashIcon from "./../../../assets/TrashIcon";

export default function TicketDetails({ ticket }) {
  console.log("ticket here", ticket);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = ticket.fileUrl; // Replace with the URL of the file on Cloudinary
    link.target = '_blank'; // Use the file title for the download name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return `300kb. ${new Date(dateString).toLocaleDateString(undefined, options)}`;
  };

  const formattedDate = formatDate(ticket.createdAt)

  return (
    <div className="flex flex-wrap w-10/12 mx-auto  justify-between no_text">
      {/* User Details */}
      <div className="w-full lg:w-6/12">
        <div className="font-medium mb-4">User Details</div>
        <div className="flex flex-wrap  gap-6">
          {/* Details */}
          <div style={{ color: "#828282" }}>
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Department</div>
            <div>Phone Number</div>
          </div>
          {/* Values */}
          <div>
            <div>John Doe</div>
            <div>johndoe@escalayt.com</div>
            <div>Senior Manager</div>
            <div>Finance</div>
            <div>08036281933</div>
          </div>
        </div>
      </div>

      {/* Ticket Details */}
      <div className="w-full lg:w-6/12  flex lg:justify-end">
        <div className="">
          <div className="font-medium mb-4 ">Ticket Details</div>
          <div className="flex flex-wrap gap-6">
            {/* Details */}
            <div style={{ color: "#828282" }}>
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
      {/* Attachement */}
      <div className="w-full h-[112px] flex flex-col gap-[16px] mt-[30px]">
        <div className="h-[24px] flex items-center">
          <span className="text-[16px] font-medium leading-[24px] text-[#000000]">
            Attachment
          </span>
        </div>
        <div className="w-full h-[72px] flex gap-[12px] p-[16px] border border-[#E4ECF5] bg-[#F8FAFE]">
          <div className="w-[28px] h-[28px]">
            <PdfIcon />
          </div>

          <div className="flex-1 h-[40px] flex flex-col pl-[5px] gap-[6px]">
            <div className="text-[14px] font-medium leading-[22px] text-left text-[#324054]">
                {ticket.fileTitle}
            </div>
            <div className="text-[12px] font-normal leading-[16px] tracking-[-0.005em] text-left text-[#71839B]">
              {/* 313 KB . 31 Aug, 2022 */}
              {formattedDate}
            </div>
          </div>

          <div className="w-[40px] h-[16px] flex justify-center items-center gap-[8px] mt-[10px]">
            <button className="w-[16px] h-[16px]" onClick={handleDownload}>
                <DownloadIcon />
            </button>
            <div className="w-[16px] h-[16px]">
                <TrashIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
