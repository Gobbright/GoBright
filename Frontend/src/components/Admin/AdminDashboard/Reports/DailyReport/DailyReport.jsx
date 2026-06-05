import { useOutletContext } from "react-router-dom";
import { exportCSV, fT, fM, workMins, fD, statusLabel } from "../../helpers";

export default function DailyReport() {
  const { allRecords, todayStr } = useOutletContext();
  const recs = allRecords.filter(r => r.date === todayStr);

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Daily Attendance Report</h2>
          <p className="text-[#555] text-xs">{todayStr} · {recs.length} records</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(recs, `daily_report_${todayStr}`)} className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl">Export CSV</button>
          <button onClick={() => window.print()} className="px-3 py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl">Print / PDF</button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead><tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
            <th className="px-3 py-3 text-left">Employee</th>
            <th className="px-3 py-3 text-left">In</th>
            <th className="px-3 py-3 text-left">Break</th>
            <th className="px-3 py-3 text-left">Out</th>
            <th className="px-3 py-3 text-left">Work</th>
            <th className="px-3 py-3 text-left">Status</th>
          </tr></thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {recs.length === 0
              ? <tr><td colSpan={6} className="px-4 py-8 text-center text-[#555]">No records for today.</td></tr>
              : recs.map((rec, i) => {
                const st = statusLabel(rec);
                return (
                  <tr key={i} className="bg-[#111] hover:bg-[#161616]">
                    <td className="px-3 py-2.5 text-white">{rec.employeeName}<br/><span className="text-[#555]">{rec.employeeId}</span></td>
                    <td className="px-3 py-2.5 text-green-400">{fT(rec.inTime)}</td>
                    <td className="px-3 py-2.5 text-yellow-400">{fM(rec.totalBreakMinutes)}</td>
                    <td className="px-3 py-2.5 text-blue-400">{fT(rec.outTime)}</td>
                    <td className="px-3 py-2.5 text-[#e32028] font-bold">{rec.inTime && rec.outTime ? fM(workMins(rec)) : "--"}</td>
                    <td className="px-3 py-2.5"><span className={`px-2 py-0.5 rounded-full ${st.cls}`}>{st.text}</span></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
