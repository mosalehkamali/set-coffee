import { tokenGenrator } from "@/utils/auth";
import userModel from "base/models/User";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
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
      { message: "Access token refreshed successfuly" },
      {
        status: 200,
        headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true` },
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "UnKnown Internal Server Error !!!" },
      { status: 500 }
    );
  }
}
