import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // decide what to render;
  let content = null;

  if (isLoading) {
    content = <p>Loading.........</p>;
  }
  if (!isLoading && isError) {
    content = <p className="error">{error}</p>;
  }
  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions
      .slice(0, 5)
      .map((t) => <Transaction key={t.id} transaction={t} />);
  }
  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transactions found!</p>;
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
        <Link to="/all-listing" className={`transaction view-all`}>
          <p className="t-center">View All</p>
        </Link>
      </div>
    </>
  );
}
