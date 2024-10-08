// components/WelcomeMessage.js
import { FaCalendarCheck, FaUserMd, FaEnvelope, FaUserShield, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const WelcomeMessage = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center relative lg:ml-40">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center " />

      {/* Welcome Message */}
      <div className="relative z-10 bg-white rounded-lg p-10 max-w-lg text-center shadow-lg">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome Back, Admin!</h1>
        <p className="text-lg text-gray-600 mb-6">
          You have the power to manage your tasks effectively. Explore the tools below to keep everything on track.
        </p>
        
        {/* Main Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300 flex flex-col items-center p-4">
            <FaCalendarCheck className="text-3xl mb-2" />
            <a href="/dashboard/appointments" className="text-lg">View Appointments</a>
          </div>
          <div className="bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300 flex flex-col items-center p-4">
            <FaUserMd className="text-3xl mb-2" />
            <a href="/dashboard/doctors" className="text-lg"> Available Doctors</a>
          </div>
          <div className="bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition duration-300 flex flex-col items-center p-4">
            <FaEnvelope className="text-3xl mb-2" />
            <a href="/dashboard/check-messages" className="text-lg">Check Messages</a>
          </div>
          <div className="bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300 flex flex-col items-center p-4">
            <FaSignOutAlt className="text-3xl mb-2" />
            <a href="/logout" className="text-lg">Logout</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} EvaCare Medical Centre. All rights reserved.
      </footer>
    </div>
  );
};

export default WelcomeMessage;
