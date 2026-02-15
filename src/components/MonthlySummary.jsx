import { Link } from "react-router-dom";
import { formatKES} from "../utils/calculations";
import {
    getMonthlyIncome,
    getMonthlyExpenses,
    
} from "../utils/calculations";
import '../App.css';

export default function MonthlySummary({incomes,expenses}) {
    const income = getMonthlyIncome(incomes);
    const expense =getMonthlyExpenses(expenses);
    const balance = income - expense;
    const date = new Date();
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div>
            <header>
                <Link to="/" className="back-link" style={{marginBottom: 0}}>Back</Link>
                <h2 style={{marginBottom: 0}}>Monthly Summary</h2>
                <div></div>
            </header>

            <div className="container">
                <div className="summary-container">
                    <h3 style={{textAlign: 'center', marginBottom: '2rem'}}>📊 {monthYear}</h3>

                    <div className="metrics-grid">
                        <div className="metric-card">
                            <h3>Total Income</h3>
                            <div className="metric-value status-positive">
                                {formatKES(income)}
                            </div>
                        </div>

                        <div className="metric-card">
                            <h3>Total Expenses</h3>
                            <div className="metric-value status-negative">
                                {formatKES(expense)}
                            </div>
                        </div>

                        <div className="metric-card">
                            <h3>Remaining Balance</h3>
                            <div className={`metric-value ${balance >= 0 ? 'status-positive' : 'status-negative'}`}>
                                {formatKES(balance)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

