import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { sweetalert } from "@/utils/helpers";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

function Login({ showRegisterForm }) {
  const router = useRouter();
  const [isShowSms, setIsShowSms] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const showSmsForm = () => {
    if (!validatePhone(identifier)) {
      return sweetalert(
        "لطفا شماره موبایل را به صورت صحیح وارد کنید",
        "error",
        "تلاش مجدد"
      );
    }
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
      return sweetalert("لطفا رمز را وارد کنید", "error", "تلاش مجدد");
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
    switch (res.status) {
      case 200:
        swal({
          title: "با موفقیت وارد شدید",
          icon: "success",
          buttons: "ورود به پنل کاربری",
        }).then(() => {
          router.replace("/p-user");
        });
        break;
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

  const sendOtp = async () => {
    if (!validatePhone(identifier)) {
      return sweetalert(
        "لطفا شماره موبایل را به صورت صحیح وارد کنید",
        "error",
        "تلاش مجدد"
      );
    }
    const res = await fetch("/api/auth/sms/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: identifier }),
    });
    if (res.status === 201) {
      swal({
        title: "کد به شماره وارد شده ارسال شد",
        icon: "success",
        buttons: "باشه",
      }).then(() => setIsShowSms(true));
    } else if (res.status === 410) {
      sweetalert("بیش از سه بار کد اشتباه وارد کردید", "error", "فهمیدم");
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
            <button className={styles.btn} onClick={sendOtp}>
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
        <Sms showSmsForm={showSmsForm} phone={identifier} />
      )}
    </>
  );
}

export default Login;
