"use client";

// pages/doctors.js
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link for navigation

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch doctors data from the API
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/get-doctors'); // Ensure this matches your backend route
        const data = await response.json();

        if (response.ok) {
          setDoctors(data.doctors); // Set doctors data to state
        } else {
          setError(data.message || "Error fetching doctors");
        }
      } catch (error) {
        setError("Failed to fetch doctors");
      } finally {
        setLoading(false); // Hide loading state once the fetch is done
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-gray-600 p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-100">Available Doctors</h1>

        {loading && <p className="text-center text-lg">Loading...</p>}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        {!loading && !error && doctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300">
                <div className="text-center">
                  {/* Doctor Avatar */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
                    {doctor.firstName[0]}{doctor.lastName[0]}
                  </div>

                  {/* Doctor Details */}
                  <h3 className="text-xl font-semibold text-gray-800">
                    {doctor.firstName} {doctor.lastName}
                  </h3>
                  <p className="text-gray-600 mb-2">Email: {doctor.email}</p>
                  <p className="text-gray-600 mb-2">Mobile: {doctor.phone}</p>
                  <p className="text-gray-600 mb-2">Gender: {doctor.gender}</p>
                  <p className="text-gray-600 mb-2">Department: {doctor.doctorDepartment}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && doctors.length === 0 && (
          <p className="text-center text-lg text-gray-600">No doctors available at the moment.</p>
        )}

        {/* Back to Home Button */}
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

export default DoctorsPage;
