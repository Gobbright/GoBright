import { useOutletContext, useNavigate } from "react-router-dom";
import { statusLabel } from "../helpers";
import { PHOTOS } from "../photos";

const sections = [
  { label: "Employee Details",    desc: "View full employee profiles, ID, contact & more", to: "details",   icon: "👤", color: "border-blue-800/50 hover:border-blue-500/60" },
  { label: "Employee Documents",  desc: "Aadhaar, PAN, Resume, Certificates & more",      to: "documents", icon: "📄", color: "border-yellow-800/50 hover:border-yellow-500/60" },
  { label: "Add Employee",        desc: "Register a new employee to the system",           to: "add",       icon: "➕", color: "border-green-800/50 hover:border-green-500/60" },
  { label: "Edit Employee",       desc: "Update employee information",                     to: "edit",      icon: "✏️", color: "border-purple-800/50 hover:border-purple-500/60" },
  { label: "View Profile",        desc: "Detailed employee profile view",                  to: "profile",   icon: "🪪", color: "border-[#e32028]/30 hover:border-[#e32028]/60" },
];

export default function EmployeeManagement() {
  const { employees, todayRecs } = useOutletContext();
  const navigate = useNavigate();

  const active   = employees.filter(e => !e.inactive).length;
  const inactive = employees.filter(e => e.inactive).length;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-1">Employee Management</h2>
      <p className="text-[#555] text-sm mb-5">Manage all employee records, documents and actions.</p>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total",    value: employees.length, color: "text-white" },
          { label: "Active",   value: active,           color: "text-green-400" },
          { label: "Inactive", value: inactive,         color: "text-red-400" },
        ].map(s => (
          <div key={s.label} className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[#555] text-[11px] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {sections.map(s => (
          <button key={s.to} onClick={() => navigate(s.to)}
            className={`bg-[#111] border ${s.color} rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg`}>
            <p className="text-2xl mb-2">{s.icon}</p>
            <p className="text-white font-semibold text-sm">{s.label}</p>
            <p className="text-[#555] text-xs mt-1">{s.desc}</p>
          </button>
        ))}
      </div>

      {/* Quick employee list */}
      <p className="text-[#555] text-xs uppercase tracking-wider font-semibold mb-3">All Employees</p>
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {employees.map(emp => {
              const rec = todayRecs[emp.employeeId];
              const st  = rec ? statusLabel(rec) : { text: "No Data", cls: "bg-[#2a2a2a] text-[#555]" };
              return (
                <tr key={emp.employeeId}
                  className="bg-[#111] hover:bg-[#161616] transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/dashboard/employee/${emp.employeeId}`, { state: { emp } })}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={PHOTOS[emp.employeeId]} alt="" className="w-8 h-8 rounded-lg object-cover object-top flex-shrink-0 bg-[#2a2a2a]" onError={e => { e.target.style.display = "none"; }} />
                      <span className="text-white font-medium">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#e32028] font-mono">{emp.employeeId}</td>
                  <td className="px-4 py-3 text-[#888]">{emp.position}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full font-semibold ${st.cls}`}>{st.text}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
