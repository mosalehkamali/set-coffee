import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/templates/p-user/index/Box";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import { authUser } from "@/utils/serverHelpers";
import ticketModel from "base/models/Ticket";
const page = async () => {
  const user = await authUser();
  const tickets = await ticketModel
    .find({ user: user._id }, "title createdAt")
    .populate("department", "title")
    .populate("answer", "_id")
    .lean();
  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={tickets.length} />
          <Box title="مجموع کامنت ها " value="0" />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value="10" />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
          <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;
