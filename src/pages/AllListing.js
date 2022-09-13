import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form";
import Pagination from "../components/Pagination";
import Transaction from "../components/Transactions/Transaction";
import {
  fetchTransactions,
  fetchTransactionsByPagination,
} from "../features/transaction/transactionSlice";

const AllListing = () => {
  const {
    transactions,
    paginateTransitions,
    isLoading,
    isError,
    error,
    editing,
  } = useSelector((state) => state.transaction);

  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    dispatch(fetchTransactions({ filterByType: type, filterBySearch: value }));
    dispatch(fetchTransactionsByPagination(pageNo));
  }, [dispatch, type, value, pageNo, editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(searchValue);
  };

  const reset = () => {
    setType("");
    setSearchValue("");
    setValue("");
    setPageNo(1);
  };

  // decide what to render;
  let content = null;

  if (isLoading) {
    content = <p>Loading.........</p>;
  }
  if (!isLoading && isError) {
    content = <p className="error">{error}</p>;
  }
  if (
    !isLoading &&
    !isError &&
    transactions?.length > 0 &&
    paginateTransitions?.length > 0
  ) {
    let allTransitions = paginateTransitions;
    if (type || value) {
      allTransitions = transactions;
    }

    content = allTransitions.map((t) => (
      <Transaction key={t.id} transaction={t} />
    ));
  }
  if (
    !isLoading &&
    !isError &&
    transactions?.length === 0 &&
    paginateTransitions?.length === 0
  ) {
    content = <p>No transactions found!</p>;
  }
  return (
    <div
      style={{
        padding: "3rem 5rem",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div>
        <h4>Filter By: </h4>
        <div className="radio">
          <div className="radio_group">
            <input
              type="radio"
              required
              value="income"
              name="type"
              checked={type === "income"}
              onChange={() => {
                setType("income");
                setPageNo(1);
              }}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              checked={type === "expense"}
              onChange={() => {
                setType("expense");
                setPageNo(1);
              }}
              placeholder="Expense"
            />
            <label>Expense</label>
          </div>
        </div>
        <form style={{ margin: "30px 0" }} onSubmit={handleSubmit}>
          Search :{" "}
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
          />
          <button
            type="submit"
            style={{ marginLeft: "0.8rem", padding: "5px 10px" }}
          >
            Search
          </button>
        </form>
        <button onClick={reset} style={{ padding: "5px 10px" }}>
          Reset
        </button>
        <ul>{content}</ul>
        {!isLoading && !isError && transactions?.length > 0 && (
          <div>
            <Pagination
              pageNo={pageNo}
              setPageNo={setPageNo}
              transactions={transactions}
            />
          </div>
        )}
      </div>
      {editing?.id && (
        <div>
          <Form />
        </div>
      )}
    </div>
  );
};

export default AllListing;
