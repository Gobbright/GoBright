import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { API, exportCSV, statusLabel } from "../helpers";
import { PHOTOS } from "../photos";

const STATUS_COLORS = {
  Present: "bg-green-500/20 text-green-400 border border-green-500/30",
  Active:  "bg-green-500/20 text-green-400 border border-green-500/30",
  Absent:  "bg-red-500/20  text-red-400   border border-red-500/30",
  Leave:   "bg-violet-500/20 text-violet-400 border border-violet-500/30",
  "No Data":"bg-zinc-800    text-zinc-400   border border-zinc-700",
};

function AddEmployeeModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ employeeId: "", name: "", position: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showP, setShowP] = useState(false);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const r = await fetch(`${API}/auth/add-employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (d.success) { onSuccess(); onClose(); }
      else setErr(d.message || "Failed to add employee.");
    } catch { setErr("Cannot connect to server."); }
    setLoading(false);
  }

  const fields = [
    { label: "Employee ID", key: "employeeId", placeholder: "e.g. GB011" },
    { label: "Full Name",   key: "name",       placeholder: "Employee full name" },
    { label: "Position",    key: "position",   placeholder: "e.g. Designer" },
  ];

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-[#141414] border border-[#2a2a2a] rounded-3xl overflow-hidden shadow-2xl">
        {/* Modal header */}
        <div className="px-6 py-5 border-b border-[#2a2a2a] flex items-center justify-between bg-[#0f0f0f]">
          <div>
            <p className="text-white font-bold text-lg">Add New Employee</p>
            <p className="text-zinc-500 text-sm mt-0.5">Fill in the employee details</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-zinc-400 text-sm font-medium mb-2">{f.label}</label>
              <input
                type="text"
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => set(f.key, e.target.value)}
                required
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e32028]/60 placeholder-zinc-600 transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showP ? "text" : "password"}
                placeholder="Set a strong password"
                value={form.password}
                onChange={e => set("password", e.target.value)}
                required
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 pr-12 text-white text-sm focus:outline-none focus:border-[#e32028]/60 placeholder-zinc-600 transition-colors"
              />
              <button type="button" onClick={() => setShowP(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showP
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  }
                </svg>
              </button>
            </div>
          </div>

          {err && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm">{err}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-[#2a2a2a] text-zinc-400 hover:text-white hover:bg-[#1a1a1a] text-sm font-semibold transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 rounded-xl bg-[#e32028] hover:bg-[#c41d23] disabled:opacity-50 text-white text-sm font-bold transition-colors">
              {loading ? "Adding…" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TotalEmployees() {
  const { employees, todayRecs, todayStr, refreshEmployees } = useOutletContext();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const list = employees
    .filter((e, i, a) => a.findIndex(x => x.employeeId === e.employeeId) === i)
    .filter(e => {
      const q = search.toLowerCase();
      return !q || e.name.toLowerCase().includes(q) || e.employeeId.toLowerCase().includes(q) || e.position.toLowerCase().includes(q);
    });

  return (
    <div className="p-5 md:p-8">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-white font-black text-2xl tracking-tight">Our Team</h2>
          <p className="text-zinc-500 text-base mt-1">
            <span className="text-[#e32028] font-bold">{employees.length}</span> employees · GoBright
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportCSV(
              list.map(e => ({ date: todayStr, employeeId: e.employeeId, employeeName: e.name, position: e.position })),
              "gobright_employees"
            )}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#222] text-zinc-400 hover:text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Export
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#e32028] hover:bg-[#c41d23] text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-[#e32028]/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
            </svg>
            Add Employee
          </button>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          type="text"
          placeholder="Search by name, ID or position…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#141414] border border-[#2a2a2a] rounded-2xl pl-12 pr-5 py-3.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#e32028]/50 transition-colors"
        />
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total Staff",   value: employees.length,                                                              color: "text-white" },
          { label: "Present Today", value: Object.values(todayRecs).filter(r => !r.isAbsent && !r.isLeave && r.inTime).length, color: "text-green-400" },
          { label: "Absent Today",  value: Object.values(todayRecs).filter(r => r.isAbsent).length,                       color: "text-red-400" },
          { label: "On Leave",      value: Object.values(todayRecs).filter(r => r.isLeave).length,                        color: "text-violet-400" },
        ].map(s => (
          <div key={s.label} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4 text-center">
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-zinc-500 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Employee Cards Grid ── */}
      {list.length === 0 ? (
        <div className="text-center py-20 text-zinc-600 text-base">No employees found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {list.map(emp => {
            const rec = todayRecs[emp.employeeId];
            const sl  = rec ? statusLabel(rec) : { text: "No Data", cls: "" };
            const statusCls = STATUS_COLORS[sl.text] || STATUS_COLORS["No Data"];

            return (
              <div
                key={emp.employeeId}
                onClick={() => navigate(`/admin/dashboard/employee/${emp.employeeId}`, { state: { emp } })}
                className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#e32028]/40 rounded-3xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#e32028]/10"
              >
                {/* Photo */}
                <div className="relative h-64 bg-[#1a1a1a] overflow-hidden">
                  <img
                    src={PHOTOS[emp.employeeId]}
                    alt={emp.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />

                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${statusCls}`}>
                      {sl.text}
                    </span>
                  </div>

                  {/* Employee ID */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-black text-[#e32028] bg-[#0f0f0f]/80 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-[#e32028]/30 font-mono">
                      {emp.employeeId}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="px-4 py-4">
                  <h3 className="text-white font-bold text-base leading-tight">{emp.name}</h3>
                  <p className="text-zinc-500 text-sm mt-1 leading-snug">{emp.position}</p>

                  {/* Action row */}
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/admin/dashboard/attendance-management/employee-wise`); }}
                      className="flex-1 py-2 rounded-xl bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] text-zinc-400 hover:text-white text-sm font-semibold transition-colors text-center"
                    >
                      Attendance
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <AddEmployeeModal
          onClose={() => setModalOpen(false)}
          onSuccess={() => refreshEmployees()}
        />
      )}
    </div>
  );
}
