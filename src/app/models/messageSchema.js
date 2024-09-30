import mongoose from "mongoose";
import validator from "validator"

const messageSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
        minLength: [10, "message name should not be less than 10 characters"]
    }
})

const messageModel = (mongoose.models.Message) || (mongoose.model("Message", messageSchema))
export default messageModel