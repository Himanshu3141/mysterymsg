import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function GET(request:Request){
    await dbConnect();
    try {
        const {username,code}=await request.json()
        const decodedUsername=decodeURIComponent(username)
        const user=await UserModel.findOne({username:decodedUsername})
        if(!user){
            return Response.json(
                {
                    success:false,
                    message:"User not found"
                },
                {status:400}
            )
        }
        const isCodeValid=user.verificationCode===code
        const isCodeNotExpired=user.verificationCodeExpiresAt>new Date()
        if(isCodeValid && isCodeNotExpired){
            user.isVerified=true
            await user.save()
            return Response.json({
                success:true,
                message:"Account verified successfully" 
            })
        }else if(!isCodeNotExpired){
            return Response.json( {
                success:false,
                message:"Verification code expired please signup to get a new one"
            },
            {status:400}
            )
        }else{
            return Response.json({
                success:false,
                message:"Invalid verification code"
            },
            {status:400}
            )
        }
    } catch (error) {
        console.error("Error checking username",error)
        return Response.json(
            { 
                success:false,
                message:"Internal server error"
            },
        )
    }
}