import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/useHeaders";
import productModel from "base/models/Product";

const product = async ({ params }) => {
  const user = await authUser();

  const productID = params.id;
  const product = JSON.parse(
    JSON.stringify(
      await productModel.findOne({ _id: productID }).populate("comments").lean()
    )
  );
  console.log(product);
  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details
            title={product.name}
            price={product.price}
            shortDescription={product.shortDescription}
            category={product.category}
            tag={product.tag}
            commentsLength={product.comments.length}
          />
          <Gallery />
        </div>
        <Tabs
          longDescription={product.longDescription}
          moreInfo={{ smell: product.smell, weight: product.weight }}
          comments={product.comments}
        />
        <MoreProducts />
      </div>
      <Footer />
    </div>
  );
};

export default product;
