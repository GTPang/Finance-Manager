import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Transactions from './Pages/Transactions';
import Budget from './Pages/Budget';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions/:id" element={<Transactions />} />
        <Route path="/budget/:id" element={<Budget />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
