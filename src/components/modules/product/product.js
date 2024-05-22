import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import AddToWishlist from "./AddToWishlist";

export default function Product({product}) {
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
            <AddToWishlist productId={product._id} />
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


