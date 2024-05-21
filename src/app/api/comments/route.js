import connectToDB from "base/configs/db";
import commentModel from "base/models/Comment";

export async function POST(req) {
  try {
    await connectToDB();
    const reqBody = await req.json();
    const { username, body, email, score, product } = reqBody;


    const comment = await commentModel.create({
      username,
      body,
      email,
      score,
      product,
    });
    return Response.json({message: "Comment Added successfully :))"},{
        status:201,
    })


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