"use client";

import React, { useState } from "react";
import styles from "./table.module.css";
import { sweetalert } from "@/utils/helpers";
import { useRouter } from "next/navigation";

function DiscountForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [maxUse, setMaxUse] = useState("");

  const craeteDiscount = async () => {
    const discount = { code, percent: +percent, maxUse: +maxUse };

    if (!percent.trim() || !maxUse.trim() || !code.trim()) {
      return sweetalert(
        "لطفا همه فیلد های خواسته شده را پر کنید",
        "warning",
        "تلاش مجدد"
      );
    }
    if (!discount.percent || !discount.maxUse) {
      return sweetalert(
        "لطفا درصد تخفیف و حداکثر استفاده را به صورت عددی وارد کنید",
        "warning",
        "تلاش مجدد"
      );
    }

    const res = await fetch("/api/discounts", {
      method: "POST",
      headers: { "Content-Type": "application/jaon" },
      body: JSON.stringify(discount),
    });
    switch (res.status) {
      case 201:
        return swal({
          title: "ثبت کد تخفیف با موفقیت انجام شد",
          icon: "success",
          buttons: "فهمیدم",
        }).then(() => router.refresh());
      case 403:
        return swal({
          title: "فقط مدیر به این گزینه دسترسی دارد !!!",
          icon: "warning",
          buttons: "فهمیدم",
        });
      case 500:
        return swal({
          title: "خطای سرور : ثبت کد تخفیف ناموفق بود !!!",
          icon: "error",
          buttons: "فهمیدم",
        });
    }
  };

  return (
    <>
      <section className={styles.discount}>
        <p>افزودن کد تخفیف جدید</p>
        <div className={styles.discount_main}>
          <div>
            <label>شناسه تخفیف</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="لطفا شناسه تخفیف را وارد کنید"
              type="text"
            />
          </div>
          <div>
            <label>درصد تخفیف</label>
            <input
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              placeholder="لطفا درصد تخفیف را وارد کنید"
              type="text"
            />
          </div>
          <div>
            <label>حداکثر استفاده</label>
            <input
              value={maxUse}
              onChange={(e) => setMaxUse(e.target.value)}
              placeholder="حداکثر استفاده از کد تخفیف"
              type="text"
            />
          </div>
        </div>
        <button onClick={craeteDiscount}>افزودن</button>
      </section>
    </>
  );
}

export default DiscountForm;
