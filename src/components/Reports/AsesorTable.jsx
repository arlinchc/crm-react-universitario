import Badge  from '../Badge';

const estadoTraduccion = {
  Enrolled: "Inscrito",
  Prospect: "Prospecto",
  Contacted: "Contactado",
  Confirmed: "Confirmado",
};

function AsesorTable({ asesor }) {
  if (!asesor) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-gray-500">
        Selecciona un asesor para ver sus prospectos.
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      <div className="px-6 py-4 bg-[#1a1a32] border-b-4 border-[#f0c02f]">
        <h3 className="text-3xl font-bold mb-6 text-white tracking-wide">
          Prospectos - {asesor.nombre}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
           <thead className="bg-[#1a1a32] text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Teléfono</th>
              <th className="px-6 py-3">Programa</th>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3">Estado</th>
            </tr>
          </thead>

          <tbody>
            {asesor.prospectosDetalle.map((item) => (
              <tr
                key={item.id}
                 className="border-b border-gray-200 hover:bg-yellow-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {item.nombre}
                </td>

                <td className="px-6 py-4">
                  {item.telefono}
                </td>

                <td className="px-6 py-4">
                  {item.programa}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {item.fecha}
                </td>

                <td className="px-6 py-4">
                 <Badge text={estadoTraduccion[item.estado] || item.estado} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AsesorTable;