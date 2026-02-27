import Sidebar from "../components/Sidebar";

function CRMLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#24244a]">
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

export default CRMLayout;
