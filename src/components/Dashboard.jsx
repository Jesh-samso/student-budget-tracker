import {Link} from 'react-router-dom';
import {
  getMonthlyIncome,
  getMonthlyExpenses,
  getMonthlyBalance,
  getSavingsStatus,
  formatKES
} from "../utils/calculations";


export default function Dashboard({ incomes,expenses,savingsTarget}) { 
    const totalIncome=getMonthlyIncome (incomes);
    const totalExpenses=getMonthlyExpenses (expenses);
    const balance =getMonthlyBalance (incomes,expenses);
    const savings =getSavingsStatus(incomes,expenses,savingsTarget)
    return (
        <div>
            <header>
                <h2>Student Budget Tracker</h2>

                <Link to="/settings">Settings</Link>
            </header>

                <p>Current Balance:{formatKES (balance)} </p>
                <p>Monthly Income: {formatKES (totalIncome)} </p>
                <p>Monthly Expense: {formatKES (totalExpenses)}</p>
                
                {savingsTarget > 0 && (
  <div>
    <h3>Savings Target</h3>

    <p>Target Amount: {formatKES(savingsTarget)}</p>
    <p>Status: {savings.status}</p>

    {!savings.reached && (
      <p>Amount remaining to save: {formatKES(savings.remaining)}</p>
    )}

    {savings.reached && (
      <p>🎯 Saving goal achieved</p>
    )}
  </div>
)}

            
                <Link to="/add-income">
                <button>Add Income</button>
                </Link>

                <Link to="/add-expense">
                <button>Add Expense</button>
                </Link>

            <Link to="/summary">View Monthly Summary</Link>
        </div>
    );
}