import { useState } from "react";
import { Shield, Tags, Palette, Bell, Plus, Save } from "lucide-react";

/**
 * COLORES INSTITUCIONALES
 * Amarillo: #f0c02f
 * Azul Marino: #1a1a32
 *
 * Tema: Dominante AZUL MARINO (dark)
 * Acento: Amarillo (acciones/selecciones)
 */

const INST = {
  navy: "#1a1a32",
  yellow: "#f0c02f",
};

const accentStyles = {
  Amarillo: {
    button: "bg-[#f0c02f] hover:bg-yellow-500 text-black",
    text: "text-[#f0c02f]",
    ring: "focus:ring-[#f0c02f]/30",
    switchOn: "bg-[#f0c02f]",
    chip: "bg-[#f0c02f]/15 text-slate-100 border-[#f0c02f]/40",
  },
  "Azul Marino": {
    button: "bg-[#1a1a32] hover:bg-[#141428] text-white",
    text: "text-white",
    ring: "focus:ring-[#1a1a32]/30",
    switchOn: "bg-[#1a1a32]",
    chip: "bg-[#1a1a32]/30 text-slate-100 border-[#1a1a32]/40",
  },
};

const tabs = [
  { id: "roles", label: "Roles", icon: Shield },
  { id: "states", label: "Estados del CRM", icon: Tags },
  { id: "appearance", label: "Preferencias", icon: Palette },
  { id: "notifications", label: "Notificaciones", icon: Bell },
];

const Switch = ({ checked, onClick, accent = "Amarillo" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-11 h-6 rounded-full transition flex items-center px-1 ${
      checked ? accentStyles[accent].switchOn : "bg-slate-600"
    }`}
  >
    <span
      className={`w-4 h-4 bg-white rounded-full transition ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

const Badge = ({ children, variant = "default", accent = "Amarillo" }) => {
  const base = "text-xs px-2 py-1 rounded-full border";
  const styles = {
    default: "bg-slate-800 text-slate-200 border-slate-600",
    admin: "bg-[#1a1a32] text-white border-slate-700",
    advisor: accentStyles[accent].chip,
    ok: "bg-emerald-950/40 text-emerald-200 border-emerald-900/40",
    warn: "bg-amber-950/40 text-amber-200 border-amber-900/40",
    info: "bg-sky-950/40 text-sky-200 border-sky-900/40",
  };
  return <span className={`${base} ${styles[variant] || styles.default}`}>{children}</span>;
};

const Card = ({ title, subtitle, right, children }) => (
  <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-700">
    <div className="p-5 border-b border-slate-700/70 flex items-start justify-between gap-3">
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {right}
    </div>
    <div className="p-5">{children}</div>
  </div>
);

export default function Settings() {
  const [activeTab, setActiveTab] = useState("roles");

  // Preferencias (incluye acento institucional)
  const [prefs, setPrefs] = useState({
    theme: "Oscuro",
    density: "Normal",
    accent: "Amarillo", // Amarillo | Azul Marino (en este tema se recomienda Amarillo)
  });

  // “Guardar” simulado
  const [saved, setSaved] = useState(false);
  const saveFake = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  // Roles (visual)
  const [roles] = useState([
    {
      name: "Administrador",
      tag: "admin",
      desc: "Acceso total al sistema, parámetros y reportes.",
      perms: ["Configurar estados", "Gestionar roles", "Exportar", "Auditoría"],
    },
    {
      name: "Asesor",
      tag: "advisor",
      desc: "Gestiona prospectos, seguimiento y conversión.",
      perms: ["Ver leads", "Actualizar seguimiento", "Cambiar estado"],
    },
  ]);

  // Estados del CRM
  const [states, setStates] = useState([
    { name: "Prospecto", color: "info", active: true },
    { name: "Contactado", color: "warn", active: true },
    { name: "Confirmado", color: "ok", active: true },
    { name: "Inscrito", color: "ok", active: true },
  ]);

  // Notificaciones
  const [notifs, setNotifs] = useState({
    email: true,
    whatsapp: false,
    push: true,
    weekly: true,
    frequency: "Diaria",
  });

  // Style según acento
  const A = accentStyles[prefs.accent];

  // Inputs/Selects dark style (reusable)
  const inputDark =
    `mt-2 w-full rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 text-white ` +
    `placeholder:text-slate-500 focus:outline-none focus:ring-2 ${A.ring}`;

  return (
  <div className="min-h-screen w-full bg-[#1a1a32] text-white">
    
    {/* CONTENEDOR CENTRADO */}
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Configuración</h1>
          <p className="text-slate-400 mt-1">
            Panel administrativo: roles, estados del CRM, preferencias y notificaciones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <div className="text-sm px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-900/40 text-emerald-200">
              Cambios guardados 
            </div>
          )}

          <button
            type="button"
            onClick={saveFake}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition ${A.button}`}
          >
            <Save size={18} />
            Guardar cambios
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Menú lateral interno */}
        <aside className="lg:col-span-4">
          <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-700 p-2">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition text-left ${
                    active
                      ? "bg-[#f0c02f] text-black"
                      : "hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      active ? "bg-black/10" : "bg-slate-800"
                    }`}
                  >
                    <Icon size={18} className={active ? "text-black" : "text-slate-200"} />
                  </span>

                  <div className="flex-1">
                    <div className="font-medium">{t.label}</div>
                    <div className={`text-xs ${active ? "text-black/70" : "text-slate-500"}`}>
                      Ajustes del sistema
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nota */}
          <div className="mt-4 bg-slate-900 border border-slate-700 rounded-2xl p-4">
            <p className="text-sm text-slate-300">
              Paleta institucional:{" "}
              <span className="font-medium" style={{ color: INST.yellow }}>
                {INST.yellow}
              </span>{" "}
              y{" "}
              <span className="font-medium text-slate-200">{INST.navy}</span>. <br />
              Dominante: Azul Marino
            </p>
          </div>
        </aside>

        {/* Contenido */}
        <section className="lg:col-span-8 space-y-6">
          {/* ROLES */}
          {activeTab === "roles" && (
            <Card
              title="Gestión de roles"
              subtitle="Permisos institucionales (simulado)"
              right={
                <button
                  type="button"
                  className="px-3 py-2 rounded-xl border border-slate-600 hover:bg-slate-800 transition text-sm text-slate-200"
                >
                  Editar permisos
                </button>
              }
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-slate-400">
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3">Rol</th>
                      <th className="text-left py-3">Descripción</th>
                      <th className="text-left py-3">Permisos</th>
                    </tr>
                  </thead>

                  <tbody>
                    {roles.map((r) => (
                      <tr key={r.name} className="border-b border-slate-800">
                        <td className="py-4">
                          <Badge variant={r.tag} accent={prefs.accent}>
                            {r.name}
                          </Badge>
                        </td>
                        <td className="py-4 text-slate-300">{r.desc}</td>
                        <td className="py-4">
                          <div className="flex flex-wrap gap-2">
                            {r.perms.map((p) => (
                              <Badge key={p} accent={prefs.accent}>
                                {p}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Sección extra */}
              <div className="mt-5 p-4 rounded-2xl border border-slate-700 bg-slate-800">
                <div className="text-sm font-medium text-white">Nota de seguridad</div>
                <div className="text-sm text-slate-300 mt-1">
                  Recomendación: solo Administradores deben editar estados y exportar reportes.
                </div>
              </div>
            </Card>
          )}

          {/* ESTADOS */}
          {activeTab === "states" && (
            <Card
              title="Estados del CRM"
              subtitle="Define el flujo de captación (simulado)"
              right={
                <button
                  type="button"
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl transition ${A.button}`}
                >
                  <Plus size={16} />
                  Agregar estado
                </button>
              }
            >
              <div className="space-y-3">
                {states.map((s, idx) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-slate-700 bg-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant={s.color} accent={prefs.accent}>
                        {s.name}
                      </Badge>
                      <span className="text-sm text-slate-400">Visible en Leads y Perfil</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-400">Activo</span>
                      <Switch
                        checked={s.active}
                        accent={prefs.accent}
                        onClick={() => {
                          const copy = [...states];
                          copy[idx] = { ...copy[idx], active: !copy[idx].active };
                          setStates(copy);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900">
                  <div className="text-xs text-slate-400">Total de estados</div>
                  <div className="text-lg font-semibold text-white">{states.length}</div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900">
                  <div className="text-xs text-slate-400">Activos</div>
                  <div className="text-lg font-semibold text-white">
                    {states.filter((x) => x.active).length}
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900">
                  <div className="text-xs text-slate-400">Inactivos</div>
                  <div className="text-lg font-semibold text-white">
                    {states.filter((x) => !x.active).length}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* PREFERENCIAS */}
          {activeTab === "appearance" && (
            <Card title="Preferencias visuales" subtitle="Personalización institucional (simulada)">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tema */}
                <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900">
                  <label className="text-sm font-medium text-slate-200">Tema</label>
                  <select
                    className={inputDark}
                    value={prefs.theme}
                    onChange={(e) => setPrefs({ ...prefs, theme: e.target.value })}
                  >
                    <option>Oscuro</option>
                    <option>Claro</option>
                    <option>Automático</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">El módulo está en tema oscuro.</p>
                </div>

                {/* Densidad */}
                <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900">
                  <label className="text-sm font-medium text-slate-200">Densidad</label>
                  <div className="mt-2 flex gap-2">
                    {["Compacta", "Normal", "Amplia"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setPrefs({ ...prefs, density: d })}
                        className={`px-3 py-2 rounded-xl border transition text-sm ${
                          prefs.density === d
                            ? "bg-[#f0c02f] text-black border-[#f0c02f]"
                            : "border-slate-600 hover:bg-slate-800 text-slate-200"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Acento institucional */}
                <div className="md:col-span-2 p-4 rounded-2xl border border-slate-700 bg-slate-900">
                  <label className="text-sm font-medium text-slate-200">Acento institucional</label>

                  <div className="mt-2 flex flex-wrap gap-3">
                    {["Amarillo", "Azul Marino"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setPrefs({ ...prefs, accent: c })}
                        className={`px-4 py-2 rounded-xl border transition text-sm flex items-center gap-2 ${
                          prefs.accent === c
                            ? c === "Amarillo"
                              ? "bg-[#f0c02f] text-black border-[#f0c02f]"
                              : "bg-[#141428] text-white border-[#1a1a32]"
                            : "border-slate-600 hover:bg-slate-800 text-slate-200"
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full ${
                            c === "Amarillo" ? "bg-[#f0c02f]" : "bg-[#1a1a32]"
                          }`}
                        />
                        {c}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    Define el color de acento (botones, selección y estados activos).
                  </p>
                </div>
              </div>

              {/* Vista previa */}
              <div className="mt-5 p-4 rounded-2xl border border-slate-700 bg-slate-800">
                <div className="text-sm font-medium text-white">Vista previa</div>

                <button className={`mt-3 px-4 py-2 rounded-xl transition ${A.button}`}>
                  Botón principal
                </button>

                <p className="text-sm mt-2 text-slate-300">
                  Dominante: <span className="font-medium text-slate-100">Azul Marino</span> ·
                  Acento: <span className={`font-medium ${A.text}`}>{prefs.accent}</span>
                </p>
              </div>
            </Card>
          )}

          {/* NOTIFICACIONES */}
          {activeTab === "notifications" && (
            <Card title="Notificaciones" subtitle="Alertas del CRM (simulado)">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "email", label: "Email", desc: "Seguimiento y avisos" },
                  { key: "whatsapp", label: "WhatsApp", desc: "Recordatorios rápidos" },
                  { key: "push", label: "Push", desc: "Alertas en el panel" },
                ].map((n) => (
                  <div key={n.key} className="p-4 rounded-2xl border border-slate-700 bg-slate-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">{n.label}</div>
                        <div className="text-xs text-slate-500 mt-1">{n.desc}</div>
                      </div>
                      <Switch
                        checked={notifs[n.key]}
                        accent={prefs.accent}
                        onClick={() => setNotifs({ ...notifs, [n.key]: !notifs[n.key] })}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900">
                  <label className="text-sm font-medium text-slate-200">Frecuencia</label>
                  <select
                    className={inputDark}
                    value={notifs.frequency}
                    onChange={(e) => setNotifs({ ...notifs, frequency: e.target.value })}
                  >
                    <option>Diaria</option>
                    <option>Semanal</option>
                    <option>Mensual</option>
                  </select>
                </div>

                <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Resumen semanal</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Reporte automático para coordinación
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    style={{ accentColor: prefs.accent === "Amarillo" ? "#f0c02f" : "#1a1a32" }}
                    checked={notifs.weekly}
                    onChange={(e) => setNotifs({ ...notifs, weekly: e.target.checked })}
                  />
                </div>
              </div>

              {/* Error visual simulado */}
              {!notifs.email && (
                <div className="mt-4 p-4 rounded-2xl border border-rose-900/40 bg-rose-950/30">
                  <div className="text-sm font-medium text-rose-200">Validación</div>
                  <div className="text-sm text-rose-200/90 mt-1">
                    Recomendación: activa Email para notificaciones críticas del proceso.
                  </div>
                </div>
              )}
            </Card>
          )}
        </section>
      </div>
    </div>
     </div>
  );
}