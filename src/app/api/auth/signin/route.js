import {
  generateRefreshToken,
  passwordValidator,
  tokenGenrator,
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/utils/auth";
import connectToDB from "base/configs/db";
import userModel from "base/models/User";

export async function POST(req) {
  await connectToDB();
  try {
    const reqBody = await req.json();
    const { identifier, password } = reqBody;

    if (!identifier.trim() || !password.trim()) {
      return Response.json(
        { message: "Complete All Required Fields !!" },
        {
          status: 403,
        }
      );
    }

    if (!validatePassword(password)) {
      return Response.json(
        { message: "Password is not valid !!" },
        {
          status: 403,
        }
      );
    }

    if (!validateEmail(identifier) && !validatePhone(identifier)) {
      return Response.json(
        { message: "Invalid Email or Phone !!" },
        {
          status: 403,
        }
      );
    }

    const user = await userModel.findOne({
      $or: [{ name: identifier }, { email: identifier }],
    });

    if (!user) {
      return Response.json(
        { message: "User does not exist !!!" },
        {
          status: 419,
        }
      );
    }

    const isValidPassword = await passwordValidator(password, user.password);

    if (!isValidPassword) {
      return Response.json(
        { message: "Invalid email, phone or password !!!" },
        {
          status: 401,
        }
      );
    }

    const token = tokenGenrator({ name: user.name });
    const refreshToken = generateRefreshToken({ name: user.name });

    await userModel.findOneAndUpdate(
      { $or: [{ name: identifier }, { email: identifier }] },
      {
        $set: { refreshToken },
      }
    );

    return Response.json(
      { message: "User Logged In Successfully " },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token};path=/;httpOnly=true`,
        },
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ error: "UnKnown Internal Server Error !!!" });
  }
}
