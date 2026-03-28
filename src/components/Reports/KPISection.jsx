function KPISection({ asesor }) {
  if (!asesor) return null;

  const conversionRate =
    asesor.prospectos > 0
      ? ((asesor.inscritos / asesor.prospectos) * 100).toFixed(1)
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 border-t-4 border-t-[#f0c02f] hover:shadow-2xl transition">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#f0c02f] rounded-t-2xl"></div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Prospectos</h3>
        <p className="text-4xl font-bold text-[#1a1a32]">{asesor.prospectos}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 border-t-4 border-t-[#f0c02f] hover:shadow-2xl transition">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#f0c02f] rounded-t-2xl"></div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Inscritos</h3>
        <p className="text-4xl font-bold text-[#1a1a32]">{asesor.inscritos}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 border-t-4 border-t-[#f0c02f] hover:shadow-2xl transition">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#f0c02f] rounded-t-2xl"></div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Conversión</h3>
        <p
          className={`text-4xl font-bold ${
            conversionRate > 40
              ? "text-green-600"
              : conversionRate > 20
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >{conversionRate}%</p>
      </div>
    </div>
  );
}

export default KPISection;