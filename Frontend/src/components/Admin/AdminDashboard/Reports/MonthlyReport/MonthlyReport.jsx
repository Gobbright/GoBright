import { useOutletContext } from "react-router-dom";
import { exportCSV } from "../../helpers";
import { PHOTOS } from "../../photos";

export default function MonthlyReport() {
  const { employees, monthRecs, currentMonth } = useOutletContext();

  const stats = employees.map(emp => {
    const recs    = monthRecs.filter(r => r.employeeId === emp.employeeId);
    const present = recs.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
    const absent  = recs.filter(r => r.isAbsent).length;
    const leave   = recs.filter(r => r.isLeave).length;
    const pct     = recs.length > 0 ? Math.round(present / recs.length * 100) : 0;
    return { emp, present, absent, leave, total: recs.length, pct };
  });

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Monthly Attendance Report</h2>
          <p className="text-[#555] text-xs">{currentMonth}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(monthRecs, `monthly_report_${currentMonth}`)} className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl">Export CSV</button>
          <button onClick={() => window.print()} className="px-3 py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl">Print / PDF</button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead><tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
            <th className="px-4 py-3 text-left">Employee</th>
            <th className="px-4 py-3 text-center">Present</th>
            <th className="px-4 py-3 text-center">Absent</th>
            <th className="px-4 py-3 text-center">Leave</th>
            <th className="px-4 py-3 text-center">Total</th>
            <th className="px-4 py-3 text-center">Attendance %</th>
          </tr></thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {stats.map(({ emp, present, absent, leave, total, pct }) => (
              <tr key={emp.employeeId} className="bg-[#111] hover:bg-[#161616]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top bg-[#2a2a2a]" onError={e => { e.target.style.display = "none"; }} />
                    <div><p className="text-white font-medium">{emp.name}</p><p className="text-[#555]">{emp.employeeId}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-green-400 font-bold">{present}</td>
                <td className="px-4 py-3 text-center text-red-400 font-bold">{absent}</td>
                <td className="px-4 py-3 text-center text-purple-400 font-bold">{leave}</td>
                <td className="px-4 py-3 text-center text-[#888]">{total}</td>
                <td className="px-4 py-3 text-center"><span className={`font-black text-sm ${pct >= 75 ? "text-green-400" : pct >= 50 ? "text-yellow-400" : "text-red-400"}`}>{pct}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
