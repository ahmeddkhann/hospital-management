import appointmentModel from "@/app/models/appoitmentSchema";
import dbConnect from "@/app/lib/databaseConnection";
import userModel from "@/app/models/userSchema";

export async function POST (request){
    await dbConnect()
try {
        const {firstName, lastName, email, phone, cnic, dob,
            gender, appointment_date, department, doctor_firstName,
            doctor_lastName, hasVisited, address
        } = await request.json()
        if (!firstName || !lastName || !email || !phone || !cnic || !dob
            || !gender || !appointment_date || !department || !doctor_firstName ||
            !doctor_lastName || !hasVisited || !address) {
            
                return Response.json(
                    {
                        success: false,
                        message: "All fields are required"
                    },
                    {status: 400}
                )
        }
    
        const isConflict = await userModel.find({
            firstName: doctor_firstName,
            lastName: doctor_lastName,
            role: "Doctor",
            doctorDepartment: department
        }) 
    
        if (isConflict.length === 0){
            return Response.json(
                {
                    success: false,
                    message: "Doctor with above details is not found"
                },
                {status: 404}
            )
        }
    
        if (isConflict.length < 1){
            return Response.json(
                {
                    success: false,
                    message: "Doctor Conflict! Please contact through Email or Phone"
                },
                {status: 404}
            )
        }
    
        const doctorId = isConflict[0]._id
        const patient = await userModel.findOne({email})
        if (!patient || patient.role !== "Patient"){
            return Response.json(
                {
                    success: false,
                    message: `patient with email ${email} is not found. Please logIn first`
                },
                {status: 404}
            )
        }
        const patientId = patient._id

        const appointment = await appointmentModel.create({
            firstName,
            lastName,
            email,
            phone,
            cnic,
            dob,
            gender,
            appointment_date,
            department,
            doctor: {
                firstName: doctor_firstName,
                lastName: doctor_lastName,
            },
            hasVisited,
            address,
            patientId,
            doctorId
        })
    
        await appointment.save()
    
        return Response.json(
            {
                success: true,
                message: `Appointment of ${firstName} ${lastName} with Dr. ${doctor_firstName} ${doctor_lastName} has been scheduled successfully`
            },
            {status: 200}
        )
} catch (error) {
    console.log("error while appointing schedule with doctor", error);
    return Response.json(
        {
            success: false,
            message: "Failed to schedule appointment"
        },
        {status: 500}
    )
}
}