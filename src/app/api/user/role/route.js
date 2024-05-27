import { authUser } from "@/utils/serverHelpers";
import connectToDB from "base/configs/db";
import userModel from "base/models/User";

export async function PUT(req) {
  try {
    await connectToDB();

    const applicant = await authUser();
    const { userId } = await req.json();

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

    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return Response.json(
        { message: "user with this Id does not exist" },
        { status: 404 }
      );
    }

    await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { role: user.role === "USER" ? "ADMIN" : "USER" } }
    );

    return Response.json(
      { message: "user role changed successfully " },
      { status: 200 }
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
