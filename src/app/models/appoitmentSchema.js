import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const appointmentSchema = new mongoose.Schema({
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

    appointment_date:{
        type: String,
        required: [true, "Appointment Date is required"]
    },
    department:{
        type:String,
        required: [true, "Department is required"],
    },
    doctor:{
        firstName:{
            type:String,
            required: [true, "First Name is required"]
        },
        lastName:{
            type: String,
            required: [true, "Last Name is required"]
        }
    },
    hasVisited: {
        type: Boolean,
        default: false,
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    address:{
        type:String,
        required: [true, "Address is required"]
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }


})

const appointmentModel = (mongoose.models.Appointment) || (mongoose.model("Appointment", appointmentSchema))
export default appointmentModel