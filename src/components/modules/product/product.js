import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";

function Product({product}) {
    return (
        <div className={styles.card}>
          <div className={styles.details_container}>
            <img
              src="/images/cardProduct.png"
              alt=""
            />
            <div className={styles.icons}>
              <Link href="/">
                <CiSearch />
                <p className={styles.tooltip}>مشاهده سریع</p>
              </Link>
              <div>
                <CiHeart />
                <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
              </div>
            </div>
            <button>افزودن به سبد خرید</button>
          </div>
    
          <div className={styles.details}>
            <Link href={`/product/${product._id}`}>
              {product.name}
            </Link>
            <div>
            {[...Array(product.score)].map((star,index) => (
            <FaStar key={index}/>
          ))}
          {[...Array(5 - product.score)].map((disStar,index) => (
            <FaRegStar key={index}  />
          ))}
            </div>
            <span>{product.price.toLocaleString()} تومان</span>
          </div>
        </div>
      );
}

export default Product
