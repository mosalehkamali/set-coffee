import Layout from "@/components/layouts/UserPanelLayout";
import SendTicket from "@/components/templates/p-user/tickets/sendTicket"
import departmentModel from "base/models/Department";

const page = async () => {
  const departments = await departmentModel.find({},"-__v")
  return (
    <Layout>
    <SendTicket  departments={JSON.parse(JSON.stringify(departments))}/> 
    </Layout>
  );
};

export default page;
