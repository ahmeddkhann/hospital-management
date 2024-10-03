import appointmentModel from "@/app/models/appoitmentSchema";
import dbConnect from "@/app/lib/databaseConnection";

export async function DELETE (request){

    await dbConnect()
    try {

        const {email} = await request.json()
        const appointment = await appointmentModel.findOne({email})
        if (!appointment){
            return Response.json(
                {
                    success: false,
                    message: `Appointment with email ${email} is not found`
                },
                {status: 400}
            )
        }
        await appointmentModel.deleteOne({email})

        return Response.json(
            {
                success: true,
                message: `Appointment with email ${email} is deleted`
            },
            {status: 200}
        )
        
    } catch (error) {
        console.log("Error while deleting appointment", error);
        return Response.json(
            {
                success: false,
                message: "Error while deleting appointment"
            },
            {status: 500}
        )
        
    }
}