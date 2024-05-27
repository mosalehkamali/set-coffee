"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import { sweetalert } from "@/utils/helpers";
import swal from "sweetalert";
export default function DataTable({ tickets, title, userId }) {
  const router = useRouter();

  const showTicketBody = (body) => {
    sweetalert(body, undefined, "بستن");
  };
  const answerToticket = (ticketId, title, department, priority) => {
    swal({
      title: "لطفا پاسخ را وارد کنید.",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then(async (result) => {
      if (result === null) {
        return null;
      } else if (!result.trim()) {
        return sweetalert("فیلد پاسخ نمیتواند خالی باشد", "warning", "فهمیدم");
      }

      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          department,
          priority,
          body: result,
          user: userId,
          request: ticketId,
        }),
      });
      if (res.status === 201) {
        swal({
          title: "پاسخ با موفقیت ثبت شد",
          icon: "success",
          buttons: "فهمیدم",
        }).then(() => {
          router.refresh();
        });
      } else {
        sweetalert(
          `ثبت پاسخ با خطای ${res.status}مواجه شد `,
          "error",
          "فهمیدم"
        );
      }
    });
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
              <th>عنوان</th>
              <th>دپارتمان</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user.name}</td>
                <td>{ticket.title}</td>
                <td>{ticket.department.title}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showTicketBody(ticket.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      answerToticket(
                        ticket._id,
                        ticket.title,
                        ticket.department._id,
                        ticket.priority
                      )
                    }
                    className={styles.delete_btn}
                  >
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
