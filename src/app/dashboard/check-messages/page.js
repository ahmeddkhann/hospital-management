"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/admin/get-messages'); // Ensure the backend route is correct
        if (response.status === 200) {
          setMessages(response.data.getMessages);
        } else {
          setError(response.data.message || 'Failed to retrieve messages');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">View Messages</h1>

        {loading && <p className="text-center text-lg">Loading messages...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && messages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {messages.map((message) => (
              <div key={message._id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                <p className="text-lg font-semibold text-gray-600">Sender: {message.firstName} {" "} {message.lastName} </p>
                <p className="text-lg text-gray-600">Email: {message.email}</p>
                <p className="text-gray-600">Message: {message.message}</p>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <p className="text-center text-lg text-gray-600">No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewMessages;
