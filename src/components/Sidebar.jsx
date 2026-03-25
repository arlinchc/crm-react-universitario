import { Link } from "react-router-dom";


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
          <Link to="/" className="hover:text-[#f0c02f] transition">
            Inicio
          </Link>
          <Link to="/about" className="hover:text-[#f0c02f] transition">
            Acerca de
          </Link>
          <Link to="/contact" className="hover:text-[#f0c02f] transition">
            Contacto
          </Link>
        </nav>
      </div>

      {/* Sección administrativa */}
      <div className="mt-6">
        <p className="text-slate-400 text-sm mb-2 uppercase tracking-wide">
          Administración
        </p>
        <nav className="flex flex-col gap-3">
          <Link to="/dashboard" className="hover:text-[#f0c02f] transition">
            Dashboard
          </Link>
          <Link to="/leads" className="hover:text-[#f0c02f] transition">
            Leads
          </Link>
          <Link to="/asesores" className="hover:text-sky-400 transition">
            Asesores
          </Link>
          <Link to="/reports" className="hover:text-[#f0c02f] transition">
            Reportes
          </Link>
          <Link to="/settings" className="hover:text-[#f0c02f] transition">
            Configuración
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
