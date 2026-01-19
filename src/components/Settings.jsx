import {useState} from "react";
import { Link,useNavigate } from "react-router-dom";

export default function Settings({ savingsTarget,setSavingsTarget }) {
    const [target,setTarget]=useState(savingsTarget);
    const navigate =useNavigate();

    function handleSave(){
        setSavingsTarget(Number(target));
        navigate("/");
    }
    return (
        <div>
            <Link to="/">_Back</Link>
            <h2>Set Your saving Target Today</h2>

            <input 
            type="number" 
            placeholder="Savings target"
            value={target}
            onChange= {(e) => setTarget(e.target.value) }
            />

            <button onClick={handleSave}>Save</button>
        </div>
    );
}