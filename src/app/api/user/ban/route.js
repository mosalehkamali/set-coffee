import { validateEmail, validatePhone } from "@/utils/auth";
import { authUser } from "@/utils/serverHelpers";
import connectToDB from "base/configs/db";
import banModel from "base/models/Ban";
import userModel from "base/models/User";

export async function POST(req) {
  try {
    connectToDB();
    const { email, phone } = req.json();

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

    if (phone && !validatePhone(phone)) {
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

    await banModel.create({ email, phone });
    await userModel.findOneAndDelete({ _id: userId });

    return Response.json(
      { message: "User Banned Successfully !!" },
      {
        status: 200,
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
