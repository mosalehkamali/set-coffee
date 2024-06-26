import Layout from "@/components/layouts/UserPanelLayout";
import Tickets from "@/components/templates/p-user/tickets/Tickets";
import { authUser } from "@/utils/serverHelpers";
import connectToDB from "base/configs/db";
import ticketModel from "base/models/Ticket";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const tickets = await ticketModel
    .find({ user: user._id, request: undefined })
    .populate("department", "title")
    .populate("answer", "_id")
    .sort({ _id: -1 })
    .lean();

  return (
    <Layout>
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </Layout>
  );
};

export default page;
