import {
  hasher,
  tokenGenrator,
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/utils/auth";
import { roles } from "@/utils/constants";
import connectToDB from "base/configs/db";
import userModel from "base/models/User";

export async function POST(req) {
  await connectToDB();
  try {
    const reqBody = await req.json();
    const { name, phone, email, password } = reqBody;

    if (!name.trim() || !phone.trim()) {
      return Response.json(
        { message: "Complete All Required Fields !!" },
        {
          status: 401,
        }
      );
    }

    if (!validatePhone(phone)) {
      return Response.json(
        { message: "Phone is not valid !!" },
        {
          status: 401,
        }
      );
    }

    if (email && !validateEmail(email)) {
      return Response.json(
        { message: "Email is not valid !!" },
        {
          status: 401,
        }
      );
    }

    if (password && !validatePassword(password)) {
      return Response.json(
        { message: "Password is not valid !!" },
        {
          status: 401,
        }
      );
    }

    const isUserExist = await userModel.findOne({
      $or: [{ name }, { email }, { phone }],
    });

    if (isUserExist) {
      return Response.json(
        { message: "The username , email or phone exist already !!" },
        {
          status: 422,
        }
      );
    }
    const hashedPassword = password ? await hasher(password) : password;
    const users = await userModel.find({});
    const user = await userModel.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role: users.length > 0 ? roles.USER : roles.ADMIN,
    });

    if (!user) {
      return Response.json(
        { message: "Failed to register !!" },
        {
          status: 500,
        }
      );
    }

    const token = tokenGenrator({ name });

    return Response.json(
      { message: "User Registered Successfully :))" },
      {
        status: 201,
        headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true` },
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ error: "UnKnown Internal Server Error !!!" });
  }
}
