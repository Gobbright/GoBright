import { useOutletContext, useNavigate } from "react-router-dom";
import { exportCSV } from "../../helpers";
import { PHOTOS } from "../../photos";

export default function PendingLeave() {
  const { allRecords, todayStr, employees } = useOutletContext();
  const navigate = useNavigate();
  const recs = allRecords.filter(r => r.date === todayStr && r.isLeave);

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Pending Leave Requests</h2>
          <p className={`text-sm font-semibold ${recs.length > 0 ? "text-yellow-400" : "text-[#555]"}`}>{recs.length} requests today</p>
        </div>
        {recs.length > 0 && (
          <button onClick={() => exportCSV(recs, `leave_requests_${todayStr}`)}
            className="flex items-center gap-1.5 px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-colors">
            Export CSV
          </button>
        )}
      </div>
      {recs.length === 0
        ? <p className="text-[#555] text-center py-12">No leave requests for today.</p>
        : (
          <div className="space-y-3">
            {recs.map((rec, i) => {
              const emp = employees.find(e => e.employeeId === rec.employeeId);
              return (
                <div key={i} className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 flex items-center gap-4">
                  {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-12 h-12 rounded-xl object-cover object-top flex-shrink-0 bg-[#2a2a2a]" onError={e => { e.target.style.display = "none"; }} />}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{rec.employeeName}</p>
                    <p className="text-[#555] text-xs">{rec.employeeId} · {emp?.position}</p>
                    <p className="text-purple-400 text-xs mt-1">Leave — {rec.date}</p>
                    {rec.notes && <p className="text-[#555] text-xs mt-0.5 italic">"{rec.notes}"</p>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="px-3 py-1.5 bg-green-700/30 border border-green-700/50 text-green-400 text-xs rounded-lg hover:bg-green-700/50 transition-colors">Approve</button>
                    <button className="px-3 py-1.5 bg-red-700/30 border border-red-700/50 text-red-400 text-xs rounded-lg hover:bg-red-700/50 transition-colors">Reject</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
}
