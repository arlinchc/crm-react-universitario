import { useEffect, useState } from "react";
import { FiSearch, FiPlus, FiEye, FiX, FiEdit2, FiTrash2 } from "react-icons/fi";
import CRMLayout from "../layouts/CRMLayout";
import Card from "../components/Card";
import Swal from "sweetalert2";

const estadoTraduccion = {
  Prospect: "Prospecto",
  Contacted: "Contactado",
  Confirmed: "Confirmado",
  Enrolled: "Inscrito",
};

const estadoColors = {
  Prospect: "bg-blue-600/20 text-blue-300 border border-blue-500",
  Contacted: "bg-yellow-500/20 text-yellow-300 border border-yellow-500",
  Confirmed: "bg-green-600/20 text-green-300 border border-green-500",
  Enrolled: "bg-teal-600/20 text-teal-300 border border-teal-500",
};

const estadoStats = [
  { label: "Prospecto",  key: "Prospect",  color: "bg-blue-500",   text: "text-blue-400"   },
  { label: "Contactado", key: "Contacted", color: "bg-yellow-500", text: "text-yellow-400" },
  { label: "Confirmado", key: "Confirmed", color: "bg-green-500",  text: "text-green-400"  },
  { label: "Inscrito",   key: "Enrolled",  color: "bg-teal-500",   text: "text-teal-400"   },
];

const CARRERAS = [
  "Ingeniería en software y sistemas computacionales",
  "Administración de empresas",
  "Administración de empresas turísticas",
  "Contabilidad financiera",
  "Educación",
  "Comercialización y ventas",
  "Mercadotecnia",
  "Derecho",
];

const formVacio = {
  full_name: "", program_interest: "", phone: "", email: "", status: "Prospect", advisor: "",
};

const AVATAR_COLORS = ["#185FA5","#854F0B","#3B6D11","#0F6E56","#993556","#534AB7"];

function getInitials(name) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function getAvatarColor(name) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

// ── FUERA de Leads() ───────────────────────────────────
function FormularioLead({ form, setForm }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Nombre */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Nombre completo</p>
        <input
          type="text"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-[#13132a] text-white border border-[#2e2e5a] focus:outline-none focus:border-[#f0c02f] focus:ring-1 focus:ring-[#f0c02f]/30 transition text-sm"
        />
      </div>

      {/* Carrera */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Carrera de interés</p>
        <select
          value={form.program_interest}
          onChange={(e) => setForm({ ...form, program_interest: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-[#13132a] text-white border border-[#2e2e5a] focus:outline-none focus:border-[#f0c02f] focus:ring-1 focus:ring-[#f0c02f]/30 transition text-sm"
        >
          <option value="">Selecciona una carrera...</option>
          {CARRERAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Teléfono */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Teléfono</p>
        <input
          type="text"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-[#13132a] text-white border border-[#2e2e5a] focus:outline-none focus:border-[#f0c02f] focus:ring-1 focus:ring-[#f0c02f]/30 transition text-sm"
        />
      </div>

      {/* Email */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Email</p>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-[#13132a] text-white border border-[#2e2e5a] focus:outline-none focus:border-[#f0c02f] focus:ring-1 focus:ring-[#f0c02f]/30 transition text-sm"
        />
      </div>

      {/* Asesor */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Asesor</p>
        <input
          type="text"
          value={form.advisor}
          onChange={(e) => setForm({ ...form, advisor: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-[#13132a] text-white border border-[#2e2e5a] focus:outline-none focus:border-[#f0c02f] focus:ring-1 focus:ring-[#f0c02f]/30 transition text-sm"
        />
      </div>

      {/* Estado */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Estado</p>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-[#13132a] text-white border border-[#2e2e5a] focus:outline-none focus:border-[#f0c02f] focus:ring-1 focus:ring-[#f0c02f]/30 transition text-sm"
        >
          <option value="Prospect">Prospecto</option>
          <option value="Contacted">Contactado</option>
          <option value="Confirmed">Confirmado</option>
          <option value="Enrolled">Inscrito</option>
        </select>
      </div>
    </div>
  );
}

function Modal({ titulo, form, setForm, onGuardar, onCerrar, loading }) {
  const isEdit = !!form.id;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a32] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#2e2e5a] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#2e2e5a]">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isEdit ? "bg-blue-500/20" : "bg-[#f0c02f]/20"}`}>
              {isEdit
                ? <FiEdit2 size={16} className="text-blue-400" />
                : <FiPlus size={16} className="text-[#f0c02f]" />
              }
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">{titulo}</h2>
              <p className="text-xs text-gray-500">Completa los campos del formulario</p>
            </div>
          </div>
          <button
            onClick={onCerrar}
            className="w-8 h-8 rounded-lg bg-[#24244a] hover:bg-[#2e2e5a] text-gray-400 hover:text-white flex items-center justify-center transition"
          >
            <FiX size={15} />
          </button>
        </div>

        {/* Cuerpo */}
        <div className="px-7 py-6">
          <FormularioLead form={form} setForm={setForm} />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-7 py-4 bg-[#13132a] border-t border-[#2e2e5a]">
          <button
            onClick={onCerrar}
            className="px-5 py-2 rounded-xl text-sm text-gray-400 hover:text-white bg-[#24244a] hover:bg-[#2e2e5a] border border-[#2e2e5a] transition"
          >
            Cancelar
          </button>
          <button
            onClick={onGuardar}
            disabled={loading}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-50 flex items-center gap-2 ${
              isEdit
                ? "bg-blue-500 hover:bg-blue-400 text-white"
                : "bg-[#f0c02f] hover:bg-yellow-400 text-[#1a1a32]"
            }`}
          >
            {loading
              ? <><span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span> Guardando...</>
              : isEdit ? <><FiEdit2 size={13} /> Actualizar</> : <><FiPlus size={13} /> Crear prospecto</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

// ── COMPONENTE PRINCIPAL ───────────────────────────────
function Leads() {
  const [leadsData, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const [leadSeleccionado, setLeadSeleccionado] = useState(null);
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [form, setForm] = useState(formVacio);
  const [loading, setLoading] = useState(false);

  const leadsPorPagina = 10;
  const API = "http://localhost:3000/api/leads";

  const fetchLeads = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setLeads(Array.isArray(data) ? data : []))
      .catch((err) => console.error("ERROR API:", err));
  };

  useEffect(() => { fetchLeads(); }, []);

  // ── CREAR ──────────────────────────────────────────────
  const handleCrear = async () => {
    if (!form.full_name || !form.email) {
      Swal.fire({ icon: "warning", title: "Campos requeridos", text: "Nombre y email son obligatorios.", background: "#1f1f3d", color: "#fff", confirmButtonColor: "#f0c02f" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      fetchLeads();
      setModalCrear(false);
      setForm(formVacio);
      Swal.fire({ icon: "success", title: "¡Prospecto creado!", timer: 1800, showConfirmButton: false, background: "#1f1f3d", color: "#fff" });
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo crear el prospecto.", background: "#1f1f3d", color: "#fff", confirmButtonColor: "#f0c02f" });
    } finally { setLoading(false); }
  };

  // ── EDITAR ─────────────────────────────────────────────
  const abrirEditar = (lead) => {
    setForm({ ...lead });
    setModalEditar(true);
  };

  const handleEditar = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      fetchLeads();
      setModalEditar(false);
      setForm(formVacio);
      Swal.fire({ icon: "success", title: "¡Prospecto actualizado!", timer: 1800, showConfirmButton: false, background: "#1f1f3d", color: "#fff" });
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo actualizar.", background: "#1f1f3d", color: "#fff", confirmButtonColor: "#f0c02f" });
    } finally { setLoading(false); }
  };

  // ── ELIMINAR ───────────────────────────────────────────
  const handleEliminar = (lead) => {
    Swal.fire({
      title: `¿Eliminar a ${lead.full_name}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#e53e3e",
      cancelButtonColor: "#4a4a6a",
      background: "#1f1f3d",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${API}/${lead.id}`, { method: "DELETE" });
          fetchLeads();
          Swal.fire({ icon: "success", title: "Eliminado", timer: 1500, showConfirmButton: false, background: "#1f1f3d", color: "#fff" });
        } catch {
          Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar.", background: "#1f1f3d", color: "#fff" });
        }
      }
    });
  };

  // ── FILTROS ────────────────────────────────────────────
  const filteredLeads = leadsData
    .filter((lead) =>
      `${lead.full_name} ${lead.advisor} ${lead.program_interest}`
        .toLowerCase().includes(search.toLowerCase())
    )
    .filter((lead) => estadoFiltro === "" ? true : lead.status === estadoFiltro);

  const totalPaginas = Math.ceil(filteredLeads.length / leadsPorPagina);
  const leadsMostrados = filteredLeads.slice(
    (pagina - 1) * leadsPorPagina, pagina * leadsPorPagina
  );

  return (
    <CRMLayout>
      <div className="min-h-screen bg-[#1a1a32] p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#f0c02f]">Prospectos</h1>

        {/* ── TARJETAS DE ESTADÍSTICAS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {estadoStats.map(({ label, key, color, text }) => (
            <div key={key} className="bg-[#1f1f3d] rounded-xl p-4 border border-[#2e2e5a]">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span className={`w-2 h-2 rounded-full ${color}`}></span>
                {label}
              </div>
              <p className={`text-3xl font-bold ${text}`}>
                {leadsData.filter((l) => l.status === key).length}
              </p>
            </div>
          ))}
        </div>

        <Card title="Lista de Leads" className="bg-[#1a1a32] text-white border-none shadow-none">
          <div className="bg-[#1f1f3d] rounded-2xl p-6 shadow-xl border border-[#2e2e5a]">

            {/* Barra superior */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-72">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, asesor o carrera..."
                    className="pl-10 pr-4 py-2 rounded-lg bg-[#24244a] text-white border border-gray-600 focus:outline-none focus:border-[#f0c02f] w-full text-sm"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPagina(1); }}
                  />
                </div>
                <select
                  className="px-4 py-2 rounded-lg bg-[#24244a] text-white border border-gray-600 focus:outline-none focus:border-[#f0c02f] text-sm"
                  value={estadoFiltro}
                  onChange={(e) => { setEstadoFiltro(e.target.value); setPagina(1); }}
                >
                  <option value="">Todos</option>
                  <option value="Prospect">Prospecto</option>
                  <option value="Contacted">Contactado</option>
                  <option value="Confirmed">Confirmado</option>
                  <option value="Enrolled">Inscrito</option>
                </select>
              </div>
              <button
                onClick={() => { setForm(formVacio); setModalCrear(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-[#f0c02f] text-[#1a1a32] font-semibold rounded-lg hover:bg-yellow-400 transition text-sm"
              >
                <FiPlus /> Nuevo Prospecto
              </button>
            </div>

            {/* Tabla */}
            <div className="overflow-hidden rounded-xl border border-[#2e2e5a]">
              <table className="w-full text-left text-white border-collapse">
                <thead className="bg-[#24244a]">
                  <tr>
                    {["Nombre","Carrera","Teléfono","Email","Estado","Asesor","Acciones"].map((h) => (
                      <th key={h} className="p-4 text-xs font-medium uppercase tracking-wider text-gray-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2e2e5a] bg-[#1f1f3d]">
                  {leadsMostrados.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center p-8 text-gray-500 text-sm">
                        No hay prospectos registrados
                      </td>
                    </tr>
                  ) : (
                    leadsMostrados.map((lead) => {
                      const color = getAvatarColor(lead.full_name);
                      const advColor = getAvatarColor(lead.advisor);
                      return (
                        <tr key={lead.id} className="hover:bg-[#2a2a50] transition-colors duration-150">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                                style={{ backgroundColor: `${color}22`, color }}
                              >
                                {getInitials(lead.full_name)}
                              </div>
                              <span className="font-medium text-sm">{lead.full_name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-400 text-sm">{lead.program_interest}</td>
                          <td className="p-4 text-gray-400 text-sm tabular-nums">{lead.phone}</td>
                          <td className="p-4 text-gray-400 text-sm truncate max-w-[160px]">{lead.email}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${estadoColors[lead.status]}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
                              {estadoTraduccion[lead.status] || lead.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-semibold flex-shrink-0"
                                style={{ backgroundColor: `${advColor}22`, color: advColor }}
                              >
                                {getInitials(lead.advisor)}
                              </div>
                              <span className="text-gray-400 text-sm">{lead.advisor}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setLeadSeleccionado(lead)}
                                className="w-7 h-7 rounded-lg border border-[#2e2e5a] bg-[#24244a] hover:bg-yellow-500/20 hover:border-yellow-500/50 text-yellow-400 flex items-center justify-center transition-all duration-150 hover:scale-105"
                                title="Ver"
                              >
                                <FiEye size={13} />
                              </button>
                              <button
                                onClick={() => abrirEditar(lead)}
                                className="w-7 h-7 rounded-lg border border-[#2e2e5a] bg-[#24244a] hover:bg-blue-500/20 hover:border-blue-500/50 text-blue-400 flex items-center justify-center transition-all duration-150 hover:scale-105"
                                title="Editar"
                              >
                                <FiEdit2 size={13} />
                              </button>
                              <button
                                onClick={() => handleEliminar(lead)}
                                className="w-7 h-7 rounded-lg border border-[#2e2e5a] bg-[#24244a] hover:bg-red-500/20 hover:border-red-500/50 text-red-400 flex items-center justify-center transition-all duration-150 hover:scale-105"
                                title="Eliminar"
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer paginación */}
            <div className="flex justify-between items-center mt-5">
              <p className="text-sm text-gray-500">
                {filteredLeads.length} registro{filteredLeads.length !== 1 ? "s" : ""} encontrado{filteredLeads.length !== 1 ? "s" : ""}
              </p>
              <div className="flex gap-2">
                {[...Array(totalPaginas)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPagina(index + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                      pagina === index + 1
                        ? "bg-[#f0c02f] text-[#1a1a32]"
                        : "bg-[#24244a] text-gray-400 hover:bg-[#2e2e5a]"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* MODAL VER */}
        {leadSeleccionado && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a32] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#2e2e5a] overflow-hidden">
              <div className="flex items-center justify-between px-7 py-5 border-b border-[#2e2e5a]">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0"
                    style={{ backgroundColor: `${getAvatarColor(leadSeleccionado.full_name)}22`, color: getAvatarColor(leadSeleccionado.full_name) }}
                  >
                    {getInitials(leadSeleccionado.full_name)}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">{leadSeleccionado.full_name}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${estadoColors[leadSeleccionado.status]}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
                      {estadoTraduccion[leadSeleccionado.status] || leadSeleccionado.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setLeadSeleccionado(null)}
                  className="w-8 h-8 rounded-lg bg-[#24244a] hover:bg-[#2e2e5a] text-gray-400 hover:text-white flex items-center justify-center transition"
                >
                  <FiX size={15} />
                </button>
              </div>
              <div className="px-7 py-6 grid md:grid-cols-2 gap-4">
                {[
                  ["Carrera de interés", leadSeleccionado.program_interest],
                  ["Teléfono",           leadSeleccionado.phone],
                  ["Correo electrónico", leadSeleccionado.email],
                  ["Asesor asignado",    leadSeleccionado.advisor],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[#13132a] rounded-xl p-4 border border-[#2e2e5a]">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-sm font-medium text-white">{value || "—"}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3 px-7 py-4 bg-[#13132a] border-t border-[#2e2e5a]">
                <button
                  onClick={() => { setLeadSeleccionado(null); abrirEditar(leadSeleccionado); }}
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-blue-500 hover:bg-blue-400 text-white flex items-center gap-2 transition"
                >
                  <FiEdit2 size={13} /> Editar
                </button>
                <button
                  onClick={() => setLeadSeleccionado(null)}
                  className="px-5 py-2 rounded-xl text-sm text-gray-400 hover:text-white bg-[#24244a] hover:bg-[#2e2e5a] border border-[#2e2e5a] transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL CREAR */}
        {modalCrear && (
          <Modal
            titulo="Nuevo Prospecto"
            form={form}
            setForm={setForm}
            onGuardar={handleCrear}
            onCerrar={() => { setModalCrear(false); setForm(formVacio); }}
            loading={loading}
          />
        )}j

        {/* MODAL EDITAR */}
        {modalEditar && (
          <Modal
            titulo="Editar Prospecto"
            form={form}
            setForm={setForm}
            onGuardar={handleEditar}
            onCerrar={() => { setModalEditar(false); setForm(formVacio); }}
            loading={loading}
          />
        )}
      </div>
    </CRMLayout>
  );
}

export default Leads;