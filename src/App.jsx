import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import AddIncome from './components/AddIncome';
import AddExpense from './components/AddExpense';
import MonthlySummary from './components/MonthlySummary';
import Settings from './components/Settings';

function App() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savingsTarget, setSavingsTarget] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('budgetTheme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('budgetTheme', darkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      const storedIncomes = JSON.parse(localStorage.getItem('incomes') || '[]');
      const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
      const storedTarget = JSON.parse(localStorage.getItem('savingsTarget') || '0');

      setIncomes(Array.isArray(storedIncomes) ? storedIncomes : []);
      setExpenses(Array.isArray(storedExpenses) ? storedExpenses : []);
      setSavingsTarget(typeof storedTarget === 'number' ? storedTarget : 0);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      setIncomes([]);
      setExpenses([]);
      setSavingsTarget(0);
      localStorage.removeItem('incomes');
      localStorage.removeItem('expenses');
      localStorage.removeItem('savingsTarget');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('savingsTarget', JSON.stringify(savingsTarget));
  }, [savingsTarget]);

  const removeIncome = (id) => {
    setIncomes((currentIncomes) => currentIncomes.filter((item) => item.id !== id));
  };

  const removeExpense = (id) => {
    setExpenses((currentExpenses) => currentExpenses.filter((item) => item.id !== id));
  };

  return (
    <div className={`app-shell ${darkMode ? 'dark' : ''}`}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Dashboard
                incomes={incomes}
                expenses={expenses}
                savingsTarget={savingsTarget}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                onDeleteIncome={removeIncome}
                onDeleteExpense={removeExpense}
              />
            }
          />

          <Route
            path='/add-income'
            element={<AddIncome incomes={incomes} setIncomes={setIncomes} />}
          />

          <Route
            path='/add-expense'
            element={<AddExpense expenses={expenses} setExpenses={setExpenses} />}
          />

          <Route
            path='/summary'
            element={
              <MonthlySummary
                incomes={incomes}
                expenses={expenses}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          <Route
            path='/settings'
            element={
              <Settings
                savingsTarget={savingsTarget}
                setSavingsTarget={setSavingsTarget}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
