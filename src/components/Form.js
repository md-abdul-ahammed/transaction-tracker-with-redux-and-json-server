import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTransaction,
  createTransaction,
  editInActive,
} from "../features/transaction/transactionSlice";

export default function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const { isLoading, isError, editing } = useSelector(
    (state) => state.transaction
  );
  const { id, name: prevName, amount: prevAmount, type: prevType } = editing;

  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  useEffect(() => {
    if (id) {
      setEditMode(true);
      setName(prevName);
      setType(prevType);
      setAmount(prevAmount);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing, prevName, prevAmount, prevType, id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      changeTransaction({
        id,
        data: {
          name,
          type,
          amount: Number(amount),
        },
      })
    );
    setEditMode(false);
    reset();
    dispatch(editInActive());
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    dispatch(editInActive());
    reset();
  };

  return (
    <div className="form">
      <h3>{editMode ? "Update transaction" : "Add new transaction"}</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              required
              value="income"
              name="type"
              checked={type === "income"}
              onChange={() => setType("income")}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              checked={type === "expense"}
              onChange={() => setType("expense")}
              placeholder="Expense"
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            required
            placeholder="Enter Amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} type="submit" className="btn">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>

        {!isLoading && isError && (
          <p className="error">There is an error occured</p>
        )}
      </form>

      {editMode && (
        <button onClick={cancelEditMode} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
}
