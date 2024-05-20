"use server";

const swal = require("sweetalert");
import userModel from "base/models/User";
import { cookies } from "next/headers";
import connectToDB from "base/configs/db";
import { verifyToken } from "./auth";

export const sweetalert = (title, icon, buttons) => {
  swal({ title, icon, buttons });
};

export const authUser = async () => {
  await connectToDB();
  const token = cookies().get("token")?.value;
  if (token) {
    const tokenPayLoad = verifyToken(token);
    if (tokenPayLoad) {
      return JSON.parse(
        JSON.stringify(await userModel.findOne({ name: tokenPayLoad.name }))
      );
    }
  } else {
    return false;
  }
};
