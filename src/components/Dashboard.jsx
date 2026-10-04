import {Link} from 'react-router-dom';
import {
  getMonthlyIncome,
  getMonthlyExpenses,
  getMonthlyBalance,
  getSavingsStatus,
  getMonthlyExpenseBreakdown,
  getMonthlyTrend,
  formatKES
} from "../utils/calculations";
import '../App.css';

export default function Dashboard({
    incomes,
    expenses,
    savingsTarget,
    darkMode,
    setDarkMode,
    onDeleteIncome,
    onDeleteExpense
}) {
    const totalIncome = getMonthlyIncome(incomes);
    const totalExpenses = getMonthlyExpenses(expenses);
    const balance = getMonthlyBalance(incomes, expenses);
    const savings = getSavingsStatus(incomes, expenses, savingsTarget);
    const expenseBreakdown = getMonthlyExpenseBreakdown(expenses, incomes);
    const trendData = getMonthlyTrend(incomes, expenses);
    const totalMonthlySpent = totalExpenses;
    const spendingRatio = totalIncome > 0 ? (totalMonthlySpent / totalIncome) * 100 : 0;
    const topCategory = expenseBreakdown[0] || null;
    const monthLabel = new Date().toLocaleString('en-US', {
        month: 'long',
        year: 'numeric'
    });
    const peakTrendValue = Math.max(
        ...trendData.map((item) => Math.max(item.income, item.expenses)),
        1
    );
    const recentTransactions = [
        ...incomes.map((item) => ({
            ...item,
            kind: 'income',
            title: item.title || item.source || 'Income',
            subtitle: item.source || 'Income',
            label: 'Income'
        })),
        ...expenses.map((item) => ({
            ...item,
            kind: 'expense',
            title: item.title || item.category || 'Expense',
            subtitle: item.category || 'Expense',
            label: 'Expense'
        }))
    ]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

    const spendingAdvice = totalIncome === 0
        ? 'Add your first income to unlock realistic monthly planning.'
        : totalExpenses === 0
            ? 'Start recording expenses to discover where your money is going.'
            : balance < 0
                ? 'Your spending is above your income. Cut back on flexible categories first.'
                : spendingRatio > 80
                    ? 'You are spending a large share of your income. Keep a close eye on essentials.'
                    : 'You are on a healthy spending pace. Keep tracking to stay consistent.';

    return (
        <div className="dashboard-page">
            <header>
                <div className="brand-group">
                    <div className="brand-mark">SB</div>
                    <div>
                        <p className="brand-tag">Student Budget Tracker</p>
                        <h2>{monthLabel}</h2>
                    </div>
                </div>

                <div className="header-actions">
                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={() => setDarkMode((current) => !current)}
                    >
                        {darkMode ? 'Light mode' : 'Dark mode'}
                    </button>
                    <Link to="/settings" className="settings-link">Settings</Link>
                </div>
            </header>

            <div className="container dashboard">
                <div className="dashboard-hero">
                    <div className="hero-copy">
                        <p className="eyebrow">Budget overview</p>
                        <h1>Keep your spending in control</h1>
                        <p>
                            {totalIncome === 0
                                ? 'Start by adding income and expenses to see how your month is shaping up.'
                                : `You have spent ${spendingRatio.toFixed(1)}% of your income so far this month.`}
                        </p>
                    </div>

                    <div className="hero-summary">
                        <div className="summary-pill">
                            <span>Current balance</span>
                            <strong className={balance >= 0 ? 'status-positive' : 'status-negative'}>
                                {formatKES(balance)}
                            </strong>
                        </div>

                        {topCategory && (
                            <div className="summary-pill highlight">
                                <span>Top expense</span>
                                <strong>{topCategory.category}</strong>
                                <small>{formatKES(topCategory.amount)}</small>
                            </div>
                        )}
                    </div>
                </div>

                <div className="metrics-grid">
                    <div className="metric-card">
                        <h3>Current Balance</h3>
                        <div className={`metric-value ${balance >= 0 ? 'status-positive' : 'status-negative'}`}>
                            {formatKES(balance)}
                        </div>
                        <div className="metric-subtitle">
                            {balance >= 0 ? 'Money left to plan with' : 'This month is running short'}
                        </div>
                    </div>

                    <div className="metric-card">
                        <h3>Monthly Income</h3>
                        <div className="metric-value status-positive">
                            {formatKES(totalIncome)}
                        </div>
                        <div className="metric-subtitle">Expected inflow for the month</div>
                    </div>

                    <div className="metric-card">
                        <h3>Monthly Expenses</h3>
                        <div className="metric-value status-negative">
                            {formatKES(totalExpenses)}
                        </div>
                        <div className="metric-subtitle">Total committed spend this month</div>
                    </div>
                </div>

                <div className="insights-panel">
                    <div className="insight-card">
                        <span className="insight-label">Spending rate</span>
                        <strong>{spendingRatio.toFixed(1)}%</strong>
                        <small>
                            {totalIncome > 0
                                ? `${formatKES(totalExpenses)} spent out of ${formatKES(totalIncome)}`
                                : 'No income recorded yet'}
                        </small>
                    </div>

                    <div className="insight-card">
                        <span className="insight-label">Top category</span>
                        <strong>{topCategory ? topCategory.category : 'No data'}</strong>
                        <small>
                            {topCategory
                                ? `${topCategory.percentageOfExpenses.toFixed(1)}% of total spending`
                                : 'Add expenses to see your biggest category'}
                        </small>
                    </div>

                    <div className="insight-card">
                        <span className="insight-label">Savings status</span>
                        <strong>{savings.status}</strong>
                        <small>
                            {savingsTarget > 0
                                ? savings.reached
                                    ? 'Your goal has been reached.'
                                    : `${formatKES(savings.remaining)} left to reach your target.`
                                : 'Set a savings target in Settings'}
                        </small>
                    </div>
                </div>

                <div className="value-panel">
                    <div className="value-copy">
                        <p className="eyebrow">Smart guidance</p>
                        <h3>What this means for you</h3>
                        <p>{spendingAdvice}</p>
                    </div>

                    <div className="value-actions">
                        <Link to="/add-income" className="secondary-button">Add income</Link>
                        <Link to="/add-expense" className="secondary-button accent">Add expense</Link>
                    </div>
                </div>

                <div className="trend-panel">
                    <div className="section-heading">
                        <h3>Monthly trend</h3>
                        <span>Last 6 months</span>
                    </div>

                    <div className="trend-chart">
                        {trendData.map((item) => (
                            <div className="trend-column" key={item.label}>
                                <div className="trend-bars">
                                    <div
                                        className="trend-bar income-bar"
                                        style={{ height: `${Math.max((item.income / peakTrendValue) * 100, item.income > 0 ? 10 : 0)}%` }}
                                    />
                                    <div
                                        className="trend-bar expense-bar"
                                        style={{ height: `${Math.max((item.expenses / peakTrendValue) * 100, item.expenses > 0 ? 10 : 0)}%` }}
                                    />
                                </div>
                                <span className="trend-label">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="recent-activity">
                    <div className="section-heading">
                        <h3>Recent activity</h3>
                        <span>{recentTransactions.length} latest items</span>
                    </div>

                    <div className="activity-list">
                        {recentTransactions.length === 0 ? (
                            <div className="empty-state">
                                No recent activity yet. Add income or expenses to start building your money history.
                            </div>
                        ) : (
                            recentTransactions.map((entry) => (
                                <div
                                    className={`activity-item ${entry.kind === 'income' ? 'income-row' : 'expense-row'}`}
                                    key={entry.id}
                                >
                                    <div className="activity-main">
                                        <span className={`activity-badge ${entry.kind}`}>
                                            {entry.label}
                                        </span>
                                        <div>
                                            <strong>{entry.title}</strong>
                                            <small>
                                                {entry.subtitle}
                                                {entry.note ? ` • ${entry.note}` : ''}
                                                {' • '}
                                                {new Date(entry.date).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </small>
                                        </div>
                                    </div>

                                    <div className="activity-side">
                                        <div className={`activity-amount ${entry.kind === 'income' ? 'status-positive' : 'status-negative'}`}>
                                            {entry.kind === 'income' ? '+' : '-'}{formatKES(entry.amount)}
                                        </div>

                                        <button
                                            type="button"
                                            className="delete-button"
                                            onClick={() => {
                                                if (entry.kind === 'income') {
                                                    onDeleteIncome(entry.id);
                                                } else {
                                                    onDeleteExpense(entry.id);
                                                }
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
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

                <div className="expense-breakdown-section">
                    <div className="section-heading">
                        <h3>Expense Breakdown</h3>
                        <span>{expenseBreakdown.length} categories</span>
                    </div>

                    {expenseBreakdown.length === 0 ? (
                        <div className="empty-state">
                            No expenses recorded for this month yet. Add an expense to see a detailed spending breakdown.
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