import { authUser } from "@/utils/serverHelpers";
import connectToDB from "base/configs/db";
import commentModel from "base/models/Comment";

export async function PUT(req) {
  try {
    await connectToDB();

    const { commentId } = await req.json();

    const applicant = await authUser();

    if (applicant) {
      if (applicant.role !== "ADMIN") {
        return Response.json(
          { message: "Only admin can perform this operation" },
          { status: 403 }
        );
      }
    } else {
      return Response.json({ message: "Please login first" }, { status: 401 });
    }

    const comment = await commentModel.findOneAndUpdate(
      { _id: commentId },
      { $set: { isAccept: true } }
    );

    return Response.json({ message: "comment accepted successfully " });
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
