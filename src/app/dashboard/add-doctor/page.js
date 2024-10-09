"use client";

import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast'; // Import Toast components

const AddDoctor = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        gender: '',
        dob: '',
        cnic: '',
        doctorDepartment: '',
    });
    

    const { toast } = useToast(); // Initialize the toast hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/admin/add-doctor', formData);
            if (response.data.success) {
                toast({
                    title: 'Success',
                    description: response.data.message,
                    variant: 'success', // Add variant for success toast
                });
                // Redirect after a successful registration
                
            } else {
                toast({
                    title: 'Error',
                    description: response.data.message,
                    variant: 'error', // Add variant for error toast
                });
            }
        } catch (err) {
            toast({
                title: 'Error',
                description: 'Error registering doctor. Please try again.',
                variant: 'error', // Add variant for error toast
            });
            console.error(err);
        }
    };

    return (

            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Register New Doctor</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">CNIC</label>
                            <input
                                type="text"
                                name="cnic"
                                value={formData.cnic}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Department</label>
                            <input
                                type="text"
                                name="doctorDepartment"
                                value={formData.doctorDepartment}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300"
                        >
                            Register Doctor
                        </button>
                    </form>
                </div>
            </div>
    
    );
};

export default AddDoctor;
