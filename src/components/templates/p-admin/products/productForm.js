"use client";

import React, { useState } from "react";
import styles from "./productForm.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

function ProductForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [smell, setSmell] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [img, setImg] = useState("");

  const addProduct = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("price", price);
    formData.append("weight", weight);
    formData.append("suitableFor", suitableFor);
    formData.append("smell", smell);
    formData.append("category", category);
    formData.append("tag", tag.split(","));
    formData.append("img", img);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });
    if (res.status === 201) {
      swal({
        title: "محصول با موفقیت ایجاد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => router.refresh());
    }
  };

  return (
    <>
      <section className={styles.discount}>
        <p>افزودن محصول جدید </p>
        <div className={styles.discount_main}>
          <div>
            <label>نام محصول</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>مبلغ محصول</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>توضیحات کوتاه</label>
            <input
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>توضیحات بلند</label>
            <input
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>وزن</label>
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>مناسب برای :</label>
            <input
              value={suitableFor}
              onChange={(e) => setSuitableFor(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>میزان بو</label>
            <input
              value={smell}
              onChange={(e) => setSmell(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>تگ های محصول</label>
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>دسته</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>تصویر محصول</label>
            <input
              onChange={(e) => setImg(e.target.files[0])}
              type="file"
            />
          </div>
        </div>
        <button onClick={addProduct}>افزودن</button>
      </section>
    </>
  );
}

export default ProductForm;
