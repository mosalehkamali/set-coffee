import { validateEmail } from "@/utils/auth";
import connectToDB from "base/configs/db";
import commentModel from "base/models/Comment";

export async function POST(req) {
  try {
    await connectToDB();
    const reqBody = await req.json();
    const { username, body, email, score, product } = reqBody;

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
