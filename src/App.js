import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Transactions from './Pages/Transactions';
import Budget from './Pages/Budget';
import { ToastContainer } from 'react-toastify';
import TransactionSetup from './Pages/TransactionSetup';
import BudgetSetup from './Pages/BudgetSetup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/transactions/:id" element={<Transactions />} />
        <Route path="/transaction-add" element={<TransactionSetup pageType="Add" />} />
        <Route path="/transaction-edit/:id" element={<TransactionSetup pageType="Edit" />} />

        <Route path="/budget/:id" element={<Budget />} />
        <Route path="/budget-add" element={<BudgetSetup pageType="Add" />} />
        <Route path="/budget-edit/:id" element={<BudgetSetup pageType="Edit" />} />

        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
