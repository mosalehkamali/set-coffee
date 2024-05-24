"use client";
import { sweetalert } from "@/utils/helpers";
import styles from "./product.module.css";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

const Card = ({ price, score, name, _id }) => {
  const router = useRouter();
  const removeProduct = () => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/wishlist", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: _id }),
        });
        if (res.status === 200) {
          sweetalert(
            "محصول از لیست علاقه مندی های شما حذف شد",
            "success",
            "فهمیدم"
          );
          router.refresh();
        } else {
          sweetalert(
            "حذف محصول از لیست علاقه مندی های شما با خطا مواجه شد",
            "error",
            "فهمیدم"
          );
        }
      }
    });
  };

  return (
    <div className={styles.card}>
      <Link href={"/product/123"}>
        <img
          width={283}
          height={283}
          src="https://set-coffee.com/wp-content/uploads/2022/03/ethiopia-430x430.png"
          alt=""
        />
      </Link>
      <p dir="rtl">{name}</p>
      <div>
        <span>{price.toLocaleString()} تومان</span>
        <div>
          {new Array(score).fill(0).map((item, index) => (
            <FaStar key={index} />
          ))}
          {new Array(5 - score).fill(0).map((item, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
      </div>
      <button onClick={() => removeProduct(null)} className={styles.delete_btn}>
        حذف محصول{" "}
      </button>
    </div>
  );
};

export default Card;
