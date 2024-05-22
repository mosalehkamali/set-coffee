import { FaFacebookF, FaRegStar, FaStar, FaTwitter } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";

const Details = ({
  title,
  price,
  shortDescription,
  category,
  tag,
  commentsLength,
  averageScore,
}) => {
  return (
    <main style={{ width: "63%" }}>
      <Breadcrumb title={title} />
      <h2>{title}</h2>

      <div className={styles.rating}>
        <div>
          {[...Array(averageScore)].map((star,index) => (
            <FaStar key={index}/>
          ))}
          {[...Array(5 - averageScore)].map((disStar,index) => (
            <FaRegStar key={index}  />
          ))}
        </div>
        <p>(دیدگاه {commentsLength} کاربر)</p>
      </div>
      <p className={styles.price}>{price.toLocaleString()}</p>
      <span className={styles.description}>{shortDescription}</span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>

      <div className={styles.cart}>
        <button>افزودن به سبد خرید</button>
        <div>
          <span>-</span>1<span>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
        <div>
          <CiHeart />
          <a href="/">افزودن به علاقه مندی ها</a>
        </div>
        <div>
          <TbSwitch3 />
          <a href="/">مقایسه</a>
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول: {title}</strong>
        <p>
          {" "}
          <strong>دسته:</strong>
          {category}
        </p>
        <p>
          <strong>برچسب:</strong> {tag.join(", ")}
        </p>
      </div>

      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <a href="/">
          <FaTelegram />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
        <a href="/">
          <FaPinterest />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaFacebookF />
        </a>
      </div>

      <hr />
    </main>
  );
};

export default Details;
