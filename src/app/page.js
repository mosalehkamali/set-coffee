import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/banner";
import Latest from "@/components/templates/index/latest/latest";
import Promote from "@/components/templates/index/promote/Promote";
import { verifyToken } from "@/utils/auth";
import connectToDB from "base/configs/db";
import userModel from "base/models/User";
import { cookies } from "next/headers";

export default async function Home() {
  connectToDB();
  const token = cookies().get("token")?.value;
  let userData = null;
  if (token) {
    const payLoad = verifyToken(token);
    if (payLoad) {
      userData = await userModel.findOne({ name: payLoad.name });
    }
  }
  return (
    <>
      <Navbar isLogin={userData} />
      <Banner />
      <Latest />
      <Promote />
      <Articles />
      <Footer />
    </>
  );
}
