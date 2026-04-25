import CRMLayout from "../layouts/CRMLayout";
import Card from "../components/Card";
import LeadsTable from "../components/LeadsTable";
import leads from "../data/leads";  

function Leads() {
    return(
        <CRMLayout>
            <h1 className="text-2xl font-bold mb-6">
                Prospectos
            </h1>
            <Card title="Lista de Leads">
                <LeadsTable leads={leads} />
            </Card>
        </CRMLayout>
    )
}
export default Leads