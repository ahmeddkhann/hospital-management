import appointmentModel from "@/app/models/appoitmentSchema";
import dbConnect from "@/app/lib/databaseConnection";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    // Limit the number of results and add projection for optimization
    const getMessages = await appointmentModel.find().select('fieldsYouNeed').limit(100);
    
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
        message: "Error while retrieving appointments",
      },
      { status: 500 }
    );
  }
}
