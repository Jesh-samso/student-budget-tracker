import {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import '../App.css';

export default function Settings({ savingsTarget,setSavingsTarget }) {
    const [target,setTarget]=useState(savingsTarget);
    const navigate =useNavigate();

    function handleSave(){
        if (!target || Number(target) < 0) {
            alert("Please enter a valid savings target");
            return;
        }
        setSavingsTarget(Number(target));
        navigate("/");
    }

    function handleClear(){
        if (window.confirm("Are you sure you want to clear your savings target?")) {
            setTarget(0);
            setSavingsTarget(0);
            navigate("/");
        }
    }

    return (
        <div>
            <header>
                <Link to="/" className="back-link" style={{marginBottom: 0}}>Back</Link>
                <h2 style={{marginBottom: 0}}>Settings</h2>
                <div></div>
            </header>

            <div className="container">
                <div className="form-container">
                    <h3 style={{marginBottom: '2rem', textAlign: 'center'}}>Set Your Savings Target</h3>
                    
                    <div className="form-group">
                        <label htmlFor="target">Monthly Savings Target (KES)</label>
                        <input 
                        id="target"
                        type="number" 
                        placeholder="Enter your savings goal"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        step="0.01"
                        min="0"
                        />
                    </div>

                    <div className="button-group">
                        <button onClick={handleSave} className="btn-success">Save Target</button>
                        {target > 0 && (
                            <button onClick={handleClear} className="btn-danger">Clear Target</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}