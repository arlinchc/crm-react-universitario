import CRMLayout from "../layouts/CRMLayout";
import KPISection from "../components/Reports/KPISection";
import ConversionBarChart from "../components/Reports/ConversionBarChart";
import ProgressLineChart from "../components/Reports/ProgressLineChart";
import AsesorTable from "../components/Reports/AsesorTable";
import { useState, useEffect } from "react";
import asesoresMock from "../data/asesoresMock";


function Reports() {

  const [asesores, setAsesores] = useState([]);
  const [selectedAsesor, setSelectedAsesor] = useState(null);  

  useEffect(() => {
  if (!selectedAsesor) return;

  // KPI
  fetch(`http://localhost:3000/api/movements/kpi?advisorId=${selectedAsesor.id}`)
    .then(res => res.json())
    .then(data => {
      setSelectedAsesor(prev => ({
        ...prev,
        prospectos: Number(data.prospectos),
        inscritos: Number(data.inscritos)
      }));
    });

  // Tabla
  fetch(`http://localhost:3000/api/movements?advisorId=${selectedAsesor.id}`)
    .then(res => res.json())
    .then(data => {
      const prospectosDetalle = data.map(m => ({
        id: m.id,
        nombre: `Lead ${m.id_lead}`,
        telefono: "N/A",
        programa: "N/A",
        fecha: m.created_at.split("T")[0],
        estado: m.status
      }));

      setSelectedAsesor(prev => ({
        ...prev,
        prospectosDetalle
      }));
    });

  }, [selectedAsesor?.id]);

  return (
    <CRMLayout>
      <h2 className="text-3xl font-bold mb-6 text-white tracking-wide">
        Reportes
      </h2>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-400 uppercase text-sm tracking-wider">
          Seleccionar Asesor
        </label>
      
        <select
          className="bg-[#f0c02f] text-[#1a1a32] font-semibold px-5 py-2 rounded-xl shadow-md hover:bg-yellow-400 transition duration-200"
          value={selectedAsesor?.id || ""}
          onChange={(e) => {
            const asesor = asesores.find(
              (a) => a.id === Number(e.target.value)
            );
            setSelectedAsesor(asesor);
          }}
        >
          {asesores.map((asesor) => (
            <option key={asesor.id} value={asesor.id}>
              {asesor.nombre}
            </option>
          ))}
        </select>
      </div>
      

      <KPISection asesor={selectedAsesor} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressLineChart asesor={selectedAsesor} />
        <ConversionBarChart asesor={selectedAsesor} />
      </div>

      <AsesorTable asesor={selectedAsesor}/>

      
    </CRMLayout>
  );
}

export default Reports;
