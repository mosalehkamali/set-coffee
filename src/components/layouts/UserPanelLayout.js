import React from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
import { authUser } from "@/utils/serverHelpers";
import { redirect } from "next/navigation";
const Layout = async ({ children }) => {
  const user = await authUser();
  if (!user) {
    return redirect("/login-register");
  }
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar name={user.name} />
        <div className={styles.contents}>
          <Topbar user={{ name: user.name, role: user.role }} />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
