import appointmentModel from "@/app/models/appoitmentSchema";// Corrected typo: appoitmentSchema
import dbConnect from "@/app/lib/databaseConnection";
import { NextResponse } from "next/server"; // Import NextResponse

export async function GET() {
  await dbConnect();
  try {
    const getMessages = await appointmentModel.find();
    if (getMessages.length === 0) { // Check for empty array
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
        message: "Error while retrieving appointments",
      },
      { status: 500 }
    );
  }
}
