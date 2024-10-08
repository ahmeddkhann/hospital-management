"use client";
import { useState } from 'react';
import axios from 'axios';

const DeleteAppointment = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please provide an email.");
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous error message
    setMessage(null); // Clear any previous success message

    try {
      const response = await axios.delete('/api/admin/delete-appointment', {
        data: { email }, // The DELETE method in axios sends the request body using 'data'
      });

      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Delete Appointment</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

        <form onSubmit={handleDelete} className="space-y-4">
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

          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAppointment;
