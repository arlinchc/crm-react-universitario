import CRMLayout from "../layouts/CRMLayout";
import KPISection from "../components/Reports/KPISection";
import ConversionBarChart from "../components/Reports/ConversionBarChart";
import ProgressLineChart from "../components/Reports/ProgressLineChart";
import AsesorTable from "../components/Reports/AsesorTable";
import { useState, useEffect } from "react";

const API_ADVISORS = "https://crm-react-universitario.onrender.com/api/advisors";
const API_MOVEMENTS = "https://crm-react-universitario.onrender.com/api/movements";

function Reports() {
  const [asesores, setAsesores] = useState([]);
  const [selectedAsesor, setSelectedAsesor] = useState(null);

  // ================== CARGAR ASESORES ==================
  useEffect(() => {
    fetch(API_ADVISORS)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar asesores");
        return res.json();
      })
      .then((data) => {
        // 🔥 MAPEO CORRECTO
        const mapped = data.map((a) => ({
          id: a.id,
          nombre: a.full_name, // 👈 FIX AQUÍ
        }));

        setAsesores(mapped);
      })
      .catch((err) => console.error(err));
  }, []);

  // ================== KPI + TABLA ==================
  useEffect(() => {
    if (!selectedAsesor) return;

    // KPI
    fetch(`${API_MOVEMENTS}/kpi?advisorId=${selectedAsesor.id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedAsesor((prev) => ({
          ...prev,
          prospectos: Number(data.prospectos || 0),
          inscritos: Number(data.inscritos || 0),
        }));
      })
      .catch((err) => console.error("Error KPI:", err));

    // TABLA
    fetch(`${API_MOVEMENTS}?advisorId=${selectedAsesor.id}`)
      .then((res) => res.json())
      .then((data) => {
        const prospectosDetalle = data.map((m) => ({
          id: m.id,
          nombre: m.full_name || `Lead ${m.id_lead}`,
          telefono: m.phone || "N/A",
          programa: m.program_interest || "N/A",
          fecha: m.created_at?.split("T")[0] || "",
          estado: m.status,
        }));

        setSelectedAsesor((prev) => ({
          ...prev,
          prospectosDetalle,
        }));
      })
      .catch((err) => console.error("Error tabla:", err));
  }, [selectedAsesor?.id]);

  return (
    <CRMLayout>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-white tracking-wide">
          Reportes
        </h2>

        {/* ================== SELECT ================== */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-400 uppercase text-sm tracking-wider">
            Seleccionar asesor
          </label>

          <select
            className="w-64 bg-[#f0c02f] text-[#1a1a32] font-semibold px-5 py-3 rounded-xl shadow-md hover:bg-yellow-400 transition"
            value={selectedAsesor?.id || ""}
            onChange={(e) => {
              const id = Number(e.target.value);

              if (!id) {
                setSelectedAsesor(null);
                return;
              }

              const asesor = asesores.find((a) => a.id === id);

              setSelectedAsesor({
                ...asesor,
                prospectos: 0,
                inscritos: 0,
                prospectosDetalle: [],
              });
            }}
          >
            <option value="">-- Selecciona un asesor --</option>

            {asesores.map((asesor) => (
              <option key={asesor.id} value={asesor.id}>
                {asesor.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* ================== KPI ================== */}
        <KPISection asesor={selectedAsesor} />

        {/* ================== GRÁFICAS ================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressLineChart asesor={selectedAsesor} />
          <ConversionBarChart asesor={selectedAsesor} />
        </div>

        {/* ================== TABLA ================== */}
        <AsesorTable asesor={selectedAsesor} />
      </div>
    </CRMLayout>
  );
}

export default Reports;