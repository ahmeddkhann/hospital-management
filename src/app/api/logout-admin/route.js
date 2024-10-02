import dbConnect from "@/app/lib/databaseConnection";
import userModel from "@/app/models/userSchema";
import bcrypt from "bcrypt"

export async function DELETE (request){
    await dbConnect()
    try {
        
        const {email, password, role} = await request.json()

        if (!email || !password || !role){
            return Response.json(
                {
                    success: false,
                    message: "all fields are required"
                },
                {status: 404}
            )
        }

        const user = await userModel.findOne({email})

        if (!user){
            return Response.json(
                {
                    success: false,
                    message: `Admin with email ${email} is not found`
                },
                {status: 402}
            )
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword){
            return Response.json(
                {
                    success: false,
                    message: "incorrect password"
                },
                {status: 402}
            )
        }

        if (user.role !== "Admin"){
            return Response.json(
                {
                    success: false,
                    message: "you are not authentic to logout"
                },
                {status: 404}
            )
        }

        await userModel.deleteOne({email})

        return Response.json(
            {
                success: true,
                message: "Admin data deleted Successfully"
            },
            {status: 200}
        )
    } catch (error) {
        console.log("error while logging out user", error);
        return Response.json(
            {
                success: false,
                message: "Error while logging out user"
            },
            {status: 500}
        )
    }
}