import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { fM, workMins } from "../helpers";
import { PHOTOS } from "../photos";

export default function MonthlyReport() {
  const { allRecords, employees, exportCSV } = useOutletContext();
  const [month, setMonth] = useState(() =>
    new Date(Date.now() + 5.5 * 3600000).toISOString().slice(0, 7)
  );

  const rows = useMemo(() => {
    const recs = allRecords.filter(r => r.date.startsWith(month));
    return employees.map(emp => {
      const empRecs = recs.filter(r => r.employeeId === emp.employeeId);
      const present  = empRecs.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
      const absent   = empRecs.filter(r => r.isAbsent).length;
      const leave    = empRecs.filter(r => r.isLeave).length;
      const total    = empRecs.length;
      const pct      = total > 0 ? Math.round((present / total) * 100) : 0;
      const hours    = empRecs.reduce((s, r) => s + workMins(r), 0);
      return { emp, present, absent, leave, total, pct, hours };
    });
  }, [allRecords, employees, month]);

  function doExport() {
    const hdr = ["Month","Employee ID","Name","Position","Present","Absent","Leave","Total Days","Attend %","Total Hours"];
    const data = rows.map(r => [month, r.emp.employeeId, r.emp.name, r.emp.position, r.present, r.absent, r.leave, r.total, r.pct+"%", fM(r.hours)]);
    const csv = [hdr, ...data].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `monthly_report_${month}.csv`;
    a.click();
  }

  const overallPct = rows.length ? Math.round(rows.reduce((s, r) => s + r.pct, 0) / rows.length) : 0;

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Monthly Attendance Report</h2>
          <p className="text-[#555] text-xs mt-0.5">Overall attendance: <span className={overallPct >= 75 ? "text-green-400" : "text-yellow-400"}>{overallPct}%</span></p>
        </div>
        <div className="flex items-center gap-2">
          <input type="month" value={month} onChange={e => setMonth(e.target.value)}
            className="bg-[#111] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors" />
          <button onClick={doExport}
            className="px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold transition-colors">
            CSV
          </button>
          <button onClick={() => window.print()}
            className="px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold transition-colors">
            Print
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-center">Present</th>
              <th className="px-4 py-3 text-center">Absent</th>
              <th className="px-4 py-3 text-center">Leave</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">Hours</th>
              <th className="px-4 py-3 text-center">Attend %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {rows.map(({ emp, present, absent, leave, pct, hours }) => (
              <tr key={emp.employeeId} className="bg-[#111] hover:bg-[#161616] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top border border-[#2a2a2a]" />
                    <div>
                      <p className="text-white font-medium leading-none">{emp.name}</p>
                      <p className="text-[#555] text-[10px] mt-0.5">{emp.employeeId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-green-400 font-bold">{present}</td>
                <td className="px-4 py-3 text-center text-red-400 font-bold">{absent}</td>
                <td className="px-4 py-3 text-center text-purple-400 font-bold">{leave}</td>
                <td className="px-4 py-3 text-center text-[#888] hidden md:table-cell">{fM(hours)}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${pct >= 75 ? "bg-green-900/40 text-green-400" : "bg-yellow-900/40 text-yellow-400"}`}>
                    {pct}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
