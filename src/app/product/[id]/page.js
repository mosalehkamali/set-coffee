import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/serverHelpers";
import productModel from "base/models/Product";

const product = async ({ params }) => {
  const user = await authUser();

  const productID = params.id;
  const product = JSON.parse(
    JSON.stringify(
      await productModel.findOne({ _id: productID }).populate("comments").lean()
    )
  );
  const comments = product.comments.filter((comment) => comment.isAccept);
  const allScores = comments.map((comment) => comment.score);
  const averageScore =
    allScores.length > 0
      ? Math.floor(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 0;
  if (comments.length > 0) {
    await productModel.findOneAndUpdate(
      { _id: productID },
      {
        score: averageScore,
      }
    );
  }

  const relatedProducts = JSON.parse(
    JSON.stringify(
      await productModel.find(
        {
          category: product.category,
        },
        "name price score"
      )
    )
  ).filter((item) => item._id !== productID);
  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details
            {...product}
            averageScore={averageScore}
          />
          <Gallery />
        </div>
        <Tabs
          longDescription={product.longDescription}
          moreInfo={{
            smell: product.smell,
            weight: product.weight,
            suitableFor: product.suitableFor,
          }}
          comments={comments}
          title={product.name}
          productID={productID}
        />
        <MoreProducts relatedProducts={relatedProducts} />
      </div>
      <Footer />
    </div>
  );
};

export default product;
