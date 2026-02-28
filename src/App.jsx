import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Landing from "./pages/Landing";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Reports from "./pages/Reports";
import Teachers from "./pages/Teachers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/"      element={<Landing />} />

        {/* Administrativas (usan CRMLayout internamente) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
