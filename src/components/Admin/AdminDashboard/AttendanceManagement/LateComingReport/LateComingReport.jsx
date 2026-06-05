import { useOutletContext } from "react-router-dom";
import { exportCSV, fT } from "../../helpers";
import { PHOTOS } from "../../photos";

const LATE_HOUR = 9; // consider late after 9:00 AM IST

export default function LateComingReport() {
  const { allRecords, employees, todayStr } = useOutletContext();

  const lateRecs = allRecords.filter(r => {
    if (!r.inTime || r.isAbsent || r.isLeave) return false;
    const inHour = new Date(r.inTime).getUTCHours() + 5; // rough IST
    const inMin  = new Date(r.inTime).getUTCMinutes();
    return inHour > LATE_HOUR || (inHour === LATE_HOUR && inMin > 30);
  }).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Late Coming Report</h2>
          <p className="text-[#555] text-xs">{lateRecs.length} late entries found</p>
        </div>
        <button onClick={() => exportCSV(lateRecs, "late_coming_report")}
          className="flex items-center gap-1.5 px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-colors">
          Export CSV
        </button>
      </div>
      {lateRecs.length === 0
        ? <p className="text-[#555] text-center py-12">No late coming records found.</p>
        : (
          <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Employee</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Check-in Time</th>
                  <th className="px-4 py-3 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {lateRecs.map((rec, i) => {
                  const emp = employees.find(e => e.employeeId === rec.employeeId);
                  return (
                    <tr key={i} className="bg-[#111] hover:bg-[#161616]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top bg-[#2a2a2a]" onError={e => { e.target.style.display = "none"; }} />}
                          <div><p className="text-white font-medium">{rec.employeeName}</p><p className="text-[#555]">{rec.employeeId}</p></div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#e32028]">{rec.date}</td>
                      <td className="px-4 py-3 text-yellow-400 font-semibold">{fT(rec.inTime)}</td>
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
