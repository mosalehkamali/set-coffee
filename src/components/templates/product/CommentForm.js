import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useEffect, useState } from "react";
import { validateEmail } from "@/utils/auth";
import { sweetalert } from "@/utils/helpers";
const CommentForm = ({ productID }) => {
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState();
  const [showUserScore, setShowUserScore] = useState(false);
  const [saveInfos, setSaveInfos] = useState(false);

  const signScore = (userScore) => {
    setScore(userScore);
    setShowUserScore(true);
  };

  useEffect(() => {
   
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        setEmail(userInfo.email);
        setUsername(userInfo.username);
      }
  }, []);

  const signComment = async () => {
    if (
      !username.trim() ||
      !body.trim() ||
      !email.trim() ||
      !score ||
      !productID.trim()
    ) {
      return sweetalert(
        "لطفا همه بخش های مورد نیاز را پر کنید",
        "error",
        "فهمیدم"
      );
    }

    if (!validateEmail(email)) {
      return sweetalert("ایمیل وارد شده معتبر نیست !!", "error", "تلاش مجدد");
    }

    if (saveInfos) {
      localStorage.setItem("userInfo", JSON.stringify({ username, email }));
    }

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
    if (res.status === 201) {
      return sweetalert("کامنت شما با موفقیت ثبت شد", "success", "باشه");
    }
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
        <input
          type="checkbox"
          name=""
          id=""
          onChange={(e) => setSaveInfos(e.target.checked)}
        />
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
