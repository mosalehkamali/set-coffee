import Navbar from "@/components/modules/navbar/Navbar";
import Banner from "@/components/templates/index/banner/banner";
import Latest from "@/components/templates/index/latest/latest";
export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Latest />
    </>
  );
}
