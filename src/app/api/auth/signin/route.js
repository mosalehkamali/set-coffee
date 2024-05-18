import connectToDB from "base/configs/db";

export async function GET(){
 await connectToDB()
 return Response.json({message:"signin api route"})
}