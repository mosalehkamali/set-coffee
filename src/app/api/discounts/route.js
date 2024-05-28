import { authUser } from "@/utils/serverHelpers";
import connectToDB from "base/configs/db";
import discountModel from "base/models/Discount";

export async function POST(req) {
  try {
    connectToDB();
    const { code, percent, maxUse, uses } = await req.json();

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
    if (!code.trim() || !percent || !maxUse || !uses) {
      return Response.json(
        { message: "Data is not valid !!" },
        {
          status: 403,
        }
      );
    }
    const discount = await discountModel.create({
      code,
      percent,
      maxUse,
    });

    if (!discount) {
      return Response.json(
        { message: "Failed to create discount code !!" },
        {
          status: 501,
        }
      );
    }

    return Response.json(
        { message: "Discount code created successfully" },
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
