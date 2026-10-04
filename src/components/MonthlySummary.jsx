import { Link } from "react-router-dom";
import {
    formatKES,
    getMonthlyExpenseBreakdown,
    getMonthlyIncome,
    getMonthlyExpenses,
} from "../utils/calculations";
import '../App.css';

export default function MonthlySummary({incomes,expenses}) {
    const income = getMonthlyIncome(incomes);
    const expense =getMonthlyExpenses(expenses);
    const balance = income - expense;
    const expenseBreakdown = getMonthlyExpenseBreakdown(expenses, incomes);
    const topCategory = expenseBreakdown[0] || null;
    const date = new Date();
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div className="dashboard-page">
            <header>
                <div className="brand-group">
                    <div className="brand-mark">SB</div>
                    <div>
                        <p className="brand-tag">Monthly Summary</p>
                        <h2>{monthYear}</h2>
                    </div>
                </div>
                <Link to="/" className="settings-link">Back</Link>
            </header>

            <div className="container dashboard">
                <div className="dashboard-hero summary-hero">
                    <div className="hero-copy">
                        <p className="eyebrow">Monthly review</p>
                        <h1>Your spending snapshot</h1>
                        <p>
                            {income === 0
                                ? 'Add income details first to begin tracking your budget.'
                                : `You spent ${formatKES(expense)} this month, leaving ${formatKES(balance)} in balance.`}
                        </p>
                    </div>

                    <div className="hero-summary">
                        <div className="summary-pill">
                            <span>Total income</span>
                            <strong className="status-positive">{formatKES(income)}</strong>
                        </div>

                        {topCategory && (
                            <div className="summary-pill highlight">
                                <span>Top category</span>
                                <strong>{topCategory.category}</strong>
                                <small>{formatKES(topCategory.amount)}</small>
                            </div>
                        )}
                    </div>
                </div>

                <div className="metrics-grid">
                    <div className="metric-card">
                        <h3>Total Income</h3>
                        <div className="metric-value status-positive">
                            {formatKES(income)}
                        </div>
                        <div className="metric-subtitle">The amount you received this month</div>
                    </div>

                    <div className="metric-card">
                        <h3>Total Expenses</h3>
                        <div className="metric-value status-negative">
                            {formatKES(expense)}
                        </div>
                        <div className="metric-subtitle">The amount you spent this month</div>
                    </div>

                    <div className="metric-card">
                        <h3>Remaining Balance</h3>
                        <div className={`metric-value ${balance >= 0 ? 'status-positive' : 'status-negative'}`}>
                            {formatKES(balance)}
                        </div>
                        <div className="metric-subtitle">What is left after all expenses</div>
                    </div>
                </div>

                <div className="expense-breakdown-section">
                    <div className="section-heading">
                        <h3>Category Spending</h3>
                        <span>{expenseBreakdown.length} categories</span>
                    </div>

                    {expenseBreakdown.length === 0 ? (
                        <div className="empty-state">
                            No expenses recorded for this month yet.
                        </div>
                    ) : (
                        <div className="breakdown-list">
                            {expenseBreakdown.map((entry) => (
                                <div className="breakdown-item" key={entry.category}>
                                    <div className="breakdown-header">
                                        <div className="breakdown-label-group">
                                            <span className="breakdown-category">{entry.category}</span>
                                            <span className="breakdown-meta">
                                                {entry.count} {entry.count === 1 ? 'entry' : 'entries'}
                                            </span>
                                        </div>

                                        <div className="breakdown-amount-group">
                                            <span className="breakdown-amount">{formatKES(entry.amount)}</span>
                                            <span className="breakdown-share">
                                                {entry.percentageOfIncome.toFixed(1)}% of income
                                            </span>
                                        </div>
                                    </div>

                                    <div className="breakdown-bar-track">
                                        <div
                                            className="breakdown-bar"
                                            style={{ width: `${Math.min(entry.percentageOfExpenses, 100)}%` }}
                                        />
                                    </div>

                                    <div className="breakdown-details">
                                        <span>{entry.percentageOfExpenses.toFixed(1)}% of monthly expenses</span>
                                        <span>{entry.percentageOfIncome.toFixed(1)}% of monthly income</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

