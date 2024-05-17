import Navbar from "@/components/modules/navbar/Navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/banner";
import Latest from "@/components/templates/index/latest/latest";
import Promote from "@/components/templates/index/promote/Promote";
export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Latest />
      <Promote />
      <Articles />
    </>
  );
}
