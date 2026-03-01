import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Reports from "./pages/Reports";
import Teachers from "./pages/Teachers";
import ProspectDetail from "./pages/ProspectDetail";
import Settings from "./pages/Settings";
import Asesores from "./pages/Asesores";
import Login from "./pages/Login"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Administrativas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/prospect/:id" element={<ProspectDetail />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/asesores" element={<Asesores />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;