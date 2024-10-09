import appointmentModel from "@/app/models/appoitmentSchema";
import dbConnect from "@/app/lib/databaseConnection";
import { NextResponse } from "next/server";

// Function to create a fetch with a timeout
const fetchWithTimeout = (promise, timeout = 15000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    ),
  ]);
};

export async function GET() {
  await dbConnect();
  try {
    // Limit the number of results and add projection for optimization
    const fetchAppointments = appointmentModel.find().select('fieldsYouNeed').limit(100);
    
    // Set timeout for the fetch operation (e.g., 5 seconds)
    const getMessages = await fetchWithTimeout(fetchAppointments, 5000);
    
    if (getMessages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No Appointments found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Appointments retrieved successfully",
        getMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while retrieving appointments", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message === 'Request timed out' 
          ? "The request has timed out. Please try again later." 
          : "Error while retrieving appointments",
      },
      { status: error.message === 'Request timed out' ? 408 : 500 }
    );
  }
}
