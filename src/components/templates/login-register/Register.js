"use client";

import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";

function Register({ showloginForm }) {
  const [registerWithPass, setRegisterWithPass] = useState(false);

  const showPsswordInput = () => {
    setRegisterWithPass(!registerWithPass);
  };

  const [isShowSms, setIsShowSms] = useState(false);
  const showSmsForm = () => {
    setIsShowSms(!isShowSms);
  };

  return (
    <>
      {!isShowSms ? (
        <>
          <div className={styles.form}>
            <input className={styles.input} type="text" placeholder="نام" />
            <input
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
            />
            <input
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />
            {registerWithPass && (
              <input
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
              onClick={showPsswordInput}
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
        <Sms showSmsForm={showSmsForm}/>
      )}
    </>
  );
}

export default Register;
