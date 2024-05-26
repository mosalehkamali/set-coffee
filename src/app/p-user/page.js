import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/templates/p-user/index/Box";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import { authUser } from "@/utils/serverHelpers";
import ticketModel from "base/models/Ticket";
import CommentModel from "base/models/Comment";
import wishlistModel from "base/models/Wishlist";
const page = async () => {
  const user = await authUser();
  const tickets = await ticketModel
    .find({ user: user._id }, "title createdAt")
    .populate("department", "title")
    .populate("answer", "_id")
    .limit(3)
    .sort({ _id: -1 })
    .lean();
  const allTickets = await ticketModel.find({ user: user._id });
  const comments = await CommentModel.find({ user: user._id });
  const wishlist = await wishlistModel.find({ user: user._id });
  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={allTickets.length} />
          <Box title="مجموع کامنت ها " value={comments.length} />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value={wishlist.length} />
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
