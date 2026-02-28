import Sidebar from "../components/Sidebar";

function CRMLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,#2a2a5a,#1a1a32)]">
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

export default CRMLayout;
