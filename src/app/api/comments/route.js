import { validateEmail } from "@/utils/auth";
import { authUser } from "@/utils/serverHelpers";
import connectToDB from "base/configs/db";
import commentModel from "base/models/Comment";

export async function POST(req) {
  try {
    await connectToDB();
    const reqBody = await req.json();
    const { username, body, email, score, product } = reqBody;
    const user = await authUser();
    if (!user) {
      return Response.json({ message: "Please login first" });
    }
    if (
      !username.trim() ||
      !body.trim() ||
      !email.trim() ||
      !score ||
      !product.trim()
    ) {
      return Response.json(
        { message: "Send All Propertys !!!" },
        {
          status: 422,
        }
      );
    }

    if (!validateEmail(email)) {
      return Response.json(
        { message: "Ivalide Email !!!" },
        {
          status: 422,
        }
      );
    }

    const comment = await commentModel.create({
      username,
      body,
      email,
      score,
      user: user._id,
      product,
    });
    return Response.json(
      { message: "Comment Added successfully :))" },
      {
        status: 201,
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

export async function GET(req) {
  try {
    await connectToDB();
    const comments = await commentModel.find({});
    return Response.json({ message: "All comments", comments });
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
