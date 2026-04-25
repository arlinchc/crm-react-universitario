import { useState } from "react";

const asesoresIniciales = [
  {
    id: 1,
    nombre: "Laura Martínez",
    carrera: "Ingeniería en Sistemas",
    prospectos: 45,
    conversion: 62,
    foto: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    nombre: "Carlos Pérez",
    carrera: "Administración",
    prospectos: 32,
    conversion: 48,
    foto: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    nombre: "Ana Gómez",
    carrera: "Contaduría",
    prospectos: 27,
    conversion: 55,
    foto: "https://via.placeholder.com/150"
  }
];

export default function Asesores() {
  const [asesores, setAsesores] = useState(asesoresIniciales);
  const [filtroCarrera, setFiltroCarrera] = useState("Todas");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [nuevoAsesor, setNuevoAsesor] = useState({
    nombre: "",
    carrera: "Ingeniería en Sistemas"
  });

  const asesoresFiltrados =
    filtroCarrera === "Todas"
      ? asesores
      : asesores.filter((a) => a.carrera === filtroCarrera);

  const agregarAsesor = () => {
    if (!nuevoAsesor.nombre) return;

    setAsesores([
      ...asesores,
      {
        id: asesores.length + 1,
        nombre: nuevoAsesor.nombre,
        carrera: nuevoAsesor.carrera,
        prospectos: Math.floor(Math.random() * 40) + 10,
        conversion: Math.floor(Math.random() * 40) + 40,
        foto: "https://via.placeholder.com/150"
      }
    ]);

    setNuevoAsesor({ nombre: "", carrera: "Ingeniería en Sistemas" });
    setMostrarFormulario(false);
  };

  return (
    <section
      className="p-6 min-h-screen"
      style={{ backgroundColor: "#1a1a32" }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Gestión de Asesores Académicos
          </h1>
          <p className="text-sm text-gray-300">
            Administración visual del equipo de asesores
          </p>
        </div>

        <div className="flex gap-3">
          <select
            value={filtroCarrera}
            onChange={(e) => setFiltroCarrera(e.target.value)}
            className="rounded-lg px-4 py-2 text-sm"
          >
            <option value="Todas">Todas</option>
            <option value="Ingeniería en Sistemas">
              Ingeniería en Sistemas
            </option>
            <option value="Administración">Administración</option>
            <option value="Contaduría">Contaduría</option>
          </select>

          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-[#f0c02f] text-[#1a1a32] px-4 py-2 rounded-lg font-medium hover:opacity-90"
          >
            + Agregar asesor
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {asesoresFiltrados.map((asesor) => (
          <div
            key={asesor.id}
            className="bg-white rounded-xl shadow-md p-5 text-center"
          >
            <img
              src={asesor.foto}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold">{asesor.nombre}</h3>
            <p className="text-sm text-gray-500">{asesor.carrera}</p>

            <div className="mt-4 text-sm">
              <p>Prospectos: {asesor.prospectos}</p>
              <p className="text-green-600">
                Conversión: {asesor.conversion}%
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">
              Nuevo asesor
            </h2>

            <input
              type="text"
              placeholder="Nombre del asesor"
              value={nuevoAsesor.nombre}
              onChange={(e) =>
                setNuevoAsesor({
                  ...nuevoAsesor,
                  nombre: e.target.value
                })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <select
              value={nuevoAsesor.carrera}
              onChange={(e) =>
                setNuevoAsesor({
                  ...nuevoAsesor,
                  carrera: e.target.value
                })
              }
              className="w-full border rounded-lg px-3 py-2 mb-4"
            >
              <option>Ingeniería en Sistemas</option>
              <option>Administración</option>
              <option>Contaduría</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setMostrarFormulario(false)}
                className="px-4 py-2 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={agregarAsesor}
                className="bg-[#1a1a32] text-white px-4 py-2 rounded-lg text-sm"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}