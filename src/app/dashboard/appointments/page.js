"use client";
// pages/manage-appointments.js
import { useEffect, useState } from 'react';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);

  useEffect(() => {
    // Fetch appointments data from the API
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/get-appointments'); // Ensure this matches your backend route
        const data = await response.json();

        if (response.ok) {
          setAppointments(data.getMessages); // Set appointments data to state
        } else {
          setError(data.message || "Error fetching appointments");
        }
      } catch (error) {
        setError("Failed to fetch appointments");
      } finally {
        setLoading(false); // Hide loading state once the fetch is done
      }
    };

    fetchAppointments();
  }, []);

  const updateAppointmentStatus = async (email, currentStatus) => {
    const newStatus = prompt("Enter new status (Accepted, Rejected, etc.):", currentStatus);
    if (!newStatus) return;

    try {
      const response = await fetch('/api/update-appointment', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        setUpdateMessage(data.message);
        // Update the local state to reflect the change
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.email === email ? { ...appointment, status: newStatus } : appointment
          )
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Failed to update appointment status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Manage Appointments</h1>

        {loading && <p className="text-center text-lg">Loading appointments...</p>}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        {updateMessage && <p className="text-center text-green-500">{updateMessage}</p>}

        {!loading && !error && appointments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800">Appointment with: {appointment.email}</h3>
                <p className="text-gray-600">Status: {appointment.status}</p>
                <p className="text-gray-600">Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p className="text-gray-600">Time: {new Date(appointment.date).toLocaleTimeString()}</p>
                <button
                  onClick={() => updateAppointmentStatus(appointment.email, appointment.status)}
                  className="mt-4 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300"
                >
                  Update Status
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && appointments.length === 0 && (
          <p className="text-center text-lg text-gray-600">No appointments available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default ManageAppointments;

