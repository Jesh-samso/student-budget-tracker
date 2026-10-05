import {useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import '../App.css';

export default function AddIncome({setIncomes}) {
    const [amount,setAmount]=useState("");
    const [source,setSource]=useState("Salary");
    const [note,setNote]=useState("");
    const [message,setMessage]=useState("");
    const navigate =useNavigate();

    function handleSubmit (e, returnToDashboard = false){
        e.preventDefault ();

        if (!amount || Number(amount) <= 0) {
            setMessage("Enter an amount greater than zero.");
            return;
        }

        setIncomes((currentIncomes) => [
            ...currentIncomes,
            {
                id:Date.now (),
                amount:Number(amount),
                source,
                note: note.trim(),
                date:new Date().toISOString(),
            }
        ]);

        if (returnToDashboard) {
            navigate("/");
            return;
        }

        setAmount("");
        setNote("");
        setMessage("Income saved. Add another entry or finish back to your dashboard.");
    }
    return (
        <div>
            <header>
                <Link to="/" className="back-link" style={{marginBottom: 0}}>Back</Link>
                <h2 style={{marginBottom: 0}}>Add Income</h2>
                <div></div>
            </header>

            <div className="container">
                <div className="form-container">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="amount">Income Amount (KES)</label>
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
                            <label htmlFor="source">Income Source</label>
                            <select
                                id="source"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                            >
                                <option value="Salary">Salary</option>
                                <option value="Allowance">Allowance</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Gift">Gift</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="note">Note (optional)</label>
                            <input
                                id="note"
                                type="text"
                                placeholder="Add a short note about this income"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>

                        {message && <p className="form-message" role="status">{message}</p>}

                        <div className="form-actions">
                            <button type="submit" className="btn-success">Save &amp; add another</button>
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