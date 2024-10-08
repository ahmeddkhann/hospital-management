"use client";
import { useState } from 'react';
import axios from 'axios';

const UpdateAppointment = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate input
    if (!email || !status) {
      setError("Please provide both email and new status.");
      return;
    }

    setLoading(true);
    setError(null); // Reset any previous error
    setMessage(null); // Reset any previous success message

    try {
      const response = await axios.patch('/api/admin/change-appointment-status', {
        email,
        status,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update appointment status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Update Appointment Status</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700">Patient Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">New Status:</label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Accepted, Rejected, etc."
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAppointment;
