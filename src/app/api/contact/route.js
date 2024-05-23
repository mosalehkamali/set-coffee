import { validateEmail, validatePhone } from "@/utils/auth";
import connectToDB from "base/configs/db";
import contactModel from "base/models/Contact";

export async function POST(req) {
  try {
    await connectToDB();
    const { email, name, company, phone, message } = await req.json();
    if (
      !email.trim() ||
      !name.trim() ||
      !phone.trim() ||
      !message.trim()
    ) {
      return Response.json(
        { message: "Invalid Data !!!" },
        {
          status: 401,
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

    const contactReq = await contactModel.create({
      email,
      name,
      company,
      phone,
      message,
    });
    if (!contactReq) {
      return Response.json(
        { error: "Server Error !!!" },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      { message: "Message Saved Successfully" },
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
