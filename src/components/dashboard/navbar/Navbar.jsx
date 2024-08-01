import React from 'react';
import { Link } from 'react-router-dom';

import IMAGES from '../../../assets';

const Navbar = ({ onOpen, setProfileDropdown, profileDropdown}) => {

  const handleProfileDropdown = () => {
    setProfileDropdown(prev => !prev);
  }
  return (
    <nav className="">
        <div className="relative flex flex-wrap items-center justify-between h-14">
          <div className="">
            <Link to="/" className="flex-shrink-0">
              <img src={IMAGES.ESCALAYT_LOGO} className='min-w-full' alt="" />
            </Link>  
          </div>
          <div className="flex flex-wrap items-center ">
            <div className="flex flex-wrap no_text">
                <Link to = "/admin/dashboard">Dashboard</Link>
                <Link to = "/admin/tickets" className='ml-4'>All Tickets</Link>
            </div>
            <div className="flex flex-wrap items-center ml-28">
              <button className="" onClick={onOpen}><img src={IMAGES.NOTIFICATION_ICON} alt="notification" /></button>
              <button className="ml-6" onClick={handleProfileDropdown}><img src={IMAGES.PROFILE_ICON} className='' alt="" /></button>
            </div>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;