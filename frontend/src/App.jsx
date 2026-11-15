// Split & Sip: the app, its routes and who is logged in (Lab 9)
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import GroupsPage from "./pages/GroupsPage.jsx"; // Hana H
import ExpensesPage from "./pages/ExpensesPage.jsx"; // Farida
import BalancesPage from "./pages/BalancesPage.jsx"; // Hana Y
import GoalsPage from "./pages/GoalsPage.jsx"; // Sara
import PlansPage from "./pages/PlansPage.jsx"; // Haneen
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  // Who is logged in. Kept in the browser, so a reload keeps it
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  function logIn(session) {
    localStorage.setItem("token", session.token);
    localStorage.setItem("user", JSON.stringify(session.user));
    setUser(session.user);
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <main>
      <Header user={user} onLogOut={logOut} />
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/login" element={<LoginPage onLogIn={logIn} />} />
        <Route path="/register" element={<RegisterPage onLogIn={logIn} />} />
        <Route path="/groups" element={user ? <GroupsPage user={user} /> : <Navigate to="/login" />} />
        <Route path="/groups/:groupId/expenses" element={user ? <ExpensesPage user={user} /> : <Navigate to="/login" />} />
        <Route path="/groups/:groupId/balances" element={user ? <BalancesPage user={user} /> : <Navigate to="/login" />} />
        <Route path="/goals" element={user ? <GoalsPage user={user} /> : <Navigate to="/login" />} />
        <Route path="/plans" element={user ? <PlansPage user={user} /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
