"use client";

import { useRouter } from "next/navigation";
import swal from "sweetalert";
import styles from "./table.module.css";

export default function DataTable({ users, title }) {
  const router = useRouter();

  const changeRole = async (userId) => {

    const res = await fetch("/api/user/role", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    switch (res.status) {
      case 200:
        return swal({
          title: "نقش کاربر با موفقیت تغییر کرد",
          icon: "success",
          buttons: "فهمیدم",
        }).then(() => router.refresh());
      case 403:
        return swal({
          title: "فقط مدیر به این گزینه دسترسی دارد !!!",
          icon: "warning",
          buttons: "فهمیدم",
        });
      case 404:
        return swal({
          title: "کاربری با آیدی ارسال شده یافت نشد !!!",
          icon: "warning",
          buttons: "فهمیدم",
        });
      case 500:
        return swal({
          title: "خطای سرور : تغییر نقش ناموفق بود !!!",
          icon: "error",
          buttons: "فهمیدم",
        });
    }
  };

  const deleteUser = async (userId) => {

    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    switch (res.status) {
      case 200:
        return swal({
          title: "حذف کاربر با موفقیت انجام شد",
          icon: "success",
          buttons: "فهمیدم",
        }).then(() => router.refresh());
      case 403:
        return swal({
          title: "فقط مدیر به این گزینه دسترسی دارد !!!",
          icon: "warning",
          buttons: "فهمیدم",
        });
      case 404:
        return swal({
          title: "کاربری با آیدی ارسال شده یافت نشد !!!",
          icon: "warning",
          buttons: "فهمیدم",
        });
      case 500:
        return swal({
          title: "خطای سرور : حذف کاربر ناموفق بود !!!",
          icon: "error",
          buttons: "فهمیدم",
        });
    }
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
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => changeRole(user._id)}
                    className={styles.edit_btn}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button type="button" onClick={()=>deleteUser(user._id)} className={styles.delete_btn}>
                    حذف
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
