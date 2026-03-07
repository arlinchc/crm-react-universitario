import { useState } from "react";
import { FiSearch, FiPlus, FiEye, FiX } from "react-icons/fi";
import CRMLayout from "../layouts/CRMLayout";
import Card from "../components/Card";

const leadsData = [
  { id: 1, nombre: "Carlos Ramírez", carrera: "Ingeniería en Software", telefono: "9841234567", correo: "carlos@email.com", estado: "Prospecto", asesor: "María López" },
  { id: 2, nombre: "Ana Torres", carrera: "Administración", telefono: "9847654321", correo: "ana@email.com", estado: "Contactado", asesor: "Luis Gómez" },
  { id: 3, nombre: "Jorge Díaz", carrera: "Derecho", telefono: "9841112233", correo: "jorge@email.com", estado: "Confirmado", asesor: "María López" },
  { id: 4, nombre: "Fernanda Ruiz", carrera: "Pedagogía", telefono: "9844445566", correo: "fer@email.com", estado: "Inscrito", asesor: "Luis Gómez" },
];

const estadoColors = {
  Prospecto: "bg-gray-600/20 text-gray-300 border border-gray-500",
  Contactado: "bg-blue-600 text-white",
  Confirmado: "bg-yellow-500 text-black",
  Inscrito: "bg-green-600 text-white",
};

function Leads() {
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [leadSeleccionado, setLeadSeleccionado] = useState(null);

  const leadsPorPagina = 10;

  const filteredLeads = leadsData
    .filter((lead) =>
      `${lead.nombre} ${lead.asesor} ${lead.carrera}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((lead) =>
      estadoFiltro === "Todos" ? true : lead.estado === estadoFiltro
    );

  const totalPaginas = Math.ceil(filteredLeads.length / leadsPorPagina);

  const leadsMostrados = filteredLeads.slice(
    (pagina - 1) * leadsPorPagina,
    pagina * leadsPorPagina
  );

  return (
    <CRMLayout>
      <div className="min-h-screen bg-[#1a1a32] p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#f0c02f]">
          Prospectos
        </h1>

        <Card
          title="Lista de Leads"
          className="bg-[#1a1a32] text-white border-none shadow-none"
        >
          <div className="bg-[#1f1f3d] rounded-2xl p-6 shadow-xl border border-[#2e2e5a]">

            {/* Barra superior */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-72">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, asesor o carrera..."
                    className="pl-10 pr-4 py-2 rounded-lg bg-[#24244a] text-white border border-gray-600 focus:outline-none focus:border-[#f0c02f] w-full"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPagina(1);
                    }}
                  />
                </div>

                <select
                  className="px-4 py-2 rounded-lg bg-[#24244a] text-white border border-gray-600 focus:outline-none focus:border-[#f0c02f]"
                  value={estadoFiltro}
                  onChange={(e) => {
                    setEstadoFiltro(e.target.value);
                    setPagina(1);
                  }}
                >
                  <option>Todos</option>
                  <option>Prospecto</option>
                  <option>Contactado</option>
                  <option>Confirmado</option>
                  <option>Inscrito</option>
                </select>
              </div>

              <button
                className="flex items-center gap-2 px-4 py-2 bg-[#f0c02f] text-[#1a1a32] font-semibold rounded-lg hover:bg-yellow-400 transition"
              >
                <FiPlus /> Nuevo Prospecto
              </button>
            </div>

            {/* Tabla */}
            <div className="overflow-hidden rounded-xl border border-[#2e2e5a]">
              <table className="w-full text-left text-white border-collapse">
                <thead className="bg-[#24244a] text-[#f0c02f]">
                  <tr>
                    <th className="p-4">Nombre</th>
                    <th className="p-4">Carrera</th>
                    <th className="p-4 text-center">Teléfono</th>
                    <th className="p-4">Correo</th>
                    <th className="p-4 text-center">Estado</th>
                    <th className="p-4">Asesor</th>
                    <th className="p-4 text-center">Vista</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2e2e5a] bg-[#1f1f3d]">
                  {leadsMostrados.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#2e2e5a] transition"
                    >
                      <td className="p-4">{lead.nombre}</td>
                      <td className="p-4 text-gray-300">{lead.carrera}</td>
                      <td className="p-4 text-center">{lead.telefono}</td>
                      <td className="p-4 text-gray-300">{lead.correo}</td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-4 py-1 rounded-full text-xs font-bold ${estadoColors[lead.estado]}`}
                        >
                          {lead.estado}
                        </span>
                      </td>
                      <td className="p-4">{lead.asesor}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setLeadSeleccionado(lead)}
                          className="bg-[#f0c02f] border border-yellow-400 p-2 rounded-lg hover:bg-yellow-400 transition-all duration-200 hover:scale-105 shadow-md"
                        >
                          <FiEye className="text-[#1a1a32]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-6 gap-2">
              {[...Array(totalPaginas)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPagina(index + 1)}
                  className={`w-10 h-10 rounded-lg font-bold transition ${pagina === index + 1
                    ? "bg-[#f0c02f] text-[#1a1a32]"
                    : "bg-[#24244a] text-white hover:bg-gray-600"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* MODAL VISTA DETALLE */}
        {leadSeleccionado && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#1f1f3d] w-full max-w-3xl rounded-2xl p-8 shadow-2xl border border-[#2e2e5a] relative">

              <button
                onClick={() => setLeadSeleccionado(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <FiX size={20} />
              </button>

              <h2 className="text-2xl font-bold text-[#f0c02f] mb-6">
                Perfil del Prospecto
              </h2>

              <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <p className="text-sm text-gray-400">Nombre</p>
                  <p className="font-semibold text-white">{leadSeleccionado.nombre}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Carrera</p>
                  <p className="font-semibold text-white">{leadSeleccionado.carrera}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <p className="font-semibold text-white">{leadSeleccionado.telefono}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Correo</p>
                  <p className="font-semibold text-white">{leadSeleccionado.correo}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Estado</p>
                  <span className={`px-4 py-1 rounded-full text-xs font-bold ${estadoColors[leadSeleccionado.estado]}`}>
                    {leadSeleccionado.estado}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Asesor asignado</p>
                  <p className="font-semibold text-white">{leadSeleccionado.asesor}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CRMLayout>
  );
}

export default Leads;