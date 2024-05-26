import Link from "next/link";
import styles from "./ticket.module.css";

const Ticket = ({_id,title,department,answer,createdAt}) => {
  return (
    <Link href={`/p-user/tickets/answer/${_id}`} className={styles.ticket}>
      <div>
        <p>{title}</p>
        <p className={styles.department}>واحد {department.title}</p>
      </div>
      <div>
        <p>{new Date(createdAt).toLocaleDateString("fa-ir")}</p>
        <p className={styles.no_answer}>{answer.length>0?"پاسخ داده شده":"پاسخ داده نشده"}</p>
      </div>
    </Link>
  );
};

export default Ticket;
