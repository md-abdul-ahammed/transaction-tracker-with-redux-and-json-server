import axios from "../../utils/axios";

export const getTransactions = async (filterByType, filterBySearch) => {
  const type = filterByType ? "&type_like=" + filterByType : "";
  const search = filterBySearch ? "&name_like=" + filterBySearch : "";

  const response = await axios.get(
    `/transactions?_sort=id&_order=desc${type}${search}`
  );
  return response.data;
};

export const getTransactionsbyPagination = async (pageNo = 1) => {
  const page = pageNo ? "&_page=" + pageNo + "&_limit=" + 10 : "";
  const response = await axios.get(`/transactions?_sort=id&_order=desc${page}`);
  return response.data;
};

export const addTransaction = async (data) => {
  const response = await axios.post("/transactions", data);
  return response.data;
};

export const editTransaction = async (id, data) => {
  const response = await axios.put(`/transactions/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`/transactions/${id}`);
  return response.data;
};
