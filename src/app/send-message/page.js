"use client";

import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const { toast } = useToast();

  const handleMessage = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          "/api/send-message",
          { firstName, lastName, email, phone, message },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast({
            title: "Message Sent",
            description: res.data.message,
            variant: "success",
            duration: 4000,
          });
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive", // For error variant
        duration: 4000,
      });
      console.error(error);
    }
  };

  return (
    <div className="bg-blue-50 p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Give us a Feedback?
      </h2>

      <form onSubmit={handleMessage} className="space-y-4">
        <div className="flex flex-col space-y-4">
          {/* First Name Input */}
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Last Name Input */}
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Phone Input */}
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Message Input */}
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-500 transition duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
