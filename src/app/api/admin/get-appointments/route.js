import appointmentModel from "@/app/models/appointmentSchema"; // Corrected typo
import dbConnect from "@/app/lib/databaseConnection";

export async function GET() {
    // Establish a database connection
    try {
        await dbConnect();
    } catch (error) {
        console.error("Database connection failed:", error);
        return Response.json(
            {
                success: false,
                message: "Database connection failed",
            },
            { status: 500 }
        );
    }

    try {
        // Retrieve appointments from the database
        const getMessages = await appointmentModel.find();

        // Check if any appointments were retrieved
        if (!getMessages || getMessages.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "No Appointments found",
                },
                { status: 404 }
            );
        }

        // Return the appointments if found
        return Response.json(
            {
                success: true,
                status: 200,
                message: "Appointments retrieved successfully",
                data: getMessages, // Changed key to 'data' for clarity
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
