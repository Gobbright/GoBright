import { useOutletContext, useNavigate } from "react-router-dom";

export default function LeaveManagement() {
  const { allRecords, todayStr, leaveCount } = useOutletContext();
  const navigate = useNavigate();

  const sections = [
    { label: "Pending Leave Requests", desc: "Approve or reject today's leave requests", to: "pending",  dot: "bg-yellow-400", count: leaveCount },
    { label: "Leave History",          desc: "All past approved/rejected leave records",  to: "history",  dot: "bg-blue-400",   count: null },
    { label: "Leave Balance",          desc: "Remaining leave balance per employee",       to: "balance",  dot: "bg-green-400",  count: null },
  ];

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-1">Leave Management</h2>
      <p className="text-[#555] text-sm mb-5">Manage employee leave requests and balances.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sections.map(s => (
          <button key={s.to} onClick={() => navigate(s.to)}
            className="bg-[#111] border border-[#2a2a2a] hover:border-[#e32028]/60 rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5">
            <div className="flex items-center justify-between mb-3">
              <span className={`w-3 h-3 rounded-full ${s.dot}`} />
              {s.count !== null && (
                <span className="text-lg font-black text-white">{s.count}</span>
              )}
            </div>
            <p className="text-white font-semibold text-sm">{s.label}</p>
            <p className="text-[#555] text-xs mt-1">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
