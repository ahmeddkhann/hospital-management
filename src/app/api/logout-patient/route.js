import userModel from "@/app/models/userSchema";
import dbConnect from "@/app/lib/databaseConnection";
import bcrypt from "bcrypt"

export async function DELETE (request){
    await dbConnect()

    try {
        const {email, password, role} = await request.json()

        if (!email || !password || !role){
            return Response.json(
                {
                    status: false,
                    message: "All fields are required"
                },
                {status: 400}
            )
        }

        const user = await userModel.findOne({email})
        if (!user){
            return Response.json(
                {
                    status: false,
                    message: `patient with email ${email} is not found`
                },
                {status: 401}
            )
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword){
            return Response.json(
                {
                    status: false,
                    message: "Invalid Password"
                },
                {status: 401}
            )
        }

        if (user.role !== "Patient"){
            return Response.json(
                {
                    status: false,
                    message: `patient with email ${email} is not registered`
                },
                {status: 402}
            )
        }

        await userModel.deleteOne({email})

        return Response.json(
            {
                status: true,
                message: `patient with email ${email} is deleted`
            },
            {status: 200}
        )
    } catch (error) {
        console.log(`error while loging out Patient with email ${email}`);
        return Response.json(
            {
                success: false,
                message: `error while loging out Patient with email ${email}`
            },
            {status: 500}
        )
    }
}