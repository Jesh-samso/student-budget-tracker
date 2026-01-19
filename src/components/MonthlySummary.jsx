import { Link } from "react-router-dom";
import { formatKES} from "../utils/calculations";
import {
    getMonthlyIncome,
    getMonthlyExpenses,
    
} from "../utils/calculations";

export default function MonthlySummary({incomes,expenses}) {
    const income = getMonthlyIncome(incomes);
    const expense =getMonthlyExpenses(expenses);
    const balance = income - expense;


    return (
        <div>
            <Link to="/">_Back</Link>
            <h2>Monthly Summary</h2>

            <p>Total Income: {formatKES (income)} </p>
            <p>Total Expenses: {formatKES (expense)} </p>
            <p>Remaining Balance: {formatKES (balance)} </p>
        </div>
    );
}

