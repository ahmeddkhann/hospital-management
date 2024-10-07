import dbConnect from "@/app/lib/databaseConnection";
import userModel from "@/app/models/userSchema";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password, role } = await request.json();

    // Check for empty fields
    if (!email || !password || !role) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 } // Use 400 for bad request
      );
    }

    // Check if the admin exists
    const oldAdmin = await userModel.findOne({ email });
    if (!oldAdmin) {
      return Response.json(
        {
          success: false,
          message: `${email} not found`,
        },
        { status: 404 } // Not found
      );
    }

    // Check the password
    const checkPassword = await bcrypt.compare(password, oldAdmin.password);
    if (!checkPassword) {
      return Response.json(
        {
          success: false,
          message: "Incorrect password",
        },
        { status: 401 } // Unauthorized
      );
    }

    // Check if the role is Admin
    if (oldAdmin.role !== "Admin") {
      return Response.json(
        {
          success: false,
          message: "You are not authorized for this operation",
        },
        { status: 403 } // Forbidden
      );
    }

    // If everything is fine, send a success response
    return Response.json(
      {
        success: true,
        message: "Login successful",
        data: { email: oldAdmin.email, role: oldAdmin.role }, // Return some user data if needed
      },
      { status: 200 } // OK
    );

  } catch (error) {
    console.log("Error while authenticating the current admin:", error);
    return Response.json(
      {
        success: false,
        message: "Error while authenticating the current admin",
      },
      {
        status: 500, // Internal server error
      }
    );
  }
}
