import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiEye, FiX } from "react-icons/fi";
import CRMLayout from "../layouts/CRMLayout";
import Card from "../components/Card";

const API_URL = "https://crm-react-universitario.onrender.com/api/leads";

const STATUSES = ["Prospecto", "Contactado", "Confirmado", "Inscrito"];

const estadoColors = {
  Prospecto: "bg-gray-600/20 text-gray-300 border border-gray-500",
  Contactado: "bg-blue-600 text-white",
  Confirmado: "bg-yellow-500 text-black",
  Inscrito: "bg-green-600 text-white",
};

const getLeadProfile = (lead) => {
  if (!lead) return null;

  const createdAt = lead.created_at
    ? String(lead.created_at).slice(0, 10)
    : "—";

  const firstName = (lead.full_name || "").split(" ")[0] || "Prospecto";

  return {
    ...lead,
    profileId: `P-${String(lead.id).padStart(4, "0")}`,
    fechaRegistro: createdAt,
    ciudad:
      lead.program_interest === "Marketing"
        ? "Playa del Carmen, Solidaridad"
        : "Cancún, Benito Juárez",
    origen:
      lead.program_interest === "Marketing" ? "Instagram Ads" : "Facebook Ads",
    interes:
      lead.program_interest === "Marketing"
        ? "Clase de prueba"
        : "Asesoría de admisión",
    academia: {
      nivel: "Universidad",
      institucion: "UNID",
      carrera: lead.program_interest,
      semestre: lead.program_interest === "Marketing" ? "6°" : "4°",
      modalidad: "Presencial",
      horario:
        lead.program_interest === "Marketing" ? "Matutino" : "Vespertino",
    },
    notas: [
      `${firstName} solicitó seguimiento directo con ${lead.advisor}.`,
      `Interés principal registrado: ${
        lead.program_interest === "Marketing"
          ? "clase de prueba"
          : "proceso de admisión"
      }.`,
    ],
    timeline: [
      {
        date: createdAt,
        title: "Registro del prospecto",
        description: `Se registró en CRM con interés en ${lead.program_interest}.`,
      },
      {
        date: createdAt,
        title: "Asignación de asesor",
        description: `Se asignó seguimiento inicial a ${lead.advisor}.`,
      },
      {
        date: createdAt,
        title: "Estado actual",
        description: `El prospecto se encuentra actualmente como ${(lead.status || "").toLowerCase()}.`,
      },
    ],
  };
};

function TimelineItem({ date, title, description }) {
  return (
    <div className="relative pl-8 pb-6 last:pb-0">
      <div className="absolute left-2 top-1 w-2 h-2 rounded-full bg-blue-500" />
      <div className="absolute left-3 top-3 bottom-0 w-px bg-[#3b3b71]" />
      <p className="text-xs text-gray-400">{date}</p>
      <p className="font-semibold text-white">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [leadSeleccionado, setLeadSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const leadsPorPagina = 10;

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la API");
        return res.json();
      })
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error cargando leads");
        setLoading(false);
      });
  }, []);

  const handleOpenLead = async (lead) => {
    try {
      const res = await fetch(`${API_URL}/${lead.id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLeadSeleccionado(data);
    } catch {
      setLeadSeleccionado(lead);
    }
  };

  const handleStatusChange = async (nuevoEstado) => {
    if (!leadSeleccionado || updatingStatus) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`${API_URL}/${leadSeleccionado.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nuevoEstado }),
      });
      const updated = await res.json();
      setLeadSeleccionado(updated);
      setLeads((prev) =>
        prev.map((l) => (l.id === updated.id ? { ...l, ...updated } : l))
      );
    } catch (err) {
      console.error(err);
    }
    setUpdatingStatus(false);
  };

  const filteredLeads = leads
    .filter((l) =>
      `${l.full_name} ${l.advisor || ""} ${l.program_interest || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((l) =>
      estadoFiltro === "Todos" ? true : l.status === estadoFiltro
    );

  const totalPaginas = Math.ceil(filteredLeads.length / leadsPorPagina);
  const leadsMostrados = filteredLeads.slice(
    (pagina - 1) * leadsPorPagina,
    pagina * leadsPorPagina
  );

  const perfilSeleccionado = useMemo(
    () => getLeadProfile(leadSeleccionado),
    [leadSeleccionado]
  );

  return (
    <CRMLayout>
      <div className="min-h-screen bg-[#1a1a32] p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#f0c02f]">Prospectos</h1>

        <Card>
          <div className="bg-[#1f1f3d] p-6 rounded-xl border border-[#2e2e5a]">

            {loading && (
              <p className="text-center text-gray-400 py-6">Cargando prospectos...</p>
            )}
            {error && (
              <p className="text-center text-red-400 py-6">{error}</p>
            )}

            {!loading && !error && (
              <>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative w-full md:w-72">
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setPagina(1); }}
                      placeholder="Buscar por nombre, asesor o carrera..."
                      className="pl-10 pr-4 py-2 w-full rounded-lg bg-[#24244a] text-white border border-gray-600 focus:outline-none focus:border-[#f0c02f]"
                    />
                  </div>
                  <select
                    value={estadoFiltro}
                    onChange={(e) => { setEstadoFiltro(e.target.value); setPagina(1); }}
                    className="p-2 rounded-lg bg-[#24244a] text-white border border-gray-600 focus:outline-none focus:border-[#f0c02f]"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Prospecto">Prospecto</option>
                    <option value="Contactado">Contactado</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Inscrito">Inscrito</option>
                  </select>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#2e2e5a]">
                  <table className="w-full text-left text-white border-collapse">
                    <thead className="bg-[#24244a] text-[#f0c02f]">
                      <tr>
                        <th className="p-4">Nombre</th>
                        <th className="p-4">Carrera</th>
                        <th className="p-4 text-center">Teléfono</th>
                        <th className="p-4">Email</th>
                        <th className="p-4 text-center">Estado</th>
                        <th className="p-4">Asesor</th>
                        <th className="p-4 text-center">Vista</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2e2e5a] bg-[#1f1f3d]">
                      {leadsMostrados.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center p-6 text-gray-400">
                            No hay prospectos registrados
                          </td>
                        </tr>
                      ) : (
                        leadsMostrados.map((l) => (
                          <tr key={l.id} className="hover:bg-[#2e2e5a] transition">
                            <td className="p-4">{l.full_name}</td>
                            <td className="p-4 text-gray-300">{l.program_interest}</td>
                            <td className="p-4 text-center">{l.phone}</td>
                            <td className="p-4 text-gray-300">{l.email}</td>
                            <td className="p-4 text-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${estadoColors[l.status]}`}>
                                {l.status}
                              </span>
                            </td>
                            <td className="p-4">{l.advisor}</td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleOpenLead(l)}
                                className="bg-[#f0c02f] border border-yellow-400 p-2 rounded-lg hover:bg-yellow-400 transition-all duration-200 hover:scale-105 shadow-md"
                              >
                                <FiEye className="text-[#1a1a32]" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center mt-6 gap-2">
                  {[...Array(totalPaginas)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setPagina(index + 1)}
                      className={`w-10 h-10 rounded-lg font-bold transition ${
                        pagina === index + 1
                          ? "bg-[#f0c02f] text-[#1a1a32]"
                          : "bg-[#24244a] text-white hover:bg-gray-600"
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

        {perfilSeleccionado && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a32] w-full max-w-7xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl border border-[#2e2e5a] relative">

              <button
                onClick={() => setLeadSeleccionado(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
              >
                <FiX size={22} />
              </button>

              <div className="p-8 space-y-6">

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-400">Perfil detallado</p>
                    <h2 className="text-4xl font-bold text-white">
                      {perfilSeleccionado.full_name}
                    </h2>
                    <p className="text-sm text-gray-400 mt-2">
                      ID: {perfilSeleccionado.profileId} • Registro:{" "}
                      {perfilSeleccionado.fechaRegistro} • Asesor:{" "}
                      {perfilSeleccionado.advisor}
                    </p>
                  </div>
                  <span className={`self-start px-4 py-2 rounded-full text-sm font-bold ${estadoColors[perfilSeleccionado.status]}`}>
                    {perfilSeleccionado.status}
                  </span>
                </div>

                <div className="bg-[#181836] border-y border-[#2e2e5a] px-6 py-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Estado del prospecto</h3>
                  <div className="flex flex-wrap gap-3">
                    {STATUSES.map((estado) => (
                      <button
                        key={estado}
                        type="button"
                        disabled={updatingStatus}
                        onClick={() => handleStatusChange(estado)}
                        className={`px-4 py-3 rounded-xl text-sm font-semibold border transition ${
                          perfilSeleccionado.status === estado
                            ? "bg-[#0f1730] text-white border-[#0f1730]"
                            : "bg-white text-gray-700 border-gray-200"
                        } ${updatingStatus ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
                      >
                        {estado}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-4">
                    Selecciona un estado para visualizar el cambio.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">

                    <div className="bg-[#181836] rounded-2xl border border-[#2e2e5a] p-6">
                      <h3 className="text-2xl font-bold text-white mb-6">Datos generales</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                        <div>
                          <p className="text-gray-400">Teléfono</p>
                          <p className="font-semibold text-white text-xl">{perfilSeleccionado.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Email</p>
                          <p className="font-semibold text-white text-xl">{perfilSeleccionado.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Ciudad</p>
                          <p className="font-semibold text-white text-xl">{perfilSeleccionado.ciudad}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Origen</p>
                          <p className="font-semibold text-white text-xl">{perfilSeleccionado.origen}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Interés</p>
                          <p className="font-semibold text-white text-xl">{perfilSeleccionado.interes}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#181836] rounded-2xl border border-[#2e2e5a] p-6">
                      <h3 className="text-2xl font-bold text-white mb-6">Información académica</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                        <div>
                          <p className="text-gray-400">Nivel</p>
                          <p className="font-semibold text-white text-xl">{perfilSeleccionado.academia.nivel}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Institución</p>
                          <p className="font-semibold text-white text-xl">{perfilSeleccionado.academia.institucion}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Carrera</p>
                          <p className="font-semibold text-white text-xl">{perfilSeleccionado.academia.carrera}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Semestre</p>
                          <p className="font-semibold text-white text-xl">{perfilSeleccionado.academia.semestre}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Modalidad</p>
                          <p className="font-semibold text-white text-xl">{perfilSeleccionado.academia.modalidad}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Horario</p>
                          <p className="font-semibold text-white text-xl">{perfilSeleccionado.academia.horario}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#181836] rounded-2xl border border-[#2e2e5a] p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Notas</h3>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                        {perfilSeleccionado.notas.map((nota, i) => (
                          <li key={i}>{nota}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#181836] rounded-2xl border border-[#2e2e5a] p-6 h-fit">
                    <h3 className="text-2xl font-bold text-white mb-6">Timeline de seguimiento</h3>
                    {perfilSeleccionado.timeline.map((item, i) => (
                      <TimelineItem
                        key={i}
                        date={item.date}
                        title={item.title}
                        description={item.description}
                      />
                    ))}
                  </div>
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
export default Leads
