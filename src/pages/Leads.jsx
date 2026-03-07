import { useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi"; // Iconos
import CRMLayout from "../layouts/CRMLayout";
import Card from "../components/Card";

const leadsData = [
  {
    id: 1,
    nombre: "Carlos Ramírez",
    carrera: "Ingeniería en Software",
    telefono: "9841234567",
    correo: "carlos@email.com",
    estado: "Prospecto",
    asesor: "María López",
  },
  {
    id: 2,
    nombre: "Ana Torres",
    carrera: "Administración",
    telefono: "9847654321",
    correo: "ana@email.com",
    estado: "Contactado",
    asesor: "Luis Gómez",
  },
  {
    id: 3,
    nombre: "Jorge Díaz",
    carrera: "Derecho",
    telefono: "9841112233",
    correo: "jorge@email.com",
    estado: "Confirmado",
    asesor: "María López",
  },
  {
    id: 4,
    nombre: "Fernanda Ruiz",
    carrera: "Pedagogía",
    telefono: "9844445566",
    correo: "fer@email.com",
    estado: "Inscrito",
    asesor: "Luis Gómez",
  },
];

const estadoColors = {
  Prospecto: "bg-gray-600 text-white",
  Contactado: "bg-blue-600 text-white",
  Confirmado: "bg-yellow-500 text-black",
  Inscrito: "bg-green-600 text-white",
};

function Leads() {
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [pagina, setPagina] = useState(1);

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
      <h1 className="text-2xl font-bold mb-6 text-[#f0c02f]">Prospectos</h1>

      <Card title="Lista de Leads">
        {/* Barra superior con buscador, filtro y botón */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex gap-4 w-full md:w-auto">
            {/* Buscador visual */}
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

            {/* Filtro por estado */}
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

          {/* Botón de nuevo prospecto */}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-[#f0c02f] text-[#1a1a32] font-semibold rounded-lg hover:bg-yellow-400 transition"
            onClick={() => alert("Abrir formulario de nuevo prospecto")}
          >
            <FiPlus /> Nuevo Prospecto
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto bg-[#24244a] rounded-xl">
          <table className="w-full text-left text-white">
            <thead className="bg-[#1f1f3d] text-[#f0c02f]">
              <tr>
                <th className="p-4">Nombre</th>
                <th className="p-4">Carrera</th>
                <th className="p-4">Teléfono</th>
                <th className="p-4">Correo</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Asesor</th>
              </tr>
            </thead>
            <tbody>
              {leadsMostrados.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-gray-700 hover:bg-[#2e2e5a] transition"
                >
                  <td className="p-4">{lead.nombre}</td>
                  <td className="p-4">{lead.carrera}</td>
                  <td className="p-4">{lead.telefono}</td>
                  <td className="p-4">{lead.correo}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${estadoColors[lead.estado]}`}
                    >
                      {lead.estado}
                    </span>
                  </td>
                  <td className="p-4">{lead.asesor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación visual */}
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPaginas)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPagina(index + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                pagina === index + 1
                  ? "bg-[#f0c02f] text-[#1a1a32]"
                  : "bg-[#24244a] text-white hover:bg-[#2e2e5a]"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </Card>
    </CRMLayout>
  );
}

export default Leads;