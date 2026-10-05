import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';

export default function AddExpense({ setExpenses, expenseCategories, setExpenseCategories }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [customCategory, setCustomCategory] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const amountInputRef = useRef(null);

  function handleSubmit(e, returnToDashboard = false) {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setMessage("Enter an amount greater than zero.");
      return;
    }

    const categoryName = category === "__custom__" ? customCategory.trim() : category;

    if (!categoryName) {
      setMessage("Enter a name for your custom category.");
      return;
    }

    const savedCategory = expenseCategories.find(
      (item) => item.toLocaleLowerCase() === categoryName.toLocaleLowerCase()
    ) || categoryName;

    setExpenses((currentExpenses) => [
      ...currentExpenses,
      {
        id: Date.now(),
        amount: Number(amount),
        category: savedCategory,
        title: title.trim() || savedCategory,
        note: note.trim(),
        date: new Date().toISOString(),
      },
    ]);

    if (category === "__custom__") {
      setExpenseCategories((currentCategories) => (
        currentCategories.some((item) => item.toLocaleLowerCase() === savedCategory.toLocaleLowerCase())
          ? currentCategories
          : [...currentCategories, savedCategory]
      ));
    }

    if (returnToDashboard) {
      navigate("/");
      return;
    }

    setAmount("");
    setTitle("");
    setNote("");
    if (category === "__custom__") {
      setCategory(savedCategory);
      setCustomCategory("");
    }
    setMessage(`Expense saved under ${savedCategory}. Add another entry or finish back to your dashboard.`);
    amountInputRef.current?.focus();
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
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="amount">Expense Amount (KES)</label>
              <input
                id="amount"
                ref={amountInputRef}
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
              <label htmlFor="title">Expense Name</label>
              <input
                id="title"
                type="text"
                placeholder="Groceries, transport pass, rent..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setMessage("");
                }}
              >
                {expenseCategories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
                <option value="__custom__">Create a category...</option>
              </select>
            </div>

            {category === "__custom__" && (
              <div className="form-group">
                <label htmlFor="custom-category">New category name</label>
                <input
                  id="custom-category"
                  type="text"
                  placeholder="For example, Laundry or Phone data"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  maxLength={40}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="note">Notes (optional)</label>
              <input
                id="note"
                type="text"
                placeholder="Add a short detail about this expense"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {message && <p className="form-message" role="status">{message}</p>}

            <div className="form-actions">
              <button type="submit" className="btn-danger">Save &amp; add another</button>
              <button
                type="button"
                className="btn-secondary"
                onClick={(e) => handleSubmit(e, true)}
              >
                Save &amp; finish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
