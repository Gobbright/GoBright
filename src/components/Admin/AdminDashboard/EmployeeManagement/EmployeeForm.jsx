import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { API } from "../helpers";

const DEPARTMENTS = ["Management", "IT", "Design", "Content", "Marketing", "Operations", "HR", "Finance", "Photography", "Administration"];
const DESIGNATIONS = ["Managing Director", "Executive Director", "Chief Administrative Officer", "Administrative Officer", "Senior IT Executive", "Full Stack Developer", "UI UX Designer", "Content Creator", "Digital Marketing Executive", "Photographer", "Videographer", "HR Executive", "Finance Manager", "Other"];

function Field({ label, name, type = "text", value, onChange, options, placeholder, required }) {
  const cls = "w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl px-3 py-2.5 text-xs text-white placeholder-[#444] focus:outline-none focus:border-[#e32028]/60 transition-colors";
  return (
    <div>
      <label className="block text-[#888] text-[10px] uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-[#e32028] ml-0.5">*</span>}
      </label>
      {options ? (
        <select name={name} value={value} onChange={onChange} className={cls}>
          <option value="">Select {label}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange}
          placeholder={placeholder || label} required={required} className={cls} />
      )}
    </div>
  );
}

export default function EmployeeForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { employeeId: paramId } = useParams();
  const emp = state?.emp;
  const isEdit = !!paramId;

  const [form, setForm] = useState({
    employeeId: emp?.employeeId || "",
    name: emp?.name || "",
    mobile: emp?.mobile || "",
    email: emp?.email || "",
    department: emp?.department || "",
    designation: emp?.designation || emp?.position || "",
    joiningDate: emp?.joiningDate ? emp.joiningDate.slice(0, 10) : "",
    salary: emp?.salary || "",
    address: emp?.address || "",
    status: emp?.status || "active",
    password: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function change(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `${API}/employees/${paramId}` : `${API}/employees`;
      const body = { ...form };
      if (isEdit && !body.password) delete body.password;
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const d = await r.json();
      if (!d.success) throw new Error(d.message || "Save failed. Please try again.");
      navigate("/admin/dashboard/employee-management");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#555] hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="text-white font-bold text-lg">{isEdit ? "Edit Employee" : "Add New Employee"}</h2>
          <p className="text-[#555] text-xs">Fill in all required fields</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {/* Basic Info */}
        <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-5">
          <p className="text-[#555] text-[10px] uppercase tracking-wider mb-4 font-semibold">Basic Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Employee ID" name="employeeId" value={form.employeeId} onChange={change} required placeholder="e.g. GB011" />
            <Field label="Full Name" name="name" value={form.name} onChange={change} required placeholder="Mr. / Mrs. Full Name" />
            <Field label="Mobile Number" name="mobile" type="tel" value={form.mobile} onChange={change} placeholder="+91 9876543210" />
            <Field label="Email Address" name="email" type="email" value={form.email} onChange={change} placeholder="employee@gobright.in" />
            <Field label="Department" name="department" value={form.department} onChange={change} options={DEPARTMENTS} />
            <Field label="Designation" name="designation" value={form.designation} onChange={change} options={DESIGNATIONS} />
            <Field label="Joining Date" name="joiningDate" type="date" value={form.joiningDate} onChange={change} />
            <Field label="Salary / Package (₹)" name="salary" value={form.salary} onChange={change} placeholder="e.g. 25000" />
          </div>
        </div>

        {/* Address & Status */}
        <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-5">
          <p className="text-[#555] text-[10px] uppercase tracking-wider mb-4 font-semibold">Address & Status</p>
          <div className="space-y-4">
            <div>
              <label className="block text-[#888] text-[10px] uppercase tracking-wider mb-1.5">Address</label>
              <textarea name="address" value={form.address} onChange={change} rows={3}
                placeholder="Full residential address"
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl px-3 py-2.5 text-xs text-white placeholder-[#444] focus:outline-none focus:border-[#e32028]/60 transition-colors resize-none" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Status" name="status" value={form.status} onChange={change} options={["active", "inactive"]} />
              <Field label={isEdit ? "New Password (blank = unchanged)" : "Password"} name="password" type="password" value={form.password} onChange={change} required={!isEdit} />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-900/40 rounded-xl px-4 py-3">
            <p className="text-red-400 text-xs">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button type="button" onClick={() => navigate(-1)}
            className="flex-1 py-3 rounded-xl border border-[#2a2a2a] text-[#888] text-xs font-semibold hover:bg-[#1a1a1a] transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 py-3 rounded-xl bg-[#e32028] hover:bg-[#c41d23] text-white text-xs font-semibold transition-colors disabled:opacity-60">
            {saving ? "Saving…" : isEdit ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
