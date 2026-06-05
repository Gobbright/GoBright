import { useState, useEffect, useCallback, useRef } from "react";
import img1  from "../../../assets/img/teams/1.jpeg";
import img2  from "../../../assets/img/teams/2.png";
import img3  from "../../../assets/img/teams/3.jpeg";
import img4  from "../../../assets/img/teams/4.jpeg";
import img5  from "../../../assets/img/teams/5.png";
import img6  from "../../../assets/img/teams/6.png";
import img7  from "../../../assets/img/teams/7.png";
import img8  from "../../../assets/img/teams/8.jpeg";
import img9  from "../../../assets/img/teams/9.jpeg";

const API = import.meta.env.VITE_ATTENDANCE_API_URL || "http://localhost:5001/api";
const PHOTOS = { GB2026001:img1,GB2026002:img2,GB2026003:img3,GB2026004:img4,GB2026005:img5,GB2026006:img6,GB2026007:img7,GB2026008:img8,GB2026009:img9 };

/* ── helpers ── */
function fS(d,o){if(!d)return"--";return new Date(d).toLocaleString("en-IN",{timeZone:"Asia/Kolkata",...o});}
const fT =(d)=>fS(d,{hour:"2-digit",minute:"2-digit",hour12:true});
const fD =(s)=>{if(!s)return"--";const[y,m,dy]=s.split("-");return new Date(Number(y),Number(m)-1,Number(dy)).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});};
function fM(m){if(!m||m<=0)return"0m";const h=Math.floor(m/60);const mn=Math.round(m%60);return h>0?`${h}h ${mn}m`:`${mn}m`;}
function workMins(rec){if(!rec?.inTime||!rec?.outTime)return 0;return Math.max(0,Math.round((new Date(rec.outTime)-new Date(rec.inTime))/60000-(rec.totalBreakMinutes||0)));}
function durationMins(a,b){if(!a||!b)return 0;return Math.max(0,Math.round((new Date(b)-new Date(a))/60000));}
function statusLabel(rec){if(rec.isLeave)return{text:"Leave",cls:"bg-purple-900/40 text-purple-400"};if(rec.isAbsent)return{text:"Absent",cls:"bg-red-900/40 text-red-400"};if(!rec.inTime)return{text:"No Data",cls:"bg-[#2a2a2a] text-[#555]"};if(!rec.outTime)return{text:"Active",cls:"bg-green-900/40 text-green-400"};return{text:"Present",cls:"bg-blue-900/40 text-blue-400"};}

/* ── CSV export ── */
function exportCSV(records, filename) {
  const hdr = ["Date","Employee ID","Name","Position","In Time","Break (min)","Out Time","Work Hours","Field In","Field Out","Field Total","Shoot In","Shoot Out","Shoot Total","Status"];
  const rows = records.map(r => [
    r.date, r.employeeId, r.employeeName, r.position,
    fT(r.inTime), r.totalBreakMinutes||0, fT(r.outTime), fM(workMins(r)),
    fT(r.fieldWorkInTime), fT(r.fieldWorkOutTime), fM(durationMins(r.fieldWorkInTime, r.fieldWorkOutTime)),
    fT(r.shootWorkInTime), fT(r.shootWorkOutTime), fM(durationMins(r.shootWorkInTime, r.shootWorkOutTime)),
    r.isLeave?"Leave":r.isAbsent?"Absent":r.inTime?"Present":"No Data"
  ]);
  const csv = [hdr,...rows].map(r=>r.map(v=>`"${v}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
  a.download = filename+".csv"; a.click();
}

/* ── Confirm Delete Modal ── */
function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-xs bg-[#161616] border border-red-800/50 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-5 py-5 text-center">
          <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </div>
          <p className="text-white font-semibold">Delete Record?</p>
          <p className="text-[#888] text-sm mt-1">This cannot be undone.</p>
        </div>
        <div className="grid grid-cols-2 border-t border-[#2a2a2a]">
          <button onClick={onCancel} className="py-3.5 text-[#888] hover:text-white text-sm font-medium border-r border-[#2a2a2a] transition-colors">Cancel</button>
          <button onClick={onConfirm} className="py-3.5 text-red-400 hover:bg-red-900/30 text-sm font-bold transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ── Shared field/shoot block ── */
function WorkBlock({ label, inTime, outTime }) {
  const total = durationMins(inTime, outTime);
  return (
    <div className="bg-[#0d0d0d] rounded-xl p-3">
      <p className="text-[#555] text-[10px] uppercase tracking-wider mb-2 font-semibold">{label}</p>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[#555]">In</span>
        <span className="text-green-400 font-semibold">{fT(inTime)}</span>
      </div>
      <div className="flex justify-between text-xs mb-2">
        <span className="text-[#555]">Out</span>
        <span className="text-blue-400 font-semibold">{outTime ? fT(outTime) : <span className="text-yellow-400">In Progress</span>}</span>
      </div>
      {total > 0 && (
        <div className="bg-[#e32028]/10 border border-[#e32028]/30 rounded-lg px-2 py-1 text-center">
          <span className="text-[#e32028] text-xs font-bold">{fM(total)}</span>
        </div>
      )}
    </div>
  );
}

/* ── TODAY Card — large prominent card ── */
function TodayCard({ rec, onDelete }) {
  const [showDel, setShowDel] = useState(false);
  const st = statusLabel(rec);
  const wm = workMins(rec);
  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-[#e32028]/60 bg-gradient-to-b from-[#e32028]/10 to-[#1a1a1a]">
      {/* TODAY badge */}
      <div className="bg-[#e32028] px-4 py-2 flex items-center justify-between">
        <span className="text-white text-xs font-bold uppercase tracking-widest">Today</span>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/20 text-white`}>{st.text}</span>
          <button onClick={() => setShowDel(true)}
            className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/30 text-white transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4">
        {rec.isLeave && <p className="text-purple-400 text-center font-semibold py-4">Sunday — Leave</p>}
        {rec.isAbsent && <p className="text-red-400 text-center font-semibold py-4">Marked Absent</p>}

        {!rec.isAbsent && !rec.isLeave && (
          <>
            {/* Big In / Break / Out */}
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="bg-[#111] rounded-2xl p-3 border border-green-900/40">
                <p className="text-[#555] text-[10px] uppercase tracking-wider mb-1">In Time</p>
                <p className="text-green-400 text-base font-bold">{fT(rec.inTime)}</p>
              </div>
              <div className="bg-[#111] rounded-2xl p-3 border border-yellow-900/40">
                <p className="text-[#555] text-[10px] uppercase tracking-wider mb-1">Break</p>
                <p className="text-yellow-400 text-base font-bold">{fM(rec.totalBreakMinutes)}</p>
              </div>
              <div className="bg-[#111] rounded-2xl p-3 border border-blue-900/40">
                <p className="text-[#555] text-[10px] uppercase tracking-wider mb-1">Out Time</p>
                <p className="text-blue-400 text-base font-bold">{rec.outTime ? fT(rec.outTime) : "--"}</p>
              </div>
            </div>

            {/* Work hours — big */}
            {rec.inTime && (
              <div className="bg-[#e32028]/15 border border-[#e32028]/40 rounded-2xl px-5 py-4 flex items-center justify-between mb-4">
                <span className="text-[#e32028] font-bold text-sm">Total Work Hours</span>
                <span className="text-white text-2xl font-black">{fM(wm)}</span>
              </div>
            )}

            {/* Field / Shoot */}
            {(rec.fieldWorkInTime || rec.shootWorkInTime) && (
              <div className="grid grid-cols-2 gap-3">
                {rec.fieldWorkInTime && <WorkBlock label="Field Work" inTime={rec.fieldWorkInTime} outTime={rec.fieldWorkOutTime} />}
                {rec.shootWorkInTime && <WorkBlock label="Shoot Work" inTime={rec.shootWorkInTime} outTime={rec.shootWorkOutTime} />}
              </div>
            )}
          </>
        )}
      </div>
      {showDel && <DeleteModal onConfirm={() => { setShowDel(false); onDelete(rec._id); }} onCancel={() => setShowDel(false)} />}
    </div>
  );
}

/* ── Status border colour map ── */
const STATUS_BORDER = {
  Present:  "border-l-blue-500",
  Active:   "border-l-green-500",
  Absent:   "border-l-red-500",
  Leave:    "border-l-purple-500",
  "No Data":"border-l-[#333]",
};

/* ── History Record Card ── */
function RecordCard({ rec, onDelete }) {
  const [showDel, setShowDel] = useState(false);
  const st = statusLabel(rec);
  const wm = workMins(rec);
  const borderColor = STATUS_BORDER[st.text] || "border-l-[#333]";
  return (
    <div className={`bg-[#1a1a1a] border border-[#2a2a2a] border-l-4 ${borderColor} rounded-2xl p-4 relative`}>
      {/* Date + Status + Delete */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-white text-sm font-bold">{fD(rec.date)}</p>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${st.cls}`}>{st.text}</span>
          <button onClick={() => setShowDel(true)}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>

      {!rec.isAbsent && !rec.isLeave && (
        <>
          {/* In / Break / Out */}
          <div className="grid grid-cols-3 gap-2 text-center mb-3">
            <div className="bg-[#111] rounded-xl p-2.5">
              <p className="text-[#555] text-[10px] mb-1">In</p>
              <p className="text-green-400 text-xs font-bold">{fT(rec.inTime)}</p>
            </div>
            <div className="bg-[#111] rounded-xl p-2.5">
              <p className="text-[#555] text-[10px] mb-1">Break</p>
              <p className="text-yellow-400 text-xs font-bold">{fM(rec.totalBreakMinutes)}</p>
            </div>
            <div className="bg-[#111] rounded-xl p-2.5">
              <p className="text-[#555] text-[10px] mb-1">Out</p>
              <p className="text-blue-400 text-xs font-bold">{fT(rec.outTime)}</p>
            </div>
          </div>

          {/* Work Hours */}
          {rec.inTime && rec.outTime && (
            <div className="flex items-center justify-between bg-[#111] rounded-xl px-3 py-2 mb-3">
              <span className="text-[#555] text-xs">Work Hours</span>
              <span className="text-white text-sm font-bold">{fM(wm)}</span>
            </div>
          )}

          {/* Field / Shoot */}
          {(rec.fieldWorkInTime || rec.shootWorkInTime) && (
            <div className="grid grid-cols-2 gap-2">
              {rec.fieldWorkInTime && <WorkBlock label="Field Work" inTime={rec.fieldWorkInTime} outTime={rec.fieldWorkOutTime} />}
              {rec.shootWorkInTime && <WorkBlock label="Shoot Work" inTime={rec.shootWorkInTime} outTime={rec.shootWorkOutTime} />}
            </div>
          )}
        </>
      )}
      {showDel && <DeleteModal onConfirm={() => { setShowDel(false); onDelete(rec._id); }} onCancel={() => setShowDel(false)} />}
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN ADMIN DASHBOARD
══════════════════════════════════════ */
export default function AdminDashboard({ onClose }) {
  const [employees, setEmployees]   = useState([]);
  const [selected, setSelected]     = useState(null);
  const [records, setRecords]       = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [view, setView]             = useState("overview"); // overview | totalEmp | present | absent | leave | monthly | employee | report
  const [navOpen, setNavOpen]       = useState(false);
  const [loading, setLoading]       = useState(false);
  // report state
  const [fromDate, setFromDate]     = useState("");
  const [toDate, setToDate]         = useState("");
  const [reportEmp, setReportEmp]   = useState("all");
  const [reportData, setReportData] = useState([]);
  const [todayRecs, setTodayRecs] = useState({});
  const [openSection, setOpenSection] = useState(null); // null | "dashboard" | "employees"
  const [empDetails, setEmpDetails]     = useState(null);
  const [editEmpModal, setEditEmpModal] = useState(false);
  const [editEmpForm, setEditEmpForm]   = useState({});
  const [deleteEmpModal, setDeleteEmpModal] = useState(false);
  const [empBusy, setEmpBusy] = useState(false);
  const [quickExportEmp, setQuickExportEmp] = useState("all");
  const [empViewTab, setEmpViewTab] = useState("details"); // "details" | "attendance"
  const printRef = useRef();
  const dashRef  = useRef();

  // fetch employees
  useEffect(() => {
    (async () => {
      const r = await fetch(`${API}/attendance/employees-list`);
      const d = await r.json();
      setEmployees(d.employees || []);
    })();
  }, []);

  // fetch all records for overview today status
  useEffect(() => {
    (async () => {
      const r = await fetch(`${API}/attendance/all`);
      const d = await r.json();
      setAllRecords(d.records || []);
      // map today's records by employeeId
      const today = new Date(Date.now()+5.5*60*60*1000).toISOString().split("T")[0];
      const map = {};
      (d.records||[]).filter(rec=>rec.date===today).forEach(rec=>{ map[rec.employeeId]=rec; });
      setTodayRecs(map);
    })();
  }, []);

  const fetchEmployee = useCallback(async (id) => {
    setLoading(true);
    const r = await fetch(`${API}/attendance/employee/${id}`);
    const d = await r.json();
    setRecords(d.records || []);
    setLoading(false);
  }, []);

  function selectEmployee(emp, tab = "details") {
    setSelected(emp);
    setEmpDetails(null);
    setEmpViewTab(tab);
    setView("employee");
    setNavOpen(false);
    setOpenSection(null);
    fetchEmployee(emp.employeeId);
    fetch(`${API}/employees/${emp.employeeId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setEmpDetails(d.employee); })
      .catch(() => {});
  }

  async function handleDelete(recId) {
    await fetch(`${API}/attendance/${recId}`, { method: "DELETE" });
    setRecords(prev => prev.filter(r => r._id !== recId));
    // refresh today map
    const r = await fetch(`${API}/attendance/all`);
    const d = await r.json();
    const today = new Date(Date.now()+5.5*60*60*1000).toISOString().split("T")[0];
    const map = {};
    (d.records||[]).filter(rec=>rec.date===today).forEach(rec=>{ map[rec.employeeId]=rec; });
    setTodayRecs(map);
    setAllRecords(d.records||[]);
  }

  async function handleEditEmployee(formData) {
    setEmpBusy(true);
    try {
      const r = await fetch(`${API}/employees/${selected.employeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const d = await r.json();
      if (d.success) { setEmpDetails(d.employee); setEditEmpModal(false); }
      else alert(d.message || "Failed to update.");
    } catch { alert("Connection error."); }
    setEmpBusy(false);
  }

  async function handleDeleteEmployee() {
    setEmpBusy(true);
    try {
      const r = await fetch(`${API}/employees/${selected.employeeId}`, { method: "DELETE" });
      const d = await r.json();
      if (d.success) {
        setDeleteEmpModal(false);
        setEmployees(prev => prev.filter(e => e.employeeId !== selected.employeeId));
        setSelected(null); setEmpDetails(null); setView("totalEmp");
      } else alert(d.message || "Failed to delete.");
    } catch { alert("Connection error."); }
    setEmpBusy(false);
  }

  function generateReport() {
    let data = [...allRecords];
    if (reportEmp !== "all") data = data.filter(r => r.employeeId === reportEmp);
    if (fromDate) data = data.filter(r => r.date >= fromDate);
    if (toDate)   data = data.filter(r => r.date <= toDate);
    setReportData(data.sort((a,b) => b.date.localeCompare(a.date)));
  }

  function handlePrint() { window.print(); }

  const todayStr     = new Date(Date.now()+5.5*60*60*1000).toISOString().split("T")[0];
  const currentMonth = todayStr.slice(0, 7);
  const todayRecords = records.filter(r => r.date === todayStr);
  const histRecords  = records.filter(r => r.date !== todayStr);

  // stats for overview header
  const todayPresent  = Object.values(todayRecs).filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
  const todayAbsent   = Object.values(todayRecs).filter(r => r.isAbsent).length;
  const leaveCount    = Object.values(todayRecs).filter(r => r.isLeave).length;
  const monthRecs     = allRecords.filter(r => r.date.startsWith(currentMonth));
  const monthlyPct    = monthRecs.length > 0
    ? Math.round(monthRecs.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length / monthRecs.length * 100)
    : 0;

  // close Admin Dashboard dropdown on outside click
  useEffect(() => {
    function onOutside(e) { if (dashRef.current && !dashRef.current.contains(e.target)) setOpenSection(null); }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const DASH_VIEWS = ["overview","present","absent","leave","monthly"];
  const EMP_VIEWS  = ["totalEmp","employee"];

  /* ── Side Nav ── */
  const sideNavEl = (
    <div style={{width:"266px"}} className={`fixed inset-y-0 left-0 z-[250] bg-[#0d0d0d] border-r border-[#2a2a2a] flex flex-col transition-transform duration-300
      md:relative md:translate-x-0 md:z-auto ${navOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>

      {/* Header */}
      <div className="px-4 py-4 border-b border-[#2a2a2a] flex items-center justify-between flex-shrink-0">
        <div>
          <p className="text-white font-bold text-sm">Admin Panel</p>
          <p className="text-[#555] text-xs">GoBright</p>
        </div>
        <button onClick={onClose} className="text-[#555] hover:text-red-400 transition-colors text-xs px-2 py-1 rounded border border-[#2a2a2a]">Exit</button>
      </div>

      {/* Nav */}
      <div ref={dashRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-1">

        {/* ══ SECTION 1: Admin Dashboard ══ */}
        <button
          onClick={() => { setOpenSection(s => s === "dashboard" ? null : "dashboard"); setNavOpen(false); }}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
            ${DASH_VIEWS.includes(view)
              ? "bg-gradient-to-r from-[#e32028] to-[#c41d23] text-white shadow-lg shadow-[#e32028]/20"
              : "text-[#aaa] hover:text-white hover:bg-[#1a1a1a]"}`}>
          <span className="flex items-center gap-2.5">
            <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${DASH_VIEWS.includes(view) ? "bg-white/20" : "bg-[#1a1a1a]"}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </span>
            Admin Dashboard
          </span>
          <svg className={`w-4 h-4 transition-transform duration-300 ${openSection === "dashboard" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        {openSection === "dashboard" && (
          <div className="mt-1 mx-1 bg-[#111] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl">

            {/* Attendance sub-items */}
            <div className="border-b border-[#1e1e1e]">
              <p className="px-4 pt-2.5 pb-1 text-[9px] text-[#444] uppercase tracking-[0.15em] font-bold">Attendance</p>
              <button onClick={() => { setView("present"); setNavOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-colors
                  ${view === "present" ? "bg-[#1e1e1e] text-green-400" : "text-[#888] hover:text-white hover:bg-[#181818]"}`}>
                <span className="w-6 h-6 rounded-md bg-green-900/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
                <span>Today Present</span>
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md bg-green-900/40 text-green-400">{todayPresent}</span>
              </button>
              <button onClick={() => { setView("absent"); setNavOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 pb-3 text-xs font-medium transition-colors
                  ${view === "absent" ? "bg-[#1e1e1e] text-red-400" : "text-[#888] hover:text-white hover:bg-[#181818]"}`}>
                <span className="w-6 h-6 rounded-md bg-red-900/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
                <span>Today Absent</span>
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md bg-red-900/40 text-red-400">{todayAbsent}</span>
              </button>
            </div>

            <button onClick={() => { setView("leave"); setNavOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-colors border-b border-[#1e1e1e]
                ${view === "leave" ? "bg-[#1e1e1e] text-purple-400" : "text-[#888] hover:text-white hover:bg-[#181818]"}`}>
              <span className="w-6 h-6 rounded-md bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </span>
              <span>Leave Requests</span>
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md bg-purple-900/40 text-purple-400">{leaveCount}</span>
            </button>

            <button onClick={() => { setView("monthly"); setNavOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-colors border-b border-[#1e1e1e]
                ${view === "monthly" ? "bg-[#1e1e1e] text-yellow-400" : "text-[#888] hover:text-white hover:bg-[#181818]"}`}>
              <span className="w-6 h-6 rounded-md bg-yellow-900/40 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              </span>
              <span>Monthly Attendance %</span>
              <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-md font-bold ${monthlyPct >= 75 ? "bg-green-900/40 text-green-400" : "bg-yellow-900/40 text-yellow-400"}`}>{monthlyPct}%</span>
            </button>

            {/* Quick Report Export */}
            <div className="px-4 pt-2.5 pb-1">
              <p className="text-[9px] text-[#444] uppercase tracking-[0.15em] font-bold mb-2">Quick Report Export</p>
              <select value={quickExportEmp} onChange={e => setQuickExportEmp(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-2 py-1.5 text-[#aaa] text-[10px] mb-2 focus:outline-none focus:border-[#e32028]">
                <option value="all">All Employees</option>
                {employees.map(e => <option key={e.employeeId} value={e.employeeId}>{e.name.replace(/^Mr\.\s|^Mrs\.\s/, "")}</option>)}
              </select>
              <div className="space-y-0.5">
                {[
                  { label: "Today Present",  color: "text-green-400",  data: () => allRecords.filter(r => r.date === todayStr && !r.isAbsent && !r.isLeave && r.inTime  && (quickExportEmp === "all" || r.employeeId === quickExportEmp)), file: `today_present_${todayStr}` },
                  { label: "Today Absent",   color: "text-red-400",    data: () => allRecords.filter(r => r.date === todayStr && r.isAbsent && (quickExportEmp === "all" || r.employeeId === quickExportEmp)), file: `today_absent_${todayStr}` },
                  { label: "Leave Requests", color: "text-purple-400", data: () => allRecords.filter(r => r.date === todayStr && r.isLeave  && (quickExportEmp === "all" || r.employeeId === quickExportEmp)), file: `leave_requests_${todayStr}` },
                  { label: "Monthly Att %",  color: "text-yellow-400", data: () => allRecords.filter(r => r.date.startsWith(currentMonth) && (quickExportEmp === "all" || r.employeeId === quickExportEmp)), file: `monthly_${currentMonth}` },
                ].map((opt, i) => (
                  <div key={i} className="flex items-center gap-1 px-1 py-1 rounded-lg hover:bg-[#181818] transition-colors">
                    <span className={`flex-1 text-[10px] font-medium ${opt.color} truncate`}>{opt.label}</span>
                    <button onClick={() => exportCSV(opt.data(), opt.file)} title="CSV" className="p-1 rounded text-[#444] hover:text-green-400 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    </button>
                    <button onClick={handlePrint} title="Print/PDF" className="p-1 rounded text-[#444] hover:text-blue-400 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-2" />
          </div>
        )}

        {/* ══ SECTION 2: Employees ══ */}
        <button
          onClick={() => { setOpenSection(s => s === "employees" ? null : "employees"); setNavOpen(false); }}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
            ${EMP_VIEWS.includes(view)
              ? "bg-gradient-to-r from-[#e32028] to-[#c41d23] text-white shadow-lg shadow-[#e32028]/20"
              : "text-[#aaa] hover:text-white hover:bg-[#1a1a1a]"}`}>
          <span className="flex items-center gap-2.5">
            <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${EMP_VIEWS.includes(view) ? "bg-white/20" : "bg-[#1a1a1a]"}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </span>
            Employees
          </span>
          <svg className={`w-4 h-4 transition-transform duration-300 ${openSection === "employees" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        {openSection === "employees" && (
          <div className="mt-1 mx-1 bg-[#111] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl">
            <button onClick={() => { setView("totalEmp"); setNavOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-colors
                ${view === "totalEmp" || view === "employee" ? "bg-[#1e1e1e] text-white" : "text-[#888] hover:text-white hover:bg-[#181818]"}`}>
              <span className="w-6 h-6 rounded-md bg-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </span>
              <span>All Employees</span>
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md bg-[#2a2a2a] text-[#888]">{employees.length}</span>
            </button>
          </div>
        )}

        {/* ══ SECTION 3: Report (direct link) ══ */}
        <button onClick={() => { setView("report"); setNavOpen(false); setOpenSection(null); }}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
            ${view === "report"
              ? "bg-gradient-to-r from-[#e32028] to-[#c41d23] text-white shadow-lg shadow-[#e32028]/20"
              : "text-[#aaa] hover:text-white hover:bg-[#1a1a1a]"}`}>
          <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${view === "report" ? "bg-white/20" : "bg-[#1a1a1a]"}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </span>
          Report
        </button>
      </div>
    </div>
  );

  /* ── helpers for new views ── */
  function ViewHeader({ title, count, color = "text-white", onExport, onPrint }) {
    return (
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div>
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <p className={`text-sm font-semibold ${color}`}>{count} records</p>
        </div>
        <div className="flex items-center gap-2">
          {onExport && (
            <button onClick={onExport}
              className="flex items-center gap-1.5 px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              CSV
            </button>
          )}
          {onPrint && (
            <button onClick={onPrint}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              Print / PDF
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ── Overview (stats dashboard) ── */
  const OverviewView = () => (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-5">Admin Dashboard</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: "Total Employees",  value: employees.length, color: "text-white",   onClick: () => setView("totalEmp"), highlight: true },
          { label: "Today Present",    value: todayPresent,     color: "text-green-400",  onClick: () => setView("present") },
          { label: "Today Absent",     value: todayAbsent,      color: "text-red-400",    onClick: () => setView("absent") },
          { label: "Leave Requests",   value: leaveCount,       color: "text-purple-400", onClick: () => setView("leave") },
          { label: "Monthly Attend %", value: `${monthlyPct}%`, color: monthlyPct >= 75 ? "text-green-400" : "text-yellow-400", onClick: () => setView("monthly") },
        ].map(s => (
          <button key={s.label} onClick={s.onClick}
            className={`rounded-2xl p-4 text-center transition-all hover:-translate-y-0.5
              ${s.highlight
                ? "bg-[#111] border-2 border-[#e32028] shadow-[0_0_18px_rgba(227,32,40,0.25)] hover:shadow-[0_0_28px_rgba(227,32,40,0.4)]"
                : "bg-[#111] border border-[#2a2a2a] hover:border-[#e32028]/60"}`}>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[#555] text-[11px] mt-1 leading-tight">{s.label}</p>
          </button>
        ))}
      </div>
    </div>
  );

  /* ── Total Employees view — cards only ── */
  const TotalEmpView = () => (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Total Employees</h2>
          <p className="text-[#555] text-sm">{employees.length} team members</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map(emp => (
          <div key={emp.employeeId} className="bg-[#111] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#e32028]/40 transition-all">
            <div className="flex items-center gap-3 p-4 border-b border-[#1a1a1a]">
              <img src={PHOTOS[emp.employeeId]} alt="" className="w-12 h-12 rounded-xl object-cover object-top flex-shrink-0 border border-[#2a2a2a]" />
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">{emp.name}</p>
                <p className="text-[#e32028] text-xs font-mono">{emp.employeeId}</p>
                <p className="text-[#555] text-[11px] truncate mt-0.5">{emp.position}</p>
              </div>
            </div>
            <div className="px-3 py-3">
              <button onClick={() => selectEmployee(emp, "details")}
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#e32028] hover:bg-[#c41d23] text-white text-xs font-semibold rounded-lg transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                View All Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ── Today Present / Daily Attendance view ── */
  const PresentView = () => {
    const recs = allRecords.filter(r => r.date === todayStr && !r.isAbsent && !r.isLeave && r.inTime);
    return (
      <div className="p-4 md:p-6">
        <ViewHeader title="Daily Attendance" count={recs.length} color="text-green-400"
          onExport={() => exportCSV(recs, `daily_attendance_${todayStr}`)}
          onPrint={handlePrint} />
        {recs.length === 0
          ? <p className="text-[#555] text-center py-12">No present records for today.</p>
          : (
            <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">Employee</th>
                    <th className="px-4 py-3 text-left">In Time</th>
                    <th className="px-4 py-3 text-left">Break</th>
                    <th className="px-4 py-3 text-left">Out Time</th>
                    <th className="px-4 py-3 text-left">Work Hours</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]">
                  {recs.map((rec, i) => {
                    const emp = employees.find(e => e.employeeId === rec.employeeId);
                    const wm  = workMins(rec);
                    const st  = statusLabel(rec);
                    return (
                      <tr key={i} className="bg-[#111] hover:bg-[#161616] transition-colors cursor-pointer"
                        onClick={() => emp && selectEmployee(emp)}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-8 h-8 rounded-lg object-cover object-top flex-shrink-0" />}
                            <div>
                              <p className="text-white font-medium">{rec.employeeName}</p>
                              <p className="text-[#555]">{rec.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-green-400 font-semibold whitespace-nowrap">{fT(rec.inTime)}</td>
                        <td className="px-4 py-3 text-yellow-400">{fM(rec.totalBreakMinutes)}</td>
                        <td className="px-4 py-3 text-blue-400 whitespace-nowrap">{rec.outTime ? fT(rec.outTime) : <span className="text-yellow-400 font-semibold">Active ⏳</span>}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {wm > 0 ? (
                            <span className="inline-flex items-center px-2.5 py-1 bg-[#e32028]/15 border border-[#e32028]/40 rounded-lg text-[#e32028] font-black text-xs">
                              {fM(wm)}
                            </span>
                          ) : rec.inTime && !rec.outTime ? (
                            <span className="inline-flex items-center px-2.5 py-1 bg-yellow-900/20 border border-yellow-800/30 rounded-lg text-yellow-400 font-semibold text-xs">
                              In Progress
                            </span>
                          ) : <span className="text-[#444]">--</span>}
                        </td>
                        <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full font-semibold ${st.cls}`}>{st.text}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
      </div>
    );
  };

  /* ── Today Absent view ── */
  const AbsentView = () => {
    const recs = allRecords.filter(r => r.date === todayStr && r.isAbsent);
    return (
      <div className="p-4 md:p-6">
        <ViewHeader title="Today Absent" count={recs.length} color="text-red-400"
          onExport={() => exportCSV(recs, `today_absent_${todayStr}`)}
          onPrint={handlePrint} />
        {recs.length === 0
          ? <p className="text-[#555] text-center py-12">No absent records for today.</p>
          : (
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
                  {recs.map((rec, i) => {
                    const emp = employees.find(e => e.employeeId === rec.employeeId);
                    return (
                      <tr key={i} className="bg-[#111] hover:bg-[#161616] transition-colors cursor-pointer"
                        onClick={() => emp && selectEmployee(emp)}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-8 h-8 rounded-lg object-cover object-top flex-shrink-0" />}
                            <span className="text-white font-medium">{rec.employeeName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#e32028] font-mono">{rec.employeeId}</td>
                        <td className="px-4 py-3 text-[#888]">{emp?.position || "--"}</td>
                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full font-semibold bg-red-900/40 text-red-400">Absent</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
      </div>
    );
  };

  /* ── Leave Requests view ── */
  const LeaveView = () => {
    const recs = allRecords.filter(r => r.date === todayStr && r.isLeave);
    return (
      <div className="p-4 md:p-6">
        <ViewHeader title="Leave Requests" count={recs.length} color="text-purple-400"
          onExport={() => exportCSV(recs, `leave_requests_${todayStr}`)}
          onPrint={handlePrint} />
        {recs.length === 0
          ? <p className="text-[#555] text-center py-12">No leave records for today.</p>
          : (
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
                  {recs.map((rec, i) => {
                    const emp = employees.find(e => e.employeeId === rec.employeeId);
                    return (
                      <tr key={i} className="bg-[#111] hover:bg-[#161616] transition-colors cursor-pointer"
                        onClick={() => emp && selectEmployee(emp)}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-8 h-8 rounded-lg object-cover object-top flex-shrink-0" />}
                            <span className="text-white font-medium">{rec.employeeName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#e32028] font-mono">{rec.employeeId}</td>
                        <td className="px-4 py-3 text-[#888]">{emp?.position || "--"}</td>
                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full font-semibold bg-purple-900/40 text-purple-400">On Leave</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
      </div>
    );
  };

  /* ── Monthly Attendance % view ── */
  const MonthlyView = () => {
    const stats = employees.map(emp => {
      const recs    = monthRecs.filter(r => r.employeeId === emp.employeeId);
      const present = recs.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
      const absent  = recs.filter(r => r.isAbsent).length;
      const leave   = recs.filter(r => r.isLeave).length;
      const pct     = recs.length > 0 ? Math.round(present / recs.length * 100) : 0;
      return { emp, present, absent, leave, total: recs.length, pct };
    });
    return (
      <div className="p-4 md:p-6">
        <ViewHeader title={`Monthly Attendance — ${currentMonth}`} count={employees.length} color="text-yellow-400"
          onExport={() => exportCSV(monthRecs, `monthly_attendance_${currentMonth}`)}
          onPrint={handlePrint} />
        <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Employee</th>
                <th className="px-4 py-3 text-center">Present</th>
                <th className="px-4 py-3 text-center">Absent</th>
                <th className="px-4 py-3 text-center">Leave</th>
                <th className="px-4 py-3 text-center">Total Days</th>
                <th className="px-4 py-3 text-center">Attendance %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {stats.map(({ emp, present, absent, leave, total, pct }) => (
                <tr key={emp.employeeId} className="bg-[#111] hover:bg-[#161616] transition-colors cursor-pointer"
                  onClick={() => selectEmployee(emp)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={PHOTOS[emp.employeeId]} alt="" className="w-8 h-8 rounded-lg object-cover object-top flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium">{emp.name}</p>
                        <p className="text-[#555]">{emp.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-green-400 font-bold">{present}</td>
                  <td className="px-4 py-3 text-center text-red-400 font-bold">{absent}</td>
                  <td className="px-4 py-3 text-center text-purple-400 font-bold">{leave}</td>
                  <td className="px-4 py-3 text-center text-[#888]">{total}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-black text-sm ${pct >= 75 ? "text-green-400" : pct >= 50 ? "text-yellow-400" : "text-red-400"}`}>{pct}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  /* ── Employee Full Profile ── */
  const EmployeeView = () => {
    const emp = empDetails;
    function fDateLong(d) {
      if (!d) return "--";
      return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
    }
    return (
      <div className="p-4 md:p-6">

        {/* ── Mini header (always visible) ── */}
        <div className="flex items-center gap-3 mb-4">
          <img src={PHOTOS[selected?.employeeId]} alt="" className="w-10 h-10 rounded-xl object-cover object-top border border-[#2a2a2a] flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate">{selected?.name}</p>
            <p className="text-[#e32028] text-xs font-mono">{selected?.employeeId}</p>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 mb-4 bg-[#111] border border-[#2a2a2a] rounded-xl p-1">
          <button onClick={() => setEmpViewTab("details")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${empViewTab === "details" ? "bg-[#e32028] text-white shadow" : "text-[#555] hover:text-white"}`}>
            Profile Details
          </button>
          <button onClick={() => setEmpViewTab("attendance")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${empViewTab === "attendance" ? "bg-[#e32028] text-white shadow" : "text-[#555] hover:text-white"}`}>
            Attendance
          </button>
        </div>

        {/* ── Profile Card ── */}
        {empViewTab === "details" && <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-4">
            <img src={PHOTOS[selected?.employeeId]} alt="" className="w-16 h-16 rounded-2xl object-cover object-top border border-[#2a2a2a] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <p className="text-white font-bold text-base leading-tight">{selected?.name}</p>
                  <p className="text-[#e32028] text-xs font-mono mt-0.5">{selected?.employeeId}</p>
                  <p className="text-[#555] text-xs mt-0.5">{emp?.designation || selected?.position}</p>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold flex-shrink-0 ${emp?.status === "inactive" ? "bg-red-900/40 text-red-400" : "bg-green-900/40 text-green-400"}`}>
                  {(emp?.status || "active").toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          {/* Edit / Delete */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-[#1a1a1a]">
            <button
              onClick={() => {
                setEditEmpForm({
                  name: emp?.name || "", mobile: emp?.mobile || "", email: emp?.email || "",
                  department: emp?.department || "", designation: emp?.designation || "",
                  joiningDate: emp?.joiningDate ? new Date(emp.joiningDate).toISOString().split("T")[0] : "",
                  salary: emp?.salary || "", address: emp?.address || "", status: emp?.status || "active",
                });
                setEditEmpModal(true);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#e32028]/50 text-white text-xs font-semibold rounded-xl transition-colors">
              <svg className="w-3.5 h-3.5 text-[#e32028]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              Edit Details
            </button>
            <button
              onClick={() => setDeleteEmpModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-900/20 border border-red-800/30 hover:bg-red-900/40 text-red-400 text-xs font-semibold rounded-xl transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              Delete
            </button>
          </div>
        </div>}

        {empViewTab === "details" && emp && (
          <div className="space-y-3 mb-4">
            <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4">
              <p className="text-[#555] text-[10px] uppercase tracking-widest font-semibold mb-3">Personal Info</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Mobile", value: emp.mobile, color: "text-white" },
                  { label: "Email",  value: emp.email,  color: "text-blue-400" },
                  { label: "Address", value: emp.address, color: "text-white", full: true },
                ].map(({ label, value, color, full }) => (
                  <div key={label} className={full ? "sm:col-span-2" : ""}>
                    <p className="text-[#555] text-[10px] uppercase tracking-wider mb-0.5">{label}</p>
                    <p className={`text-xs font-medium ${value ? color : "text-[#333]"}`}>{value || "--"}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Employment ── */}
            <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4">
              <p className="text-[#555] text-[10px] uppercase tracking-widest font-semibold mb-3">Employment</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Department",    value: emp.department },
                  { label: "Designation",   value: emp.designation || emp.position },
                  { label: "Joining Date",  value: fDateLong(emp.joiningDate), color: "text-green-400" },
                  { label: "Salary",        value: emp.salary ? `₹ ${Number(emp.salary).toLocaleString("en-IN")}` : "--", color: "text-[#e32028]" },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <p className="text-[#555] text-[10px] uppercase tracking-wider mb-0.5">{label}</p>
                    <p className={`text-xs font-semibold ${color || "text-white"}`}>{value || "--"}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Offer Letter / Documents ── */}
            <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4">
              <p className="text-[#555] text-[10px] uppercase tracking-widest font-semibold mb-3">Offer Letter & Documents</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1a1a1a] border border-dashed border-[#2a2a2a] rounded-xl p-3 text-center">
                  <p className="text-[#555] text-[10px] uppercase mb-1">Joining Date</p>
                  <p className="text-green-400 text-xs font-bold">{fDateLong(emp.joiningDate)}</p>
                </div>
                <div className="bg-[#1a1a1a] border border-dashed border-[#2a2a2a] rounded-xl p-3 text-center">
                  <p className="text-[#555] text-[10px] uppercase mb-1">Employee ID</p>
                  <p className="text-[#e32028] text-xs font-bold font-mono">{emp.employeeId}</p>
                </div>
                <div className="bg-[#1a1a1a] border border-dashed border-[#2a2a2a] rounded-xl p-3 text-center">
                  <p className="text-[#555] text-[10px] uppercase mb-1">Department</p>
                  <p className="text-white text-xs font-bold">{emp.department || "--"}</p>
                </div>
                <div className="bg-[#1a1a1a] border border-dashed border-[#2a2a2a] rounded-xl p-3 text-center">
                  <p className="text-[#555] text-[10px] uppercase mb-1">Status</p>
                  <p className={`text-xs font-bold ${emp.status === "inactive" ? "text-red-400" : "text-green-400"}`}>
                    {(emp.status || "active").toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Attendance Records (Attendance tab) ── */}
        {empViewTab === "attendance" && (
        <p className="text-[#555] text-[10px] uppercase tracking-widest font-semibold mb-3">
          Attendance Records — <span className="text-[#e32028]">{selected?.employeeId}</span>
        </p>
        )}
        {empViewTab === "attendance" && (loading ? <p className="text-[#555] text-center py-10">Loading…</p> : (
          <>
            {todayRecords.length > 0 ? (
              <div className="mb-4">
                {todayRecords.map(rec => <TodayCard key={rec._id} rec={rec} onDelete={handleDelete} />)}
              </div>
            ) : (
              <div className="mb-4 rounded-2xl border-2 border-dashed border-[#2a2a2a] px-4 py-6 text-center">
                <p className="text-[#444] text-sm">No attendance record for today</p>
              </div>
            )}
            {histRecords.length > 0 && (
              <div>
                <p className="text-[#555] text-xs uppercase tracking-wider mb-3 font-semibold">History ({histRecords.length} records)</p>
                <div className="space-y-2">
                  {histRecords.map(rec => <RecordCard key={rec._id} rec={rec} onDelete={handleDelete} />)}
                </div>
              </div>
            )}
            {records.length === 0 && <p className="text-[#555] text-center py-10">No attendance records found.</p>}
          </>
        ))}

        {/* Delete Employee confirmation */}
        {deleteEmpModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 px-4">
            <div className="w-full max-w-xs bg-[#161616] border border-red-800/50 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-5 py-5 text-center">
                <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </div>
                <p className="text-white font-semibold">Delete Employee?</p>
                <p className="text-[#888] text-sm mt-1">{selected?.name} will be permanently removed.</p>
              </div>
              <div className="grid grid-cols-2 border-t border-[#2a2a2a]">
                <button onClick={() => setDeleteEmpModal(false)} disabled={empBusy}
                  className="py-3.5 text-[#888] hover:text-white text-sm font-medium border-r border-[#2a2a2a] transition-colors">Cancel</button>
                <button onClick={handleDeleteEmployee} disabled={empBusy}
                  className="py-3.5 text-red-400 hover:bg-red-900/30 text-sm font-bold transition-colors disabled:opacity-50">
                  {empBusy ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Employee Modal */}
        {editEmpModal && (
          <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center bg-black/80 px-4 pb-6 sm:pb-0"
            onClick={() => setEditEmpModal(false)}>
            <div className="w-full max-w-md bg-[#111] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a] flex-shrink-0">
                <p className="text-white font-bold text-sm">Edit Employee Details</p>
                <button onClick={() => setEditEmpModal(false)} className="text-[#555] hover:text-white transition-colors text-xl">✕</button>
              </div>
              <div className="overflow-y-auto flex-1 px-5 py-4 space-y-3">
                {[
                  { key: "name",        label: "Full Name",    type: "text" },
                  { key: "mobile",      label: "Mobile",       type: "text" },
                  { key: "email",       label: "Email",        type: "email" },
                  { key: "department",  label: "Department",   type: "text" },
                  { key: "designation", label: "Designation",  type: "text" },
                  { key: "joiningDate", label: "Joining Date", type: "date" },
                  { key: "salary",      label: "Salary (₹)",   type: "number" },
                  { key: "address",     label: "Address",      type: "text" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-[#888] text-xs mb-1 block uppercase tracking-wider">{f.label}</label>
                    <input type={f.type} value={editEmpForm[f.key] || ""} onChange={e => setEditEmpForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333]" />
                  </div>
                ))}
                <div>
                  <label className="text-[#888] text-xs mb-1 block uppercase tracking-wider">Status</label>
                  <select value={editEmpForm.status || "active"} onChange={e => setEditEmpForm(p => ({ ...p, status: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e32028]">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="px-5 py-4 border-t border-[#2a2a2a] flex-shrink-0">
                <button onClick={() => handleEditEmployee(editEmpForm)} disabled={empBusy}
                  className="w-full bg-[#e32028] hover:bg-[#c41d23] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                  {empBusy ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ── Report ── */
  const ReportView = () => (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-4">Attendance Report</h2>

      {/* Filters */}
      <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          <div>
            <label className="text-[#888] text-xs mb-1 block uppercase tracking-wider">From Date</label>
            <input type="date" value={fromDate} onChange={e=>setFromDate(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#e32028]" />
          </div>
          <div>
            <label className="text-[#888] text-xs mb-1 block uppercase tracking-wider">To Date</label>
            <input type="date" value={toDate} onChange={e=>setToDate(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#e32028]" />
          </div>
          <div>
            <label className="text-[#888] text-xs mb-1 block uppercase tracking-wider">Employee</label>
            <select value={reportEmp} onChange={e=>setReportEmp(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#e32028]">
              <option value="all">All Employees</option>
              {employees.map(e=><option key={e.employeeId} value={e.employeeId}>{e.name}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={generateReport}
              className="w-full bg-[#e32028] hover:bg-[#c41d23] text-white font-semibold py-2 rounded-xl text-sm transition-colors">
              Generate
            </button>
          </div>
        </div>

        {/* Export buttons */}
        {reportData.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-[#2a2a2a]">
            <button onClick={() => exportCSV(reportData, `attendance_${fromDate||"all"}_${toDate||"all"}`)}
              className="flex items-center gap-1.5 px-4 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              Excel / CSV
            </button>
            <button onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              Print / PDF
            </button>
            <span className="text-[#555] text-xs flex items-center">{reportData.length} records</span>
          </div>
        )}
      </div>

      {/* Table */}
      {reportData.length > 0 && (
        <div ref={printRef} className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
                <th className="px-3 py-3 text-left">Date</th>
                <th className="px-3 py-3 text-left">Employee</th>
                <th className="px-3 py-3 text-left">In</th>
                <th className="px-3 py-3 text-left">Break</th>
                <th className="px-3 py-3 text-left">Out</th>
                <th className="px-3 py-3 text-left">Work</th>
                <th className="px-3 py-3 text-left">Field Work</th>
                <th className="px-3 py-3 text-left">Shoot Work</th>
                <th className="px-3 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {reportData.map((rec,i) => {
                const st = statusLabel(rec);
                const fieldTotal = durationMins(rec.fieldWorkInTime, rec.fieldWorkOutTime);
                const shootTotal = durationMins(rec.shootWorkInTime, rec.shootWorkOutTime);
                return (
                  <tr key={i} className="bg-[#111] hover:bg-[#161616] transition-colors">
                    <td className="px-3 py-2.5 text-[#e32028] whitespace-nowrap font-medium">{fD(rec.date)}</td>
                    <td className="px-3 py-2.5 text-white whitespace-nowrap">
                      <p className="font-medium">{rec.employeeName}</p>
                      <p className="text-[#555] text-[10px]">{rec.employeeId}</p>
                    </td>
                    <td className="px-3 py-2.5 text-green-400 whitespace-nowrap">{fT(rec.inTime)}</td>
                    <td className="px-3 py-2.5 text-yellow-400">{fM(rec.totalBreakMinutes)}</td>
                    <td className="px-3 py-2.5 text-blue-400 whitespace-nowrap">{fT(rec.outTime)}</td>
                    <td className="px-3 py-2.5 text-white font-semibold">{rec.inTime&&rec.outTime?fM(workMins(rec)):"--"}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      {rec.fieldWorkInTime ? (
                        <div>
                          <p className="text-green-400">{fT(rec.fieldWorkInTime)}</p>
                          <p className="text-blue-400">{fT(rec.fieldWorkOutTime)}</p>
                          {fieldTotal > 0 && <p className="text-[#e32028] font-bold">{fM(fieldTotal)}</p>}
                          {rec.fieldWorkInTime && !rec.fieldWorkOutTime && <p className="text-yellow-400 text-[10px]">In Progress</p>}
                        </div>
                      ) : <span className="text-[#444]">--</span>}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      {rec.shootWorkInTime ? (
                        <div>
                          <p className="text-green-400">{fT(rec.shootWorkInTime)}</p>
                          <p className="text-blue-400">{fT(rec.shootWorkOutTime)}</p>
                          {shootTotal > 0 && <p className="text-[#e32028] font-bold">{fM(shootTotal)}</p>}
                          {rec.shootWorkInTime && !rec.shootWorkOutTime && <p className="text-yellow-400 text-[10px]">In Progress</p>}
                        </div>
                      ) : <span className="text-[#444]">--</span>}
                    </td>
                    <td className="px-3 py-2.5"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${st.cls}`}>{st.text}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {reportData.length === 0 && (
        <div className="text-center py-12 text-[#555]">
          <p className="text-sm">Select filters and click Generate to view report.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] bg-[#0d0d0d] flex overflow-hidden">
      {/* Mobile nav overlay */}
      {navOpen && <div className="fixed inset-0 z-[240] bg-black/60 md:hidden" onClick={() => setNavOpen(false)} />}

      {sideNavEl}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden bg-[#111] border-b border-[#2a2a2a] px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <button onClick={() => setNavOpen(true)} className="text-[#555] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <p className="text-white font-semibold text-sm flex-1 text-center">
            {view==="overview" ? "Admin Dashboard" : view==="totalEmp" ? "Total Employees" :
             view==="present"  ? "Today Present"   : view==="absent"   ? "Today Absent"    :
             view==="leave"    ? "Leave Requests"  : view==="monthly"  ? "Monthly Attendance" :
             view==="report"   ? "Report"          : selected?.name || "Dashboard"}
          </p>
          <button onClick={onClose} className="text-[#555] hover:text-red-400 text-xs transition-colors">Exit</button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {view === "overview"  && OverviewView()}
          {view === "totalEmp"  && TotalEmpView()}
          {view === "present"   && PresentView()}
          {view === "absent"    && AbsentView()}
          {view === "leave"     && LeaveView()}
          {view === "monthly"   && MonthlyView()}
          {view === "employee"  && selected && EmployeeView()}
          {view === "report"    && ReportView()}
        </div>
      </div>
    </div>
  );
}
