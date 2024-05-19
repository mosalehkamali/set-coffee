import { passwordValidator, tokenGenrator } from "@/utils/auth";
import connectToDB from "base/configs/db";
import userModel from "base/models/User";

export async function POST(req) {
  await connectToDB();
  try {
    const reqBody = await req.json();
    const { identifier, password } = reqBody;

    const user = await userModel.findOne({
      $or: [{ name: identifier }, { email: identifier }],
    });

    const isValidPassword = await passwordValidator(password, user.password);

    const token = tokenGenrator({ user: user.name });

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
