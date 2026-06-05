import { useOutletContext } from "react-router-dom";
import { exportCSV, fD } from "../../helpers";
import { PHOTOS } from "../../photos";

export default function LeaveReport() {
  const { allRecords, employees } = useOutletContext();
  const recs = allRecords.filter(r => r.isLeave).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Leave Report</h2>
          <p className="text-purple-400 text-sm font-semibold">{recs.length} total leave records</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(recs, "leave_report")} className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl">Export CSV</button>
          <button onClick={() => window.print()} className="px-3 py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl">Print / PDF</button>
        </div>
      </div>
      {recs.length === 0
        ? <p className="text-[#555] text-center py-12">No leave records found.</p>
        : (
          <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
            <table className="w-full text-xs">
              <thead><tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Employee</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Notes</th>
              </tr></thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {recs.map((rec, i) => {
                  const emp = employees.find(e => e.employeeId === rec.employeeId);
                  return (
                    <tr key={i} className="bg-[#111] hover:bg-[#161616]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top bg-[#2a2a2a]" onError={e => { e.target.style.display = "none"; }} />}
                          <div><p className="text-white font-medium">{rec.employeeName}</p><p className="text-[#555]">{rec.employeeId}</p></div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#e32028]">{fD(rec.date)}</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-400 font-semibold">Leave</span></td>
                      <td className="px-4 py-3 text-[#555]">{rec.notes || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
}
