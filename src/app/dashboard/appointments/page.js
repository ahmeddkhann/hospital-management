"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);

  // Simulated appointment data for demonstration
  const simulatedAppointments = [
    {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      department: "Cardiology",
      status: "Pending",
      appointment_date: "2024-10-15T09:00:00Z",
      hasVisited: true,
      doctor: { firstName: "Alice", lastName: "Smith" },
    },
    {
      _id: "2",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      department: "Neurology",
      status: "Accepted",
      appointment_date: "2024-10-18T11:00:00Z",
      hasVisited: false,
      doctor: { firstName: "Bob", lastName: "Brown" },
    },
  ];

  // Simulate loading appointments
  useEffect(() => {
    const loadAppointments = () => {
      setAppointments(simulatedAppointments); // Set appointments to simulated data
      setLoading(false);
    };

    loadAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Manage Appointments
        </h1>

        {loading && (
          <p className="text-center text-lg">Loading appointments...</p>
        )}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        {updateMessage && (
          <p className="text-center text-green-500">{updateMessage}</p>
        )}

        {!loading && !error && appointments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-6"
              >
                <span className="font-semibold">Patient:</span>
                <h3 className="text-xl font-semibold text-gray-800">
                  {appointment.firstName} {appointment.lastName}
                </h3>
                <span className="font-semibold">Doctor:</span>
                <h3 className="text-xl font-semibold text-gray-800">
                  {appointment.doctor
                    ? `${appointment.doctor.firstName} ${appointment.doctor.lastName}`
                    : "Doctor information not available"}
                </h3>
                <p className="text-lg font-semibold text-gray-600">
                  Email: {appointment.email}
                </p>
                <p className="text-lg font-semibold text-gray-600">
                  Department: {appointment.department}
                </p>
                <p className="text-gray-600 font-semibold">
                  Status: {appointment.status}
                </p>
                <p className="text-gray-600 font-semibold">
                  Date: {new Date(appointment.appointment_date).toLocaleDateString()}
                </p>
                <p className="text-lg font-semibold text-gray-600">
                  Has Visited Before? {appointment.hasVisited ? "Yes" : "No"}
                </p>
                {/* Remove update status button */}
                <Link href={`/dashboard/appointments/delete?email=${appointment.email}`}>
                  <button className="mt-4 bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 transition duration-300">
                    Delete Appointment
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && appointments.length === 0 && (
          <p className="text-center text-lg text-gray-600">
            No appointments available at the moment.
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <Link href="/dashboard">
            <p className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
              Back to Home
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;
