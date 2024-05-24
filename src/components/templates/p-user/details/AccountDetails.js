"use client";
import React, { useEffect } from "react";
import styles from "@/styles/p-user/accountDetails.module.css";
import swal from "sweetalert";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import { sweetalert } from "@/utils/helpers";
import { validateEmail, validatePhone } from "@/utils/auth";

function AccountDetails({ user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const updateUser = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      return sweetalert(
        "لطفا همه قسمت ها را پر کنید کنید",
        "error",
        "تلاش مجدد"
      );
    }

    if (!validatePhone(phone)) {
      return sweetalert(
        "لطفا شماره موبایل را به صورت صحیح وارد کنید",
        "error",
        "تلاش مجدد"
      );
    }

    if (email) {
      if (!validateEmail(email)) {
        return sweetalert("ایمیل وارد شده معتبر نیست", "error", "تلاش مجدد");
      }
    }
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "applicatio/json" },
      body: JSON.stringify({ name, email, phone }),
    });
    switch (res.status) {
      case 200:
        return sweetalert(
          "اطلاعات حساب شما تغییر کرد",
          "success",
          "فهمیدم"
        );
      case 403:
        return sweetalert("اطلاعات وارد شده معتبر نیست", "error", "تلاش مجدد");
      case 500:
        return sweetalert("ثبت تغییرات با خطا مواجه شد", "error", "تلاش مجدد");
    }
  };

  return (
    <main>
      <div className={styles.details}>
        <h1 className={styles.title}>
          <span> جزئیات اکانت</span>
        </h1>
        <div className={styles.details_main}>
          <section>
            <div>
              <label>نام کاربری</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="لطفا نام کاربری خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>ایمیل</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="لطفا ایمیل خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>شماره تماس</label>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="لطفا شماره تماس خود را وارد کنید"
                type="number"
              />
            </div>
          </section>
          <section>
            <div className={styles.uploader}>
              <img src="/images/shahin.jpg" alt="" />
              <div>
                <div>
                  <button>
                    <IoCloudUploadOutline />
                    تغییر
                  </button>
                  <input type="file" name="" id="" />
                </div>
                <button>
                  <MdOutlineDelete />
                  حذف
                </button>
              </div>
            </div>
            <div>
              <label>رمز عبور</label>
              <div className={styles.password_group}>
                <input type="password" />
                <button>تغییر رمز عبور</button>
              </div>
            </div>
          </section>
        </div>
        <button
          type="submit"
          onClick={updateUser}
          className={styles.submit_btn}
        >
          ثبت تغییرات
        </button>
      </div>
    </main>
  );
}

export default AccountDetails;
