import { useState, useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { API } from "../helpers";
import { PHOTOS } from "../photos";

export default function EmployeeManagement() {
  const { employees, refreshEmployees } = useOutletContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return !q ? employees : employees.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.employeeId.toLowerCase().includes(q) ||
      (e.position || "").toLowerCase().includes(q)
    );
  }, [employees, search]);

  async function handleDelete(emp) {
    if (!window.confirm(`Delete ${emp.name}? This cannot be undone.`)) return;
    setDeleting(emp.employeeId);
    try {
      await fetch(`${API}/employees/${emp.employeeId}`, { method: "DELETE" });
      await refreshEmployees();
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Employee Management</h2>
          <p className="text-[#555] text-xs mt-0.5">{employees.length} total employees</p>
        </div>
        <button
          onClick={() => navigate("/admin/dashboard/employee-management/add")}
          className="flex items-center gap-2 bg-[#e32028] hover:bg-[#c41d23] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors self-start sm:self-auto"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Employee
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name, ID, designation…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-[#444] focus:outline-none focus:border-[#e32028]/60 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Designation</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {filtered.map(emp => (
              <tr key={emp.employeeId} className="bg-[#111] hover:bg-[#161616] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={PHOTOS[emp.employeeId]}
                      alt=""
                      className="w-8 h-8 rounded-lg object-cover object-top flex-shrink-0 border border-[#2a2a2a]"
                    />
                    <span className="text-white font-medium">{emp.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#e32028] font-mono">{emp.employeeId}</td>
                <td className="px-4 py-3 text-[#888] hidden sm:table-cell">{emp.position}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    emp.status === "inactive" ? "bg-red-900/40 text-red-400" : "bg-green-900/40 text-green-400"
                  }`}>
                    {emp.status === "inactive" ? "Inactive" : "Active"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => navigate(`/admin/dashboard/employee/${emp.employeeId}`, { state: { emp } })}
                      className="px-2 py-1 rounded-lg bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 transition-colors text-[10px] font-semibold"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/admin/dashboard/employee-management/edit/${emp.employeeId}`, { state: { emp } })}
                      className="px-2 py-1 rounded-lg bg-[#2a2a2a] text-[#aaa] hover:bg-[#333] transition-colors text-[10px] font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/admin/dashboard/employee-management/documents/${emp.employeeId}`, { state: { emp } })}
                      className="px-2 py-1 rounded-lg bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/50 transition-colors text-[10px] font-semibold"
                    >
                      Docs
                    </button>
                    <button
                      onClick={() => handleDelete(emp)}
                      disabled={deleting === emp.employeeId}
                      className="px-2 py-1 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition-colors text-[10px] font-semibold disabled:opacity-50"
                    >
                      {deleting === emp.employeeId ? "…" : "Del"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-[#555]">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
