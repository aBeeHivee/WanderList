import React, { useReducer, createContext } from "react";
import contextReducer from "./contextReducer";
//provides local storage
const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  {
    amount: 1000,
    category: "Demo",
    type: "Income",
    date: "2022-01-15",
    id: "44c68123-5b86-4cc8-b915-bb9e16cebe6a",
  },
  {
    amount: 500,
    category: "Demo",
    type: "Expense",
    date: "2022-01-16",
    id: "33b295b8-a8cb-49f0-8f0d-bb268686de1a",
  },
];
export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const balance = transactions.reduce(
    (acc, currVal) =>
      currVal.type === "Expense" ? acc - currVal.amount : acc + currVal.amount,
    0
  );

  return (
    <ExpenseTrackerContext.Provider
      value={{
        transactions,
        balance,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
