"use client";
import React from "react";
import styles from "./tabs.module.css";
import { useState } from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";
const Tabs = ({ longDescription, moreInfo, comments, title, productID }) => {

  const [tab, setTab] = useState("description");
  return (
    <div data-aos="fade-left" className={styles.tabs}>
      <input
        onClick={() => setTab("description")}
        type="radio"
        id="description"
        name="tab-control"
        defaultChecked={tab == "description" && "checked"}
      />
      <input
        onClick={() => setTab("moreInfoes")}
        type="radio"
        id="moreInfoes"
        name="tab-control"
        defaultChecked={tab == "moreInfoes" && "checked"}
      />
      <input
        onClick={() => setTab("comments")}
        type="radio"
        id="comments"
        name="tab-control"
        defaultChecked={tab == "comments" && "checked"}
      />
      <ul>
        <li title="Features">
          <label htmlFor="description" role="button">
            {" "}
            توضیحات{" "}
          </label>
        </li>
        <li title="Delivery Contents">
          <label htmlFor="moreInfoes" role="button">
            {" "}
            اطلاعات بیشتر{" "}
          </label>
        </li>
        <li title="Shipping">
          <label htmlFor="comments" role="button">
            {" "}
            نظرات ({comments.length}){" "}
          </label>
        </li>
      </ul>

      <div className={styles.contents}>
        <section className={styles.tabs_content}>
          <Description longDescription={longDescription}/>
        </section>
        <section className={styles.tabs_content}>
          <MoreInfoes moreInfo={moreInfo} />
        </section>
        <section className={styles.tabs_content}>
          <Comments title={title} comments={comments} productID={productID} />
        </section>
      </div>
    </div>
  );
};

export default Tabs;
