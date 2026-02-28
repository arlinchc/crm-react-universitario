import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ProgressLineChart({ asesor }) {
  if (!asesor) return null;

  const generateProgressData = () => {
    if (asesor.prospectosDetalle) {
      const fechas = {};

      asesor.prospectosDetalle.forEach((p) => {
        if (p.estado === "Inscrito") {
          if (!fechas[p.fecha]) {
            fechas[p.fecha] = 0;
          }
          fechas[p.fecha]++;
        }
      });

      const resultado = [];
      let acumulado = 0;

      Object.keys(fechas)
        .sort()
        .forEach((fecha) => {
          acumulado += fechas[fecha];
          resultado.push({
            fecha,
            inscritos: acumulado,
          });
        });

      return resultado;
    }

    return asesor.historial || [];
  };

  const data = generateProgressData();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mb-8">
      
      <h3 className="text-lg font-bold text-[#1a1a32] mb-6">
        Evolución de Inscripciones
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

          <XAxis
            dataKey="fecha"
            tick={{ fill: "#1a1a32", fontSize: 12 }}
          />

          <YAxis
            tick={{ fill: "#1a1a32", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a32",
              border: "none",
              borderRadius: "12px",
              color: "#ffffff",
            }}
            labelStyle={{
              color: "#f0c02f",
              fontWeight: "bold",
            }}
          />

          <Line
            type="monotone"
            dataKey="inscritos"
            stroke="#f0c02f"
            strokeWidth={3}
            dot={{ fill: "#1a1a32", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressLineChart;