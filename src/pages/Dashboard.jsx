import CRMLayout from "../layouts/CRMLayout";
import Card from "../components/Card";

function Dashboard() {
  return (
    <CRMLayout>
      <h1 className="text-2xl font-bold mb-6">
        Dashboard de Captación de Leads
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Prospectos">300</Card>
        <Card title="Contactados">150</Card>
        <Card title="Inscritos">75</Card>
        <Card title="Confirmados">50</Card>
      </div>
    </CRMLayout>
  );
}
//Esotilin
export default Dashboard;
