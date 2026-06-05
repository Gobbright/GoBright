import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { fD, fT, fM, workMins, statusLabel } from "../helpers";
import { PHOTOS } from "../photos";

export default function DailyAttendance() {
  const { allRecords, employees, todayStr, exportCSV, handleDelete, refreshAllRecords } = useOutletContext();
  const [date, setDate] = useState(todayStr);

  const recs = useMemo(() => {
    const map = {};
    allRecords.filter(r => r.date === date).forEach(r => { map[r.employeeId] = r; });
    return employees.map(emp => ({
      emp,
      rec: map[emp.employeeId] || null,
    }));
  }, [allRecords, employees, date]);

  const present = recs.filter(r => r.rec && !r.rec.isAbsent && !r.rec.isLeave && r.rec.inTime).length;
  const absent  = recs.filter(r => r.rec?.isAbsent).length;
  const leave   = recs.filter(r => r.rec?.isLeave).length;

  async function onDelete(recId) {
    await handleDelete(recId);
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Daily Attendance</h2>
          <p className="text-[#555] text-xs mt-0.5">{present} present · {absent} absent · {leave} leave</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="bg-[#111] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors" />
          <button onClick={() => exportCSV(allRecords.filter(r => r.date === date), `attendance_${date}`)}
            className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Check In</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Check Out</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Hours</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {recs.map(({ emp, rec }) => {
              const sl = rec ? statusLabel(rec) : { text: "No Data", cls: "bg-[#2a2a2a] text-[#555]" };
              return (
                <tr key={emp.employeeId} className="bg-[#111] hover:bg-[#161616] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top flex-shrink-0 border border-[#2a2a2a]" />
                      <div>
                        <p className="text-white font-medium leading-none">{emp.name}</p>
                        <p className="text-[#555] text-[10px] mt-0.5">{emp.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#888] hidden sm:table-cell">{rec ? fT(rec.inTime) : "—"}</td>
                  <td className="px-4 py-3 text-[#888] hidden sm:table-cell">{rec ? fT(rec.outTime) : "—"}</td>
                  <td className="px-4 py-3 text-[#888] hidden md:table-cell">{rec ? fM(workMins(rec)) : "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${sl.cls}`}>{sl.text}</span>
                  </td>
                  <td className="px-4 py-3 text-[#555] hidden lg:table-cell">{rec?.notes || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
