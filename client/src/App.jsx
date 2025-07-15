import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import RobotStatus from "./RobotStatus";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="main-navigation">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="nav-icon">🤖</span>
            <span className="nav-title">Robot Control</span>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              <span className="nav-link-icon">📊</span>
              <span>Dashboard</span>
            </Link>
            <Link to="/status" className="nav-link">
              <span className="nav-link-icon">⚡</span>
              <span>Robot Status</span>
            </Link>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/status" element={<RobotStatus />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
