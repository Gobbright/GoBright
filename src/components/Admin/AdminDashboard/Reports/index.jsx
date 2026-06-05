import { useNavigate } from "react-router-dom";

const sections = [
  { label: "Daily Attendance Report",  desc: "Today's full attendance log",          to: "daily",    color: "border-green-800/50 hover:border-green-500/60",  icon: "📅" },
  { label: "Monthly Attendance Report",desc: "Month-wise summary for all employees", to: "monthly",  color: "border-yellow-800/50 hover:border-yellow-500/60", icon: "📆" },
  { label: "Employee Report",          desc: "Individual employee full report",       to: "employee", color: "border-blue-800/50 hover:border-blue-500/60",    icon: "👤" },
  { label: "Leave Report",             desc: "All leave records with status",         to: "leave",    color: "border-purple-800/50 hover:border-purple-500/60", icon: "🗓" },
  { label: "Salary Attendance Report", desc: "Attendance-based salary summary",      to: "salary",   color: "border-[#e32028]/30 hover:border-[#e32028]/60",  icon: "💰" },
];

export default function Reports() {
  const navigate = useNavigate();
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-1">Reports</h2>
      <p className="text-[#555] text-sm mb-5">Export, print, or view all attendance and payroll reports.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(s => (
          <button key={s.to} onClick={() => navigate(s.to)}
            className={`bg-[#111] border ${s.color} rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5`}>
            <p className="text-3xl mb-3">{s.icon}</p>
            <p className="text-white font-semibold text-sm">{s.label}</p>
            <p className="text-[#555] text-xs mt-1">{s.desc}</p>
            <div className="flex gap-2 mt-3">
              <span className="text-[9px] px-2 py-0.5 rounded-md bg-green-900/30 text-green-400">CSV</span>
              <span className="text-[9px] px-2 py-0.5 rounded-md bg-blue-900/30 text-blue-400">PDF</span>
              <span className="text-[9px] px-2 py-0.5 rounded-md bg-[#2a2a2a] text-[#888]">Print</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
