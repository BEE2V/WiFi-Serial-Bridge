import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import RobotStatus from "./RobotStatus";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link> | <Link to="/status">Robot Status</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/status" element={<RobotStatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
