import {useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import '../App.css';

export default function AddIncome({incomes,setIncomes}) {
    const [amount,setAmount]=useState("");
    const navigate =useNavigate();

    function handleSubmit (e){
        e.preventDefault ();

        if (!amount || Number(amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        setIncomes([
            ...incomes,
            {
                id:Date.now (),
                amount:Number(amount),
                date:new Date().toISOString(),
            }
        ]);
        navigate("/");
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
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn-success">Save Income</button>
                    </form>
                </div>
            </div>
        </div>
    );
}