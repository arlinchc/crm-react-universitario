import { Link } from "react-router-dom";
import {
  FiHome,
  FiInfo,
  FiMail,
  FiGrid,
  FiUsers,
  FiBarChart2,
  FiSettings
} from "react-icons/fi";

function Sidebar() {
  return (
    <aside className="w-64 bg-[#1a1a32] text-white min-h-screen p-6 flex flex-col">

      <h2 className="text-xl font-bold mb-8">
        CRM UNID
      </h2>

      {/* Sección pública */}
      <div className="mb-6">
        <p className="text-slate-400 text-sm mb-2 uppercase tracking-wide">
          Sitio
        </p>

        <nav className="flex flex-col gap-3">

          <Link
            to="/"
            className="flex items-center gap-2 hover:text-[#f0c02f] transition"
          >
            <FiHome /> Inicio
          </Link>

          <Link
            to="/about"
            className="flex items-center gap-2 hover:text-[#f0c02f] transition"
          >
            <FiInfo /> Acerca de
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-2 hover:text-[#f0c02f] transition"
          >
            <FiMail /> Contacto
          </Link>

        </nav>
      </div>

      {/* Sección administrativa */}
      <div className="mt-6">
        <p className="text-slate-400 text-sm mb-2 uppercase tracking-wide">
          Administración
        </p>

        <nav className="flex flex-col gap-3">

          <Link
            to="/dashboard"
            className="flex items-center gap-2 hover:text-[#f0c02f] transition"
          >
            <FiGrid /> Dashboard
          </Link>

          <Link
            to="/leads"
            className="flex items-center gap-2 hover:text-[#f0c02f] transition"
          >
            <FiUsers /> Leads
          </Link>

          <Link
            to="/asesores"
            className="flex items-center gap-2 hover:text-sky-400 transition"
          >
            <FiUsers /> Asesores
          </Link>

          <Link
            to="/reports"
            className="flex items-center gap-2 hover:text-[#f0c02f] transition"
          >
            <FiBarChart2 /> Reportes
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-2 hover:text-[#f0c02f] transition"
          >
            <FiSettings /> Configuración
          </Link>

        </nav>
      </div>

      <div className="flex-1" />

      {/* Footer */}
      <div className="text-slate-400 text-sm">
        Universidad · Captación
      </div>

    </aside>
  );
}

export default Sidebar;