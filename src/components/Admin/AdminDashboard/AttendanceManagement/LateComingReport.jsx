import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { fD, fT, fM } from "../helpers";
import { PHOTOS } from "../photos";

const LATE_THRESHOLD = "09:30"; // HH:MM

function getTimeStr(isoTime) {
  if (!isoTime) return null;
  const d = new Date(isoTime);
  const ist = new Date(d.getTime() + 5.5 * 3600000);
  return ist.toISOString().substr(11, 5);
}

function isLate(rec) {
  if (!rec?.inTime || rec.isAbsent || rec.isLeave) return false;
  const t = getTimeStr(rec.inTime);
  return t > LATE_THRESHOLD;
}

function lateBy(rec) {
  const t = getTimeStr(rec.inTime);
  if (!t) return 0;
  const [th, tm] = t.split(":").map(Number);
  const [lh, lm] = LATE_THRESHOLD.split(":").map(Number);
  return (th * 60 + tm) - (lh * 60 + lm);
}

export default function LateComingReport() {
  const { allRecords, employees, todayStr, exportCSV } = useOutletContext();
  const [date, setDate] = useState(todayStr);
  const [threshold, setThreshold] = useState(LATE_THRESHOLD);

  const lateRecs = useMemo(() => {
    const dayRecs = allRecords.filter(r => r.date === date && r.inTime && !r.isAbsent && !r.isLeave);
    return dayRecs
      .filter(r => getTimeStr(r.inTime) > threshold)
      .map(r => ({ ...r, lateMinutes: (() => { const t = getTimeStr(r.inTime); const [th, tm] = t.split(":").map(Number); const [lh, lm] = threshold.split(":").map(Number); return (th * 60 + tm) - (lh * 60 + lm); })() }))
      .sort((a, b) => b.lateMinutes - a.lateMinutes);
  }, [allRecords, date, threshold]);

  function exportReport() {
    const rows = lateRecs.map(r => [r.date, r.employeeId, r.employeeName, r.position, fT(r.inTime), `${r.lateMinutes}m late`]);
    const csv = [["Date","ID","Name","Position","Check In","Late By"], ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `late_coming_${date}.csv`;
    a.click();
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Late Coming Report</h2>
          <p className="text-[#555] text-xs mt-0.5">{lateRecs.length} late arrivals on {fD(date)}</p>
        </div>
        <button onClick={exportReport}
          className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors self-start sm:self-auto">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[#888] text-[10px] uppercase tracking-wider mb-1.5">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors" />
          </div>
          <div>
            <label className="block text-[#888] text-[10px] uppercase tracking-wider mb-1.5">Late Threshold Time</label>
            <input type="time" value={threshold} onChange={e => setThreshold(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors" />
          </div>
        </div>
      </div>

      {/* Summary badge */}
      {lateRecs.length > 0 && (
        <div className="bg-orange-900/20 border border-orange-900/40 rounded-2xl px-4 py-3 mb-4 flex items-center gap-3">
          <svg className="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p className="text-orange-400 text-xs">
            <strong>{lateRecs.length}</strong> employee{lateRecs.length !== 1 ? "s" : ""} arrived after {threshold} on {fD(date)}.
            Avg late: <strong>{Math.round(lateRecs.reduce((s, r) => s + r.lateMinutes, 0) / lateRecs.length)}m</strong>
          </p>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Check In</th>
              <th className="px-4 py-3 text-left">Late By</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Designation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {lateRecs.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-[#555]">
                {`No late arrivals on ${fD(date)} after ${threshold}.`}
              </td></tr>
            ) : lateRecs.map(rec => {
              const emp = employees.find(e => e.employeeId === rec.employeeId);
              const mins = rec.lateMinutes;
              const color = mins >= 60 ? "text-red-400 bg-red-900/40" : mins >= 30 ? "text-orange-400 bg-orange-900/40" : "text-yellow-400 bg-yellow-900/40";
              return (
                <tr key={rec._id} className="bg-[#111] hover:bg-[#161616] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top flex-shrink-0 border border-[#2a2a2a]" />}
                      <div>
                        <p className="text-white font-medium">{rec.employeeName}</p>
                        <p className="text-[#555] text-[10px]">{rec.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white font-mono">{fT(rec.inTime)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${color}`}>
                      +{mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#888] hidden sm:table-cell">{emp?.position || rec.position || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
