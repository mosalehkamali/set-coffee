import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useState } from "react";
const CommentForm = ({ productID }) => {
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState();
  const [showUserScore, setShowUserScore] = useState(false);

  const signScore = (userScore) => {
    setScore(userScore);
    setShowUserScore(true);
  };

  const signComment = async () => {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        body,
        email,
        score,
        product: productID,
      }),
    });
    const result = await res.json();
    console.log(result);
  };
  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.rate}>
        <p>
          امتیاز شما<span style={{ color: "red" }}>*</span>:
        </p>
        <div>
          {!showUserScore ? (
            [...Array(5)].map((item, index) => (
              <IoMdStar key={index} onClick={() => signScore(5 - index)} />
            ))
          ) : (
            <>
              {[...Array(5 - score)].map((item, index) => (
                <IoMdStar key={index} onClick={() => signScore(5 - index)} />
              ))}
              {[...Array(score)].map((item, index) => (
                <IoMdStar
                  style={{ color: "orange" }}
                  key={index}
                  onClick={() => signScore(score - index)}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className={styles.group}>
        <label htmlFor="">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          required=""
          placeholder=""
        ></textarea>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" name="" id="" />
        <p>
          {" "}
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button onClick={signComment}>ثبت</button>
    </div>
  );
};

export default CommentForm;
