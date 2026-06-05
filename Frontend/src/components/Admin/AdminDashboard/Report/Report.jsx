import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { exportCSV, fT, fM, fD, workMins, durationMins, statusLabel } from "../helpers";

export default function Report() {
  const { employees, allRecords } = useOutletContext();
  const [fromDate,    setFromDate]    = useState("");
  const [toDate,      setToDate]      = useState("");
  const [reportEmp,   setReportEmp]   = useState("all");
  const [reportData,  setReportData]  = useState([]);
  const printRef = useRef();

  function generate() {
    let data = [...allRecords];
    if (reportEmp !== "all") data = data.filter(r => r.employeeId === reportEmp);
    if (fromDate) data = data.filter(r => r.date >= fromDate);
    if (toDate)   data = data.filter(r => r.date <= toDate);
    setReportData(data.sort((a, b) => b.date.localeCompare(a.date)));
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-4">Attendance Report</h2>

      <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          <div>
            <label className="text-[#888] text-xs mb-1 block uppercase tracking-wider">From Date</label>
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#e32028]" />
          </div>
          <div>
            <label className="text-[#888] text-xs mb-1 block uppercase tracking-wider">To Date</label>
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#e32028]" />
          </div>
          <div>
            <label className="text-[#888] text-xs mb-1 block uppercase tracking-wider">Employee</label>
            <select value={reportEmp} onChange={e => setReportEmp(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#e32028]">
              <option value="all">All Employees</option>
              {employees.map(e => <option key={e.employeeId} value={e.employeeId}>{e.name}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={generate} className="w-full bg-[#e32028] hover:bg-[#c41d23] text-white font-semibold py-2 rounded-xl text-sm transition-colors">
              Generate
            </button>
          </div>
        </div>

        {reportData.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-[#2a2a2a]">
            <button onClick={() => exportCSV(reportData, `attendance_${fromDate || "all"}_${toDate || "all"}`)}
              className="flex items-center gap-1.5 px-4 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              Excel / CSV
            </button>
            <button onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              Print / PDF
            </button>
            <span className="text-[#555] text-xs flex items-center">{reportData.length} records</span>
          </div>
        )}
      </div>

      {reportData.length > 0 && (
        <div ref={printRef} className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
                <th className="px-3 py-3 text-left">Date</th>
                <th className="px-3 py-3 text-left">Employee</th>
                <th className="px-3 py-3 text-left">In</th>
                <th className="px-3 py-3 text-left">Break</th>
                <th className="px-3 py-3 text-left">Out</th>
                <th className="px-3 py-3 text-left">Work</th>
                <th className="px-3 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {reportData.map((rec, i) => {
                const st = statusLabel(rec);
                return (
                  <tr key={i} className="bg-[#111] hover:bg-[#161616] transition-colors">
                    <td className="px-3 py-2.5 text-[#e32028] whitespace-nowrap font-medium">{fD(rec.date)}</td>
                    <td className="px-3 py-2.5 text-white whitespace-nowrap">
                      <p className="font-medium">{rec.employeeName}</p>
                      <p className="text-[#555] text-[10px]">{rec.employeeId}</p>
                    </td>
                    <td className="px-3 py-2.5 text-green-400 whitespace-nowrap">{fT(rec.inTime)}</td>
                    <td className="px-3 py-2.5 text-yellow-400">{fM(rec.totalBreakMinutes)}</td>
                    <td className="px-3 py-2.5 text-blue-400 whitespace-nowrap">{fT(rec.outTime)}</td>
                    <td className="px-3 py-2.5 text-white font-semibold">{rec.inTime && rec.outTime ? fM(workMins(rec)) : "--"}</td>
                    <td className="px-3 py-2.5"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${st.cls}`}>{st.text}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {reportData.length === 0 && (
        <div className="text-center py-12 text-[#555]">
          <p className="text-sm">Select filters and click Generate to view report.</p>
        </div>
      )}
    </div>
  );
}
