"use client";

import React, { useEffect, useState } from "react";
import styles from "./adminPanelLayout.module.css";
import Sidebar from "@/components/modules/p-admin/Sidebar";
import Topbar from "@/components/modules/p-admin/Topbor";
import { useRouter } from "next/navigation";

const AdminPanelLayout = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (res.status === 200) {
        setUser(data.user);
        if (data.user.role !== "ADMIN") {
          return router.replace("/p-user");
        }
      } else {
        return router.replace("/login-register");
      }
    };
    getUser();
  }, []);

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar />
        <div className={styles.contents}>
          <Topbar />
          {children}
        </div>
      </section>
    </div>
  );
};

export default AdminPanelLayout;
