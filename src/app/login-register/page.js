"use client";
import styles from "@/styles/login-register.module.css";
import { useState } from "react";
import { authTypes } from "@/utils/constants";

import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";
import Sms from "@/components/templates/login-register/Sms";

const login_register = () => {
  const [authType, setAuthType] = useState(authTypes.LOGIN);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showloginForm = () => setAuthType(authTypes.LOGIN);
  const showSmsForm = () => setAuthType(authTypes.SMS);

  const contentForm = () => {
    switch (authType) {
      case authTypes.LOGIN:
        return (
          <Login
            showRegisterForm={showRegisterForm}
            showSmsForm={showSmsForm}
          />
        );
      case authTypes.REGISTER:
        return (
          <Register showloginForm={showloginForm} showSmsForm={showSmsForm} />
        );
      case authTypes.SMS:
       return <Sms />;
    }
  };

  return (
    <div className={styles.login_register}>
      <div className={styles.form_bg} data-aos="fade-up">
        {/* {authType === authTypes.LOGIN ? (
          <Login showRegisterForm={showRegisterForm} showSmsForm={showSmsForm}/>
        ) : (
          <Register showloginForm={showloginForm} showSmsForm={showSmsForm}/>
        )} */}
        {contentForm()}
      </div>
      <section>
        <img
          src="https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg"
          alt=""
        />
      </section>
    </div>
  );
};

export default login_register;
