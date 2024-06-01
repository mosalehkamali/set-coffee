"use client";

import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

function Navbar() {
  const [fixTop, setFixTop] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/auth/me");
      if(res.status===200){
        setIsLogin(true)
      }else{
        router.replace('/login-register')
      }
    };
    getUser();
   
  }, []);

  useEffect(() => {
    const fixNavToTop = () => {
      if (window.scrollY > 110) {
        setFixTop(true);
      } else {
        setFixTop(false);
      }
    };

    window.addEventListener("scroll", fixNavToTop);

    return () => window.removeEventListener("scroll", fixNavToTop);
  }, []);
  return (
    <nav className={fixTop ? styles.navbar_fixed : styles.navbar}>
      <main>
        <div>
          <Link href="/">
            <img src="/images/logo.png"></img>
          </Link>
        </div>
        <ul className={styles.links}>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/category">فروشگاه</Link>
          </li>
          <li>
            <Link href="/blogs">وبلاگ</Link>
          </li>
          <li>
            <Link href="/contact-us">تماس با ما</Link>
          </li>
          <li>
            <Link href="/about-us">درباره ما</Link>
          </li>
          <li>
            <Link href="/roles">قوانین</Link>
          </li>
          {isLogin? (
            <>
              {/* start my-acount section */}
              <div className={styles.dropdown}>
                <Link href="/p-user">
                  <IoMdArrowDropdown className={styles.dropdown_icons} />
                  حساب کاربری
                </Link>
                <div className={styles.dropdown_content}>
                  <Link href="/p-user/orders">سفارشات</Link>
                  <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
                  <Link href="/p-user/comments">کامنت ها</Link>
                  <Link href="/p-user/wishlist">علاقه مندی ها</Link>
                  <Link href="/p-user/acount-details">جزئیات حساب</Link>
                </div>
              </div>
              {/* end my-acount section */}
            </>
          ) : (
            <>
              <li>
                <Link href="/login-register">ورود / عضویت</Link>
              </li>
            </>
          )}
        </ul>
        <div className={styles.navbar_icons}>
          <Link href="/cart">
            <FiShoppingCart />
            <span>1</span>
          </Link>
          <Link href="/p-user/wishlist">
            <span>1</span>
            <FaRegHeart />
          </Link>
        </div>
      </main>
    </nav>
  );
}

export default Navbar;
