import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import BoardDetailPage from "./pages/BoardDetailPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <DashboardPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/board/:boardId"
          element={
            <ProtectedRoutes>
              <BoardDetailPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
