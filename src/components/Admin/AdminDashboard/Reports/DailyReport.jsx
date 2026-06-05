import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { fD, fT, fM, workMins, statusLabel } from "../helpers";
import { PHOTOS } from "../photos";

export default function DailyReport() {
  const { allRecords, employees, todayStr, exportCSV } = useOutletContext();
  const [date, setDate] = useState(todayStr);

  const rows = useMemo(() => {
    const recMap = {};
    allRecords.filter(r => r.date === date).forEach(r => { recMap[r.employeeId] = r; });
    return employees.map(emp => ({ emp, rec: recMap[emp.employeeId] || null }));
  }, [allRecords, employees, date]);

  const present = rows.filter(r => r.rec && !r.rec.isAbsent && !r.rec.isLeave && r.rec.inTime).length;
  const absent  = rows.filter(r => r.rec?.isAbsent).length;
  const leave   = rows.filter(r => r.rec?.isLeave).length;
  const totalHrs = rows.reduce((s, { rec }) => s + (rec ? workMins(rec) : 0), 0);

  function printReport() { window.print(); }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Daily Attendance Report</h2>
          <p className="text-[#555] text-xs mt-0.5">{fD(date)}</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="bg-[#111] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors" />
          <button onClick={() => exportCSV(rows.filter(r => r.rec).map(r => r.rec), `daily_report_${date}`)}
            className="px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold transition-colors">
            CSV
          </button>
          <button onClick={printReport}
            className="px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold transition-colors">
            Print
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        {[
          ["Present",   present,          "text-green-400"],
          ["Absent",    absent,           "text-red-400"],
          ["On Leave",  leave,            "text-purple-400"],
          ["Total Hrs", fM(totalHrs),     "text-blue-400"],
        ].map(([label, val, color]) => (
          <div key={label} className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-3 text-center">
            <p className={`text-xl font-black ${color}`}>{val}</p>
            <p className="text-[#555] text-[10px] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Check In</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Check Out</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Break</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Net Hours</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {rows.map(({ emp, rec }) => {
              const sl = rec ? statusLabel(rec) : { text: "No Data", cls: "bg-[#2a2a2a] text-[#555]" };
              return (
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
                  <td className="px-4 py-3 text-[#888] hidden sm:table-cell">{rec ? fT(rec.inTime) : "—"}</td>
                  <td className="px-4 py-3 text-[#888] hidden sm:table-cell">{rec ? fT(rec.outTime) : "—"}</td>
                  <td className="px-4 py-3 text-[#888] hidden md:table-cell">{rec ? fM(rec.totalBreakMinutes || 0) : "—"}</td>
                  <td className="px-4 py-3 text-[#888] hidden md:table-cell">{rec ? fM(workMins(rec)) : "—"}</td>
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
