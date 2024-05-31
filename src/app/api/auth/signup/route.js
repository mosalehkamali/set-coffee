import {
  generateRefreshToken,
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

    if (!validatePhone(phone)) {
      return Response.json(
        { message: "Phone is not valid !!" },
        {
          status: 403,
        }
      );
    }

    if (email && !validateEmail(email)) {
      return Response.json(
        { message: "Email is not valid !!" },
        {
          status: 403,
        }
      );
    }

    if (password && !validatePassword(password)) {
      return Response.json(
        { message: "Password is not valid !!" },
        {
          status: 403,
        }
      );
    }
    const isUserExist = await userModel.findOne({
      $or: [{ name }, { email: email ? email : "" }, { phone }],
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

    const refreshToken = generateRefreshToken({ phone: user.phone });

    const users = await userModel.find({});
    const user = await userModel.create({
      name: name.trim() ? name : undefined,
      phone,
      email,
      password: hashedPassword,
      role: users.length > 0 ? roles.USER : roles.ADMIN,
      refreshToken,
    });

    if (!user) {
      return Response.json(
        { message: "Failed to register !!" },
        {
          status: 500,
        }
      );
    }

    const token = tokenGenrator({ phone });

    const headers = new Headers();

    headers.append("Set-Cookie", `token=${token};path=/;httpOnly=true`);
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly=true`
    );

    return Response.json(
      { message: "User Registered Successfully :))" },
      {
        status: 201,
        headers,
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
