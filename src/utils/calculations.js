function isCurrentMonth(date){
    const now =new Date ();
    const d=new Date (date);

    return (
        d.getMonth () === now.getMonth () &&
        d.getFullYear () === now.getFullYear()
    );
}
export function getMonthlyIncome(incomes){
    return incomes
    .filter((item) => isCurrentMonth(item.date))
    .reduce((total,item) =>total + Number(item.amount), 0);
}

export function getMonthlyExpenses (expenses){
    return expenses
    .filter((item) => isCurrentMonth(item.date))
    .reduce ((total,item)=> total + Number(item.amount),0);
}

export function getMonthlyBalance (incomes,expenses){
    return getMonthlyIncome(incomes) - getMonthlyExpenses(expenses);
}

export function getSavingsStatus(incomes,expenses,savingsTarget){
    const totalIncome=getMonthlyIncome(incomes);
    const totalExpenses=getMonthlyExpenses(expenses);
    const balance=totalIncome-totalExpenses;

    if (savingsTarget ===0){
        return{

            status:"No Target Set",
            balance,
            remaining:null,
            reached:false
        };
    }

    if (balance >=savingsTarget){
        return{
            status:"Target Reached",
            balance,
            remaining:0,reached:true
        };
    }

    return{
        status:"Target not Reached",
        balance,
        remaining:savingsTarget-balance,
        reached:false
    };
}

export function formatKES(amount) {
    return `KES ${Number(amount).toLocaleString()}`;
}

export function getMonthlyExpenseBreakdown(expenses, incomes) {
    const monthlyExpenses = expenses.filter((item) => isCurrentMonth(item.date));
    const totalIncome = getMonthlyIncome(incomes);
    const totalExpense = getMonthlyExpenses(expenses);

    const groupedExpenses = monthlyExpenses.reduce((acc, item) => {
        const category = item.category || 'Other';

        if (!acc[category]) {
            acc[category] = {
                category,
                amount: 0,
                count: 0,
            };
        }

        acc[category].amount += Number(item.amount);
        acc[category].count += 1;

        return acc;
    }, {});

    return Object.values(groupedExpenses)
        .map((entry) => ({
            ...entry,
            percentageOfIncome: totalIncome > 0 ? (entry.amount / totalIncome) * 100 : 0,
            percentageOfExpenses: totalExpense > 0 ? (entry.amount / totalExpense) * 100 : 0,
        }))
        .sort((a, b) => b.amount - a.amount);
}

function isSameMonth(date, monthDate) {
    const itemDate = new Date(date);

    return (
        itemDate.getMonth() === monthDate.getMonth() &&
        itemDate.getFullYear() === monthDate.getFullYear()
    );
}

export function getMonthlyTrend(incomes, expenses) {
    const now = new Date();

    return Array.from({ length: 6 }, (_, index) => {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
        const monthLabel = monthDate.toLocaleString('en-US', { month: 'short' });

        const income = incomes
            .filter((item) => isSameMonth(item.date, monthDate))
            .reduce((total, item) => total + Number(item.amount), 0);

        const monthlyExpenses = expenses
            .filter((item) => isSameMonth(item.date, monthDate))
            .reduce((total, item) => total + Number(item.amount), 0);

        return {
            label: monthLabel,
            income,
            expenses: monthlyExpenses,
            balance: income - monthlyExpenses,
        };
    });
}

export function getMonthlyMetrics (incomes,expenses,savingsTarget){
    const income =getMonthlyIncome(incomes);
    const expensesTotal=getMonthlyExpenses(expenses);
    const balance=income - expensesTotal;
    const savings=getSavingsStatus(incomes,expenses,savingsTarget);

    return {
        income,
        expenses:expensesTotal,
        balance,
        savings
    };
}