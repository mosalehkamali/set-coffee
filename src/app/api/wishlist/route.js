import connectToDB from "base/configs/db";
import userModel from "base/models/User";
import productModel from "base/models/Product";
import wishlistModel from "base/models/Wishlist";
import { authUser } from "@/utils/serverHelpers";

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

    const isWishExist = await wishlistModel.findOne({ user, product });
    if (isWishExist) {
      return Response.json(
        { message: "This product is already in your wishlist !!!" },
        {
          status: 422,
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

export async function DELETE(req) {
  try {
    await connectToDB();
    const { productId } = await req.json();
    const user = await authUser();
    const userId = user._id;
    await wishlistModel.findOneAndDelete({ user: userId, product: productId });
    return Response.json(
      { message: "Product removed from your wishlist successfully " },
      {
        status: 200,
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
