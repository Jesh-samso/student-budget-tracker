import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddExpense({ expenses, setExpenses }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        amount: Number(amount),
        category,  
        date: new Date().toISOString(),
      },
    ]);

    navigate("/");
  }

  return (
    <div>
      <Link to="/">⬅ Back</Link>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Rent</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <button type="submit">Save Expense</button>
      </form>
    </div>
  );
}
