"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Select from "react-select";
import { sweetalert } from "@/utils/helpers";

const stateOptions = stateData();

const Table = () => {
  const [cart, setCart] = useState([]);
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [code, setCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);

    localCart.reduce((prev, current) => {
      const calcPrice = prev + current.price * current.count;
      setTotalPrice(calcPrice);
      return calcPrice;
    }, 0);
    
  }, []);

  const useDiscount = async () => {
    if (!code.trim()) {
      return sweetalert("کد تخفیف را وارد کنید", "warning", "باشه");
    }
    const res = await fetch("/api/discounts/useDiscount", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    if (res.status === 200) {
      const discountPrice = totalPrice - (totalPrice * data.percent) / 100;
      setTotalPrice(discountPrice);
      setCode("");
      return sweetalert("کدتخفیف با موفقیت اعمال شد", "success", "فهمیدم");
    } else if (res.status === 404) {
      return sweetalert("این کد تخفیف وجود ندارد", "warning", "تلاش مجدد");
    } else if (res.status === 410) {
      return sweetalert("این کد تخفیف منقضی شده است", "warning", "تلاش مجدد");
    }
  };

  return (
    <>
      {" "}
      <div className={styles.tabel_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th> جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{(item.count * item.price).toLocaleString()} تومان</td>
                <td className={styles.counter}>
                  <div>
                    <span>-</span>
                    <p>{item.count}</p>
                    <span>+</span>
                  </div>
                </td>
                <td className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <img
                    src="https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"
                    alt=""
                  />
                  <Link href={"/"}>{item.name}</Link>
                </td>

                <td>
                  <IoMdClose className={styles.delete_icon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section>
          <button className={styles.update_btn}> بروزرسانی سبد خرید</button>
          <div>
            <button onClick={useDiscount} className={styles.set_off_btn}>
              اعمال کوپن
            </button>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="text"
              placeholder="کد تخفیف"
            />
          </div>
        </section>
      </div>
      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع جزء </p>
          <p>205,000 تومان</p>
        </div>

        <p className={totalStyles.motor}>
          {" "}
          پیک موتوری: <strong> 30,000 </strong>
        </p>
        <div className={totalStyles.address}>
          <p>حمل و نقل </p>
          <span>حمل و نقل به تهران (فقط شهر تهران).</span>
        </div>
        <p
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address}
        >
          تغییر آدرس
        </p>
        {changeAddress && (
          <div className={totalStyles.address_details}>
            <Select
              defaultValue={stateSelectedOption}
              onChange={setStateSelectedOption}
              isClearable={true}
              placeholder={"استان"}
              isRtl={true}
              isSearchable={true}
              options={stateOptions}
            />
            <input type="text" placeholder="شهر" />
            <input type="number" placeholder="کد پستی" />
            <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{totalPrice.toLocaleString()} تومان</p>
        </div>
        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تصویه حساب
          </button>
        </Link>
      </div>
    </>
  );
};

export default Table;
