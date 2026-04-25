import { useEffect, useState, useCallback } from "react";
import CRMLayout from "../layouts/CRMLayout";

// 💡 Define la URL base en un solo lugar para evitar errores
const API_BASE_URL = "https://crm-react-universitario.onrender.com/api/advisors";
const ASSETS_URL = "https://crm-react-universitario.onrender.com/uploads"; 

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

  const cargarAsesores = useCallback(async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Error en respuesta");
      const data = await response.json();
      setAsesores(data);
    } catch (error) {
      console.error("Error cargando asesores", error);
    }
  }, []);

  useEffect(() => {
    cargarAsesores();
  }, [cargarAsesores]);

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

      // 🚀 CAMBIO: Ahora usa la misma URL que el GET
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        body: formData,
        // Nota: Con FormData NO debes poner "Content-Type" manualmente, 
        // el navegador lo hace por ti incluyendo el 'boundary'.
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al guardar");
      }

      await cargarAsesores();
      setNuevoAsesor(INITIAL_STATE);
      setFoto(null);
      setMostrarFormulario(false);
      alert("Asesor guardado exitosamente"); // Feedback para el usuario

    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <CRMLayout>
      <section className="p-6 min-h-screen bg-[#1a1a32]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Asesores</h1>
            <p className="text-sm text-gray-300">Gestión de personal académico</p>
          </div>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-[#f0c02f] hover:bg-[#d4a926] transition-colors text-[#1a1a32] px-4 py-2 rounded-lg font-medium"
          >
            + Agregar asesor
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {asesores.map((asesor) => (
            <div key={asesor.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 relative">
                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden border-2 border-[#f0c02f]">
                  <img
                    src={
                      asesor.photo
                        ? `${ASSETS_URL}/${asesor.photo}` // 🚀 URL de assets dinámica
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(asesor.full_name)}&background=random`
                    }
                    alt={asesor.full_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/150?text=User";
                    }}
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800">{asesor.full_name}</h3>
              <span className="text-xs font-semibold uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded mb-3">
                {asesor.area || "Sin área"}
              </span>
              <div className="w-full border-t pt-3 mt-auto text-sm text-gray-600">
                <p className="truncate">📧 {asesor.email}</p>
                <p>📞 {asesor.phone}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {mostrarFormulario && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <form onSubmit={agregarAsesor} className="bg-white rounded-2xl p-8 w-full max-w-md">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Registrar Nuevo Asesor</h2>
              <div className="space-y-4">
                <input
                  required
                  placeholder="Nombre Completo"
                  value={nuevoAsesor.nombre}
                  onChange={(e) => setNuevoAsesor({ ...nuevoAsesor, nombre: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
                <input
                  required
                  type="email"
                  placeholder="Correo Electrónico"
                  value={nuevoAsesor.email}
                  onChange={(e) => setNuevoAsesor({ ...nuevoAsesor, email: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="Teléfono"
                    value={nuevoAsesor.phone}
                    onChange={(e) => setNuevoAsesor({ ...nuevoAsesor, phone: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                  <input
                    placeholder="Área"
                    value={nuevoAsesor.carrera}
                    onChange={(e) => setNuevoAsesor({ ...nuevoAsesor, carrera: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFoto(e.target.files[0])}
                  className="w-full text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                <button
                  type="submit"
                  disabled={cargando}
                  className="bg-[#1a1a32] text-white px-6 py-2 rounded-lg disabled:opacity-50"
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