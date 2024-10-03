import userModel from "@/app/models/userSchema";
import dbConnect from "@/app/lib/databaseConnection";

export async function POST(request) {
    await dbConnect();
    try {
        const { firstName, lastName, email, phone, password, gender, dob, cnic, doctorDepartment } = await request.json();

        if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !cnic || !doctorDepartment) {
            return Response.json(
                {
                    success: false,
                    message: "All fields are required"
                },
                { status: 400 } // Use 400 for bad request
            );
        }

        const isRegistered = await userModel.findOne({ email });

        if (isRegistered) {
            return Response.json(
                {
                    success: false,
                    message: `${isRegistered.role} with email ${email} is already registered`
                },
                { status: 403 }
            );
        }

        const doctor = await userModel.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            dob,
            cnic,
            doctorDepartment,
            role: "Doctor",
        });

        await doctor.save();

        return Response.json(
            {
                success: true,
                message: `Doctor with email ${email} is registered successfully`,
            },
            { status: 201 } // Use 201 for created
        );
    } catch (error) {
        console.error("Error while adding new doctor:", error);
        return Response.json(
            {
                success: false,
                message: "Doctor Registration Failed !!"
            },
            { status: 500 } // Use 500 for internal server error
        );
    }
}
