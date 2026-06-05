import { useState, useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { fD } from "../helpers";
import { PHOTOS } from "../photos";

export default function LeaveManagement() {
  const { allRecords, employees } = useOutletContext();
  const navigate = useNavigate();
  const [tab, setTab] = useState("pending");

  const leaveRecs = useMemo(() => {
    return allRecords
      .filter(r => r.isLeave)
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(r => ({
        ...r,
        empInfo: employees.find(e => e.employeeId === r.employeeId),
        status: "on_leave",
      }));
  }, [allRecords, employees]);

  const views = [
    { label: "Leave Records", path: "/admin/dashboard/leave-management", badgeCls: "bg-purple-900/40 text-purple-400", count: leaveRecs.length, desc: "All leave records from attendance data" },
    { label: "Leave History", path: "/admin/dashboard/leave-management/history", badgeCls: "bg-blue-900/40 text-blue-400", count: null, desc: "Date-wise leave history per employee" },
    { label: "Leave Balance", path: "/admin/dashboard/leave-management/balance", badgeCls: "bg-green-900/40 text-green-400", count: null, desc: "Remaining leave days per employee" },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-5">
        <h2 className="text-white font-bold text-lg">Leave Management</h2>
        <p className="text-[#555] text-xs mt-0.5">{leaveRecs.length} total leave records</p>
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {views.map(v => (
          <button key={v.path} onClick={() => navigate(v.path)}
            className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 text-left hover:border-[#e32028]/30 transition-all hover:-translate-y-0.5 group">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${v.badgeCls}`}>
                {v.count !== null ? v.count : v.label}
              </span>
              <svg className="w-3.5 h-3.5 text-[#555] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <p className="text-white text-xs font-semibold">{v.label}</p>
            <p className="text-[#555] text-[10px] mt-0.5">{v.desc}</p>
          </button>
        ))}
      </div>

      {/* Recent leave list */}
      <div>
        <p className="text-[#555] text-[10px] uppercase tracking-wider mb-3 font-semibold">Recent Leave Records</p>
        {leaveRecs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#2a2a2a] py-12 text-center">
            <p className="text-[#555] text-sm">No leave records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Employee</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">Designation</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {leaveRecs.slice(0, 20).map((rec, i) => (
                  <tr key={i} className="bg-[#111] hover:bg-[#161616] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {rec.empInfo && <img src={PHOTOS[rec.empInfo.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top flex-shrink-0 border border-[#2a2a2a]" />}
                        <div>
                          <p className="text-white font-medium">{rec.employeeName}</p>
                          <p className="text-[#555] text-[10px]">{rec.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#888]">{fD(rec.date)}</td>
                    <td className="px-4 py-3 text-[#888] hidden sm:table-cell">{rec.empInfo?.position || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-900/40 text-purple-400">On Leave</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex gap-1.5">
                        <button className="px-2 py-1 rounded-lg bg-green-900/30 text-green-400 hover:bg-green-900/50 text-[10px] font-semibold transition-colors">Approve</button>
                        <button className="px-2 py-1 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 text-[10px] font-semibold transition-colors">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
