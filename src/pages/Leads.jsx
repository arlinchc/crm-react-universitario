import { useEffect, useState, useMemo } from "react";
import { FiSearch, FiPlus, FiEye, FiX } from "react-icons/fi";
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
  // ✅ SOLO UN ESTADO DE LEADS
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
        // ⚠️ MAPEAR CORRECTO
        const mapped = data.map((lead) => ({
          id: lead.id,
          nombre: lead.full_name,
          carrera: lead.program_interest,
          telefono: lead.phone,
          correo: lead.email,
          estado: lead.status, // ya viene en español por el backend
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
      `${l.nombre} ${l.asesor} ${l.carrera}`
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
      const res = await fetch(
        `${API_URL}/${leadSeleccionado.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: nuevoEstado }),
        }
      );

      const updated = await res.json();

      // actualizar UI
      setLeads((prev) =>
        prev.map((l) =>
          l.id === updated.id
            ? { ...l, estado: updated.status }
            : l
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
          <div className="bg-[#1f1f3d] p-6 rounded-xl">

            {/* LOADING */}
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
              <>
                {/* BUSQUEDA */}
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar..."
                  className="mb-4 p-2 w-full"
                />

                {/* TABLA */}
                <table className="w-full text-white">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Carrera</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leadsMostrados.map((l) => (
                      <tr key={l.id}>
                        <td>{l.nombre}</td>
                        <td>{l.carrera}</td>
                        <td>
                          <span className={estadoColors[l.estado]}>
                            {l.estado}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => setLeadSeleccionado(l)}
                          >
                            <FiEye />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </Card>

        {/* MODAL */}
        {leadSeleccionado && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
            <div className="bg-white p-6 rounded">
              <h2>{leadSeleccionado.nombre}</h2>

              {["Prospecto", "Contactado", "Confirmado", "Inscrito"].map((e) => (
                <button
                  key={e}
                  disabled={updatingStatus}
                  onClick={() => handleStatusChange(e)}
                >
                  {e}
                </button>
              ))}

              <button onClick={() => setLeadSeleccionado(null)}>
                <FiX />
              </button>
            </div>
          </div>
        )}
      </div>
    </CRMLayout>
  );
}

export default Leads;