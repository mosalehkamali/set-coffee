import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import swal from "sweetalert";

function Register({ showloginForm }) {
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
    const data = { name, phone, password };

    if (email.trim()) {
      data["email"] = email;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    });
    const response = await res.json();
    if (res.status === 201) {
      swal({
        title: "ثبت نام با موفقیت انجام شد",
        icon: "success",
        buttons: "ورود به پنل کاربری",
      });
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
              onClick={showSmsForm}
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
        <Sms showSmsForm={showSmsForm} />
      )}
    </>
  );
}

export default Register;
