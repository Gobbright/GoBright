import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { fD } from "../helpers";
import { PHOTOS } from "../photos";

export default function LeaveReport() {
  const { allRecords, employees } = useOutletContext();
  const [month, setMonth] = useState(() =>
    new Date(Date.now() + 5.5 * 3600000).toISOString().slice(0, 7)
  );

  const leaveRecs = useMemo(() =>
    allRecords.filter(r => r.isLeave && r.date.startsWith(month)).sort((a, b) => b.date.localeCompare(a.date))
  , [allRecords, month]);

  const perEmp = useMemo(() => {
    const map = {};
    leaveRecs.forEach(r => { map[r.employeeId] = (map[r.employeeId] || 0) + 1; });
    return employees.map(emp => ({ emp, count: map[emp.employeeId] || 0 })).sort((a, b) => b.count - a.count);
  }, [leaveRecs, employees]);

  function doExport() {
    const rows = leaveRecs.map(r => [r.date, r.employeeId, r.employeeName, r.position || ""]);
    const csv = [["Date","ID","Name","Position"], ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = `leave_report_${month}.csv`; a.click();
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Leave Report</h2>
          <p className="text-[#555] text-xs mt-0.5">{leaveRecs.length} leave days in {month}</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="month" value={month} onChange={e => setMonth(e.target.value)}
            className="bg-[#111] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors" />
          <button onClick={doExport}
            className="px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold transition-colors">CSV</button>
          <button onClick={() => window.print()}
            className="px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold transition-colors">Print</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Per-employee summary */}
        <div>
          <p className="text-[#555] text-[10px] uppercase tracking-wider mb-3 font-semibold">By Employee</p>
          <div className="bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden">
            {perEmp.map(({ emp, count }) => (
              <div key={emp.employeeId} className={`flex items-center gap-3 px-4 py-2.5 border-b border-[#1a1a1a] last:border-0 ${count > 0 ? "" : "opacity-40"}`}>
                <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top border border-[#2a2a2a]" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{emp.name}</p>
                  <p className="text-[#555] text-[10px]">{emp.employeeId}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${count > 0 ? "bg-purple-900/40 text-purple-400" : "text-[#333]"}`}>
                  {count} day{count !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Day-wise list */}
        <div>
          <p className="text-[#555] text-[10px] uppercase tracking-wider mb-3 font-semibold">Day Wise</p>
          <div className="bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden max-h-80 overflow-y-auto">
            {leaveRecs.length === 0 ? (
              <div className="px-4 py-8 text-center text-[#555] text-xs">No leave records for this month.</div>
            ) : leaveRecs.map((rec, i) => {
              const emp = employees.find(e => e.employeeId === rec.employeeId);
              return (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-[#1a1a1a] last:border-0">
                  {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top border border-[#2a2a2a]" />}
                  <div className="flex-1">
                    <p className="text-white text-xs font-medium">{rec.employeeName}</p>
                    <p className="text-[#555] text-[10px]">{fD(rec.date)}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-400 font-semibold">Leave</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
