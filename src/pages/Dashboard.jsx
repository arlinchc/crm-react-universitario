import CRMLayout from "../layouts/CRMLayout";
import Badge from "../components/Badge";
import leads from "../data/leads";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Legend,
} from "recharts";

// ---------------------------------------------------------------------------
// DATOS ESTÁTICOS (listos para sustituir por llamadas a API)
// ---------------------------------------------------------------------------

const kpis = [
  { label: "Prospectos",  value: 300, cambio: "+12%", tendencia: "up",   fondo: "bg-blue-100",   color: "text-blue-600",   icon: "users"   },
  { label: "Contactados", value: 150, cambio: "+5%",  tendencia: "up",   fondo: "bg-yellow-100", color: "text-yellow-600", icon: "phone"   },
  { label: "Confirmados", value: 50,  cambio: "-3%",  tendencia: "down", fondo: "bg-purple-100", color: "text-purple-600", icon: "check"   },
  { label: "Inscritos",   value: 75,  cambio: "+8%",  tendencia: "up",   fondo: "bg-green-100",  color: "text-green-600",  icon: "diploma" },
];

const leadsPorMes = [
  { mes: "Sep", leads: 45 },
  { mes: "Oct", leads: 62 },
  { mes: "Nov", leads: 58 },
  { mes: "Dic", leads: 40 },
  { mes: "Ene", leads: 75 },
  { mes: "Feb", leads: 88 },
];

const distribucion = [
  { name: "Prospecto",  value: 300, fill: "#60a5fa" },
  { name: "Contactado", value: 150, fill: "#fbbf24" },
  { name: "Confirmado", value:  50, fill: "#a78bfa" },
  { name: "Inscrito",   value:  75, fill: "#34d399" },
];

const alertas = [
  { id: 1, texto: "8 prospectos sin contactar hace más de 7 días", tipo: "alta"  },
  { id: 2, texto: "Irvin Chan superó su meta mensual de inscritos", tipo: "logro" },
  { id: 3, texto: "3 confirmados aún pendientes de inscripción",    tipo: "media" },
  { id: 4, texto: "Nuevo ciclo de captación arranca en 14 días",    tipo: "info"  },
];

// Licenciaturas más solicitadas por los leads
// porcentaje = leads de esa carrera ÷ total de leads × 100
const licenciaturas = [
  { id: 1, nombre: "Ingeniería en Sistemas",      abrev: "Ing. Sistemas",  leads: 45 },
  { id: 2, nombre: "Administración de Empresas",  abrev: "Adm. Empresas",  leads: 38 },
  { id: 3, nombre: "Contaduría y Finanzas",       abrev: "Contaduría",     leads: 32 },
  { id: 4, nombre: "Diseño Gráfico Digital",      abrev: "Diseño Gráfico", leads: 27 },
  { id: 5, nombre: "Mercadotecnia",               abrev: "Mercadotecnia",  leads: 14 },
];

// Distribución de leads según el horario preferido
// color    → clase Tailwind para la barra de progreso
// fondo    → clase Tailwind para el fondo de la tarjeta
// texto    → clase Tailwind para el texto coloreado
const horarios = [
  { tipo: "Matutino",   descripcion: "7:00 – 13:00 hrs",  leads: 68, porcentaje: 44, color: "bg-sky-500",    fondo: "bg-sky-50",    texto: "text-sky-700"    },
  { tipo: "Vespertino", descripcion: "13:00 – 19:00 hrs", leads: 52, porcentaje: 33, color: "bg-amber-500",  fondo: "bg-amber-50",  texto: "text-amber-700"  },
  { tipo: "Ejecutivo",  descripcion: "19:00 – 22:00 hrs", leads: 36, porcentaje: 23, color: "bg-purple-500", fondo: "bg-purple-50", texto: "text-purple-700" },
];

// Colores del borde izquierdo y fondo para cada tipo de alerta
const ALERTA_ESTILO = {
  alta:  "border-l-4 border-red-400 bg-red-50",
  media: "border-l-4 border-yellow-400 bg-yellow-50",
  logro: "border-l-4 border-green-400 bg-green-50",
  info:  "border-l-4 border-sky-400 bg-sky-50",
};

// ---------------------------------------------------------------------------
// ÍCONOS SVG INLINE
// Cada ícono es un componente que recibe className para tamaño y color.
// No necesitamos una librería externa; el SVG se incluye directamente en el HTML.
// ---------------------------------------------------------------------------

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

// Mapa para elegir el ícono correcto con una clave de texto
const ICONOS = {
  users:   IconUsers,
  phone:   IconPhone,
  check:   IconCheck,
  diploma: IconDiploma,
};

// ---------------------------------------------------------------------------
// COMPONENTE AUXILIAR: KPICard
// ---------------------------------------------------------------------------
function KPICard({ label, value, cambio, tendencia, fondo, color, icon }) {
  const esPositivo = tendencia === "up";
  const Icono = ICONOS[icon];
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-start gap-4">
      {/* Cuadro de color con ícono */}
      <div className={`${fondo} ${color} p-3 rounded-lg flex-shrink-0`}>
        <Icono className="w-6 h-6" />
      </div>
      {/* Texto */}
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

// ---------------------------------------------------------------------------
// COMPONENTE PRINCIPAL: Dashboard
// ---------------------------------------------------------------------------
function Dashboard() {
  return (
    <CRMLayout>

      {/* ── Encabezado ─────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Ejecutivo</h1>
        <p className="text-slate-500 mt-1">Resumen de captación · Ciclo Enero 2026</p>
      </div>

      {/* ── Fila 1: KPI cards ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* ── Fila 2: Gráficas ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* Gráfica de barras — leads por mes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Leads por mes</h3>
          {/*
            ResponsiveContainer: hace que la gráfica ocupe el 100% del ancho
            del contenedor padre, adaptándose a cualquier pantalla.
            height={260} fija la altura en píxeles.
          */}
          <ResponsiveContainer width="100%" height={260}>
            {/*
              BarChart recibe el arreglo de datos (data).
              margin agrega espacio interno alrededor de la gráfica.
            */}
            <BarChart data={leadsPorMes} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              {/* Líneas de cuadrícula en gris claro */}
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              {/* Eje X: muestra el campo "mes" de cada objeto */}
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              {/* Eje Y: números automáticos */}
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              {/* Tooltip: cuadro informativo al pasar el cursor */}
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)" }}
              />
              {/* Bar: dibuja una barra por cada objeto en data, usando el campo "leads" */}
              <Bar dataKey="leads" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de dona — distribución por etapa */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribución por etapa</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              {/*
                Pie: cada objeto en "data" se convierte en un sector del pastel.
                innerRadius crea el hueco central → efecto dona.
                outerRadius define el tamaño total del pastel.
                dataKey indica qué campo numérico usar para el tamaño de cada sector.
              */}
              {/*
                En recharts v3, el campo "fill" de cada objeto en el arreglo
                "data" se aplica automáticamente a su sector.
                No necesitamos el componente Cell (que quedó obsoleto en v3).
              */}
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
              {/* Legend: leyenda de colores debajo de la gráfica */}
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Fila 3: Tabla + Alertas ────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Tabla de registros recientes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Registros recientes</h3>
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
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t hover:bg-slate-50 transition">
                    <td className="p-3 font-medium text-slate-800">{lead.name}</td>
                    <td className="p-3 text-slate-500">{lead.email}</td>
                    <td className="p-3">
                      <Badge text={lead.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lista de alertas destacadas */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Alertas y destacados</h3>
          <ul className="flex flex-col gap-3">
            {alertas.map((a) => (
              <li key={a.id} className={`${ALERTA_ESTILO[a.tipo]} rounded-r-lg p-3`}>
                <p className="text-sm text-slate-700">{a.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Fila 4: Licenciaturas + Horarios ──────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* Licenciaturas solicitadas — gráfica de barras */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Licenciaturas solicitadas</h3>
          {/* flex-1 + flex items-center centra la gráfica verticalmente en el espacio disponible */}
          <div className="flex-1 flex items-center">
          {/* abrev se usa como etiqueta del eje X porque los nombres completos son muy largos */}
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={licenciaturas} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="abrev" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value) => [value, "leads"]}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)" }}
              />
              <Bar dataKey="leads" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución por horario */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Leads por horario</h3>
          <div className="flex flex-col gap-3">
            {horarios.map((h) => (
              <div key={h.tipo} className={`${h.fondo} rounded-lg p-4`}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className={`font-semibold ${h.texto}`}>{h.tipo}</p>
                    <p className="text-xs text-slate-400">{h.descripcion}</p>
                  </div>
                  <span className={`text-2xl font-bold ${h.texto}`}>{h.leads}</span>
                </div>
                {/* Barra de progreso sobre fondo blanco semitransparente */}
                <div className="w-full bg-white/60 rounded-full h-2">
                  <div
                    className={`${h.color} h-2 rounded-full`}
                    style={{ width: `${h.porcentaje}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">{h.porcentaje}% del total</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </CRMLayout>
  );
}

export default Dashboard;
