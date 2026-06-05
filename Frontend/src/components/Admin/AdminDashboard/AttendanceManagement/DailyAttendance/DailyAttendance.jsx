import { useOutletContext, useNavigate } from "react-router-dom";
import { exportCSV, fT, fM, workMins, statusLabel } from "../../helpers";
import { PHOTOS } from "../../photos";

export default function DailyAttendance() {
  const { allRecords, todayStr, employees, todayPresent, todayAbsent } = useOutletContext();
  const navigate = useNavigate();
  const present = allRecords.filter(r => r.date === todayStr && !r.isAbsent && !r.isLeave && r.inTime);
  const absent  = allRecords.filter(r => r.date === todayStr && r.isAbsent);

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Daily Attendance</h2>
          <p className="text-[#555] text-xs">{todayStr}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(present, `present_${todayStr}`)}
            className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-colors">
            Export Present
          </button>
          <button onClick={() => exportCSV(absent, `absent_${todayStr}`)}
            className="px-3 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition-colors">
            Export Absent
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-[#111] border border-green-900/40 rounded-2xl p-4 text-center">
          <p className="text-3xl font-black text-green-400">{todayPresent}</p>
          <p className="text-[#555] text-xs mt-1">Present</p>
        </div>
        <div className="bg-[#111] border border-red-900/40 rounded-2xl p-4 text-center">
          <p className="text-3xl font-black text-red-400">{todayAbsent}</p>
          <p className="text-[#555] text-xs mt-1">Absent</p>
        </div>
      </div>

      {/* Present table */}
      {present.length > 0 && (
        <>
          <p className="text-green-400 text-xs uppercase tracking-wider font-bold mb-2">Present ({present.length})</p>
          <div className="overflow-x-auto rounded-xl border border-[#2a2a2a] mb-4">
            <table className="w-full text-xs">
              <thead><tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Employee</th>
                <th className="px-4 py-3 text-left">In</th>
                <th className="px-4 py-3 text-left">Break</th>
                <th className="px-4 py-3 text-left">Out</th>
                <th className="px-4 py-3 text-left">Work Hrs</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr></thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {present.map((rec, i) => {
                  const emp = employees.find(e => e.employeeId === rec.employeeId);
                  const wm  = workMins(rec);
                  const st  = statusLabel(rec);
                  return (
                    <tr key={i} className="bg-[#111] hover:bg-[#161616] cursor-pointer"
                      onClick={() => emp && navigate(`/admin/dashboard/employee/${emp.employeeId}`, { state: { emp } })}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top bg-[#2a2a2a]" onError={e => { e.target.style.display = "none"; }} />}
                          <div><p className="text-white font-medium">{rec.employeeName}</p><p className="text-[#555]">{rec.employeeId}</p></div>
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
        </>
      )}

      {/* Absent table */}
      {absent.length > 0 && (
        <>
          <p className="text-red-400 text-xs uppercase tracking-wider font-bold mb-2">Absent ({absent.length})</p>
          <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
            <table className="w-full text-xs">
              <thead><tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Employee</th>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Position</th>
              </tr></thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {absent.map((rec, i) => {
                  const emp = employees.find(e => e.employeeId === rec.employeeId);
                  return (
                    <tr key={i} className="bg-[#111] hover:bg-[#161616] cursor-pointer"
                      onClick={() => emp && navigate(`/admin/dashboard/employee/${emp.employeeId}`, { state: { emp } })}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top bg-[#2a2a2a]" onError={e => { e.target.style.display = "none"; }} />}
                          <span className="text-white font-medium">{rec.employeeName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#e32028] font-mono">{rec.employeeId}</td>
                      <td className="px-4 py-3 text-[#888]">{emp?.position || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
