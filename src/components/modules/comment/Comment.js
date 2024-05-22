import { FaStar,FaRegStar } from "react-icons/fa";

import styles from "./comment.module.css";
const Comment = ({ data }) => {
  return (
    <section className={styles.comment}>
      <img src="/images/shahin.jpg" className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>{data.username}</strong>
            <p>{new Date(data.date).toLocaleDateString("fa-IR")}</p>
          </div>
          <div className={styles.stars}>
          {[...Array(data.score)].map((star,index) => (
            <FaStar key={index}/>
          ))}
          {[...Array(5 - data.score)].map((disStar,index) => (
            <FaRegStar key={index} />
          ))}
          </div>
        </div>
        <p>{data.body}</p>
      </div>
    </section>
  );
};

export default Comment;
