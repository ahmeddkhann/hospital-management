"use client"

// components/Sidebar.js
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <ul className="flex flex-col p-4 space-y-4">
        <li>
          <Link href="/dashboard/doctors">
            <p className="flex items-center space-x-3">
              <i className="fas fa-user-md"></i>
              <span>Doctors</span>
            </p>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/appointments">
            <p className="flex items-center space-x-3">
              <i className="fas fa-calendar-check"></i>
              <span>Appointments</span>
            </p>
          </Link>
        </li>
        {/* Add New Doctor Section */}
        <li>
          <Link href="/dashboard/add-doctor">
            <p className="flex items-center space-x-3">
              <i className="fas fa-user-plus"></i>
              <span>Add New Doctor</span>
            </p>
          </Link>
        </li>
        {/* Messages Section */}
        <li>
          <Link href="/dashboard/check-messages">
            <p className="flex items-center space-x-3">
              <i className="fas fa-envelope"></i>
              <span>Messages</span>
            </p>
          </Link>
        </li>
        {/* Logout Section */}
        <li>
          <Link href="/dashboard/logout">
            <p className="flex items-center space-x-3">
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
