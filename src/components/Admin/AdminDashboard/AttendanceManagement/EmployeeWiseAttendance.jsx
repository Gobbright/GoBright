import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { fD, fT, fM, workMins, statusLabel, exportCSV } from "../helpers";
import { PHOTOS } from "../photos";

export default function EmployeeWiseAttendance() {
  const { employees, allRecords, exportCSV: ctxExport } = useOutletContext();
  const [empId, setEmpId] = useState(employees[0]?.employeeId || "");
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date(Date.now() + 5.5 * 3600000);
    d.setDate(1);
    return d.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(() =>
    new Date(Date.now() + 5.5 * 3600000).toISOString().split("T")[0]
  );

  const selectedEmp = useMemo(() => employees.find(e => e.employeeId === empId), [employees, empId]);

  const records = useMemo(() => {
    if (!empId) return [];
    return allRecords
      .filter(r => r.employeeId === empId && r.date >= fromDate && r.date <= toDate)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [allRecords, empId, fromDate, toDate]);

  const presentDays = records.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
  const absentDays  = records.filter(r => r.isAbsent).length;
  const leaveDays   = records.filter(r => r.isLeave).length;
  const totalWork   = records.reduce((sum, r) => sum + workMins(r), 0);

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Employee Wise Attendance</h2>
          <p className="text-[#555] text-xs mt-0.5">{records.length} records in range</p>
        </div>
        <button onClick={() => ctxExport(records, `attendance_${empId}_${fromDate}_${toDate}`)}
          className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[#888] text-[10px] uppercase tracking-wider mb-1.5">Employee</label>
            <select value={empId} onChange={e => setEmpId(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors">
              {employees.map(e => (
                <option key={e.employeeId} value={e.employeeId}>{e.name} ({e.employeeId})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[#888] text-[10px] uppercase tracking-wider mb-1.5">From Date</label>
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors" />
          </div>
          <div>
            <label className="block text-[#888] text-[10px] uppercase tracking-wider mb-1.5">To Date</label>
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors" />
          </div>
        </div>
      </div>

      {/* Employee card + stats */}
      {selectedEmp && (
        <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <img src={PHOTOS[selectedEmp.employeeId]} alt="" className="w-12 h-12 rounded-xl object-cover object-top border border-[#2a2a2a]" />
            <div>
              <p className="text-white font-semibold">{selectedEmp.name}</p>
              <p className="text-[#e32028] font-mono text-xs">{selectedEmp.employeeId}</p>
              <p className="text-[#555] text-xs">{selectedEmp.position}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              ["Present", presentDays, "text-green-400"],
              ["Absent",  absentDays,  "text-red-400"],
              ["Leave",   leaveDays,   "text-purple-400"],
              ["Total Hrs", fM(totalWork), "text-blue-400"],
            ].map(([label, val, color]) => (
              <div key={label} className="bg-[#0d0d0d] rounded-xl p-2.5">
                <p className={`text-base font-black ${color}`}>{val}</p>
                <p className="text-[#555] text-[10px] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Records table */}
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Check In</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Check Out</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Hours</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {records.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-[#555]">No records found for this range.</td></tr>
            ) : records.map(rec => {
              const sl = statusLabel(rec);
              return (
                <tr key={rec._id} className="bg-[#111] hover:bg-[#161616] transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{fD(rec.date)}</td>
                  <td className="px-4 py-3 text-[#888] hidden sm:table-cell">{fT(rec.inTime)}</td>
                  <td className="px-4 py-3 text-[#888] hidden sm:table-cell">{fT(rec.outTime)}</td>
                  <td className="px-4 py-3 text-[#888] hidden md:table-cell">{fM(workMins(rec))}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${sl.cls}`}>{sl.text}</span>
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
