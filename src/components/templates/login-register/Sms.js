import { useState } from "react";
import styles from "./sms.module.css";
import { sweetalert } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { validatePhone } from "@/utils/auth";

const Sms = ({ showSmsForm, phone }) => {
  const router = useRouter();
  const [code, setCode] = useState("");

  const verifyCode = async () => {
    if (!code.trim()) {
      return sweetalert("کد را وارد کنید", "warning", "باشه");
    }

    const res = await fetch("/api/auth/sms/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, code }),
    });

    switch (res.status) {
      case 201:
        swal({
          title: "ثبت نام با موفقیت انجام شد",
          icon: "success",
          buttons: "ورود به پنل کاربری",
        }).then(() => {
          router.replace("/p-user");
        });
        break;
      case 200:
        swal({
          title: "با موفقیت وارد شدید",
          icon: "success",
          buttons: "ورود به پنل کاربری",
        }).then(() => {
          router.replace("/p-user");
        });
        break;
      case 409:
        return sweetalert("کد وارد شده اشتباه است", "error", "تلاش مجدد");
      case 403:
        return sweetalert("شماره وارد شده معتبر نیست", "error", "تلاش مجدد");
      case 410:
        const response = await res.json();
        sweetalert(
          `شما بیش از سه بار کد اشتباه وارد کردید.
            ${response.remainingTime} دقیقه دیگر دوباره امتحان کنید`,
          "error",
          "فهمیدم"
        );
        break;
      case 422:
        return sweetalert("کد وارد شده منقضی شده است", "warning", "فهمیدم");
    }
  };

  const sendOtp = async () => {
    if (!validatePhone(phone)) {
      return sweetalert(
        "لطفا شماره موبایل را به صورت صحیح وارد کنید",
        "error",
        "تلاش مجدد"
      );
    }
    const res = await fetch("/api/auth/sms/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    if (res.status === 201) {
      swal({
        title: "کد به شماره وارد شده ارسال شد",
        icon: "success",
        buttons: "باشه",
      })
    } else if (res.status === 410) {
      const response = await res.json();
      sweetalert(
        `شما بیش از سه بار کد اشتباه وارد کردید.  ${response.remainingTime} دقیقه دیگر دوباره امتحان کنید`,
        "error",
        "فهمیدم"
      );
    }
  };
  return (
    <>
      <div className={styles.form}>
        <p>کد تایید</p>
        <span className={styles.code_title}>
          لطفاً کد تأیید ارسال شده را تایپ کنید
        </span>
        <span className={styles.number}>{phone}</span>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.input}
          type="text"
        />
        <button
          onClick={verifyCode}
          style={{ marginTop: "1rem" }}
          className={styles.btn}
        >
          ثبت کد تایید
        </button>
        <p className={styles.send_again_code} onClick={sendOtp}>
          ارسال مجدد کد یکبار مصرف
        </p>
      </div>
      <p onClick={showSmsForm} className={styles.redirect_to_home}>
        لغو
      </p>
    </>
  );
};

export default Sms;
