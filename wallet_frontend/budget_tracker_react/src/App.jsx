import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Blank from "./pages/Blank";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import MultistepRegister from "./features/auth/MultistepRegister";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./features/auth/authSlice.js";
import Settings from "./pages/Settings/Settings";
import { Accounts } from "./pages/Accounts/Accounts";
import Transactions from "./pages/Transactions/Transactions";
import Categories from "./pages/Categories/Categories";
import LandingLayout from "./pages/Landing/LandingLayout";
import Pricing from "./pages/Landing/landing_components/Pricing";
import Welcome from "./pages/Landing/landing_components/Welcome";

function App() {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="categories" element={<Categories />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/welcome" element={<LandingLayout />}>
        <Route index element={<Welcome />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="register/:id" element={<Register />} />
        {/* <Route path="register/:id" element={<MultistepRegister />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
