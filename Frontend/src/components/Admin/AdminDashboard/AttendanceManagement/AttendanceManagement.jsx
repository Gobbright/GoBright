import { useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { fD, exportCSV } from "../helpers";

export default function AttendanceManagement() {
  const { allRecords, todayStr, exportCSV: ctxExport } = useOutletContext();
  const navigate = useNavigate();

  const todayRecs = useMemo(() => allRecords.filter(r => r.date === todayStr), [allRecords, todayStr]);
  const present   = todayRecs.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
  const absent    = todayRecs.filter(r => r.isAbsent).length;
  const onLeave   = todayRecs.filter(r => r.isLeave).length;
  const noData    = todayRecs.filter(r => !r.inTime && !r.isAbsent && !r.isLeave).length;

  const stats = [
    { label: "Present",   value: present, color: "text-green-400",  bg: "border-green-900/40" },
    { label: "Absent",    value: absent,  color: "text-red-400",    bg: "border-red-900/40" },
    { label: "On Leave",  value: onLeave, color: "text-purple-400", bg: "border-purple-900/40" },
    { label: "No Data",   value: noData,  color: "text-[#555]",     bg: "border-[#2a2a2a]" },
  ];

  const views = [
    {
      label: "Daily Attendance",
      desc: "View all employees' attendance for any date",
      path: "/admin/dashboard/attendance-management/daily",
      badge: `${present} present today`,
      badgeCls: "bg-green-900/40 text-green-400",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>,
    },
    {
      label: "Monthly Attendance",
      desc: "Month-wise attendance percentage per employee",
      path: "/admin/dashboard/monthly-attendance",
      badge: "Month view",
      badgeCls: "bg-blue-900/40 text-blue-400",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>,
    },
    {
      label: "Employee Wise Attendance",
      desc: "Deep-dive into attendance records per employee",
      path: "/admin/dashboard/attendance-management/employee-wise",
      badge: "Per employee",
      badgeCls: "bg-yellow-900/40 text-yellow-400",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>,
    },
    {
      label: "Late Coming Report",
      desc: "Track employees who arrived after scheduled time",
      path: "/admin/dashboard/attendance-management/late-coming",
      badge: "Punctuality",
      badgeCls: "bg-orange-900/40 text-orange-400",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Attendance Management</h2>
          <p className="text-[#555] text-xs mt-0.5">Today — {fD(todayStr)}</p>
        </div>
        <button
          onClick={() => ctxExport(allRecords.filter(r => r.date === todayStr), `attendance_${todayStr}`)}
          className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors self-start sm:self-auto"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Export Today CSV
        </button>
      </div>

      {/* Today stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className={`bg-[#111] border rounded-2xl p-4 text-center ${s.bg}`}>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[#555] text-[11px] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Nav cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {views.map(v => (
          <button key={v.path} onClick={() => navigate(v.path)}
            className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-5 text-left hover:border-[#e32028]/30 transition-all hover:-translate-y-0.5 group">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${v.badgeCls}`}>{v.badge}</span>
              <svg className="w-4 h-4 text-[#555] group-hover:text-[#e32028] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">{v.icon}</svg>
              </span>
              <div>
                <p className="text-white font-semibold text-sm">{v.label}</p>
                <p className="text-[#555] text-[11px] mt-0.5 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
