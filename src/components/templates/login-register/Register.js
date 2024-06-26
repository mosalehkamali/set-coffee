import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import { sweetalert } from "@/utils/helpers";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

function Register({ showloginForm }) {
  const router = useRouter();

  const [registerWithPass, setRegisterWithPass] = useState(false);
  const [isShowSms, setIsShowSms] = useState(false);

  const [name, SetName] = useState("");
  const [phone, SetPhone] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const showPsswordInput = () => {
    setRegisterWithPass(true);
  };

  const showSmsForm = () => {
    setIsShowSms(!isShowSms);
  };

  const signUp = async () => {
    if (!validatePhone(phone)) {
      return sweetalert(
        "لطفا شماره موبایل را به صورت صحیح وارد کنید",
        "error",
        "تلاش مجدد"
      );
    }
    if (!validatePassword(password)) {
      return sweetalert(
        "رمز باید بیشتر از هشت کاراکتر و شامل حروف بزرگ و عدد و علامت باشد",
        "error",
        "تلاش مجدد"
      );
    }
    const data = { name, phone, password };

    if (email) {
      if (!validateEmail(email)) {
        return sweetalert("ایمیل وارد شده معتبر نیست", "error", "تلاش مجدد");
      }
      data["email"] = email;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    });
    const response = await res.json();
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
      case 403:
        return sweetalert("اطلاعات وارد شده معتبر نیست", "error", "تلاش مجدد");
      case 422:
        return sweetalert(
          "کاربر با این اطلاعات قبلا ثبت نام کرده است",
          "error",
          "تلاش مجدد"
        );
      case 500:
        return sweetalert(response.message, "error", "تلاش مجدد");
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
      }).then(() => setIsShowSms(true));
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
      {!isShowSms ? (
        <>
          <div className={styles.form}>
            <input
              value={name}
              onChange={(e) => SetName(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="نام"
            />
            <input
              value={phone}
              onChange={(e) => SetPhone(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
            />
            <input
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />
            {registerWithPass && (
              <input
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
              />
            )}
            <p
              onClick={sendOtp}
              style={{ marginTop: "1rem" }}
              className={styles.btn}
            >
              ثبت نام با کد تایید
            </p>

            <button
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
              onClick={registerWithPass ? signUp : showPsswordInput}
            >
              ثبت نام با رمزعبور
            </button>
            <p className={styles.back_to_login} onClick={showloginForm}>
              برگشت به ورود
            </p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms showSmsForm={showSmsForm} phone={phone} />
      )}
    </>
  );
}

export default Register;
