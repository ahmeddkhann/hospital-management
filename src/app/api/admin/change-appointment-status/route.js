import appointmentModel from "@/app/models/appoitmentSchema";
import dbConnect from "@/app/lib/databaseConnection";
import userModel from "@/app/models/userSchema";

export async function PATCH(request) {
  await dbConnect();
  
  try {
    const {email, status} = await request.json()
    const user = await userModel.findOne({email})
    if (!user){
        return Response.json(
            {
                success: false,
                message: `user with email ${email} is not found`
            },
            {status: 404}
        )
    }

    const appointment = await appointmentModel.findOne({email})
    if (!appointment){
        return Response.json(
            {
                success: false,
                message: `appointment with email ${email} is not found`
            },
            {status: 403}
        )
    }
     if (appointment.status === status){
      return Response.json(
        {
          success: false,
          message: `appointment status is already ${status}`
        },
        {status: 404}
      )
     }

    const updatedAppointment = await appointmentModel.findOneAndUpdate(
      {email},
      {
        $set: {
          status
        }
       }, // Update status to Accepted
      { new: true } // Return the updated document
    );

    return Response.json(
      {
        success: true,
        data: updatedAppointment,
        message: "Appointment status updated successfully",
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.log("Error while updating appointment status", error);
    return Response.json(
      {
        success: false,
        message: "Updating appointment status failed!!",
      },
      { status: 500 }
    );
  }
}
