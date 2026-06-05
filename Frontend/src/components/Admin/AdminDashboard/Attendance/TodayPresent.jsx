import { useOutletContext, useNavigate } from "react-router-dom";
import { exportCSV, fT, fM, workMins, statusLabel } from "../helpers";
import { PHOTOS } from "../photos";
import { ViewHeader } from "../Shared";

export default function TodayPresent() {
  const { allRecords, todayStr, employees } = useOutletContext();
  const navigate = useNavigate();
  const recs = allRecords.filter(r => r.date === todayStr && !r.isAbsent && !r.isLeave && r.inTime);

  return (
    <div className="p-4 md:p-6">
      <ViewHeader
        title="Today Present"
        count={recs.length}
        color="text-green-400"
        onExport={() => exportCSV(recs, `today_present_${todayStr}`)}
      />
      {recs.length === 0
        ? <p className="text-[#555] text-center py-12">No present records for today.</p>
        : (
          <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Employee</th>
                  <th className="px-4 py-3 text-left">In Time</th>
                  <th className="px-4 py-3 text-left">Break</th>
                  <th className="px-4 py-3 text-left">Out Time</th>
                  <th className="px-4 py-3 text-left">Work Hours</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {recs.map((rec, i) => {
                  const emp = employees.find(e => e.employeeId === rec.employeeId);
                  const wm  = workMins(rec);
                  const st  = statusLabel(rec);
                  return (
                    <tr key={i} className="bg-[#111] hover:bg-[#161616] transition-colors cursor-pointer"
                      onClick={() => emp && navigate(`/admin/dashboard/employee/${emp.employeeId}`, { state: { emp } })}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-8 h-8 rounded-lg object-cover object-top flex-shrink-0" />}
                          <div>
                            <p className="text-white font-medium">{rec.employeeName}</p>
                            <p className="text-[#555]">{rec.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-green-400 font-semibold">{fT(rec.inTime)}</td>
                      <td className="px-4 py-3 text-yellow-400">{fM(rec.totalBreakMinutes)}</td>
                      <td className="px-4 py-3 text-blue-400">{rec.outTime ? fT(rec.outTime) : <span className="text-yellow-400">Active</span>}</td>
                      <td className="px-4 py-3 text-[#e32028] font-bold">{wm > 0 ? fM(wm) : "--"}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full font-semibold ${st.cls}`}>{st.text}</span></td>
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
