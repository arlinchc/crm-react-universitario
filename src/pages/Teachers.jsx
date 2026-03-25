import CRMLayout from "../layouts/CRMLayout";
import Card from "../components/Card";

function Teachers() {
  return (
    <CRMLayout>
      <h2 className="text-2xl font-bold mb-6">
        Asesores
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Irvin Chan">
          Ingeniería
        </Card>

        <Card title="Leydi Xequeb">
          Sistemas
        </Card>

        <Card title="Carlos Gómez">
          Administración
        </Card>
      </div>
    </CRMLayout>
  );
}

export default Teachers;
