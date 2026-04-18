import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function ConversionBarChart({ asesor }) {
  if (!asesor) return null;

  const data = [
    { name: "Prospectos", valor: asesor.prospectos },
    { name: "Inscritos", valor: asesor.inscritos },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mb-8">
      
      <h3 className="text-lg font-bold text-[#1a1a32] mb-6">
        Comparativa Prospectos vs Inscritos
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>

          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            tick={{ fill: "#32231a", fontSize: 12 }}
          />

          <YAxis
            tick={{ fill: "#322a1a", fontSize: 12 }}
          />

          <Tooltip
            formatter={(value, name) => [`${value} registros`, "Cantidad"]}
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

          <Bar
            dataKey="valor"
            fill="#4a33dd"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// fill="#2e2e66", fill="#0353cc"

export default ConversionBarChart;