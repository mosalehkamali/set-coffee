"use client";

import { FaFacebookF, FaRegStar, FaStar, FaTwitter } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";
import AddToWishlist from "@/components/modules/product/AddToWishlist";
import { useState } from "react";
import { sweetalert } from "@/utils/helpers";

const Details = ({
  name,
  price,
  shortDescription,
  category,
  tag,
  comments,
  _id,
  averageScore,
}) => {
  const [count, setCount] = useState(1);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length) {
      const isInCart = cart.some((item) => item.id === _id);

      if (isInCart) {
        cart.forEach((item) => {
          if (item.id === _id) {
            item.count = item.count + count;
          }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        sweetalert(
          "محصول با موفقیت به سبد خرید شما اضافه شد",
          "success",
          "فهمیدم"
        );
      } else {
        const cartItem = {
          id: _id,
          name,
          price,
          count,
        };

        cart.push(cartItem);

        localStorage.setItem("cart", JSON.stringify(cart));

        sweetalert(
          "محصول با موفقیت به سبد خرید شما اضافه شد",
          "success",
          "فهمیدم"
        );
      }
    } else {
      const cartItem = {
        id: _id,
        name,
        price,
        count,
      };

      cart.push(cartItem);

      localStorage.setItem("cart", JSON.stringify(cart));

      sweetalert(
        "محصول با موفقیت به سبد خرید شما اضافه شد",
        "success",
        "فهمیدم"
      );
    }
  };

  return (
    <main style={{ width: "63%" }}>
      <Breadcrumb title={name} />
      <h2>{name}</h2>

      <div className={styles.rating}>
        <div>
          {[...Array(averageScore)].map((star, index) => (
            <FaStar key={index} />
          ))}
          {[...Array(5 - averageScore)].map((disStar, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
        <p>(دیدگاه {comments.length} کاربر)</p>
      </div>
      <p className={styles.price}>{price.toLocaleString()}</p>
      <span className={styles.description}>{shortDescription}</span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>

      <div className={styles.cart}>
        <button onClick={addToCart}>افزودن به سبد خرید</button>
        <div>
          <span onClick={() => setCount(count - 1)}>-</span>
          {count}
          <span onClick={() => setCount(count + 1)}>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
        <div>
          <label>افزودن به علاقه مندی ها</label>
          <AddToWishlist productId={_id} />
        </div>
        <div>
          <TbSwitch3 />
          <a href="/">مقایسه</a>
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول: {name}</strong>
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
