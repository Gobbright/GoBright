import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { fD } from "../helpers";
import { PHOTOS } from "../photos";

export default function LeaveHistory() {
  const { allRecords, employees } = useOutletContext();
  const [empId, setEmpId] = useState("all");
  const [month, setMonth] = useState(() =>
    new Date(Date.now() + 5.5 * 3600000).toISOString().slice(0, 7)
  );

  const leaveRecs = useMemo(() => {
    return allRecords
      .filter(r => r.isLeave && r.date.startsWith(month) && (empId === "all" || r.employeeId === empId))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [allRecords, month, empId]);

  function exportHistory() {
    const rows = leaveRecs.map(r => [r.date, r.employeeId, r.employeeName, r.position || ""]);
    const csv = [["Date","Employee ID","Name","Position"], ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `leave_history_${month}.csv`;
    a.click();
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Leave History</h2>
          <p className="text-[#555] text-xs mt-0.5">{leaveRecs.length} records found</p>
        </div>
        <button onClick={exportHistory}
          className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors self-start sm:self-auto">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[#888] text-[10px] uppercase tracking-wider mb-1.5">Month</label>
            <input type="month" value={month} onChange={e => setMonth(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors" />
          </div>
          <div>
            <label className="block text-[#888] text-[10px] uppercase tracking-wider mb-1.5">Employee</label>
            <select value={empId} onChange={e => setEmpId(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors">
              <option value="all">All Employees</option>
              {employees.map(e => <option key={e.employeeId} value={e.employeeId}>{e.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Designation</th>
              <th className="px-4 py-3 text-left">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {leaveRecs.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-[#555]">No leave records found.</td></tr>
            ) : leaveRecs.map((rec, i) => {
              const emp = employees.find(e => e.employeeId === rec.employeeId);
              return (
                <tr key={i} className="bg-[#111] hover:bg-[#161616] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top flex-shrink-0 border border-[#2a2a2a]" />}
                      <div>
                        <p className="text-white font-medium">{rec.employeeName}</p>
                        <p className="text-[#555] text-[10px]">{rec.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#888]">{fD(rec.date)}</td>
                  <td className="px-4 py-3 text-[#888] hidden sm:table-cell">{emp?.position || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-900/40 text-purple-400">Leave</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
