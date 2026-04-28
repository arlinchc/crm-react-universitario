import { useEffect, useState } from "react";
import CRMLayout from "../layouts/CRMLayout";
import Badge from "../components/Badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Legend,
} from "recharts";

// API
const API_URL = "https://crm-react-universitario.onrender.com/api/leads";

// Umbral del % de Prospectos que dispara la alerta "sin contactar".
const UMBRAL_SIN_CONTACTAR = 20;

// El backend manda status en español, pero por si acaso aceptamos también en inglés.
const estadoTraduccion = {
  Prospect:  "Prospecto",
  Contacted: "Contactado",
  Confirmed: "Confirmado",
  Enrolled:  "Inscrito",
};

const MESES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

// Los estilos del KPI son fijos. El número y el % se calculan abajo.
const KPI_TEMPLATE = [
  { label: "Prospectos",  estado: "Prospecto",  fondo: "bg-blue-100",   color: "text-blue-600",   icon: "users"   },
  { label: "Contactados", estado: "Contactado", fondo: "bg-yellow-100", color: "text-yellow-600", icon: "phone"   },
  { label: "Confirmados", estado: "Confirmado", fondo: "bg-purple-100", color: "text-purple-600", icon: "check"   },
  { label: "Inscritos",   estado: "Inscrito",   fondo: "bg-green-100",  color: "text-green-600",  icon: "diploma" },
];

// Estilo de cada tipo de alerta.
const ALERTA_ESTILO = {
  alta:  "border-l-4 border-red-400 bg-red-50",
  media: "border-l-4 border-yellow-400 bg-yellow-50",
  info:  "border-l-4 border-sky-400 bg-sky-50",
};


// Iconos

function IconUsers({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0
           00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318
           12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0
           0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25
           2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function IconPhone({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091
           l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0
           01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963
           3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function IconCheck({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconDiploma({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0
           008.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905
           59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482
           0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75
           0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0
           006.75 15.75v-1.5" />
    </svg>
  );
}

const ICONOS = {
  users:   IconUsers,
  phone:   IconPhone,
  check:   IconCheck,
  diploma: IconDiploma,
};


// Tarjeta de KPI

function KPICard({ label, value, cambio, tendencia, fondo, color, icon }) {
  const esPositivo = tendencia === "up";
  const Icono = ICONOS[icon];
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-start gap-4">
      <div className={`${fondo} ${color} p-3 rounded-lg flex-shrink-0`}>
        <Icono className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
        <p className={`text-xs mt-1 font-medium ${esPositivo ? "text-green-600" : "text-red-500"}`}>
          {esPositivo ? "▲" : "▼"} {cambio} vs mes anterior
        </p>
      </div>
    </div>
  );
}


// Componente principal

function Dashboard() {
  const [leads, setLeads]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la API");
        return res.json();
      })
      .then((data) => {
        setLeads(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Error cargando dashboard");
        setLoading(false);
      });
  }, []);

  // Funciones que sacan datos de la lista de leads.

  // Compara el status sin importar si viene en español o inglés.
  const matchEstado = (lead, estadoEs) => {
    const estadoEn = Object.keys(estadoTraduccion).find(
      (k) => estadoTraduccion[k] === estadoEs
    );
    return lead.status === estadoEs || lead.status === estadoEn;
  };

  const countPorEstado = (estadoEs) =>
    leads.filter((l) => matchEstado(l, estadoEs)).length;

  // Calcula el % vs el mes anterior.
  const calcularCambio = (estadoEs) => {
    const ahora = new Date();
    const mesActual  = ahora.getMonth();
    const anioActual = ahora.getFullYear();
    const mesAnterior     = mesActual === 0 ? 11 : mesActual - 1;
    const anioMesAnterior = mesActual === 0 ? anioActual - 1 : anioActual;

    const enMes = (m, y) =>
      leads.filter((l) => {
        if (!l.created_at || !matchEstado(l, estadoEs)) return false;
        const d = new Date(l.created_at);
        return d.getMonth() === m && d.getFullYear() === y;
      }).length;

    const actual   = enMes(mesActual,  anioActual);
    const anterior = enMes(mesAnterior, anioMesAnterior);

    // Si el mes anterior fue 0, cualquier valor positivo cuenta como +100%.
    if (anterior === 0) {
      return {
        cambio: actual > 0 ? "+100%" : "0%",
        tendencia: actual > 0 ? "up" : "down",
      };
    }

    const pct = Math.round(((actual - anterior) / anterior) * 100);
    return {
      cambio: `${pct >= 0 ? "+" : ""}${pct}%`,
      tendencia: pct >= 0 ? "up" : "down",
    };
  };

  // Datos en vivo

  const kpis = KPI_TEMPLATE.map((tpl) => {
    const { cambio, tendencia } = calcularCambio(tpl.estado);
    return {
      label:     tpl.label,
      value:     countPorEstado(tpl.estado),
      cambio,
      tendencia,
      fondo:     tpl.fondo,
      color:     tpl.color,
      icon:      tpl.icon,
    };
  });

  const distribucion = [
    { name: "Prospecto",  value: countPorEstado("Prospecto"),  fill: "#60a5fa" },
    { name: "Contactado", value: countPorEstado("Contactado"), fill: "#fbbf24" },
    { name: "Confirmado", value: countPorEstado("Confirmado"), fill: "#a78bfa" },
    { name: "Inscrito",   value: countPorEstado("Inscrito"),   fill: "#34d399" },
  ];

  // Las 5 carreras más pedidas.
  const conteoLicenciaturas = {};
  leads.forEach((l) => {
    const k = l.program_interest || "Sin definir";
    conteoLicenciaturas[k] = (conteoLicenciaturas[k] || 0) + 1;
  });
  const licenciaturas = Object.entries(conteoLicenciaturas)
    .map(([nombre, n]) => ({
      nombre,
      abrev: nombre.split(" ").slice(0, 2).join(" "),
      leads: n,
    }))
    .sort((a, b) => b.leads - a.leads)
    .slice(0, 5);

  // Leads de los últimos 6 meses, contando el actual.
  const leadsPorMes = (() => {
    const ahora = new Date();
    const resultado = [];
    for (let i = 5; i >= 0; i--) {
      const fecha = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
      const m = fecha.getMonth();
      const y = fecha.getFullYear();
      const count = leads.filter((l) => {
        if (!l.created_at) return false;
        const d = new Date(l.created_at);
        return d.getMonth() === m && d.getFullYear() === y;
      }).length;
      resultado.push({ mes: MESES[m], leads: count });
    }
    return resultado;
  })();

  // El backend ya manda los leads del más nuevo al más viejo, así que slice(0,5) son los recientes.
  const recientes = leads.slice(0, 5);

  // Alertas derivadas de los datos. Cada regla aporta 0 o 1 alerta al array.
  const construirAlertas = () => {
    const lista = [];
    const total = leads.length;

    // 1. Prospectos sin contactar (% configurable arriba).
    if (total > 0) {
      const prospectos = countPorEstado("Prospecto");
      const pct = (prospectos / total) * 100;
      if (pct >= UMBRAL_SIN_CONTACTAR) {
        lista.push({
          id: "sin-contactar",
          tipo: "alta",
          texto: `${Math.round(pct)}% de los leads están sin contactar (${prospectos} de ${total})`,
        });
      }
    }

    // 2. Leads sin asesor asignado.
    const sinAsesor = leads.filter((l) => !l.advisor).length;
    if (sinAsesor >= 1) {
      lista.push({
        id: "sin-asesor",
        tipo: "media",
        texto: `${sinAsesor} ${sinAsesor === 1 ? "lead sin asesor asignado" : "leads sin asesor asignado"}`,
      });
    }

    // 3. Confirmados pendientes de inscripción.
    const confirmados = countPorEstado("Confirmado");
    if (confirmados >= 1) {
      lista.push({
        id: "confirmados-pendientes",
        tipo: "media",
        texto: `${confirmados} ${confirmados === 1 ? "confirmado pendiente" : "confirmados pendientes"} de inscripción`,
      });
    }

    return lista;
  };

  const alertas = construirAlertas();

  // Banderas para saber si una sección tiene datos.
  const hayLeadsPorMes   = leadsPorMes.some((m) => m.leads > 0);
  const hayDistribucion  = distribucion.some((d) => d.value > 0);
  const hayLicenciaturas = licenciaturas.length > 0;
  const hayRecientes     = recientes.length > 0;
  const hayAlertas       = alertas.length > 0;

  // Estados de carga y error.

  if (loading) {
    return (
      <CRMLayout>
        <p className="text-slate-500">Cargando dashboard...</p>
      </CRMLayout>
    );
  }

  if (error) {
    return (
      <CRMLayout>
        <p className="text-red-500">{error}</p>
      </CRMLayout>
    );
  }

  return (
    <CRMLayout>

      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6 text-[#f0c02f]">Dashboard Ejecutivo</h1>
        <p className="text-2xl font-bold mb-6 text-[#ffffff]">Resumen de captación · Ciclo Enero 2026</p>
      </div>

      {/* Fila 1: KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Fila 2: Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* Gráfica de barras: leads por mes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Leads por mes</h3>
          {hayLeadsPorMes ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={leadsPorMes} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)" }}
                />
                <Bar dataKey="leads" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[260px] text-slate-400 text-sm">
              Sin registros previos. Esperando próximas capturas.
            </div>
          )}
        </div>

        {/* Gráfica de dona: distribución por etapa */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribución por etapa</h3>
          {hayDistribucion ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                {/* Pie: cada objeto es un sector. innerRadius hace el hueco del centro (efecto dona). */}
                <Pie
                  data={distribucion}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)" }}
                />
                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[260px] text-slate-400 text-sm">
              Sin leads para distribuir.
            </div>
          )}
        </div>
      </div>

      {/* Fila 3: Tabla y Notificaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Tabla de registros recientes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Registros recientes</h3>
          {hayRecientes ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="p-3 text-left">Nombre</th>
                    <th className="p-3 text-left">Correo</th>
                    <th className="p-3 text-left">Estatus</th>
                  </tr>
                </thead>
                <tbody>
                  {recientes.map((lead) => (
                    <tr key={lead.id} className="border-t hover:bg-slate-50 transition">
                      <td className="p-3 font-medium text-slate-800">{lead.full_name}</td>
                      <td className="p-3 text-slate-500">{lead.email}</td>
                      <td className="p-3">
                        <Badge text={estadoTraduccion[lead.status] || lead.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center justify-center py-12 text-slate-400 text-sm">
              Sin registros recientes.
            </div>
          )}
        </div>

        {/* Notificaciones de cambios */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Notificaciones de cambios</h3>
          {hayAlertas ? (
            <ul className="flex flex-col gap-3">
              {alertas.map((a) => (
                <li key={a.id} className={`${ALERTA_ESTILO[a.tipo]} rounded-r-lg p-3`}>
                  <p className="text-sm text-slate-700">{a.texto}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center py-12 text-slate-400 text-sm">
              Sin notificaciones recientes.
            </div>
          )}
        </div>
      </div>

      {/* Fila 4: Licenciaturas y Horarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* Licenciaturas solicitadas: gráfica de barras */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Licenciaturas solicitadas</h3>
          <div className="flex-1 flex items-center">
            {hayLicenciaturas ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={licenciaturas} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  {/* abrev en el eje X: los nombres completos no caben. */}
                  <XAxis dataKey="abrev" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(value) => [value, "leads"]}
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)" }}
                  />
                  <Bar dataKey="leads" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full flex items-center justify-center h-[220px] text-slate-400 text-sm">
                Sin datos de carreras.
              </div>
            )}
          </div>
        </div>

        {/* Horarios: pendiente de columna `schedule` en BD. */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Horarios escogidos</h3>
          <div className="flex items-center justify-center py-12 text-slate-400 text-sm text-center px-4">
            Sin información de horarios. Falta integración con el formulario de captura.
          </div>
        </div>

      </div>

    </CRMLayout>
  );
}
//Esotilin
export default Dashboard;