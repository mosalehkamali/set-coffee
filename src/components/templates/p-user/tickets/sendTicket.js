"use client";

import React, { useState } from "react";
import styles from "@/styles/p-user/sendTicket.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";

function SendTicket({ departments }) {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState(1);
  const [body, setBody] = useState("");

  return (
    <>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>ارسال تیکت جدید</span>
          <Link href="/p-user/tickets"> همه تیکت ها</Link>
        </h1>

        <div className={styles.content}>
          <div className={styles.group}>
            <label>دپارتمان را انتخاب کنید:</label>
            <select>
              <option value={-1}>لطفا دپارتمان را انتخاب نمایید.</option>
              {departments.map((department) => (
                <option key={department?._id} value={department?._id}>
                  {department?.title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.group}>
            <label>عنوان تیکت را وارد کنید:</label>
            <input placeholder="عنوان..." type="text" />
          </div>
          <div className={styles.group}>
            <label>سطح اولویت تیکت را انتخاب کنید:</label>
            <select>
              <option>لطفا یک مورد را انتخاب نمایید.</option>
              <option value="3">کم</option>
              <option value="2">متوسط</option>
              <option value="1">بالا</option>
            </select>
          </div>
        </div>
        <div className={styles.group}>
          <label>محتوای تیکت را وارد نمایید:</label>
          <textarea rows={10}></textarea>
        </div>
        <div className={styles.uploader}>
          <span>حداکثر اندازه: 6 مگابایت</span>
          <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
          <input type="file" />
        </div>

        <button className={styles.btn}>
          <IoIosSend />
          ارسال تیکت
        </button>
      </main>
    </>
  );
}

export default SendTicket;
