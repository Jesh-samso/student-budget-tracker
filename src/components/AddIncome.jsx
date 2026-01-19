import {useState} from "react";
import { Link ,useNavigate} from "react-router-dom";

export default function AddIncome({incomes,setIncomes}) {
    const [amount,setAmount]=useState("");
    const navigate =useNavigate();

    function handleSubmit (e){
        e.preventDefault ();

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
            <Link to="/">_Back</Link>
            <h2>Add Income</h2>

            <form onSubmit ={handleSubmit}>
                <input 
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required   
                />
                <button type="submit" >Save Income</button>
            </form>              
        </div>
    );
}