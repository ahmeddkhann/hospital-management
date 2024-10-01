import userModel from "@/app/models/userSchema";

export async function POST (request){
    const {email, password, confirmPassword, role} = await request.json()

    if (!email || !password || !confirmPassword || !role){
        return Response.json(
            {
                success: false,
                message: "Please fill in all fields to login"
            },
            {status: 404}
        )
    }

    if (password !== confirmPassword){
        return Response.json(
            {
                success: false,
                message: "Password and confirm Password do not match"
            },
            {status: 403}
        )
    }

    const user = await userModel.findOne({email}).select("+password")
    if (!user){
        return Response.json(
            {
                success: false,
                message: `user with this email "${email}" is not found`
            },
            {status: 402}
        )
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect){
        return Response.json(
            {
                success: false,
                message: "Password is incorrect"
            },
            {status: 404}
        )
    }

    if (role !== user.role){
        return Response.json(
            {
                success: false,
                message: "the role you are trying to login is not for you"
            },
            {status: 402}
        )
    }

    return Response.json(
        {
            success: true,
            message: " user loggedIn successfully",
        },
        {status: 200}
    )
}