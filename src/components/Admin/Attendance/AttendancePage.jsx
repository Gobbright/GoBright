import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_ATTENDANCE_API_URL || "http://localhost:5001/api";
const BREAK_LIMIT_MINS = 45;

/* ── helpers for admin ── */
function aFmt(d, opts) { if (!d) return "--"; return new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", ...opts }); }
const aFmtT = (d) => aFmt(d, { hour: "2-digit", minute: "2-digit", hour12: true });
const aFmtD = (s) => { if (!s) return "--"; const [y,m,dy]=s.split("-"); return new Date(Number(y),Number(m)-1,Number(dy)).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}); };
function aFmtM(m) { if(!m||m<=0) return "0m"; const h=Math.floor(m/60); const mn=Math.round(m%60); return h>0?`${h}h ${mn}m`:`${mn}m`; }

/* ══════════════════════════════════════════
   ADMIN DASHBOARD (full screen)
═══════════════════════════════════════════ */
function AdminDashboard({ onClose }) {
  const [employees, setEmployees] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [eRes, rRes] = await Promise.all([
          fetch(`${API}/attendance/employees-list`),
          fetch(`${API}/attendance/all`),
        ]);
        const eData = await eRes.json();
        const rData = await rRes.json();
        setEmployees(eData.employees || []);
        setAllRecords(rData.records || []);
      } catch { /* silent */ }
      setLoading(false);
    })();
  }, []);

  const todayIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().split("T")[0];
  const todayMap = {};
  allRecords.filter(r => r.date === todayIST).forEach(r => { todayMap[r.employeeId] = r; });
  const pastRecords = allRecords.filter(r => r.date !== todayIST);

  function getStatus(rec) {
    if (!rec) return "no-data";
    if (rec.isLeave) return "leave";
    if (rec.isAbsent) return "absent";
    if (rec.outTime) return "done";
    if (rec.inTime) return "active";
    return "no-data";
  }

  const statusStyle = {
    active:  { card: "bg-green-900/20 border-green-700/50",  dot: "bg-green-400",  label: "text-green-400",  text: "Active"  },
    done:    { card: "bg-blue-900/20 border-blue-700/50",    dot: "bg-blue-400",   label: "text-blue-400",   text: "Done"    },
    absent:  { card: "bg-red-900/20 border-red-700/50",      dot: "bg-red-400",    label: "text-red-400",    text: "Absent"  },
    leave:   { card: "bg-purple-900/20 border-purple-700/50",dot: "bg-purple-400", label: "text-purple-400", text: "Leave"   },
    "no-data":{ card: "bg-[#1a1a1a] border-[#2a2a2a]",      dot: "bg-[#444]",     label: "text-[#555]",     text: "No Data" },
  };

  function calcWork(rec) {
    if (!rec?.inTime || !rec?.outTime) return null;
    return Math.max(0, Math.round(
      (new Date(rec.outTime) - new Date(rec.inTime)) / 60000
      - (rec.totalBreakMinutes || 0)
      - (rec.totalLunchMinutes || 0)
    ));
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0d0d] flex flex-col">

      {/* Header */}
      <div className="bg-[#111] border-b border-[#2a2a2a] px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={onClose} className="text-[#555] hover:text-white text-sm transition-colors">← Back</button>
        <p className="flex-1 text-center text-white font-bold text-sm">Admin Dashboard</p>
        <p className="text-[#e32028] text-xs font-mono">{aFmtD(todayIST)}</p>
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* ── Today's Overview ── */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-[#555] text-[10px] uppercase tracking-widest font-semibold mb-3">Today's Status</p>
          {loading ? (
            <p className="text-[#555] text-center py-6 text-sm">Loading…</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {employees.map(emp => {
                const rec = todayMap[emp.employeeId] || null;
                const st  = getStatus(rec);
                const s   = statusStyle[st];
                return (
                  <div key={emp.employeeId} className={`rounded-xl p-3 border ${s.card}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                      <p className="text-white text-xs font-semibold truncate">
                        {emp.name.replace(/^Mr\.\s|^Mrs\.\s/, "")}
                      </p>
                    </div>
                    <p className="text-[#444] text-[10px] font-mono mb-1">{emp.employeeId}</p>
                    <p className={`text-[10px] font-bold ${s.label}`}>{s.text}</p>
                    {rec?.inTime && (
                      <div className="mt-1.5 pt-1.5 border-t border-white/5 grid grid-cols-2 gap-x-2 text-[10px]">
                        <span className="text-[#444]">In</span>
                        <span className="text-green-400 text-right">{aFmtT(rec.inTime)}</span>
                        {rec.outTime && <>
                          <span className="text-[#444]">Out</span>
                          <span className="text-blue-400 text-right">{aFmtT(rec.outTime)}</span>
                          <span className="text-[#444]">Work</span>
                          <span className="text-white font-semibold text-right">{aFmtM(calcWork(rec))}</span>
                        </>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Previous Records Table ── */}
        <div className="px-4 pt-4 pb-8">
          <p className="text-[#555] text-[10px] uppercase tracking-widest font-semibold mb-3">Previous Records</p>
          {loading ? null : pastRecords.length === 0 ? (
            <p className="text-[#555] text-center py-6 text-sm">No previous records.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-[#1a1a1a] text-[#555] uppercase tracking-wider text-[10px]">
                    <th className="px-3 py-2.5 text-left whitespace-nowrap">Date</th>
                    <th className="px-3 py-2.5 text-left whitespace-nowrap">Employee</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">In</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">Break</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">Lunch</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">Out</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">Work</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pastRecords.map((rec, i) => {
                    const st = getStatus(rec);
                    const s  = statusStyle[st];
                    return (
                      <tr key={i} className={`border-t border-[#1a1a1a] ${i % 2 === 0 ? "bg-[#111]" : "bg-[#0f0f0f]"}`}>
                        <td className="px-3 py-2 text-[#e32028] font-mono whitespace-nowrap">{aFmtD(rec.date)}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <p className="text-white font-medium">{rec.employeeName?.replace(/^Mr\.\s|^Mrs\.\s/, "")}</p>
                          <p className="text-[#444] font-mono text-[9px]">{rec.employeeId}</p>
                        </td>
                        <td className="px-3 py-2 text-center text-green-400 whitespace-nowrap">
                          {rec.inTime && !rec.isAbsent && !rec.isLeave ? aFmtT(rec.inTime) : "--"}
                        </td>
                        <td className="px-3 py-2 text-center text-orange-400 whitespace-nowrap">
                          {rec.totalBreakMinutes > 0 ? aFmtM(rec.totalBreakMinutes) : "--"}
                        </td>
                        <td className="px-3 py-2 text-center text-purple-400 whitespace-nowrap">
                          {rec.totalLunchMinutes > 0 ? aFmtM(rec.totalLunchMinutes) : "--"}
                        </td>
                        <td className="px-3 py-2 text-center text-blue-400 whitespace-nowrap">
                          {rec.outTime && !rec.isAbsent && !rec.isLeave ? aFmtT(rec.outTime) : "--"}
                        </td>
                        <td className="px-3 py-2 text-center text-white font-semibold whitespace-nowrap">
                          {calcWork(rec) !== null ? aFmtM(calcWork(rec)) : "--"}
                        </td>
                        <td className="px-3 py-2 text-center whitespace-nowrap">
                          <span className={`text-[10px] font-bold ${s.label}`}>{s.text}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ADMIN LOGIN MODAL
═══════════════════════════════════════════ */
function AdminLoginModal({ onClose, onSuccess }) {
  const [name, setName]       = useState("");
  const [pass, setPass]       = useState("");
  const [showP, setShowP]     = useState(false);
  const [err, setErr]         = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); setErr(""); setLoading(true);
    try {
      const r = await fetch(`${API}/auth/owner-login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), password: pass }),
      });
      const d = await r.json();
      if (d.success) onSuccess();
      else setErr(d.message || "Invalid credentials.");
    } catch { setErr("Cannot connect to server."); }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 px-4 pb-6 sm:pb-0" onClick={onClose}>
      <div className="w-full max-w-sm bg-[#111] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#e32028]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <p className="text-white font-bold">Admin Login</p>
          </div>
          <button onClick={onClose} className="text-[#555] hover:text-white text-xl transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Name</label>
            <input type="text" placeholder="Enter admin name" value={name} onChange={e => setName(e.target.value)}
              autoComplete="off"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333]"
              required />
          </div>
          <div>
            <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Password</label>
            <div className="relative">
              <input type={showP ? "text" : "password"} placeholder="Admin password" value={pass} onChange={e => setPass(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 pr-11 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333]"
                required />
              <button type="button" onClick={() => setShowP(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition-colors">
                <Eye show={showP} />
              </button>
            </div>
          </div>
          {err && <p className="text-red-400 text-xs bg-red-900/20 border border-red-800/30 rounded-lg px-3 py-2">{err}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-[#e32028] hover:bg-[#c41d23] disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
            {loading ? "Verifying…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── helpers ── */
function fmt(d, opts) {
  if (!d) return "--";
  return new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", ...opts });
}
const fmtTime   = (d) => fmt(d, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
const fmtShort  = (d) => fmt(d, { hour: "2-digit", minute: "2-digit", hour12: true });
const fmtDay    = (d) => fmt(d, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

function fmtMins(m) {
  if (!m || m <= 0) return "0m";
  const h = Math.floor(m / 60);
  const min = Math.round(m % 60);
  return h > 0 ? `${h}h ${min}m` : `${min}m`;
}

function activeBreakMins(record, now) {
  const b = record?.breaks?.find(x => x.start && !x.end);
  if (!b) return 0;
  return (now - new Date(b.start)) / 60000;
}

function totalBreakMins(record, now) {
  if (!record?.breaks?.length) return 0;
  return record.breaks.reduce((t, b) => {
    if (!b.start) return t;
    return t + ((b.end ? new Date(b.end) : now) - new Date(b.start)) / 60000;
  }, 0);
}

function workMins(record, now) {
  if (!record?.inTime) return 0;
  const end = record.outTime ? new Date(record.outTime) : now;
  const brk = record.outTime ? (record.totalBreakMinutes || 0) : totalBreakMins(record, now);
  let lunch = 0;
  if (record.lunchInTime) {
    const lunchEnd = record.lunchOutTime ? new Date(record.lunchOutTime) : (record.outTime ? new Date(record.outTime) : now);
    lunch = Math.max(0, (lunchEnd - new Date(record.lunchInTime)) / 60000);
  }
  return Math.max(0, (end - new Date(record.inTime)) / 60000 - brk - lunch);
}

function shootWorkMinsCalc(record, now) {
  if (!record?.shootWorkInTime) return null;
  const end = record.shootWorkOutTime ? new Date(record.shootWorkOutTime) : now;
  const brk = record.outTime ? (record.totalBreakMinutes || 0) : totalBreakMins(record, now);
  let lunch = 0;
  if (record.lunchInTime) {
    const lunchEnd = record.lunchOutTime ? new Date(record.lunchOutTime) : (record.outTime ? new Date(record.outTime) : now);
    lunch = Math.max(0, (lunchEnd - new Date(record.lunchInTime)) / 60000);
  }
  return Math.max(0, (end - new Date(record.shootWorkInTime)) / 60000 - brk - lunch);
}

/* ── Eye icon ── */
function Eye({ show }) {
  return show ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

/* ── Time display box ── */
function TimeBox({ label, value, color = "text-white", badge }) {
  return (
    <div className="flex-1 bg-[#1a1a1a] rounded-xl p-3 text-center border border-[#2a2a2a]">
      <p className="text-[#555] text-[10px] uppercase tracking-wider mb-1">{label}</p>
      <p className={`${color} text-sm font-bold`}>{value}</p>
      {badge && <p className="text-yellow-400 text-[10px] mt-1">{badge}</p>}
    </div>
  );
}

/* ── Action button ── */
function Btn({ label, sub, color, disabled, loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex-1 py-4 rounded-2xl font-bold text-white text-sm flex flex-col items-center justify-center gap-0.5 transition-all
        ${disabled ? "bg-[#1a1a1a] text-[#444] cursor-not-allowed border border-[#2a2a2a]" : `${color} shadow-lg active:scale-95`}`}
    >
      <span>{loading ? "…" : label}</span>
      {sub && <span className="text-[10px] font-normal opacity-70">{sub}</span>}
    </button>
  );
}

/* ── Confirm Modal ── */
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 px-4 pb-6 sm:pb-0"
      onClick={onCancel}>
      <div className="w-full max-w-sm bg-[#161616] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="px-5 py-5 text-center">
          <p className="text-white font-semibold text-base mb-1">Confirm</p>
          <p className="text-[#888] text-sm">{message}</p>
        </div>
        <div className="grid grid-cols-2 border-t border-[#2a2a2a]">
          <button onClick={onCancel}
            className="py-4 text-[#888] hover:text-white text-sm font-medium transition-colors border-r border-[#2a2a2a]">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="py-4 text-[#e32028] hover:text-white hover:bg-[#e32028] text-sm font-bold transition-colors">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════ */
function Dashboard({ employee, photo, attendance, setAttendance, onLogout }) {
  const [now, setNow]           = useState(new Date());
  const [busy, setBusy]         = useState("");
  const [expandedWork, setExpandedWork] = useState(null);
  const [confirm, setConfirm]   = useState(null);
  const [adminModal, setAdminModal] = useState(false);
  const [adminOpen, setAdminOpen]   = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  function askConfirm(message, endpoint) {
    setConfirm({ message, endpoint });
  }

  async function call(endpoint) {
    setBusy(endpoint);
    try {
      const r = await fetch(`${API}/attendance/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: employee.employeeId }),
      });
      const data = await r.json();
      if (data.success) setAttendance(data.record);
      else alert(data.message);
    } catch { alert("Connection error."); }
    setBusy("");
  }

  async function handleConfirm() {
    const endpoint = confirm.endpoint;
    setConfirm(null);
    await call(endpoint);
  }

  const a = attendance;
  const isIn       = !!a?.inTime;
  const isOut      = !!a?.outTime;
  const onBreak    = a?.breaks?.some(b => b.start && !b.end) ?? false;
  const onLunch    = !!a?.lunchInTime && !a?.lunchOutTime;
  const breakMins  = activeBreakMins(a, now);
  const breakWarn  = onBreak && breakMins >= BREAK_LIMIT_MINS;
  const totalBrk   = totalBreakMins(a, now);
  const lunchMins  = onLunch ? (now - new Date(a.lunchInTime)) / 60000 : 0;
  const wMins      = workMins(a, now);
  const sWMins     = shootWorkMinsCalc(a, now);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(227,32,40,0.05),transparent_50%)] pointer-events-none" />

      {/* Top bar */}
      <div className="relative bg-[#111] border-b border-[#2a2a2a] px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {photo ? (
            <img src={photo} alt="" className="w-11 h-11 rounded-xl object-cover object-top flex-shrink-0 border border-[#2a2a2a]" />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-[#2a2a2a] flex-shrink-0 flex items-center justify-center text-lg">👤</div>
          )}
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">{employee.name}</p>
            <p className="text-[#555] text-xs truncate">
              <span className="text-[#e32028] font-mono font-medium">{employee.employeeId}</span>
              <span className="mx-1">·</span>{employee.position}
            </p>
          </div>
        </div>
        <button onClick={onLogout}
          className="flex-shrink-0 text-[#555] hover:text-white text-xs border border-[#2a2a2a] rounded-lg px-3 py-1.5 transition-colors">
          Logout
        </button>
      </div>

      <div className="relative max-w-md mx-auto px-4 py-5 space-y-4">

        {/* Clock */}
        <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 text-center">
          <p className="text-[#555] text-xs mb-1">{fmtDay(now)}</p>
          <p className="text-white text-4xl font-bold tracking-widest tabular-nums">{fmtTime(now)}</p>
        </div>

        {/* Break warning */}
        {breakWarn && (
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-2xl px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-yellow-400 font-semibold text-sm">Break Time Exceeded!</p>
              <p className="text-yellow-300/70 text-xs mt-0.5">You've been on break for {Math.round(breakMins)}m. Please resume work.</p>
            </div>
          </div>
        )}

        {/* ── 3 Main Buttons ── */}
        <div className="flex gap-3">
          <Btn
            label="IN TIME"
            sub={a?.inTime ? fmtShort(a.inTime) : "Tap to check in"}
            color={isIn ? "bg-green-800" : "bg-green-700 hover:bg-green-600"}
            disabled={isIn}
            loading={busy === "checkin"}
            onClick={() => askConfirm("Mark your In Time now?", "checkin")}
          />
          <Btn
            label={onBreak ? "BREAK OUT" : "BREAK IN"}
            sub={onBreak ? `${Math.round(breakMins)}m elapsed` : (a?.breaks?.length > 0 && !onBreak ? `${a.breaks.length} break(s)` : "45m limit")}
            color={onBreak ? "bg-yellow-700 hover:bg-yellow-600" : "bg-orange-700 hover:bg-orange-600"}
            disabled={!isIn || isOut || onLunch}
            loading={busy === "break-start" || busy === "break-end"}
            onClick={() => askConfirm(onBreak ? "End break and resume work?" : "Start break? (45 min limit)", onBreak ? "break-end" : "break-start")}
          />
          <Btn
            label="OUT TIME"
            sub={a?.outTime ? fmtShort(a.outTime) : "Tap to check out"}
            color={isOut ? "bg-blue-800" : "bg-blue-700 hover:bg-blue-600"}
            disabled={!isIn || isOut || onBreak || onLunch}
            loading={busy === "checkout"}
            onClick={() => askConfirm("Mark your Out Time and end the day?", "checkout")}
          />
        </div>

        {/* ── Lunch Button ── */}
        {isIn && (
          <div className="flex gap-3">
            <Btn
              label={onLunch ? "LUNCH OUT" : "LUNCH IN"}
              sub={onLunch ? `${Math.round(lunchMins)}m elapsed` : (a?.lunchOutTime ? `Done · ${fmtShort(a.lunchInTime)} – ${fmtShort(a.lunchOutTime)}` : "Tap for lunch break")}
              color={onLunch ? "bg-purple-700 hover:bg-purple-600" : (a?.lunchOutTime ? "bg-purple-900" : "bg-purple-700 hover:bg-purple-600")}
              disabled={!isIn || isOut || (!!a?.lunchOutTime) || onBreak}
              loading={busy === "lunch-in" || busy === "lunch-out"}
              onClick={() => askConfirm(onLunch ? "End lunch and resume work?" : "Start lunch break?", onLunch ? "lunch-out" : "lunch-in")}
            />
          </div>
        )}

        {/* ── Time Record ── */}
        {isIn && (
          <div className="grid grid-cols-2 gap-3">
            <TimeBox label="In Time"   value={fmtShort(a.inTime)}  color="text-green-400" />
            <TimeBox
              label="Break"
              value={fmtMins(Math.round(a.outTime ? (a.totalBreakMinutes || 0) : totalBrk))}
              color={breakWarn ? "text-yellow-400" : "text-orange-400"}
              badge={breakWarn ? "⚠ Exceeded" : undefined}
            />
            <TimeBox
              label="Lunch"
              value={a?.lunchInTime
                ? (a?.lunchOutTime
                  ? fmtMins(Math.round((new Date(a.lunchOutTime) - new Date(a.lunchInTime)) / 60000))
                  : fmtMins(Math.round(lunchMins)) + " ⏳")
                : "--"}
              color={onLunch ? "text-purple-400" : (a?.lunchOutTime ? "text-purple-300" : "text-[#444]")}
            />
            <TimeBox
              label="Out Time"
              value={a.outTime ? fmtShort(a.outTime) : "--:--"}
              color={a.outTime ? "text-blue-400" : "text-[#444]"}
            />
          </div>
        )}

        {/* Shoot Work Info */}
        {isIn && a?.shootWorkInTime && (
          <div className="bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3">
            <p className="text-[#555] text-[10px] uppercase tracking-wider mb-2">Shoot Work</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[#555] text-[9px] uppercase mb-0.5">In</p>
                <p className="text-pink-400 text-xs font-bold">{fmtShort(a.shootWorkInTime)}</p>
              </div>
              <div>
                <p className="text-[#555] text-[9px] uppercase mb-0.5">Out</p>
                <p className={`text-xs font-bold ${a.shootWorkOutTime ? "text-blue-400" : "text-yellow-400"}`}>
                  {a.shootWorkOutTime ? fmtShort(a.shootWorkOutTime) : "⏳"}
                </p>
              </div>
              <div>
                <p className="text-[#555] text-[9px] uppercase mb-0.5">Hours</p>
                <p className="text-white text-xs font-bold">{fmtMins(Math.round(sWMins ?? 0))}</p>
              </div>
            </div>
          </div>
        )}

        {/* Work hours */}
        {isIn && (
          <div className="bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-[#555] text-xs uppercase tracking-wider">Total Work Hours</span>
            <span className="text-white font-bold">{fmtMins(Math.round(wMins))}</span>
          </div>
        )}

        {/* ── Field Work / Shoot Work ── */}
        {!expandedWork ? (
          /* Both buttons visible */
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "field", label: "Field Work", hasIn: !!a?.fieldWorkInTime, hasOut: !!a?.fieldWorkOutTime },
              { key: "shoot", label: "Shoot Work",  hasIn: !!a?.shootWorkInTime, hasOut: !!a?.shootWorkOutTime },
            ].map(({ key, label, hasIn, hasOut }) => (
              <button key={key}
                onClick={() => !isOut && setExpandedWork(key)}
                disabled={isOut && !hasIn}
                className={`bg-[#111] border rounded-2xl py-4 px-3 flex flex-col items-center gap-1.5 transition-all group
                  ${isOut && !hasIn ? "border-[#1a1a1a] opacity-40 cursor-not-allowed" : "border-[#2a2a2a] hover:border-[#e32028]/50"}`}>
                <span className="text-white text-sm font-semibold group-hover:text-[#e32028] transition-colors">{label}</span>
                {hasIn ? (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${hasOut ? "bg-blue-900/40 text-blue-400" : "bg-green-900/40 text-green-400"}`}>
                    {hasOut ? "Completed" : "In Progress"}
                  </span>
                ) : (
                  <span className="text-[#444] text-[10px]">Tap to open</span>
                )}
              </button>
            ))}
          </div>
        ) : (
          /* One selected — show only that */
          <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
            {/* Header with back */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]">
              <p className="text-white font-semibold text-sm">
                {expandedWork === "field" ? "Field Work" : "Shoot Work"}
              </p>
              <button onClick={() => setExpandedWork(null)}
                className="text-[#555] hover:text-white text-xs px-2 py-1 rounded-lg border border-[#2a2a2a] hover:border-[#555] transition-colors">
                ← Back
              </button>
            </div>
            {/* In / Out buttons */}
            <div className="p-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => askConfirm(`Mark ${expandedWork === "field" ? "Field" : "Shoot"} Work In Time?`, expandedWork === "field" ? "field-work-in" : "shoot-work-in")}
                disabled={isOut || !!(expandedWork === "field" ? a?.fieldWorkInTime : a?.shootWorkInTime) || busy.includes("in")}
                className={`py-5 rounded-xl text-sm font-semibold transition-all flex flex-col items-center gap-1
                  ${isOut && !(expandedWork === "field" ? a?.fieldWorkInTime : a?.shootWorkInTime)
                    ? "bg-[#1a1a1a] text-[#333] cursor-not-allowed border border-[#2a2a2a]"
                    : (expandedWork === "field" ? a?.fieldWorkInTime : a?.shootWorkInTime)
                    ? "bg-green-900/30 text-green-400 border border-green-800 cursor-default"
                    : "bg-green-700 hover:bg-green-600 text-white active:scale-95"}`}
              >
                <span className="text-[10px] opacity-60 uppercase tracking-wider">In Time</span>
                <span className="text-base font-bold">
                  {(expandedWork === "field" ? a?.fieldWorkInTime : a?.shootWorkInTime)
                    ? fmtShort(expandedWork === "field" ? a.fieldWorkInTime : a.shootWorkInTime)
                    : "Tap"}
                </span>
              </button>
              <button
                onClick={() => askConfirm(`Mark ${expandedWork === "field" ? "Field" : "Shoot"} Work Out Time?`, expandedWork === "field" ? "field-work-out" : "shoot-work-out")}
                disabled={
                  isOut ||
                  !(expandedWork === "field" ? a?.fieldWorkInTime : a?.shootWorkInTime) ||
                  !!(expandedWork === "field" ? a?.fieldWorkOutTime : a?.shootWorkOutTime) ||
                  busy.includes("out")
                }
                className={`py-5 rounded-xl text-sm font-semibold transition-all flex flex-col items-center gap-1
                  ${(expandedWork === "field" ? a?.fieldWorkOutTime : a?.shootWorkOutTime)
                    ? "bg-blue-900/30 text-blue-400 border border-blue-800 cursor-default"
                    : !(expandedWork === "field" ? a?.fieldWorkInTime : a?.shootWorkInTime)
                      ? "bg-[#1a1a1a] text-[#333] cursor-not-allowed border border-[#2a2a2a]"
                      : "bg-blue-700 hover:bg-blue-600 text-white active:scale-95"}`}
              >
                <span className="text-[10px] opacity-60 uppercase tracking-wider">Out Time</span>
                <span className="text-base font-bold">
                  {(expandedWork === "field" ? a?.fieldWorkOutTime : a?.shootWorkOutTime)
                    ? fmtShort(expandedWork === "field" ? a.fieldWorkOutTime : a.shootWorkOutTime)
                    : "Tap"}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Done message */}
        {isOut && (
          <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-5 text-center">
            <p className="text-3xl mb-2">✅</p>
            <p className="text-white font-semibold">Day complete!</p>
            <p className="text-[#555] text-xs mt-1">Work hours: {fmtMins(Math.round(wMins))}</p>
          </div>
        )}

      </div>

      {confirm && (
        <ConfirmModal
          message={confirm.message}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {adminModal && (
        <AdminLoginModal
          onClose={() => setAdminModal(false)}
          onSuccess={() => { setAdminModal(false); setAdminOpen(true); }}
        />
      )}

      {adminOpen && <AdminDashboard onClose={() => setAdminOpen(false)} />}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function AttendancePage() {
  const location  = useLocation();
  const navigate  = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [photo, setPhoto]       = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [adminModal, setAdminModal] = useState(false);
  const [adminOpen, setAdminOpen]   = useState(false);

  /* fetch today's record for a specific employee */
  const fetchToday = useCallback(async (id) => {
    try {
      const r = await fetch(`${API}/attendance/today/${id}`);
      const d = await r.json();
      setAttendance(d.record || null);
    } catch { /* silent */ }
  }, []);

  /* login from Team page — always requires fresh selection */
  useEffect(() => {
    const emp = location.state?.employee;
    const ph  = location.state?.photo;
    if (emp) {
      setEmployee(emp);
      setPhoto(ph || null);
      setAttendance(null);
      fetchToday(emp.employeeId);
      window.history.replaceState({}, "");
    }
  }, [location.state, fetchToday]);

  /* auto-refresh every 30s */
  useEffect(() => {
    if (!employee) return;
    const t = setInterval(() => fetchToday(employee.employeeId), 30000);
    return () => clearInterval(t);
  }, [employee, fetchToday]);

  function handleLogout() {
    setEmployee(null);
    setAttendance(null);
    setPhoto(null);
    navigate("/team", { replace: true });
  }

  /* No employee = must select from Team page */
  if (!employee) {
    navigate("/team", { replace: true });
    return null;
  }

  return (
    <Dashboard
      employee={employee}
      photo={photo}
      attendance={attendance}
      setAttendance={setAttendance}
      onLogout={handleLogout}
    />
  );
}
