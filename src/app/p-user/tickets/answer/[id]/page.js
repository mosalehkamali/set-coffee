import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "@/components/templates/p-user/tickets/Answer";
import connectToDB from "base/configs/db";
import TicketModel from "base/models/Ticket";
import userModel from "base/models/User";

const page = async ({ params }) => {
  const ticketID = params.id;
  connectToDB();
  const ticketData = await TicketModel.findOne(
    { _id: ticketID },
    "title body createdAt"
  ).populate("user","role name")
    .populate("answer", "user body createdAt")
    .lean();

  const ticket = JSON.parse(JSON.stringify(ticketData));
  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>{ticket.title}</span>
          <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
        </h1>

        <div>
          <Answer
            ticket={ticket}
            user={ticket.user}
          />
          {ticket.answer.length > 0 &&
            ticket.answer.map(async (answer) => {
              const user = await userModel.findOne(
                { _id: answer.user },
                "role name"
              );
              return (
                <Answer
                  key={answer._id}
                  ticket={answer}
                  user={JSON.parse(
                    JSON.stringify({ role: user.role, name: user.name })
                  )}
                />
              );
            })}

          {ticket.answer.length === 0 && (
            <div className={styles.empty}>
              <p>هنوز پاسخی دریافت نکردید</p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default page;
