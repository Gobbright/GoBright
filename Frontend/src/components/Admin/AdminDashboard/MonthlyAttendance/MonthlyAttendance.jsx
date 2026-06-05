import { useOutletContext, useNavigate } from "react-router-dom";
import { exportCSV } from "../helpers";
import { PHOTOS } from "../photos";
import { ViewHeader } from "../Shared";

export default function MonthlyAttendance() {
  const { employees, monthRecs, currentMonth, allRecords } = useOutletContext();
  const navigate = useNavigate();

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
      <ViewHeader
        title={`Monthly Attendance — ${currentMonth}`}
        count={employees.length}
        color="text-yellow-400"
        onExport={() => exportCSV(monthRecs, `monthly_attendance_${currentMonth}`)}
      />
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-center">Present</th>
              <th className="px-4 py-3 text-center">Absent</th>
              <th className="px-4 py-3 text-center">Leave</th>
              <th className="px-4 py-3 text-center">Total Days</th>
              <th className="px-4 py-3 text-center">Attendance %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {stats.map(({ emp, present, absent, leave, total, pct }) => (
              <tr key={emp.employeeId} className="bg-[#111] hover:bg-[#161616] transition-colors cursor-pointer"
                onClick={() => navigate(`/admin/dashboard/employee/${emp.employeeId}`, { state: { emp } })}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={PHOTOS[emp.employeeId]} alt="" className="w-8 h-8 rounded-lg object-cover object-top flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">{emp.name}</p>
                      <p className="text-[#555]">{emp.employeeId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-green-400 font-bold">{present}</td>
                <td className="px-4 py-3 text-center text-red-400 font-bold">{absent}</td>
                <td className="px-4 py-3 text-center text-purple-400 font-bold">{leave}</td>
                <td className="px-4 py-3 text-center text-[#888]">{total}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-black text-sm ${pct >= 75 ? "text-green-400" : pct >= 50 ? "text-yellow-400" : "text-red-400"}`}>{pct}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
