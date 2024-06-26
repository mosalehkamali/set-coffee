"use client";

import React, { useState } from "react";
import styles from "@/styles/p-user/sendTicket.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import { sweetalert } from "@/utils/helpers";
import swal from "sweetalert";

function SendTicket({ departments }) {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState(-1);
  const [priority, setPriority] = useState(1);
  const [body, setBody] = useState("");

  const sendTicket = async () => {
    const ticket = { title, department, priority, body };

    if (!title.trim() || !body.trim() || department === -1) {
      sweetalert("لطفا فیلد های ضروری را وارد کنید", "warning", "تلاش مجدد");
    }

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "applcation/json",
      },
      body: JSON.stringify(ticket),
    });
    if (res.status === 201) {
      swal({
        title: "تیکت شما با موفقیت ثبت شد",
        icon: "success",
        buttons: "مشاهده تیکت ها",
      }).then((result) => {
        location.replace("/p-user/tickets");
      });
    } else if (res.status === 422) {
      sweetalert(
        "لطفا فیلد های ضروری را به صورت صحیح وارد کنید",
        "warning",
        "تلاش مجدد"
      );
    }
  };

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
            <select onChange={(e) => setDepartment(e.target.value)}>
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
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان..."
              type="text"
            />
          </div>
          <div className={styles.group}>
            <label>سطح اولویت تیکت را انتخاب کنید:</label>
            <select onChange={(e) => setPriority(e.target.value)}>
              <option>لطفا یک مورد را انتخاب نمایید.</option>
              <option value={3}>کم</option>
              <option value={2}>متوسط</option>
              <option value={1}>بالا</option>
            </select>
          </div>
        </div>
        <div className={styles.group}>
          <label>محتوای تیکت را وارد نمایید:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
          ></textarea>
        </div>
        <div className={styles.uploader}>
          <span>حداکثر اندازه: 6 مگابایت</span>
          <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
          <input type="file" />
        </div>

        <button onClick={sendTicket} className={styles.btn}>
          <IoIosSend />
          ارسال تیکت
        </button>
      </main>
    </>
  );
}

export default SendTicket;
