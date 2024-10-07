 "use client"
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <div className="text-white text-2xl font-bold">
          <Link href="/">EverCare Medical Centre</Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>
        </div>

        {/* Links for Desktop */}
        <div className="hidden md:flex space-x-6 text-white">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/departments" className="hover:text-gray-300">Departments</Link>
          <Link href="/send-message" className="hover:text-gray-300">Contact</Link>
          <Link href="/signup" className="hover:text-gray-300">Signup</Link>
          <Link href="/admin" className="hover:text-gray-300">Admin</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 text-white space-y-4 p-4">
          <Link href="/" className="block hover:text-gray-300">Home</Link>
          <Link href="/departments" className="block hover:text-gray-300">Departments</Link>
          <Link href="/send-message" className="block hover:text-gray-300">Send Message</Link>
          <Link href="/signup" className="block hover:text-gray-300">Signup</Link>
          <Link href="/login" className="block hover:text-gray-300">Log In</Link>
        </div>
      )}
    </nav>
  );
}
