
import appointmentModel from "@/app/models/appoitmentSchema"
import dbConnect from "@/app/lib/databaseConnection";

export default async function handler(req, res) {
    // Handle only GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    // Establish a database connection
    await dbConnect();

    try {
        const getMessages = await appointmentModel.find();

        if (!getMessages || getMessages.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Appointments found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointments retrieved successfully",
            data: getMessages,
        });
    } catch (error) {
        console.error("Error while retrieving appointments:", error);
        return res.status(500).json({
            success: false,
            message: "Error while retrieving appointments",
        });
    }
}
