import connectToDB from "base/configs/db";
import productModel from "base/models/Product";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    await connectToDB();
    const formData = await req.formData();

    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const name = formData.get("name");
    const price = formData.get("price");
    const weight = formData.get("weight");
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
    const category = formData.get("category");
    const tag = JSON.parse(formData.get("tag"));
    const img = formData.get("img");

    const filename = Date.now() + img.name;
    const imgPath = path.join(process.cwd(), "/public/uploads", filename);
    const buffer = Buffer.from(await img.arrayBuffer());
    await writeFile(imgPath, buffer);

    await productModel.create({
      name,
      shortDescription,
      longDescription,
      price,
      weight,
      suitableFor,
      smell,
      category,
      tag,
      image:`http://localhost:3000/uploads/${filename}`,
    });

    return Response.json(
      { message: "Product Added Successfully :))" },
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

export async function GET(req) {
  try {
    await connectToDB();
    const products = await productModel.find({}).populate("comments").lean();
    return Response.json({ message: "All Products", products });
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

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const img = formData.get("img");

    if (!img) {
      return Response.json(
        { message: "product doesn't have image " },
        {
          status: 400,
        }
      );
    }

    const filename = Date.now() + img.name;

    const buffer = Buffer.from(await img.arrayBuffer());

    await writeFile(
      path.join(process.cwd(), "/public/uploads", filename),
      buffer
    );

    return Response.json(
      { message: "file uploaded successfully " },
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
