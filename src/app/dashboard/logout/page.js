"use client";
import { useState } from 'react';
import axios from 'axios';

const DeleteAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleDeleteAdmin = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.delete('/api/logout-admin', {
        data: { email, password, role }, // Sending data as the request body
      });

      if (response.status === 200) {
        setMessage(response.data.message); // Success message
      } else {
        setError(response.data.message); // Error message
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting admin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Delete Admin</h1>

        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">
            Admin Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter admin email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-lg font-medium text-gray-700">
            Role:
          </label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter role (Admin)"
            required
          />
        </div>

        <button
          onClick={handleDeleteAdmin}
          disabled={loading}
          className="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 transition duration-300"
        >
          {loading ? 'Deleting Admin...' : 'Delete Admin'}
        </button>

        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default DeleteAdmin;
