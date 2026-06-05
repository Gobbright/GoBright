import { useNavigate } from "react-router-dom";

const REPORT_TYPES = [
  {
    label: "Daily Attendance Report",
    desc: "Check-in/out, working hours, status for any single day",
    path: "/admin/dashboard/reports/daily",
    badge: "Daily",
    badgeCls: "bg-green-900/40 text-green-400",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    label: "Monthly Attendance Report",
    desc: "Month-wise summary with attendance percentage per employee",
    path: "/admin/dashboard/reports/monthly",
    badge: "Monthly",
    badgeCls: "bg-blue-900/40 text-blue-400",
    iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    label: "Employee Report",
    desc: "Full attendance history and statistics per employee",
    path: "/admin/dashboard/reports/employee",
    badge: "Employee",
    badgeCls: "bg-yellow-900/40 text-yellow-400",
    iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    label: "Leave Report",
    desc: "Leave taken, balance remaining, and leave trends",
    path: "/admin/dashboard/reports/leave",
    badge: "Leave",
    badgeCls: "bg-purple-900/40 text-purple-400",
    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    label: "Salary Attendance Report",
    desc: "Salary with deductions based on attendance and leave",
    path: "/admin/dashboard/reports/salary",
    badge: "Salary",
    badgeCls: "bg-orange-900/40 text-orange-400",
    iconPath: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

export default function Reports() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-white font-bold text-lg">Reports</h2>
        <p className="text-[#555] text-xs mt-0.5">Generate, view and export all reports</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {REPORT_TYPES.map(r => (
          <button key={r.path} onClick={() => navigate(r.path)}
            className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-5 text-left hover:border-[#e32028]/30 transition-all hover:-translate-y-0.5 group">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${r.badgeCls}`}>{r.badge}</span>
              <svg className="w-4 h-4 text-[#555] group-hover:text-[#e32028] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={r.iconPath}/>
                </svg>
              </span>
              <div>
                <p className="text-white font-semibold text-sm">{r.label}</p>
                <p className="text-[#555] text-[11px] mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
