import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { sweetalert } from "@/utils/helpers";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";

function Login({ showRegisterForm }) {
  const [isShowSms, setIsShowSms] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const showSmsForm = () => {
    setIsShowSms(!isShowSms);
  };

  const signInWithPassword = async () => {
    if (!identifier.trim()) {
      return sweetalert(
        "لطفا ایمیل یا شماره تماس را وارد کنید",
        "error",
        "تلاش مجدد"
      );
    }

    if (!password.trim()) {
      return sweetalert(
        "لطفا رمز را وارد کنید",
        "error",
        "تلاش مجدد"
      );
    }

    if (!validatePhone(identifier) && !validateEmail(identifier)) {
      return sweetalert(
        "لطفا شماره موبایل یا ایمیل را به صورت صحیح وارد کنید",
        "error",
        "تلاش مجدد"
      );
    }
    if (!validatePassword(password)) {
      return sweetalert("رمز وارد شده معتبر نیست", "error", "تلاش مجدد");
    }

    const data = { identifier, password };
    const res = await fetch("api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    switch (res.status) {
      case 200:
        return sweetalert(
          "با موفقیت وارد شدید",
          "success",
          "ورود به پنل کاربری"
        );
      case 403:
        return sweetalert("اطلاعات وارد شده معتبر نیست", "error", "تلاش مجدد");
      case 419:
        return sweetalert(
          "کاربری با این مشخصات وجود ندارد",
          "error",
          "تلاش مجدد"
        );
      case 401:
        return sweetalert(
          "ایمیل ، شماره تلفن یا رمز اشتباه است",
          "error",
          "تلاش مجدد"
        );
      case 500:
        return sweetalert("خطای سرور !!!", "error", "تلاش مجدد");
    }
  };

  return (
    <>
      {!isShowSms ? (
        <>
          <div className={styles.form}>
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="ایمیل/شماره موبایل"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              type="password"
              placeholder="رمز عبور"
            />
            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button onClick={signInWithPassword} className={styles.btn}>
              ورود
            </button>
            <Link
              href={"/login-register/forget-password"}
              className={styles.forgot_pass}
            >
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button className={styles.btn} onClick={showSmsForm}>
              ورود با کد یکبار مصرف
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button className={styles.btn_light} onClick={showRegisterForm}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <Sms showSmsForm={showSmsForm} />
      )}
    </>
  );
}

export default Login;
