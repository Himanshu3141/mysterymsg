import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, content } = await request.json();
        const user = await UserModel.findOne({ username });

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        if (!user.isAcceptingMessages) {
            return Response.json({
                success: false,
                message: "User is not accepting messages"
            }, { status: 403 });
        }

        const newMessage = { content, createdAt: new Date() };
        user.messages.push(newMessage);
        await user.save();

        return Response.json({
            success: true,
            message: "Message sent successfully"
        }, { status: 200 });

    } catch (error) {
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
}
