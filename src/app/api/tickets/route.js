import { authUser } from "@/utils/serverHelpers";
import connectToDB from "base/configs/db";
import departmentModel from "base/models/Department";
import ticketModel from "base/models/Ticket";

export async function POST(req) {
  try {
    await connectToDB();
    const { title, body, department, priority, request } = await req.json();

    const user = await authUser();
    if (!user) {
      return Response.json(
        { message: "Please login first" },
        {
          status: 401,
        }
      );
    }

    if (!title.trim() || !body.trim() || !department.trim()) {
      return Response.json(
        { message: "Send All Propertys !!!" },
        {
          status: 422,
        }
      );
    }

    const departmentData = await departmentModel.findOne({ _id: department });
    if (!departmentData) {
      return Response.json(
        { message: "Departmant Does Not Exist !!!" },
        {
          status: 422,
        }
      );
    }

    if ((priority && priority > 3) || priority < 1) {
      return Response.json(
        { message: "Invalide priority" },
        {
          status: 422,
        }
      );
    }

    const ticket = await ticketModel.create({
      title,
      department,
      priority,
      body,
      user: user._id,
      request: user.role === "ADMIN" && request,
    });

    if (!ticket) {
      return Response.json(
        { message: "Failed to create ticket !!!" },
        {
          status: 501,
        }
      );
    }
    return Response.json(
      { message: "Ticket created successfully " },
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
