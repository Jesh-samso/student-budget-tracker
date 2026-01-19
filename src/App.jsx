import {BrowserRouter , Routes, Route} from 'react-router-dom';
import { useState,useEffect } from 'react';
import Dashboard from './components/Dashboard';
import AddIncome from './components/AddIncome';
import AddExpense from './components/AddExpense';
import MonthlySummary from './components/MonthlySummary';
import Settings from './components/Settings';

function App() {
  const [incomes,setIncomes]=useState([]);
  const [expenses,setExpenses]=useState([]);
  const [savingsTarget,setSavingsTarget]=useState(0);

  //loads data from localStorage on start
  useEffect (() =>{
    const storedIncomes=JSON.parse(localStorage.getItem("incomes")) || [];
    const storedExpenses=JSON.parse(localStorage.getItem("expenses")) || [];
    const storedTarget=JSON.parse(localStorage.getItem("savingsTarget")) || 0;

    setIncomes(storedIncomes);
    setExpenses(storedExpenses);
    setSavingsTarget(storedTarget);
  }, []);

  //save to localStorage whenever data changes
useEffect(() => {
  localStorage.setItem("incomes", JSON.stringify(incomes));
}, [incomes]);

useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}, [expenses]);

useEffect(() => {
  localStorage.setItem("savingsTarget", JSON.stringify(savingsTarget));
}, [savingsTarget]);

  
  return (
    <BrowserRouter>
      <Routes>
        <Route 
        path='/'
        element={
        <Dashboard 
          incomes={incomes}
          expenses={expenses}
          savingsTarget={savingsTarget}
        />
        } 
        />

        <Route path='/add-income' 
        element={<AddIncome incomes={incomes} setIncomes={setIncomes}/>} />

        <Route path='/add-expense'
        element={<AddExpense expenses={expenses} setExpenses={setExpenses} />} />

        <Route path='/summary' 
        element={<MonthlySummary incomes={incomes} expenses={expenses} />} />

        <Route path='/Settings'
         element=
         {<Settings 
          savingsTarget={savingsTarget}
          setSavingsTarget={setSavingsTarget}
         />
         } 
         />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
