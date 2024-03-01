export default function SidebarCard({ cardTitle, children }) {
  return (
    <>
      <div className="sidebar-card">
        <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
          {cardTitle}
        </h3>

        <ul className="space-y-5 my-5">{children}</ul>
      </div>
    </>
  );
}
