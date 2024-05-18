"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/ScrollToTop.module.css";
import { MdKeyboardArrowUp } from "react-icons/md";

function ScrollToTop() {
  const [shwButton, setShwButton] = useState(false);
  useEffect(() => {
    const buttonVisible = () => {
      if (window.scrollY > 110) {
        setShwButton(true);
      } else {
        setShwButton(false);
      }
    };
    window.addEventListener("scroll", buttonVisible);

    return () => window.removeEventListener("scroll", buttonVisible);
  }, []);

  const goToTop = ()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
  }

  return (
    <button className={shwButton ? styles.buttonVisible : styles.button} onClick={goToTop}>
      <MdKeyboardArrowUp />
    </button>
  );
}

export default ScrollToTop;
