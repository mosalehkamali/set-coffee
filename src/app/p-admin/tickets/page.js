import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/tickets/table.module.css";
import Table from "@/components/templates/p-admin/tickets/Table";
import connectToDB from "base/configs/db";
import TicketModel from "base/models/Ticket";

const page = async () => {
  connectToDB();
  const tickets = await TicketModel.find({})
    .sort({ department: 1, _id: -1 })
    .populate("user")
    .populate("department")
    .lean();

  return (
    <Layout>
      <main>
        {tickets.length === 0 ? (
          <p className={styles.empty}>کاربری وجود ندارد</p>
        ) : (
          <Table
            tickets={JSON.parse(JSON.stringify(tickets))}
            title="لیست کاربران"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
