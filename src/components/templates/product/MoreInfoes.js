import React from "react";

const MoreInfoes = ({ moreInfo }) => {
  return (
    <div>
      <p>اطلاعات بیشتر :</p>
      <hr />
      <main>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>وزن</p>
          <p>{moreInfo.weight} کیلو</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>بو</p>
          <p>{moreInfo.smell}</p>
        </div>
      </main>
    </div>
  );
};

export default MoreInfoes;
