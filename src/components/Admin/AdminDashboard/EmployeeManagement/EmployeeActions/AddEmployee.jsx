import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../../helpers";

const POSITIONS = ["Photographer", "Videographer", "Designer", "Editor", "Marketing", "Developer", "Manager", "Other"];
const DEPARTMENTS = ["Creative", "Marketing", "Technology", "Operations", "HR", "Finance", "Other"];

export default function AddEmployee() {
  const { refreshEmployees } = useOutletContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    employeeId: "", name: "", position: "", department: "",
    mobile: "", email: "", joiningDate: "", salary: "",
    address: "", password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState("");
  const [showP, setShowP]     = useState(false);

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
      if (d.success) {
        await refreshEmployees();
        navigate("/admin/dashboard/employees");
      } else setErr(d.message || "Failed to add employee.");
    } catch { setErr("Cannot connect to server."); }
    setLoading(false);
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate(-1)} className="text-[#555] hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div>
          <h2 className="text-white font-bold text-lg">Add Employee</h2>
          <p className="text-[#555] text-xs">Register a new employee</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-5 space-y-4">
        {/* Basic Info */}
        <p className="text-[#555] text-[10px] uppercase tracking-wider font-bold">Basic Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Employee ID *", key: "employeeId", placeholder: "e.g. GB011", type: "text" },
            { label: "Full Name *",   key: "name",       placeholder: "Employee full name", type: "text" },
            { label: "Mobile Number", key: "mobile",     placeholder: "+91 XXXXXXXXXX", type: "tel" },
            { label: "Email",         key: "email",      placeholder: "employee@email.com", type: "email" },
            { label: "Joining Date",  key: "joiningDate",placeholder: "", type: "date" },
            { label: "Salary / Package", key: "salary", placeholder: "e.g. 25000", type: "number" },
          ].map(f => (
            <div key={f.key}>
              <label className="text-[#888] text-[10px] uppercase tracking-wider mb-1 block">{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333]" />
            </div>
          ))}
        </div>

        {/* Position & Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[#888] text-[10px] uppercase tracking-wider mb-1 block">Designation *</label>
            <select value={form.position} onChange={e => set("position", e.target.value)} required
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e32028]">
              <option value="">Select position</option>
              {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[#888] text-[10px] uppercase tracking-wider mb-1 block">Department</label>
            <select value={form.department} onChange={e => set("department", e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e32028]">
              <option value="">Select department</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-[#888] text-[10px] uppercase tracking-wider mb-1 block">Address</label>
          <textarea value={form.address} onChange={e => set("address", e.target.value)} rows={2} placeholder="Full address"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333] resize-none" />
        </div>

        {/* Password */}
        <div>
          <p className="text-[#555] text-[10px] uppercase tracking-wider font-bold mb-2">Login Credentials</p>
          <label className="text-[#888] text-[10px] uppercase tracking-wider mb-1 block">Password *</label>
          <div className="relative">
            <input type={showP ? "text" : "password"} placeholder="Set login password" value={form.password}
              onChange={e => set("password", e.target.value)} required
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2.5 pr-10 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333]" />
            <button type="button" onClick={() => setShowP(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
          </div>
        </div>

        {err && <p className="text-red-400 text-xs bg-red-900/20 border border-red-800/40 rounded-xl px-3 py-2">{err}</p>}

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl border border-[#2a2a2a] text-[#888] hover:text-white text-sm font-medium transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-[#e32028] hover:bg-[#c41d23] disabled:opacity-50 text-white text-sm font-semibold transition-colors">
            {loading ? "Adding…" : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
