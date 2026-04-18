import { useEffect, useState } from "react";
import { FiSearch, FiEye, FiX } from "react-icons/fi";
import CRMLayout from "../layouts/CRMLayout";
import Card from "../components/Card";

const API_URL = "http://localhost:3000/api/leads";

const estadoColors = {
  Prospecto: "bg-gray-600/20 text-gray-300 border border-gray-500",
  Contactado: "bg-blue-600 text-white",
  Confirmado: "bg-yellow-500 text-black",
  Inscrito: "bg-green-600 text-white",
};

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [leadSeleccionado, setLeadSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // ================== FETCH ==================
  useEffect(() => {
    setLoading(true);

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la API");
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((lead) => ({
          id: lead.id,
          nombre: lead.full_name,
          carrera: lead.program_interest,
          telefono: lead.phone,
          correo: lead.email,
          estado: lead.status,
          asesor: lead.advisor,
        }));

        setLeads(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError("Error cargando leads");
        setLoading(false);
      });
  }, []);

  // ================== FILTROS ==================
  const leadsPorPagina = 10;

  const filteredLeads = leads
    .filter((l) =>
      `${l.nombre} ${l.asesor || ""} ${l.carrera || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((l) =>
      estadoFiltro === "Todos" ? true : l.estado === estadoFiltro
    );

  const totalPaginas = Math.ceil(filteredLeads.length / leadsPorPagina);

  const leadsMostrados = filteredLeads.slice(
    (pagina - 1) * leadsPorPagina,
    pagina * leadsPorPagina
  );

  // ================== CAMBIO STATUS ==================
  const handleStatusChange = async (nuevoEstado) => {
    if (!leadSeleccionado) return;

    setUpdatingStatus(true);

    try {
      const res = await fetch(`${API_URL}/${leadSeleccionado.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nuevoEstado }),
      });

      const updated = await res.json();

      setLeads((prev) =>
        prev.map((l) =>
          l.id === updated.id ? { ...l, estado: updated.status } : l
        )
      );

      setLeadSeleccionado((prev) => ({
        ...prev,
        estado: updated.status,
      }));
    } catch (err) {
      console.error(err);
    }

    setUpdatingStatus(false);
  };

  // ================== RENDER ==================
  return (
    <CRMLayout>
      <div className="min-h-screen bg-[#1a1a32] p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#f0c02f]">
          Prospectos
        </h1>

        <Card>
          <div className="bg-[#1f1f3d] p-6 rounded-xl border border-[#2e2e5a]">

            {/* LOADING */}
            {loading && (
              <p className="text-center text-gray-400 py-6">
                Cargando prospectos...
              </p>
            )}

            {/* ERROR */}
            {error && (
              <p className="text-center text-red-400 py-6">{error}</p>
            )}

            {!loading && !error && (
              <>
                {/* BUSQUEDA + FILTRO */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPagina(1);
                    }}
                    placeholder="Buscar..."
                    className="p-2 w-full md:w-72 rounded bg-[#24244a] text-white border border-gray-600"
                  />

                  <select
                    value={estadoFiltro}
                    onChange={(e) => {
                      setEstadoFiltro(e.target.value);
                      setPagina(1);
                    }}
                    className="p-2 rounded bg-[#24244a] text-white border border-gray-600"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Prospecto">Prospecto</option>
                    <option value="Contactado">Contactado</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Inscrito">Inscrito</option>
                  </select>
                </div>

                {/* TABLA */}
                <div className="overflow-hidden rounded-xl border border-[#2e2e5a]">
                  <table className="w-full text-left text-white border-collapse">
                    <thead className="bg-[#24244a] text-[#f0c02f]">
                      <tr>
                        <th className="p-4">Nombre</th>
                        <th className="p-4">Carrera</th>
                        <th className="p-4 text-center">Estado</th>
                        <th className="p-4 text-center">Acciones</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#2e2e5a] bg-[#1f1f3d]">
                      {leadsMostrados.map((l) => (
                        <tr
                          key={l.id}
                          className="hover:bg-[#2e2e5a] transition"
                        >
                          <td className="p-4">{l.nombre}</td>

                          <td className="p-4 text-gray-300">
                            {l.carrera}
                          </td>

                          <td className="p-4 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${estadoColors[l.estado]}`}
                            >
                              {l.estado}
                            </span>
                          </td>

                          <td className="p-4 text-center">
                            <button
                              onClick={() => setLeadSeleccionado(l)}
                              className="bg-[#f0c02f] p-2 rounded-lg hover:bg-yellow-400 transition"
                            >
                              <FiEye className="text-[#1a1a32]" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* PAGINACIÓN */}
                <div className="flex justify-center mt-6 gap-2">
                  {[...Array(totalPaginas)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setPagina(index + 1)}
                      className={`w-10 h-10 rounded-lg font-bold ${
                        pagina === index + 1
                          ? "bg-[#f0c02f] text-[#1a1a32]"
                          : "bg-[#24244a] text-white"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </Card>

        {/* MODAL */}
        {leadSeleccionado && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-[#1a1a32] p-6 rounded-xl border border-[#2e2e5a] w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">
                {leadSeleccionado.nombre}
              </h2>

              <div className="flex flex-wrap gap-2 mb-4">
                {["Prospecto", "Contactado", "Confirmado", "Inscrito"].map(
                  (e) => (
                    <button
                      key={e}
                      disabled={updatingStatus}
                      onClick={() => handleStatusChange(e)}
                      className="px-3 py-2 rounded bg-white text-black text-sm font-semibold"
                    >
                      {e}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => setLeadSeleccionado(null)}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={22} />
              </button>
            </div>
          </div>
        )}
      </div>
    </CRMLayout>
  );
}

export default Leads;