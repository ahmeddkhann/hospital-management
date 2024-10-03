import messageModel from "@/app/models/messageSchema";
import dbConnect from "@/app/lib/databaseConnection";

export async function GET (){
    await dbConnect()
     try {
        const getMessages = await messageModel.find()
        if (!getMessages){
            return Response.json(
                {
                    success: false,
                    message: "No messages found"
                },
                {status: 404}
            )
        }
        return Response.json(
            {
                status: 200,
                message: "messages retrived successfully",
                getMessages
            },
            {status: 200}
        )
     } catch (error) {
        console.log("error while getting messsages", error);
        return Response.json(
            {
                success: false,
                message: "Error while getting messages",
            },
            {status: 500}
        )
        
     }
}