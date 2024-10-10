// app/api/admin/get-appointments/route.js
import appointmentModel from "@/app/models/appointmentSchema";
import dbConnect from "@/app/lib/databaseConnection";

export async function GET() {
    await dbConnect();

    try {
        const getMessages = await appointmentModel.find().limit(100); // Limit results for performance

        if (getMessages.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "No Appointments found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                status: 200,
                message: "Appointments retrieved successfully",
                getMessages,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while retrieving appointments:", error);
        return Response.json(
            {
                success: false,
                message: "Error while retrieving appointments",
            },
            { status: 500 }
        );
    }
}
