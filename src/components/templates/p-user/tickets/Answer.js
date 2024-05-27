import styles from "./answer.module.css";

const Answer = ({ ticket, user }) => {
  return (
    <section
      className={ticket.answer?.length > 0 ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>{new Date(ticket.createdAt).toLocaleDateString("fa-IR")} </p>
        <div>
          <div>
            <p>{user.name}</p>
            <span>{user.role === "USER" ? "کاربر" : "ادمین"}</span>
          </div>
          <img src="/images/shahin.jpg" alt="" />
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>{ticket.body}</p>
      </div>
    </section>
  );
};

export default Answer;
