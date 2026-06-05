import { useOutletContext, useNavigate } from "react-router-dom";

const sections = [
  { label: "Daily Attendance",        desc: "Today's check-in/out, present & absent",  to: "daily",       dot: "bg-green-400",  color: "border-green-800/50 hover:border-green-500/60" },
  { label: "Monthly Attendance",      desc: "Month-wise attendance summary per employee", to: "monthly",   dot: "bg-yellow-400", color: "border-yellow-800/50 hover:border-yellow-500/60" },
  { label: "Employee-wise",           desc: "Attendance history for individual employees", to: "employee-wise", dot: "bg-blue-400",color: "border-blue-800/50 hover:border-blue-500/60" },
  { label: "Late Coming Report",      desc: "Employees who checked in late",            to: "late-coming", dot: "bg-red-400",    color: "border-red-800/50 hover:border-red-500/60" },
];

export default function AttendanceManagement() {
  const { todayPresent, todayAbsent, leaveCount, monthlyPct } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-1">Attendance Management</h2>
      <p className="text-[#555] text-sm mb-5">Track and manage employee attendance records.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Today Present",  value: todayPresent, color: "text-green-400" },
          { label: "Today Absent",   value: todayAbsent,  color: "text-red-400" },
          { label: "On Leave",       value: leaveCount,   color: "text-purple-400" },
          { label: "Monthly Avg %",  value: `${monthlyPct}%`, color: monthlyPct >= 75 ? "text-green-400" : "text-yellow-400" },
        ].map(s => (
          <div key={s.label} className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[#555] text-[11px] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map(s => (
          <button key={s.to} onClick={() => navigate(s.to)}
            className={`bg-[#111] border ${s.color} rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
              <p className="text-white font-semibold text-sm">{s.label}</p>
            </div>
            <p className="text-[#555] text-xs">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
