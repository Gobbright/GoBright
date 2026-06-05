import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { exportCSV, fT, fM, workMins, fD } from "../helpers";

export default function QuickReportExport() {
  const { allRecords, employees, todayStr, currentMonth, monthRecs } = useOutletContext();
  const [preview, setPreview] = useState(null);

  const todayPresent = allRecords.filter(r => r.date === todayStr && !r.isAbsent && !r.isLeave && r.inTime);
  const todayAbsent  = allRecords.filter(r => r.date === todayStr && r.isAbsent);
  const todayLeave   = allRecords.filter(r => r.date === todayStr && r.isLeave);

  const cards = [
    {
      title: "Total Employees",
      desc: "All employees list with position",
      color: "border-white/20 hover:border-white/50",
      badge: `${employees.length} employees`,
      badgeColor: "bg-[#2a2a2a] text-white",
      getPreview: () => ({
        title: "Total Employees",
        filename: "total_employees",
        cols: ["Employee ID", "Name", "Position"],
        rows: employees.map(e => [e.employeeId, e.name, e.position || "--"]),
        csvData: employees.map(e => ({ date: todayStr, employeeId: e.employeeId, employeeName: e.name, position: e.position })),
      }),
    },
    {
      title: "Today Present",
      desc: `Present employees for ${fD(todayStr)}`,
      color: "border-green-800/50 hover:border-green-500/60",
      badge: `${todayPresent.length} present`,
      badgeColor: "bg-green-900/40 text-green-400",
      getPreview: () => ({
        title: `Today Present — ${fD(todayStr)}`,
        filename: `today_present_${todayStr}`,
        cols: ["Employee ID", "Name", "In Time", "Break", "Out Time", "Work Hours"],
        rows: todayPresent.map(r => [r.employeeId, r.employeeName, fT(r.inTime), `${r.totalBreakMinutes || 0}m`, r.outTime ? fT(r.outTime) : "—", fM(workMins(r))]),
        csvData: todayPresent,
      }),
    },
    {
      title: "Today Absent",
      desc: `Absent employees for ${fD(todayStr)}`,
      color: "border-red-800/50 hover:border-red-500/60",
      badge: `${todayAbsent.length} absent`,
      badgeColor: "bg-red-900/40 text-red-400",
      getPreview: () => ({
        title: `Today Absent — ${fD(todayStr)}`,
        filename: `today_absent_${todayStr}`,
        cols: ["Employee ID", "Name", "Status"],
        rows: todayAbsent.map(r => [r.employeeId, r.employeeName, "Absent"]),
        csvData: todayAbsent,
      }),
    },
    {
      title: "Leave Requests",
      desc: `On-leave employees for ${fD(todayStr)}`,
      color: "border-purple-800/50 hover:border-purple-500/60",
      badge: `${todayLeave.length} on leave`,
      badgeColor: "bg-purple-900/40 text-purple-400",
      getPreview: () => ({
        title: `Leave Requests — ${fD(todayStr)}`,
        filename: `leave_requests_${todayStr}`,
        cols: ["Employee ID", "Name", "Status"],
        rows: todayLeave.map(r => [r.employeeId, r.employeeName, "On Leave"]),
        csvData: todayLeave,
      }),
    },
    {
      title: "Monthly Attendance",
      desc: `All records for ${currentMonth}`,
      color: "border-yellow-800/50 hover:border-yellow-500/60",
      badge: `${monthRecs.length} records`,
      badgeColor: "bg-yellow-900/40 text-yellow-400",
      getPreview: () => ({
        title: `Monthly Attendance — ${currentMonth}`,
        filename: `monthly_attendance_${currentMonth}`,
        cols: ["Date", "Employee ID", "Name", "In Time", "Out Time", "Work Hours", "Status"],
        rows: monthRecs.map(r => [
          fD(r.date), r.employeeId, r.employeeName,
          r.inTime ? fT(r.inTime) : "—",
          r.outTime ? fT(r.outTime) : "—",
          fM(workMins(r)),
          r.isLeave ? "Leave" : r.isAbsent ? "Absent" : r.inTime ? "Present" : "No Data",
        ]),
        csvData: monthRecs,
      }),
    },
  ];

  function open(card) { setPreview(card.getPreview()); }
  function close() { setPreview(null); }
  function download() { exportCSV(preview.csvData, preview.filename); }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-1">Quick Report Export</h2>
      <p className="text-[#555] text-sm mb-6">Click a report to preview data, then download as CSV.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <button key={i} onClick={() => open(card)}
            className={`bg-[#111] border ${card.color} rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg`}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-white font-semibold text-sm">{card.title}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${card.badgeColor}`}>{card.badge}</span>
            </div>
            <p className="text-[#555] text-xs">{card.desc}</p>
            <div className="mt-4 flex items-center gap-1.5 text-[#555] text-xs">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              Preview & Download
            </div>
          </button>
        ))}

        {/* Print card — no preview */}
        <button onClick={() => window.print()}
          className="bg-[#111] border border-blue-800/50 hover:border-blue-500/60 rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-start justify-between mb-3">
            <p className="text-white font-semibold text-sm">Print / PDF</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-blue-900/40 text-blue-400">Print</span>
          </div>
          <p className="text-[#555] text-xs">Print current page as PDF</p>
          <div className="mt-4 flex items-center gap-1.5 text-[#555] text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
            Print
          </div>
        </button>
      </div>

      {/* ── Preview Modal ── */}
      {preview && (
        <div className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-5xl bg-[#111] border border-[#2a2a2a] rounded-2xl flex flex-col overflow-hidden shadow-2xl max-h-[90vh]">

            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a] flex-shrink-0">
              <div>
                <h3 className="text-white font-bold text-base">{preview.title}</h3>
                <p className="text-[#555] text-xs mt-0.5">{preview.rows.length} records</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={download}
                  className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  Download CSV
                </button>
                <button onClick={close}
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#1a1a1a] hover:bg-[#222] text-[#888] hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto flex-1">
              {preview.rows.length === 0 ? (
                <div className="flex items-center justify-center h-40">
                  <p className="text-[#555] text-sm">No data available.</p>
                </div>
              ) : (
                <table className="w-full text-sm border-collapse min-w-[600px]">
                  <thead className="sticky top-0 bg-[#0d0d0d] z-10">
                    <tr>
                      <th className="text-left text-[#555] text-xs font-semibold px-4 py-3 border-b border-[#2a2a2a] w-10">#</th>
                      {preview.cols.map((col, i) => (
                        <th key={i} className="text-left text-[#555] text-xs font-semibold px-4 py-3 border-b border-[#2a2a2a] whitespace-nowrap">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-[#1a1a1a] hover:bg-[#161616] transition-colors">
                        <td className="px-4 py-3 text-[#444] text-xs">{ri + 1}</td>
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-4 py-3 text-white text-xs whitespace-nowrap">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Modal footer */}
            <div className="px-5 py-3 border-t border-[#2a2a2a] flex items-center justify-between flex-shrink-0">
              <p className="text-[#444] text-xs">{preview.rows.length} rows</p>
              <button onClick={download}
                className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
