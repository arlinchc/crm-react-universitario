import { useMemo, useState } from "react";
import CRMLayout from "../layouts/CRMLayout";
import Card from "../components/Card";
import Badge from "../components/Badge";

function TimelineItem({ date, title, description }) {
  return (
    <div className="relative pl-8 pb-6">
      <div className="absolute left-2 top-1 w-2 h-2 rounded-full bg-blue-500" />
      <div className="absolute left-3 top-3 bottom-0 w-px bg-gray-200" />
      <p className="text-xs text-gray-500">{date}</p>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default function ProspectDetail() {
  const prospect = useMemo(
    () => ({
      id: "P-0142",
      nombre: "Andrea López",
      telefono: "+52 984 123 4567",
      email: "andrea.lopez@email.com",
      ciudad: "Playa del Carmen, Solidaridad",
      origen: "Intagram Ads",
      interes: "Clase de prueba",
      fechaRegistro: "2026-02-20",
      asesor: "Juan Pérez",
      academia: {
        nivel: "Universidad",
        institucion: "UNID",
        carrera: "Mercadotecnia",
        Cuatrimestre: "6°",
        modalidad: "Presencial",
        horario: "Matutino",
      },
      notas: [
        "Quiere iniciar en marzo. Prefiere horarios por la tarde.",
        "Solicitó info de costos y promociones vigentes.",
      ],
      timeline: [
        {
          date: "2026-02-20",
          title: "Registro del prospecto",
          description: "Se registró desde formulario de campaña (Instagram Ads).",
        },
        {
          date: "2026-02-21",
          title: "Primer contacto",
          description: "Se envió WhatsApp con info general y horarios disponibles.",
        },
        {
          date: "2026-02-23",
          title: "Cita agendada",
          description: "Se agendó clase de prueba para el viernes 7:00 pm.",
        },
      ],
    }),
    []
  );

  const statuses = ["Prospecto", "Contactado", "Confirmado", "Inscrito"];
  const [status, setStatus] = useState("Prospecto");

  const statusBtnClass = (s) =>
    `px-3 py-2 rounded-lg text-sm font-medium border transition ${
      status === s
        ? "bg-gray-900 text-white border-gray-900"
        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
    }`;

  return (
    <CRMLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm text-gray-500">Perfil detallado</p>
            <h1 className="text-2xl font-bold">{prospect.nombre}</h1>
            <p className="text-sm text-gray-500">
              ID: {prospect.id} • Registro: {prospect.fechaRegistro} • Asesor: {prospect.asesor}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge text={status} />
          </div>
        </div>

        {/* Cambio de estado (visual) */}
        <Card title="Estado del prospecto">
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button key={s} className={statusBtnClass(s)} onClick={() => setStatus(s)}>
                {s}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Selecciona un estado para visualizar el cambio.
          </p>
        </Card>

        {/* Cards / Secciones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Datos generales */}
          <div className="lg:col-span-2 space-y-6">
            <Card title="Datos generales">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Teléfono</p>
                  <p className="font-medium">{prospect.telefono}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{prospect.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Ciudad</p>
                  <p className="font-medium">{prospect.ciudad}</p>
                </div>
                <div>
                  <p className="text-gray-500">Origen</p>
                  <p className="font-medium">{prospect.origen}</p>
                </div>
                <div>
                  <p className="text-gray-500">Interés</p>
                  <p className="font-medium">{prospect.interes}</p>
                </div>
              </div>
            </Card>

            <Card title="Información académica">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Nivel</p>
                  <p className="font-medium">{prospect.academia.nivel}</p>
                </div>
                <div>
                  <p className="text-gray-500">Institución</p>
                  <p className="font-medium">{prospect.academia.institucion}</p>
                </div>
                <div>
                  <p className="text-gray-500">Carrera</p>
                  <p className="font-medium">{prospect.academia.carrera}</p>
                </div>
                <div>
                  <p className="text-gray-500">Semestre</p>
                  <p className="font-medium">{prospect.academia.semestre}</p>
                </div>
                <div>
                  <p className="text-gray-500">Modalidad</p>
                  <p className="font-medium">{prospect.academia.modalidad}</p>
                </div>
                <div>
                  <p className="text-gray-500">Horario</p>
                  <p className="font-medium">{prospect.academia.horario}</p>
                </div>
              </div>
            </Card>

            <Card title="Notas">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                {prospect.notas.map((n, idx) => (
                  <li key={idx}>{n}</li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-1">
            <Card title="Timeline de seguimiento">
              <div className="pt-1">
                {prospect.timeline.map((item, idx) => (
                  <TimelineItem
                    key={idx}
                    date={item.date}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </CRMLayout>
  );
}
