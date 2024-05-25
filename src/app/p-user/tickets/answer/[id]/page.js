import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "@/components/templates/p-user/tickets/Answer";
import connectToDB from "base/configs/db";
import TicketModel from "base/models/Ticket";

const page = async ({ params }) => {
  const ticketID = params.id;
  connectToDB();
  const ticket = await TicketModel.findOne({ _id: ticketID });


  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>تیکت تستی</span>
          <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
        </h1>

        <div>
          <Answer type="user" />
          <Answer type="admin" />

          {/* <div className={styles.empty}>
            <p>هنوز پاسخی دریافت نکردید</p>
          </div> */}
        </div>
      </main>
    </Layout>
  );
};

export default page;
