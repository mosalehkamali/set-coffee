"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import { sweetalert } from "@/utils/helpers";
import swal from "sweetalert";
export default function DataTable({ comments, title }) {
  const router = useRouter();

  const showCommentBody = (body) => {
    sweetalert(body, undefined, "خوندم");
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>ایمیل</th>
              <th>امتیاز</th>
              <th>محصول</th>
              <th>تاریخ ثبت</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>رد/تایید</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment._id}>
                <td
                  style={{
                    backgroundColor: comment.isAccept ? "green" : "#711D1C",
                    color: "#fff",
                  }}
                >
                  {index + 1}
                </td>
                <td>{comment.user.name}</td>
                <td>{comment.email}</td>
                <td>{comment.score}</td>
                <td>{comment.product.name}</td>
                <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showCommentBody(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    حذف
                  </button>
                </td>
                <td>
                  {comment.isAccept ? (
                    <button type="button" className={styles.delete_btn}>
                      رد
                    </button>
                  ) : (
                    <button type="button" className={styles.delete_btn}>
                      تایید
                    </button>
                  )}
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    پاسخ
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
