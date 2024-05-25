import Link from "next/link";
import styles from "./ticket.module.css";
import { useEffect, useState } from "react";

const Ticket = ({ _id, title, createdAt, department, hasAnswer, priority }) => {
  const [priorityLevel, setPriorityLevel] = useState("");
  useEffect(() => {
    switch (priority) {
      case 1:
        setPriorityLevel("زیاد");
        break;
      case 2:
        setPriorityLevel("متوسط");
        break;
      case 3:
        setPriorityLevel("کم");
        break;
    }
  }, []);

  return (
    <Link href={`/p-user/tickets/answer/${_id}`} className={styles.ticket}>
      <div>
        <p>{title}</p>
        <p className={styles.department}>دپارتمنت : {department.title}</p>
      </div>
      <p style={{ alignSelf: "end" }} className={styles.department}>
        اولویت : {priorityLevel}
      </p>
      <div>
        <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        <p className={styles.no_answer}>
          {hasAnswer ? "پاسخ داده شده" : "پاسخ داده نشده"}
        </p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
