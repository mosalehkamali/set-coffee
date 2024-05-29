import connectToDB from "base/configs/db";
import discountModel from "base/models/Discount";

export async function POST(req) {
  try {
    connectToDB();
    const { code } = await req.json();
    const discount = await discountModel.findOne({ code });

    if (!discount) {
      return Response.json(
        { message: "This discount code does not exist !!!" },
        {
          status: 404,
        }
      );
    } else if (discount.uses === discount.maxUse) {
      return Response.json(
        { message: "This discount code does is expiered !!!" },
        {
          status: 410,
        }
      );
    }

    await discountModel.findOneAndUpdate(
      { code },
      {
        $set: { uses: discount.uses + 1 },
      }
    );

    return Response.json(
      { message: "Discount is available", percent: discount.percent },
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
