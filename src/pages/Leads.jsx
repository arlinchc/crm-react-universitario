import { useState, useEffect } from "react";
import { FiSearch, FiPlus, FiEye, FiX } from "react-icons/fi";
import CRMLayout from "../layouts/CRMLayout";
import Card from "../components/Card";

const estadoColors = {
  Prospect: "bg-gray-600/20 text-gray-300 border border-gray-500",
  Contacted: "bg-blue-600 text-white",
  Confirmed: "bg-yellow-500 text-black",
  Enrolled: "bg-green-600 text-white",
};

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [leadSeleccionado, setLeadSeleccionado] = useState(null);

  const leadsPorPagina = 10;
  //obtener los datos (leads) del backend
  useEffect(() => {
    fetch("http://localhost:3000/api/leads")
      .then(res => res.json())
      .then(data => setLeads(data))
      .then(err => console.error(err));
  }, []);

  const filteredLeads = leads
    .filter((lead) =>
      `${lead.full_name} ${lead.advisor} ${lead.program_interest}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((lead) =>
      estadoFiltro === "Todos" ? true : <lead className="status"></lead> === estadoFiltro
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
                      <td className="p-4">{lead.full_name}</td>
                      <td className="p-4 text-gray-300">{lead.program_interest}</td>
                      <td className="p-4 text-center">{lead.phone}</td>
                      <td className="p-4 text-gray-300">{lead.email}</td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-4 py-1 rounded-full text-xs font-bold ${estadoColors[lead.status]}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-4">{lead.advisor}</td>
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
                  <p className="font-semibold text-white">{leadSeleccionado.full_name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Carrera</p>
                  <p className="font-semibold text-white">{leadSeleccionado.program_interest}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <p className="font-semibold text-white">{leadSeleccionado.phone}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Correo</p>
                  <p className="font-semibold text-white">{leadSeleccionado.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Estado</p>
                  <span className={`px-4 py-1 rounded-full text-xs font-bold ${estadoColors[leadSeleccionado.estado]}`}>
                    {leadSeleccionado.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Asesor asignado</p>
                  <p className="font-semibold text-white">{leadSeleccionado.advisor}</p>
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