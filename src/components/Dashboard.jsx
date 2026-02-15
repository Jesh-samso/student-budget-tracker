import {Link} from 'react-router-dom';
import {
  getMonthlyIncome,
  getMonthlyExpenses,
  getMonthlyBalance,
  getSavingsStatus,
  formatKES
} from "../utils/calculations";
import '../App.css';

export default function Dashboard({ incomes,expenses,savingsTarget}) { 
    const totalIncome=getMonthlyIncome (incomes);
    const totalExpenses=getMonthlyExpenses (expenses);
    const balance =getMonthlyBalance (incomes,expenses);
    const savings =getSavingsStatus(incomes,expenses,savingsTarget)
    return (
        <div>
            <header>
                <h2> Student Budget Tracker</h2>
                <Link to="/settings">Settings</Link>
            </header>

            <div className="container dashboard">
                <div className="metrics-grid">
                    <div className="metric-card">
                        <h3>Current Balance</h3>
                        <div className={`metric-value ${balance >= 0 ? 'status-positive' : 'status-negative'}`}>
                            {formatKES(balance)}
                        </div>
                    </div>

                    <div className="metric-card">
                        <h3>Monthly Income</h3>
                        <div className="metric-value status-positive">
                            {formatKES(totalIncome)}
                        </div>
                    </div>

                    <div className="metric-card">
                        <h3>Monthly Expenses</h3>
                        <div className="metric-value status-negative">
                            {formatKES(totalExpenses)}
                        </div>
                    </div>
                </div>

                {savingsTarget > 0 && (
                    <div className="savings-section">
                        <h3>Savings Target</h3>
                        <div className="savings-content">
                            <div className="savings-item">
                                <span className="savings-item-label">Target Amount</span>
                                <span className="savings-item-value">{formatKES(savingsTarget)}</span>
                            </div>
                            <div className="savings-item">
                                <span className="savings-item-label">Status</span>
                                <span className="savings-item-value">{savings.status}</span>
                            </div>
                        </div>
                        {!savings.reached && (
                            <div className="savings-status-pending">
                                Amount remaining to save: <strong>{formatKES(savings.remaining)}</strong>
                            </div>
                        )}
                        {savings.reached && (
                            <div className="savings-status-achieved">
                                Congratulations! Saving goal achieved!
                            </div>
                        )}
                    </div>
                )}

                <div className="action-buttons">
                    <Link to="/add-income">
                        <button className="btn-primary">Add Income</button>
                    </Link>
                    <Link to="/add-expense">
                        <button className="btn-primary">Add Expense</button>
                    </Link>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Link to="/summary" className="back-link">View Monthly Summary</Link>
                </div>
            </div>
        </div>
    );
}