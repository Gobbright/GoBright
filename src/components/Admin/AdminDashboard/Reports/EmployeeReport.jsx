import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { fD, fT, fM, workMins, statusLabel } from "../helpers";
import { PHOTOS } from "../photos";

export default function EmployeeReport() {
  const { allRecords, employees, exportCSV } = useOutletContext();
  const [empId, setEmpId] = useState(employees[0]?.employeeId || "");

  const emp = useMemo(() => employees.find(e => e.employeeId === empId), [employees, empId]);
  const recs = useMemo(() => allRecords.filter(r => r.employeeId === empId).sort((a, b) => b.date.localeCompare(a.date)), [allRecords, empId]);

  const present = recs.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
  const absent  = recs.filter(r => r.isAbsent).length;
  const leave   = recs.filter(r => r.isLeave).length;
  const hours   = recs.reduce((s, r) => s + workMins(r), 0);
  const pct     = recs.length > 0 ? Math.round((present / recs.length) * 100) : 0;

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Employee Report</h2>
          <p className="text-[#555] text-xs mt-0.5">Full attendance history per employee</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={empId} onChange={e => setEmpId(e.target.value)}
            className="bg-[#111] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors">
            {employees.map(e => <option key={e.employeeId} value={e.employeeId}>{e.name}</option>)}
          </select>
          <button onClick={() => exportCSV(recs, `employee_report_${empId}`)}
            className="px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold transition-colors">
            CSV
          </button>
        </div>
      </div>

      {emp && (
        <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <img src={PHOTOS[emp.employeeId]} alt="" className="w-14 h-14 rounded-2xl object-cover object-top border border-[#2a2a2a]" />
            <div>
              <p className="text-white font-bold text-base">{emp.name}</p>
              <p className="text-[#e32028] font-mono text-xs">{emp.employeeId}</p>
              <p className="text-[#555] text-xs">{emp.position}</p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center">
            {[
              [present, "Present",   "text-green-400"],
              [absent,  "Absent",    "text-red-400"],
              [leave,   "Leave",     "text-purple-400"],
              [fM(hours), "Total Hrs", "text-blue-400"],
              [`${pct}%`, "Attend %", pct >= 75 ? "text-green-400" : "text-yellow-400"],
            ].map(([val, label, color]) => (
              <div key={label} className="bg-[#0d0d0d] rounded-xl p-2.5">
                <p className={`text-sm font-black ${color}`}>{val}</p>
                <p className="text-[#555] text-[10px] mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Check In</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Check Out</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Net Hours</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {recs.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-[#555]">No records found.</td></tr>
            ) : recs.map(rec => {
              const sl = statusLabel(rec);
              return (
                <tr key={rec._id} className="bg-[#111] hover:bg-[#161616] transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{fD(rec.date)}</td>
                  <td className="px-4 py-3 text-[#888] hidden sm:table-cell">{fT(rec.inTime)}</td>
                  <td className="px-4 py-3 text-[#888] hidden sm:table-cell">{fT(rec.outTime)}</td>
                  <td className="px-4 py-3 text-[#888] hidden md:table-cell">{fM(workMins(rec))}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${sl.cls}`}>{sl.text}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
