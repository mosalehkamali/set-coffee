import connectToDB from "base/configs/db";
import productModel from "base/models/Product";

export async function POST(req) {
  try {
    await connectToDB();
    const reqBody = await req.json();
    const {
      name,
      shortDescription,
      longDescription,
      price,
      weight,
      suitableFor,
      smell,
      category,
      tag,
    } = reqBody;

    const product = await productModel.create({
      name,
      shortDescription,
      longDescription,
      price,
      weight,
      suitableFor,
      smell,
      category,
      tag,
    });

    return Response.json(
      { message: "Product Added Successfully :))", product },
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

