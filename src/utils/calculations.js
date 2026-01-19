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

