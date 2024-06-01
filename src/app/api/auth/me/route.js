import userModel from "base/models/User";
import { cookies } from "next/headers";
import connectToDB from "base/configs/db";
import { tokenGenrator, verifyToken } from "@/utils/auth";
import { verify } from "jsonwebtoken";

export async function GET() {
  try {
    await connectToDB();
    const token = cookies().get("token")?.value;
    if (token) {
      const tokenPayLoad = verifyToken(token);
      if (tokenPayLoad) {
        const user = JSON.parse(
          JSON.stringify(await userModel.findOne({ phone: tokenPayLoad.phone }))
        );
        return Response.json(
          { message: "user is login", user },
          { status: 200 }
        );
      } else {
          const refreshToken = cookies().get("refresh-token").value;
      
          if (!refreshToken) {
            return Response.json(
              { message: "user is not login" },
              {
                status: 401,
              }
            );
          }
      
          const user = await userModel.findOne({ refreshToken });
      
          if (!user) {
            return Response.json(
              { message: "user is not login" },
              {
                status: 401,
              }
            );
          }
      
          verify(refreshToken, process.env.RefreshTokenPrivateKey);
      
          const token = tokenGenrator({ phone: user.phone });
      
          return Response.json(
            { message: "Access token refreshed successfuly",user },
            {
              status: 200,
              headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true` },
            }
          );
        } 
      
    } else {
      return Response.json(
        { message: "user is not login", user },
        { status: 401 }
      );
    }
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "UnKnown Internal Server Error !!!" },
      { status: 500 }
    );
  }
}
