import { useOutletContext, useNavigate } from "react-router-dom";
import { exportCSV } from "../helpers";
import { PHOTOS } from "../photos";
import { ViewHeader } from "../Shared";

export default function LeaveRequests() {
  const { allRecords, todayStr, employees } = useOutletContext();
  const navigate = useNavigate();
  const recs = allRecords.filter(r => r.date === todayStr && r.isLeave);

  return (
    <div className="p-4 md:p-6">
      <ViewHeader
        title="Leave Requests"
        count={recs.length}
        color="text-purple-400"
        onExport={() => exportCSV(recs, `leave_requests_${todayStr}`)}
      />
      {recs.length === 0
        ? <p className="text-[#555] text-center py-12">No leave records for today.</p>
        : (
          <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Employee</th>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Position</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {recs.map((rec, i) => {
                  const emp = employees.find(e => e.employeeId === rec.employeeId);
                  return (
                    <tr key={i} className="bg-[#111] hover:bg-[#161616] transition-colors cursor-pointer"
                      onClick={() => emp && navigate(`/admin/dashboard/employee/${emp.employeeId}`, { state: { emp } })}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-8 h-8 rounded-lg object-cover object-top flex-shrink-0" />}
                          <span className="text-white font-medium">{rec.employeeName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#e32028] font-mono">{rec.employeeId}</td>
                      <td className="px-4 py-3 text-[#888]">{emp?.position || "--"}</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full font-semibold bg-purple-900/40 text-purple-400">On Leave</span></td>
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
