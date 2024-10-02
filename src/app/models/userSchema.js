import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "first name should not be less than 3 characters"]
    },
    lastName: {

        type: String,
        required: true,
        minLength: [3, "Last name should not be less than 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "please Provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
    },
    dob:{
        type: Date,
        required: [true, "DOB is required"]
    },
    gender:{
        type:String,
        required: [true, "Gender is required"],
        enum: ["male", "female"]
    },
    password: {
        type: String,
        required: true,
        minLength: [6 , "Password should be at least 6 characters"],
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"]
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateJsonWebToken = function (){
    return jwt.sign({
        _id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn: process.env.JWT_EXPIRES 
    }
)
}

const userModel = (mongoose.models.User) || (mongoose.model("User", userSchema))
export default userModel