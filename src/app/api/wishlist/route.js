import connectToDB from "base/configs/db";
import userModel from "base/models/User";
import productModel from "base/models/Product";
import wishlistModel from "base/models/Wishlist";

export async function POST(req) {
  try {
    await connectToDB();
    const { user, product } = await req.json();
    const userData = await userModel.findOne({ _id: user });
    const productData = await productModel.findOne({ _id: product });
    if (!userData || !productData) {
      return Response.json(
        { message: "Invalid Data !!!" },
        {
          status: 409,
        }
      );
    }
    const wishlist = await wishlistModel.create({ user, product });

    if (!wishlist) {
      return Response.json(
        { message: "Failed to create wishlist !!!" },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      { message: "Product Added To Wishlist successfully" },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { message: "UnKnown Internal Server Error!!!" },
      {
        status: 500,
      }
    );
  }
}
