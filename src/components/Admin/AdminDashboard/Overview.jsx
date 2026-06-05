import { useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { fD, fT, fM, workMins, statusLabel } from "./helpers";
import { PHOTOS } from "./photos";

function StatCard({ value, label, color, bg, border, icon, sub, onClick }) {
  return (
    <button onClick={onClick}
      className={`rounded-3xl p-5 text-left transition-all hover:-translate-y-1 hover:shadow-xl group ${bg} border ${border}`}>
      <div className="flex items-start justify-between mb-4">
        <span className={`w-11 h-11 rounded-2xl flex items-center justify-center bg-current/10`}>
          <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon}/>
          </svg>
        </span>
        <svg className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500 transition-colors mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </div>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
      <p className="text-zinc-500 text-sm font-medium mt-1">{label}</p>
      {sub && <p className="text-zinc-700 text-xs mt-0.5">{sub}</p>}
    </button>
  );
}

const STATUS_DOT = {
  Present: "bg-green-400",
  Active:  "bg-green-400",
  Absent:  "bg-red-400",
  Leave:   "bg-violet-400",
  "No Data": "bg-zinc-600",
};
const STATUS_BADGE = {
  Present:  "bg-green-500/15 text-green-400 border border-green-500/25",
  Active:   "bg-green-500/15 text-green-400 border border-green-500/25",
  Absent:   "bg-red-500/15   text-red-400   border border-red-500/25",
  Leave:    "bg-violet-500/15 text-violet-400 border border-violet-500/25",
  "No Data":"bg-zinc-800      text-zinc-500  border border-zinc-700",
};

export default function Overview() {
  const { employees, allRecords, todayRecs, todayStr, currentMonth, todayPresent, todayAbsent, leaveCount, monthlyPct } = useOutletContext();
  const navigate = useNavigate();

  const now = new Date(Date.now() + 5.5 * 3600000);
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const dateLabel = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const noCheckIn = useMemo(() =>
    employees.filter(e => !todayRecs[e.employeeId]).length
  , [employees, todayRecs]);

  const lateToday = useMemo(() =>
    Object.values(todayRecs).filter(r => {
      if (!r.inTime || r.isAbsent || r.isLeave) return false;
      const ist = new Date(new Date(r.inTime).getTime() + 5.5 * 3600000);
      return ist.toISOString().substr(11, 5) > "09:30";
    }).length
  , [todayRecs]);

  const monthTotal = allRecords.filter(r => r.date.startsWith(currentMonth)).length;

  const todayList = useMemo(() =>
    employees.map(emp => ({ emp, rec: todayRecs[emp.employeeId] || null }))
  , [employees, todayRecs]);

  const primary = [
    {
      value: employees.length,
      label: "Total Employees",
      color: "text-white",
      bg: "bg-[#141414]",
      border: "border-[#e32028]/50",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
      sub: "GoBright Team",
      to: "/admin/dashboard/total-employees",
    },
    {
      value: todayPresent,
      label: "Present Today",
      color: "text-green-400",
      bg: "bg-[#141414]",
      border: "border-green-900/40",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      sub: `${employees.length > 0 ? Math.round(todayPresent / employees.length * 100) : 0}% of team`,
      to: "/admin/dashboard/attendance/present",
    },
    {
      value: todayAbsent,
      label: "Absent Today",
      color: "text-red-400",
      bg: "bg-[#141414]",
      border: "border-red-900/40",
      icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
      sub: todayAbsent > 0 ? "Action needed" : "All good",
      to: "/admin/dashboard/attendance/absent",
    },
    {
      value: leaveCount,
      label: "On Leave",
      color: "text-violet-400",
      bg: "bg-[#141414]",
      border: "border-violet-900/40",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      sub: "Today",
      to: "/admin/dashboard/leave-management",
    },
    {
      value: `${monthlyPct}%`,
      label: "Monthly Attendance",
      color: monthlyPct >= 75 ? "text-green-400" : "text-yellow-400",
      bg: "bg-[#141414]",
      border: monthlyPct >= 75 ? "border-green-900/40" : "border-yellow-900/40",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      sub: monthlyPct >= 75 ? "On target" : "Below 75%",
      to: "/admin/dashboard/monthly-attendance",
    },
  ];

  const secondary = [
    { value: lateToday,  label: "Late Arrivals",       color: "text-orange-400" },
    { value: noCheckIn,  label: "No Check-in Yet",     color: "text-zinc-400"   },
    { value: monthTotal, label: "Records This Month",  color: "text-blue-400"   },
    { value: employees.filter(e => e.status !== "inactive").length, label: "Active Staff", color: "text-green-400" },
  ];

  const quickActions = [
    { label: "Attendance",  path: "/admin/dashboard/attendance-management", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",    textCls: "text-green-400",  bgCls: "bg-green-500/10",   borderCls: "border-green-500/20"  },
    { label: "Leave",       path: "/admin/dashboard/leave-management",      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",                                                             textCls: "text-violet-400", bgCls: "bg-violet-500/10",  borderCls: "border-violet-500/20" },
    { label: "Reports",     path: "/admin/dashboard/reports",               icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",                   textCls: "text-blue-400",   bgCls: "bg-blue-500/10",    borderCls: "border-blue-500/20"   },
    { label: "Payroll",     path: "/admin/dashboard/salary",                icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z", textCls: "text-yellow-400", bgCls: "bg-yellow-500/10",  borderCls: "border-yellow-500/20" },
  ];

  return (
    <div className="p-5 md:p-8 space-y-8 bg-[#0d0d0d] min-h-full">

      {/* ── Greeting banner ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <p className="text-zinc-600 text-sm font-semibold uppercase tracking-widest">{greeting}</p>
          <h1 className="text-white font-black text-3xl mt-1 tracking-tight">GoBright Admin</h1>
          <p className="text-zinc-600 text-base mt-1">{dateLabel}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-white font-bold text-base">{fD(todayStr)}</p>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/25 font-semibold mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
              System Online
            </span>
          </div>
        </div>
      </div>

      {/* ── Primary Stats ── */}
      <div>
        <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest mb-4">Today's Overview</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {primary.map(s => (
            <StatCard key={s.label} {...s} onClick={() => navigate(s.to)} />
          ))}
        </div>
      </div>

      {/* ── Secondary Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {secondary.map(s => (
          <div key={s.label} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5 text-center">
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-zinc-500 text-sm font-medium mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Monthly Progress ── */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white font-bold text-base">Monthly Attendance Progress</p>
            <p className="text-zinc-600 text-sm mt-0.5">{allRecords.filter(r => r.date.startsWith(currentMonth) && !r.isAbsent && !r.isLeave && r.inTime).length} working days recorded</p>
          </div>
          <span className={`text-base font-black px-4 py-1.5 rounded-full ${monthlyPct >= 75 ? "bg-green-500/15 text-green-400 border border-green-500/25" : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25"}`}>
            {monthlyPct}%
          </span>
        </div>
        <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${monthlyPct >= 75 ? "bg-gradient-to-r from-green-600 to-green-400" : "bg-gradient-to-r from-yellow-600 to-yellow-400"}`}
            style={{ width: `${Math.min(monthlyPct, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <p className="text-zinc-600 text-sm">{monthlyPct >= 75 ? "✓ Good — above 75% target" : "⚠ Below 75% target"}</p>
          <p className="text-zinc-600 text-sm">{monthlyPct}% of target reached</p>
        </div>
      </div>

      {/* ── Attendance list + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Today's Attendance */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">Today's Attendance</p>
            <button onClick={() => navigate("/admin/dashboard/attendance-management/daily")}
              className="text-[#e32028] text-sm font-bold hover:underline">View All →</button>
          </div>
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl overflow-hidden">
            <div className="divide-y divide-[#1e1e1e] max-h-80 overflow-y-auto">
              {todayList.map(({ emp, rec }) => {
                const sl = rec ? statusLabel(rec) : { text: "No Data", cls: "" };
                const badgeCls = STATUS_BADGE[sl.text] || STATUS_BADGE["No Data"];
                const dotCls   = STATUS_DOT[sl.text]   || STATUS_DOT["No Data"];
                const inT  = rec?.inTime  ? fT(rec.inTime)  : "—";
                const outT = rec?.outTime ? fT(rec.outTime) : rec?.inTime ? "Active" : "—";
                return (
                  <div key={emp.employeeId}
                    onClick={() => navigate(`/admin/dashboard/employee/${emp.employeeId}`, { state: { emp } })}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                    <div className="relative flex-shrink-0">
                      <img src={PHOTOS[emp.employeeId]} alt="" className="w-10 h-10 rounded-xl object-cover object-top border border-[#2a2a2a]" />
                      <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#141414] ${dotCls}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{emp.name}</p>
                      <p className="text-zinc-600 text-xs mt-0.5">{inT} → {outT}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${badgeCls}`}>{sl.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest mb-4">Quick Actions</p>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(a => (
              <button key={a.path} onClick={() => navigate(a.path)}
                className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all hover:-translate-y-1 ${a.bgCls} ${a.borderCls}`}>
                <svg className={`w-6 h-6 ${a.textCls}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.icon}/>
                </svg>
                <span className={`text-sm font-bold ${a.textCls}`}>{a.label}</span>
              </button>
            ))}
          </div>

          <button onClick={() => navigate("/admin/dashboard/export")}
            className="w-full mt-3 flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#141414] border border-[#2a2a2a] text-zinc-400 hover:text-white hover:bg-[#1a1a1a] text-sm font-bold transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Quick Export
          </button>
        </div>
      </div>

    </div>
  );
}
