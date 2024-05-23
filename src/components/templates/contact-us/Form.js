"use client";
import { useState } from "react";
import styles from "./form.module.css";
import { sweetalert } from "@/utils/helpers";
import { validateEmail, validatePhone } from "@/utils/auth";

const Form = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const createContact = async (event) => {
    event.preventDefault();

    if (!email.trim() || !name.trim() || !phone.trim() || !message.trim()) {
      return sweetalert("لطفا همه فیلد های اجباری را پر کنید", "error", "باشه");
    }

    if (!validatePhone(phone)) {
      return sweetalert(
        "شماره تماس وارد شده معتبر نیست !!",
        "error",
        "تلاش مجدد"
      );
    }

    if (!validateEmail(email)) {
      return sweetalert(" ایمیل وارد شده معتبر نیست !!", "error", "تلاش مجدد");
    }

    const data = { email, name, phone, message };
    if (company.trim()) {
      data["company"] = company;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 201) {
      setEmail("");
      setName("");
      setCompany("");
      setPhone("");
      setMessage("");
      return sweetalert("درخواست شما با موفقیت ارسال شد ", "success", "باشه");
    } else if (res.status === 401) {
      return sweetalert("لطفا همه فیلد های اجباری را پر کنید", "error", "باشه");
    } else if (res.status === 403) {
      return sweetalert(
        "شماره تماس یا ایمیل وارد شده معتبر نیست !!",
        "error",
        "تلاش مجدد"
      );
    }
  };

  return (
    <form className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>*نام و نام خانوادگی</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.group}>
          <label>*آدرس ایمیل</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>*شماره تماس</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.group}>
          <label>(دلخواه) نام شرکت</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className={styles.group}>
        <label>*درخواست شما</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="3"
        ></textarea>
      </div>
      <button onClick={createContact}>ارسال</button>
    </form>
  );
};

export default Form;
