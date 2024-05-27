import { tokenGenrator, validateEmail, validatePhone } from "@/utils/auth";
import { authUser } from "@/utils/serverHelpers";
import connectToDB from "base/configs/db";
import userModel from "base/models/User";

export async function POST(req) {
  try {
    await connectToDB();
    const { name, email, phone } = await req.json();
    const user = await authUser();
    if (!user) {
      return Response.json(
        { message: "Please login first" },
        {
          status: 401,
        }
      );
    }

    if (!name.trim() || !phone.trim() || !email.trim()) {
      return Response.json(
        { message: "Complete All Required Fields !!" },
        {
          status: 403,
        }
      );
    }

    if (!validatePhone(phone)) {
      return Response.json(
        { message: "Phone is not valid !!" },
        {
          status: 403,
        }
      );
    }

    if (!validateEmail(email)) {
      return Response.json(
        { message: "Email is not valid !!" },
        {
          status: 403,
        }
      );
    }

    const updateUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { name, email, phone } }
    );
    if (!updateUser) {
      return Response.json(
        { message: "Failed to Update !!" },
        {
          status: 500,
        }
      );
    }
    const token = tokenGenrator({ name });
    if (!token) {
      return Response.json(
        { message: "Failed to Update !!" },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      { message: "User Data Changed Successfully :))" },
      {
        status: 200,
        headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true` },
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

export async function DELETE(req) {
  try{
    await connectToDB()

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

    await userModel.findOneAndDelete({_id:userId})

    return Response.json(
      { message: "user removed successfully " },
      { status: 200 }
    );

  }catch (err) {
    console.log(err);
    return Response.json(
      { error: "UnKnown Internal Server Error !!!" },
      {
        status: 500,
      }
    );
  }
}