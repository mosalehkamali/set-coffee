import React from "react";

const MoreInfoes = ({ moreInfo }) => {
  return (
    <div>
      <p>اطلاعات بیشتر :</p>
      <hr />
      <main>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>وزن</p>
          <p>{moreInfo.weight} گرم</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>بو</p>
          <p>{moreInfo.smell}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>مناسب برای</p>
          <p>{moreInfo.suitableFor}</p>
        </div>
      </main>
    </div>
  );
};

export default MoreInfoes;
