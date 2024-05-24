import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
import { authUser } from "@/utils/serverHelpers";
import WishlistModel from "base/models/Wishlist";
import connectToDB from "base/configs/db";

const page = async () => {
  await connectToDB();
  const user = await authUser();
  const wishlist = JSON.parse(
    JSON.stringify(
      await WishlistModel.find({ user: user._id }).populate("product")
    )
  );

  console.log(wishlist[0].product)

  return (
    <UserPanelLayout>
      <main>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>
        <div className={styles.container}>
          {wishlist.length &&
            wishlist.map((wish) => <Product key={wish._id} {...wish.product} />)}
        </div>

        {wishlist.length === 0 && (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        )}
      </main>
    </UserPanelLayout>
  );
};

export default page;
