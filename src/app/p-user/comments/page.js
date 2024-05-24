import DataTable from "@/components/templates/p-user/comments/DataTable";
import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/dataTable.module.css";
import React from "react";
import connectToDB from "base/configs/db";
import { authUser } from "@/utils/serverHelpers";
import commentModel from "base/models/Comment";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const comments = await commentModel
    .find({ username: user.name }, "-__v")
    .populate("product", "name");

  return (
    <UserPanelLayout>
      <main>
        {comments.length ? (
          <DataTable
            comments={JSON.parse(JSON.stringify(comments))}
            title="لیست کامنت‌ها"
          />
        ) : (
          <p className={styles.empty}>کامنتی وجود ندارد</p>
        )}
      </main>
    </UserPanelLayout>
  );
};

export default page;
