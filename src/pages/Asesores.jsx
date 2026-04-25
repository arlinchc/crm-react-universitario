import { useEffect, useState, useCallback } from "react";
import CRMLayout from "../layouts/CRMLayout";

const INITIAL_STATE = {
  nombre: "",
  email: "",
  phone: "",
  carrera: ""
};

export default function Asesores() {
  const [asesores, setAsesores] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoAsesor, setNuevoAsesor] = useState(INITIAL_STATE);
  const [foto, setFoto] = useState(null);
  const [cargando, setCargando] = useState(false);

  // 🔹 Obtener asesores
  const cargarAsesores = useCallback(async () => {
    try {
      const response = await fetch("https://crm-react-universitario.onrender.com/api/advisors");
      const data = await response.json();
      setAsesores(data);
    } catch (error) {
      console.error("Error cargando asesores", error);
    }
  }, []);

  useEffect(() => {
    cargarAsesores();
  }, [cargarAsesores]);"

  // 🔹 Guardar asesor con foto
  const agregarAsesor = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const formData = new FormData();
      formData.append("full_name", nuevoAsesor.nombre);
      formData.append("email", nuevoAsesor.email);
      formData.append("phone", nuevoAsesor.phone);
      formData.append("area", nuevoAsesor.carrera);
      if (foto) {
        formData.append("photo", foto);
      }

      const response = await fetch("http://localhost:3000/api/advisors", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Error al guardar");

      await cargarAsesores();
      setNuevoAsesor(INITIAL_STATE);
      setFoto(null);
      setMostrarFormulario(false);
    } catch (error) {
      alert("No se pudo guardar el asesor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <CRMLayout>
      <section className="p-6 min-h-screen bg-[#1a1a32]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Asesores</h1>
            <p className="text-sm text-gray-300">
              Información obtenida desde la base de datos
            </p>
          </div>

          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-[#f0c02f] hover:bg-[#d4a926] transition-colors text-[#1a1a32] px-4 py-2 rounded-lg font-medium"
          >
            + Agregar asesor
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {asesores.map((asesor) => (
            <div
              key={asesor.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100"
            >
              {/* Contenedor de Imagen con Fallback */}
              <div className="w-24 h-24 mb-4 relative">
                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden border-2 border-[#f0c02f]">
                  <img
                    src={
                      asesor.photo
                        ? `http://localhost:3000/uploads/${asesor.photo}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(asesor.full_name)}&background=random`
                    }
                    alt={asesor.full_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150?text=User";
                    }}
                  />
                </div>
              </div>

              {/* Información del Asesor */}
              <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">
                {asesor.full_name}
              </h3>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3 bg-blue-50 px-2 py-1 rounded">
                {asesor.area || "Sin área"}
              </span>
              
              <div className="w-full border-t border-gray-100 pt-3 mt-auto">
                <p className="text-sm text-gray-600 truncate mb-1">
                  <span className="opacity-70">📧</span> {asesor.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="opacity-70">📞</span> {asesor.phone}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Formulario */}
        {mostrarFormulario && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <form
              onSubmit={agregarAsesor}
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Registrar Nuevo Asesor</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input
                    required
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    value={nuevoAsesor.nombre}
                    onChange={(e) => setNuevoAsesor({ ...nuevoAsesor, nombre: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f0c02f] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                  <input
                    required
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={nuevoAsesor.email}
                    onChange={(e) => setNuevoAsesor({ ...nuevoAsesor, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f0c02f] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      type="text"
                      placeholder="9991234567"
                      value={nuevoAsesor.phone}
                      onChange={(e) => setNuevoAsesor({ ...nuevoAsesor, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f0c02f] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Área / Carrera</label>
                    <input
                      type="text"
                      placeholder="Ventas"
                      value={nuevoAsesor.carrera}
                      onChange={(e) => setNuevoAsesor({ ...nuevoAsesor, carrera: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f0c02f] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFoto(e.target.files[0])}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0c02f] file:text-[#1a1a32] hover:file:bg-[#d4a926] cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={cargando}
                  className="bg-[#1a1a32] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#2a2a4d] disabled:opacity-50 transition-all"
                >
                  {cargando ? "Guardando..." : "Guardar Asesor"}
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </CRMLayout>
  );
}