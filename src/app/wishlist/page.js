import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Product from "@/components/modules/product/product";
import styles from "@/styles/wishlist.module.css";
import { authUser } from "@/utils/useHeaders";
import connectToDB from "base/configs/db";
import productModel from "base/models/Product";
import wishlistModel from "base/models/Wishlist";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";

const wishlist = async () => {
  await connectToDB();
  const user = await authUser();
  if (!user) {
    redirect("/login-register");
  }
  const wishes = await wishlistModel
    .find({ user: user._id })
    .populate("product", "name price score")
    .lean();
  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Breadcrumb route={"علاقه مندی ها"} />
      <main className={styles.container} data-aos="fade-up">
        <p className={styles.title}>محصولات مورد علاقه شما</p>
          {wishes.length > 0 ? (
            <section>
              {wishes.map((wish) => (
                <Product key={wish._id} product={wish.product} />
              ))}
            </section>
          ) : (
            <div className={styles.wishlist_empty} data-aos="fade-up">
              <FaRegHeart />
              <p>محصولی یافت نشد</p>
              <span>
                شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.
              </span>
              <span>در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.</span>
              <div>
                <Link href="/category">بازگشت به فروشگاه</Link>
              </div>
            </div>
          )}
      </main>

      <Footer />
    </>
  );
};

export default wishlist;
