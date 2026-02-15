import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';

export default function AddExpense({ expenses, setExpenses }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

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
      <header>
        <Link to="/" className="back-link" style={{marginBottom: 0}}>Back</Link>
        <h2 style={{marginBottom: 0}}>Add Expense</h2>
        <div></div>
      </header>

      <div className="container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="amount">Expense Amount (KES)</label>
              <input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>🍔 Food</option>
                <option>🚌 Transport</option>
                <option>🏠 Rent</option>
                <option>🎬 Entertainment</option>
                <option>📦 Other</option>
              </select>
            </div>

            <button type="submit" className="btn-danger">Save Expense</button>
          </form>
        </div>
      </div>
    </div>
  );
}
