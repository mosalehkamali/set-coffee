import Table from "@/components/templates/p-admin/discounts/Table";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/discounts/table.module.css";
import connectToDB from "base/configs/db";
import DiscountModel from "base/models/Discount";
import DiscountForm from "@/components/templates/p-admin/discounts/DiscountForm";

const Discounts = async () => {
  connectToDB();
  const discounts = await DiscountModel.find({}).sort({ _id: -1 }).lean();

  return (
    <Layout>
      <main>
        <DiscountForm />
        {discounts.length === 0 ? (
          <p className={styles.empty}>کد تخفیفی وجود ندارد</p>
        ) : (
          <Table
            discounts={JSON.parse(JSON.stringify(discounts))}
            title="لیست تخفیفات"
          />
        )}
      </main>
    </Layout>
  );
};

export default Discounts;
