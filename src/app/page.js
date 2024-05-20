import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/banner";
import Latest from "@/components/templates/index/latest/latest";
import Promote from "@/components/templates/index/promote/Promote";
import { authUser } from "@/utils/helpers";

export default async function Home() {
  const userData = await authUser()
  console.log(userData);
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
