import { authUser } from "@/utils/serverHelpers";
import connectToDB from "base/configs/db";
import departmentModel from "base/models/Department";

export async function POST(req) {
  try {
    await connectToDB();

    const user = await authUser();

    if (user.role !== "ADMIN") {
      return Response.json(
        { message: "Only admins are able to build department !!!" },
        {
          status: 401,
        }
      );
    }

    const { title } = await req.json();

    if (!title.trim()) {
      return Response.json(
        { message: "Send All Propertys !!!" },
        {
          status: 422,
        }
      );
    }

    await departmentModel.create({ title });
    
    return Response.json(
      { message: "Department created successfully " },
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
