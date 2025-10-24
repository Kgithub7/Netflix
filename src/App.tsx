import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login.tsx";
import Player from "./pages/Player.tsx";

const App = () => {
  return (
    <Router>
      <SpeedInsights />
      <Analytics />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
      <ToastContainer limit={1} autoClose={3000} pauseOnFocusLoss={false} />
    </Router>
  );
};

export default App;
