import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema=z.object({
    username:usernameValidation
})

export async function GET(request:Request){
    await dbConnect();
    try {
        const {searchParams}=new URL(request.url)
        const queryParam={
            username:searchParams.get("username")
        }
        const result= UsernameQuerySchema.safeParse(queryParam)
        if(!result.success){
           const usernameError=result.error.format().
           username?._errors || []
           return Response.json(
               {
                   success:false,
                   message:"Invalid username",
                   error:usernameError
               },
               {status:400}
           )
        }

        const {username}=result.data
        const exisitingVerifiedUser=await UserModel.findOne({username,isVerified:true})

        if(exisitingVerifiedUser){
            return Response.json(
                {
                    success:false,
                    message:"Username already taken"
                },
                {status:400}
            )
        }

        return Response.json({
            success:true,
            message:"Username is unique"
        })

    } catch (error) {
        console.error("Error checking username",error)
        return Response.json(
            { 
                success:false,
                message:"Internal server error"
            },
            {status:500})
    }
}