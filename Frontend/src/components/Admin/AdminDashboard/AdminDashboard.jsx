import { useState, useEffect, useRef, useCallback } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { API, exportCSV } from "./helpers";
import logo from "../../../assets/img/logo.png";

const ICONS = {
  dashboard:   "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  employees:   "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  attendance:  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  leave:       "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  reports:     "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  salary:      "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
  website:     "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
};

const PAGE_TITLES = {
  "/admin/dashboard":                                        "Dashboard Overview",
  "/admin/dashboard/total-employees":                        "Total Employees",
  "/admin/dashboard/attendance/present":                     "Today Present",
  "/admin/dashboard/attendance/absent":                      "Today Absent",
  "/admin/dashboard/leave-requests":                         "Leave Requests",
  "/admin/dashboard/monthly-attendance":                     "Monthly Attendance",
  "/admin/dashboard/export":                                 "Quick Report Export",
  "/admin/dashboard/report":                                 "Report",
  "/admin/dashboard/employee-management":                    "Employee Management",
  "/admin/dashboard/employee-management/add":                "Add Employee",
  "/admin/dashboard/attendance-management":                  "Attendance Management",
  "/admin/dashboard/attendance-management/daily":            "Daily Attendance",
  "/admin/dashboard/attendance-management/employee-wise":    "Employee Wise Attendance",
  "/admin/dashboard/attendance-management/late-coming":      "Late Coming Report",
  "/admin/dashboard/leave-management":                       "Leave Management",
  "/admin/dashboard/leave-management/history":               "Leave History",
  "/admin/dashboard/leave-management/balance":               "Leave Balance",
  "/admin/dashboard/reports":                                "Reports",
  "/admin/dashboard/reports/daily":                          "Daily Report",
  "/admin/dashboard/reports/monthly":                        "Monthly Report",
  "/admin/dashboard/reports/employee":                       "Employee Report",
  "/admin/dashboard/reports/leave":                          "Leave Report",
  "/admin/dashboard/reports/salary":                         "Salary Report",
  "/admin/dashboard/salary":                                 "Salary / Payroll",
  "/admin/dashboard/salary/generate-payslip":                "Generate Payslip",
  "/admin/dashboard/salary/history":                         "Salary History",
  "/admin/dashboard/website/clients":                        "Clients Management",
  "/admin/dashboard/website/reviews":                        "Google Reviews",
  "/admin/dashboard/website/team":                           "Team Management",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const p = location.pathname;

  useEffect(() => {
    if (sessionStorage.getItem("gb_admin") !== "1") navigate("/admin", { replace: true });
  }, [navigate]);

  const [employees,  setEmployees]  = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [todayRecs,  setTodayRecs]  = useState({});
  const [navOpen,    setNavOpen]    = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [dashOpen,    setDashOpen]    = useState(true);
  const [empOpen,     setEmpOpen]     = useState(false);
  const [attendOpen,  setAttendOpen]  = useState(false);
  const [leaveOpen,   setLeaveOpen]   = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [salaryOpen,  setSalaryOpen]  = useState(false);
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const [attSubOpen,  setAttSubOpen]  = useState(false);

  const profileRef = useRef();

  const todayStr     = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().split("T")[0];
  const currentMonth = todayStr.slice(0, 7);

  useEffect(() => {
    function onOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  // Cleanup old GB001 format employees on first load
  useEffect(() => {
    fetch(`${API.replace("/attendance", "")}/employees/cleanup/old-format`, { method: "DELETE" }).catch(() => {});
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`${API}/attendance/employees-list`, { signal: ctrl.signal })
      .then(r => r.json()).then(d => setEmployees(d.employees || [])).catch(() => {});
    return () => ctrl.abort();
  }, []);

  const refreshAllRecords = useCallback(async () => {
    const r = await fetch(`${API}/attendance/all`);
    const d = await r.json();
    setAllRecords(d.records || []);
    const today = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().split("T")[0];
    const map = {};
    (d.records || []).filter(rec => rec.date === today).forEach(rec => { map[rec.employeeId] = rec; });
    setTodayRecs(map);
  }, []);

  useEffect(() => { refreshAllRecords(); }, [refreshAllRecords]);

  const refreshEmployees = useCallback(async () => {
    const r = await fetch(`${API}/attendance/employees-list`);
    const d = await r.json();
    setEmployees(d.employees || []);
  }, []);

  const todayPresent = Object.values(todayRecs).filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
  const todayAbsent  = Object.values(todayRecs).filter(r => r.isAbsent).length;
  const leaveCount   = Object.values(todayRecs).filter(r => r.isLeave).length;
  const monthRecs    = allRecords.filter(r => r.date.startsWith(currentMonth));
  const monthlyPct   = monthRecs.length > 0
    ? Math.round(monthRecs.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length / monthRecs.length * 100) : 0;

  async function handleDelete(recId) {
    await fetch(`${API}/attendance/${recId}`, { method: "DELETE" });
    await refreshAllRecords();
  }

  function handleClose() { sessionStorage.removeItem("gb_admin"); navigate("/"); }
  function go(to) { navigate(to); setNavOpen(false); }

  const ctx = {
    employees, allRecords, todayRecs, todayStr, currentMonth,
    todayPresent, todayAbsent, leaveCount, monthRecs, monthlyPct,
    handleDelete, refreshAllRecords, refreshEmployees, exportCSV,
  };

  const pageTitle = PAGE_TITLES[p]
    || (p.startsWith("/admin/dashboard/employee/") ? "Employee Detail"
      : p.startsWith("/admin/dashboard/employee-management/edit/") ? "Edit Employee"
      : p.startsWith("/admin/dashboard/employee-management/documents/") ? "Employee Documents"
      : "Dashboard");

  const notifCount = leaveCount;

  /* nav helpers */
  function NavSub({ to, label, count, countCls }) {
    const active = p === to;
    return (
      <button onClick={() => go(to)}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors
          ${active ? "bg-[#1e1e1e] text-white" : "text-zinc-500 hover:text-white hover:bg-[#181818]"}`}>
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? "bg-[#e32028]" : "bg-[#333]"}`} />
        <span className="flex-1 text-left">{label}</span>
        {count !== undefined && (
          <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${countCls}`}>{count}</span>
        )}
      </button>
    );
  }

  function NavSection({ iconPath, label, open, onToggle, active }) {
    return (
      <button onClick={onToggle}
        className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-bold transition-all duration-200
          ${active
            ? "bg-gradient-to-r from-[#e32028] to-[#c41d23] text-white shadow-lg shadow-[#e32028]/25"
            : "text-zinc-400 hover:text-white hover:bg-[#1a1a1a]"}`}>
        <span className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? "bg-white/20" : "bg-[#1a1a1a]"}`}>
            <svg className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
            </svg>
          </span>
          {label}
        </span>
        <svg className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  }

  function NavDropdown({ open, children }) {
    if (!open) return null;
    return (
      <div className="mt-0.5 mx-1 bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-lg">
        {children}
        <div className="h-1" />
      </div>
    );
  }

  const isDash = p.startsWith("/admin/dashboard") &&
    p !== "/admin/dashboard/total-employees" &&
    !p.startsWith("/admin/dashboard/employee-management") &&
    !p.startsWith("/admin/dashboard/employee/") &&
    !p.startsWith("/admin/dashboard/attendance-management") &&
    !p.startsWith("/admin/dashboard/leave-management") &&
    !p.startsWith("/admin/dashboard/reports") &&
    !p.startsWith("/admin/dashboard/salary") &&
    !p.startsWith("/admin/dashboard/website");

  return (
    <div className="fixed inset-0 z-[200] bg-[#0d0d0d] flex overflow-hidden">
      {navOpen && <div className="fixed inset-0 z-[240] bg-black/60 md:hidden" onClick={() => setNavOpen(false)} />}

      {/* ══════ SIDEBAR ══════ */}
      <div className={`fixed inset-y-0 left-0 z-[250] w-72 bg-[#0f0f0f] border-r border-[#2a2a2a] flex flex-col transition-transform duration-300
        md:relative md:translate-x-0 md:z-auto ${navOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>

        {/* Sidebar logo */}
        <div className="px-4 py-4 border-b border-[#2a2a2a] flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-[#e32028]/10 to-transparent">
          <img src={logo} alt="GoBright" className="h-16 w-auto object-contain" />
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">

          {/* 1. Admin Dashboard */}
          <NavSection iconPath={ICONS.dashboard} label="Admin Dashboard" open={dashOpen}
            onToggle={() => { navigate("/admin/dashboard"); setDashOpen(o => !o); setNavOpen(false); }}
            active={isDash} />
          <NavDropdown open={dashOpen}>
            <div className="border-b border-[#1a1a1a]">
              <button onClick={() => setAttSubOpen(o => !o)}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium transition-colors
                  ${p.startsWith("/admin/dashboard/attendance/") ? "bg-[#1e1e1e] text-white" : "text-[#777] hover:text-white hover:bg-[#181818]"}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2a2a2a] flex-shrink-0" />
                <span className="flex-1 text-left">Attendance</span>
                <svg className={`w-3 h-3 transition-transform ${attSubOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {attSubOpen && (
                <div className="bg-[#080808]">
                  <button onClick={() => go("/admin/dashboard/attendance/present")}
                    className={`w-full flex items-center gap-2 pl-9 pr-4 py-1.5 text-sm transition-colors ${p === "/admin/dashboard/attendance/present" ? "text-green-400" : "text-[#666] hover:text-white"}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="flex-1">Today Present</span>
                    <span className="text-xs bg-green-900/40 text-green-400 px-1.5 py-0.5 rounded-md">{todayPresent}</span>
                  </button>
                  <button onClick={() => go("/admin/dashboard/attendance/absent")}
                    className={`w-full flex items-center gap-2 pl-9 pr-4 py-1.5 text-sm transition-colors ${p === "/admin/dashboard/attendance/absent" ? "text-red-400" : "text-[#666] hover:text-white"}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    <span className="flex-1">Today Absent</span>
                    <span className="text-xs bg-red-900/40 text-red-400 px-1.5 py-0.5 rounded-md">{todayAbsent}</span>
                  </button>
                </div>
              )}
            </div>
            <div className="border-b border-[#1a1a1a]">
              <NavSub to="/admin/dashboard/leave-requests" label="Leave Requests" count={leaveCount} countCls="bg-purple-900/40 text-purple-400" />
            </div>
            <div className="border-b border-[#1a1a1a]">
              <NavSub to="/admin/dashboard/monthly-attendance" label="Monthly Attendance %" count={`${monthlyPct}%`}
                countCls={monthlyPct >= 75 ? "bg-green-900/40 text-green-400" : "bg-yellow-900/40 text-yellow-400"} />
            </div>
            <NavSub to="/admin/dashboard/export" label="Quick Report Export" />
          </NavDropdown>

          {/* 2. Employee Management */}
          <NavSection iconPath={ICONS.employees} label="Employee Management" open={empOpen}
            onToggle={() => { navigate("/admin/dashboard/total-employees"); setEmpOpen(o => !o); setNavOpen(false); }}
            active={p === "/admin/dashboard/total-employees" || p.startsWith("/admin/dashboard/employee-management") || p.startsWith("/admin/dashboard/employee/")} />
          <NavDropdown open={empOpen}>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/total-employees" label="View All Employees" count={employees.length} countCls="bg-[#2a2a2a] text-zinc-400" /></div>
            <NavSub to="/admin/dashboard/employee-management/add" label="Add New Employee" />
          </NavDropdown>

          {/* 3. Attendance Management */}
          <NavSection iconPath={ICONS.attendance} label="Attendance Management" open={attendOpen}
            onToggle={() => setAttendOpen(o => !o)}
            active={p.startsWith("/admin/dashboard/attendance-management")} />
          <NavDropdown open={attendOpen}>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/attendance-management" label="Overview" /></div>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/attendance-management/daily" label="Daily Attendance" /></div>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/monthly-attendance" label="Monthly Attendance" /></div>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/attendance-management/employee-wise" label="Employee Wise" /></div>
            <NavSub to="/admin/dashboard/attendance-management/late-coming" label="Late Coming Report" />
          </NavDropdown>

          {/* 4. Leave Management */}
          <NavSection iconPath={ICONS.leave} label="Leave Management" open={leaveOpen}
            onToggle={() => setLeaveOpen(o => !o)}
            active={p.startsWith("/admin/dashboard/leave-management")} />
          <NavDropdown open={leaveOpen}>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/leave-management" label="Leave Records" count={leaveCount} countCls="bg-purple-900/40 text-purple-400" /></div>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/leave-management/history" label="Leave History" /></div>
            <NavSub to="/admin/dashboard/leave-management/balance" label="Leave Balance" />
          </NavDropdown>

          {/* 5. Reports */}
          <NavSection iconPath={ICONS.reports} label="Reports" open={reportsOpen}
            onToggle={() => setReportsOpen(o => !o)}
            active={p.startsWith("/admin/dashboard/reports") || p === "/admin/dashboard/report"} />
          <NavDropdown open={reportsOpen}>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/reports" label="All Reports" /></div>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/reports/daily" label="Daily Report" /></div>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/reports/monthly" label="Monthly Report" /></div>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/reports/employee" label="Employee Report" /></div>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/reports/leave" label="Leave Report" /></div>
            <NavSub to="/admin/dashboard/reports/salary" label="Salary Report" />
          </NavDropdown>

          {/* 6. Salary */}
          <NavSection iconPath={ICONS.salary} label="Salary / Payroll" open={salaryOpen}
            onToggle={() => setSalaryOpen(o => !o)}
            active={p.startsWith("/admin/dashboard/salary")} />
          <NavDropdown open={salaryOpen}>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/salary" label="Payroll Overview" /></div>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/salary/generate-payslip" label="Generate Payslip" /></div>
            <NavSub to="/admin/dashboard/salary/history" label="Salary History" />
          </NavDropdown>

          {/* 7. Website Content */}
          <NavSection iconPath={ICONS.website} label="Website Content" open={websiteOpen}
            onToggle={() => setWebsiteOpen(o => !o)}
            active={p.startsWith("/admin/dashboard/website")} />
          <NavDropdown open={websiteOpen}>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/website/clients" label="Clients" /></div>
            <div className="border-b border-[#1a1a1a]"><NavSub to="/admin/dashboard/website/reviews" label="Google Reviews" /></div>
            <NavSub to="/admin/dashboard/website/team" label="Team" />
          </NavDropdown>
        </div>
      </div>

      {/* ══════ MAIN AREA ══════ */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* ── TOP HEADER BAR ── */}
        <header className="h-16 bg-[#111] border-b border-[#2a2a2a] flex items-center px-5 gap-3 flex-shrink-0 relative z-10">

          {/* Mobile hamburger */}
          <button onClick={() => setNavOpen(true)} className="md:hidden text-[#555] hover:text-white transition-colors flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          {/* Logo — mobile only (desktop logo is in sidebar) */}
          <div className="flex items-center gap-2 md:hidden flex-1">
            <img src={logo} alt="GoBright" className="h-6 w-auto" />
          </div>

          {/* Page title — desktop */}
          <p className="hidden md:block text-white font-bold text-base flex-1">{pageTitle}</p>

          {/* Right controls */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0" ref={profileRef}>

            {/* Notification bell */}
            <button
              onClick={() => go("/admin/dashboard/leave-management")}
              className="relative w-9 h-9 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-white hover:bg-[#222] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              {notifCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e32028] rounded-full text-[9px] text-white font-black flex items-center justify-center">
                  {notifCount > 9 ? "9+" : notifCount}
                </span>
              )}
            </button>

            {/* Profile avatar */}
            <button
              onClick={() => setProfileOpen(o => !o)}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e32028] to-[#c41d23] flex items-center justify-center text-white font-black text-xs shadow-lg hover:shadow-[#e32028]/30 transition-all"
            >
              GA
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute top-[68px] right-4 w-72 bg-[#141414] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden">
                {/* Profile header */}
                <div className="px-5 py-5 border-b border-[#2a2a2a] flex items-center gap-4 bg-gradient-to-r from-[#e32028]/10 to-transparent">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e32028] to-[#c41d23] flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg">
                    GA
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-bold text-base truncate">GoBright Admin</p>
                    <p className="text-zinc-500 text-sm mt-0.5">Owner · Super Admin</p>
                    <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 font-semibold">Active</span>
                  </div>
                </div>

                {/* Stats summary */}
                <div className="px-5 py-4 border-b border-[#2a2a2a] grid grid-cols-3 gap-3 text-center">
                  {[
                    [employees.length, "Staff"],
                    [todayPresent,     "Present"],
                    [`${monthlyPct}%`, "Attend"],
                  ].map(([val, label]) => (
                    <div key={label} className="bg-[#1a1a1a] rounded-xl py-2.5">
                      <p className="text-white font-black text-base">{val}</p>
                      <p className="text-zinc-600 text-xs mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="py-2">
                  <button onClick={() => { setProfileOpen(false); go("/admin/dashboard"); }}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm text-zinc-400 hover:text-white hover:bg-[#1a1a1a] transition-colors font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.dashboard}/></svg>
                    Dashboard Overview
                  </button>
                  <button onClick={() => { setProfileOpen(false); handleClose(); }}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-semibold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet context={ctx} />
        </div>
      </div>
    </div>
  );
}
