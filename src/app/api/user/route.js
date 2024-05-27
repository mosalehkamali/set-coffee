import connectToDB from "base/configs/db";
import { authUser } from "@/utils/serverHelpers";
import { tokenGenrator, validateEmail, validatePhone } from "@/utils/auth";
import userModel from "base/models/User";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectToDB();
    const { name, email, phone } = await req.json();
    const user = await authUser();
    if (!user) {
      return Response.json(
        { message: "Please login first" },
        {
          status: 401,
        }
      );
    }

    if (!name.trim() || !phone.trim() || !email.trim()) {
      return Response.json(
        { message: "Complete All Required Fields !!" },
        {
          status: 403,
        }
      );
    }

    if (!validatePhone(phone)) {
      return Response.json(
        { message: "Phone is not valid !!" },
        {
          status: 403,
        }
      );
    }

    if (!validateEmail(email)) {
      return Response.json(
        { message: "Email is not valid !!" },
        {
          status: 403,
        }
      );
    }

    const updateUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { name, email, phone } }
    );
    if (!updateUser) {
      return Response.json(
        { message: "Failed to Update !!" },
        {
          status: 500,
        }
      );
    }
    const token = tokenGenrator({ name });
    if (!token) {
      return Response.json(
        { message: "Failed to Update !!" },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      { message: "User Data Changed Successfully :))" },
      {
        status: 200,
        headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true` },
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "UnKnown Internal Server Error !!!" },
      {
        status: 500,
      }
    );
  }
}
