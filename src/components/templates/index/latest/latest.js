import Link from "next/link";
import styles from "./latest.module.css";
import { FaChevronLeft } from "react-icons/fa6";
import Product from "@/components/modules/product/product";
import productModel from "base/models/Product"
const Latest = async () => {
  const products = JSON.parse(
    JSON.stringify(await productModel.find({}, "name price score"))
  );
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <div>
          <p>آخرین محصولات</p>
          <span>Latest products</span>
        </div>
        <Link className={styles.link} href={"/category"}>
          مشاهده همه <FaChevronLeft />{" "}
        </Link>
      </section>
      <main data-aos="fade-up" className={styles.products}>
        {products.map(product=><Product key={product._id} product={product}/>)}
       
      </main>
    </div>
  );
};

export default Latest;
