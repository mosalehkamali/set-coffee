"use client";

import React from "react";
import { CiHeart } from "react-icons/ci";
import styles from "./product.module.css";
import { authUser } from "@/utils/serverHelpers";
import { useRouter } from "next/navigation";
import { sweetalert } from "@/utils/helpers";

function AddToWishlist({ productId }) {
  const router = useRouter();

  const getUserId = async () => {
    "use Server";

    const user = JSON.parse(JSON.stringify(await authUser()));
    if (!user) {
      return router.replace("/login-register");
    }
    return user._id;
  };

  const addToWishlist = async () => {
    const userId = await getUserId();

    const res = await fetch(`/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userId, product: productId }),
    });
    if (res.status === 201) {
      return sweetalert(
        "محصول با موفقیت به لیست علاقه مندی شما اضافه شد ",
        "success",
        "باشه"
      );
    } else if (res.status === 422) {
      return sweetalert(
        "این محصول از قبل در لیست علاقه مندی های شما وجود دارد",
        "error",
        "فهمیدم"
      );
    } else {
      return sweetalert("لیست علاقه مندی ها با خطا مواجه شد", "error", "باشه");
    }
  };
  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={addToWishlist}>
        <CiHeart />
        <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
      </div>
    </>
  );
}

export default AddToWishlist;
