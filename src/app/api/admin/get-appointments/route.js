import appointmentModel from "@/app/models/appoitmentSchema";
import dbConnect from "@/app/lib/databaseConnection";

export async function GET (){
    await dbConnect()
     try {
        const getMessages = await appointmentModel.find()
        if (!getMessages){
            return Response.json(
                {
                    success: false,
                    message: "No Appointments found"
                },
                {status: 404}
            )
        }
        return Response.json(
            {
                status: 200,
                message: "Appointments retrived successfully",
                getMessages
            },
            {status: 200}
        )
     } catch (error) {
        console.log("error while retrieving appointments", error);
        return Response.json(
            {
                success: false,
                message: "Error while retrieving appointments",
            },
            {status: 500}
        )
        
     }
}