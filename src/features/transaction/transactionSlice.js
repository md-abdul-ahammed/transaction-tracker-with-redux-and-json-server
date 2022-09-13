import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactionsbyPagination,
} from "./transactionAPI";

// initial state
const initialState = {
  transactions: [],
  paginateTransitions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

// async thunks
export const fetchTransactions = createAsyncThunk(
  "transcation/fetchTransactions",
  async ({ filterByType, filterBySearch, pageNo } = {}) => {
    const transactions = await getTransactions(
      filterByType,
      filterBySearch,
      pageNo
    );
    return transactions;
  }
);

export const fetchTransactionsByPagination = createAsyncThunk(
  "transcation/fetchTransactionsByPagination",
  async (pageNo) => {
    const transactions = await getTransactionsbyPagination(pageNo);
    return transactions;
  }
);

export const createTransaction = createAsyncThunk(
  "transcation/createTransaction",
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);

export const changeTransaction = createAsyncThunk(
  "transcation/changeTransaction",
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  "transcation/removeTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

// create slice

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
        state.isError = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.transactions = [];
        state.error = action?.error.message;
      })
      .addCase(fetchTransactionsByPagination.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactionsByPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paginateTransitions = action.payload;
        state.isError = false;
      })
      .addCase(fetchTransactionsByPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.paginateTransitions = [];
        state.error = action?.error.message;
      })
      .addCase(createTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.unshift(action.payload);
        state.isError = false;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action?.error.message;
      })
      .addCase(changeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(changeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const indexToUpdate = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transactions[indexToUpdate] = action.payload;
        const indexToUpdates = state.paginateTransitions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.paginateTransitions[indexToUpdates] = action.payload;
      })
      .addCase(changeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action?.error.message;
      })
      .addCase(removeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.meta.arg
        );
        state.paginateTransitions = state.paginateTransitions.filter(
          (t) => t.id !== action.meta.arg
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action?.error.message;
      });
  },
});

export const { editActive, editInActive } = transactionSlice.actions;

export default transactionSlice.reducer;
