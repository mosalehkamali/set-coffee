import {
  generateRefreshToken,
  tokenGenrator,
  validatePhone,
} from "@/utils/auth";
import connectToDB from "base/configs/db";
import otpModel from "base/models/Otp";
import userModel from "base/models/User";
import { roles } from "@/utils/constants";

export async function POST(req) {
  try {
    connectToDB();
    const { phone, code } = await req.json();

    if (!validatePhone(phone)) {
      return Response.json(
        { message: "Phone is not valid !!" },
        {
          status: 403,
        }
      );
    }
    const otp = await otpModel.findOne({ phone });
    if (!otp) {
      return Response.json(
        { message: "Phone is not found !!" },
        {
          status: 404,
        }
      );
    }
    const now = new Date();

    if (otp.useTimes === 3) {
      await otpModel.findOneAndUpdate(
        { phone },
        {
          $set: { useTimes: 0, waitTime: now.getTime() + 600_000 },
        }
      );
      return Response.json(
        { message: "Limit usege , you have to wait !!!", remainingTime: 10 },
        {
          status: 410,
        }
      );
    } else {
      if (otp.waitTime > now.getTime()) {
        const remainingTime = Math.ceil((otp.waitTime - now.getTime()) / 60000);
        return Response.json(
          { message: "Limit usege , you have to wait !!!", remainingTime },
          {
            status: 410,
          }
        );
      }

      if (otp.code === code) {
        if (otp.expTime < now.getTime()) {
          return Response.json(
            { message: "This code is expiered !!!" },
            {
              status: 422,
            }
          );
        }
        await otpModel.findOneAndUpdate(
          { phone },
          {
            $set: { useTimes: 0 },
          }
        );

        const user = await userModel.findOne({ phone });

        if (user) {
          const token = tokenGenrator({ phone });
          const refreshToken = generateRefreshToken({ phone });

          await userModel.findOneAndUpdate(
            { phone },
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
        } else {
          const users = await userModel.find({});
          const user = await userModel.create({
            phone,
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

          const token = tokenGenrator({ phone });

          return Response.json(
            { message: "User Registered Successfully :))" },
            {
              status: 201,
              headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true` },
            }
          );
        }
      } else {
        await otpModel.findOneAndUpdate(
          { phone },
          {
            $inc: { useTimes: 1 },
          }
        );
        return Response.json(
          { message: "This code is not correct !!!" },
          {
            status: 409,
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "UnKnown Internal Server Error !!!" },
      { status: 500 }
    );
  }
}
