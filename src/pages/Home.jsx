import CRMLayout from "../layouts/CRMLayout";

function Home() {
  return (
    <CRMLayout>
      <h2 className="text-2xl font-bold mb-4">
        Inicio
      </h2>
      <p className="text-slate-600">
        Bienvenido a nuestra app web con React
      </p>
    </CRMLayout>
  );
}

export default Home;
