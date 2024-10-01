import messageModel from "@/app/models/messageSchema";
import dbConnect from "@/app/lib/databaseConnection";

export async function POST(request) {
  try { 
    
    await dbConnect()
    const { firstName, lastName, email, message, phone } = await request.json();

    if (!firstName || !lastName || !email || !message || !phone) {
      return Response.json(
        {
          success: "false",
          message: "Please fill in all fields",
        },
        { status: 404 }
      );
    }

    const newMessage = await messageModel.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    return Response.json(
      {
        success: "true",
        message: "message sent successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error while sending message: ", error);

    return Response.json(
      { 
        success: "false",
        message: "Error sending message: ",
      },
      { status: 500 }
    );
  }
}
