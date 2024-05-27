import { validateEmail, validatePhone } from "@/utils/auth";
import connectToDB from "base/configs/db";
import banModel from "base/models/Ban";

export async function POST(req) {
  try {
    connectToDB();
    const { email, phone } = req.json();

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
