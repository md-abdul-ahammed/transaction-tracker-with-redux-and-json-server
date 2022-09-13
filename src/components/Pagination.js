import React from "react";

const Pagination = ({ transactions = [], setPageNo, pageNo = 1 }) => {
  const pageNumber = Math.ceil(transactions.length / 10);
  const array = Array.from(Array(pageNumber).keys());

  return (
    <div style={{ display: "flex" }}>
      {array.length &&
        array.map((number) => (
          <button
            key={number}
            onClick={() => setPageNo(number + 1)}
            style={{
              marginRight: "10px",
              padding: "4px 12px",
              background: pageNo === number + 1 ? "#201c19" : "gainsboro",
              border: "none",
              color: pageNo === number + 1 ? "#fff" : "#201c19",
              fontSize: "1.5rem",
              fontWeight: "bold",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {number + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
