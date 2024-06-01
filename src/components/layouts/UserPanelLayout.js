"use client";

import React, { useEffect, useState } from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if(res.status===200){
        setUser(data.user);
      }else{
        router.replace('/login-register')
      }
    };
    getUser();
   
  }, []);

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
