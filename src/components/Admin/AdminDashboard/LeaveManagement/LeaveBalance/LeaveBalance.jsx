import { useOutletContext } from "react-router-dom";
import { PHOTOS } from "../../photos";

const ANNUAL_LEAVE = 12;

export default function LeaveBalance() {
  const { employees, allRecords } = useOutletContext();

  const stats = employees.map(emp => {
    const taken    = allRecords.filter(r => r.employeeId === emp.employeeId && r.isLeave).length;
    const balance  = Math.max(0, ANNUAL_LEAVE - taken);
    const usedPct  = Math.round((taken / ANNUAL_LEAVE) * 100);
    return { emp, taken, balance, usedPct };
  });

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-1">Leave Balance</h2>
      <p className="text-[#555] text-sm mb-5">Annual leave quota: <span className="text-white font-semibold">{ANNUAL_LEAVE} days</span> per employee.</p>
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-center">Total</th>
              <th className="px-4 py-3 text-center">Used</th>
              <th className="px-4 py-3 text-center">Balance</th>
              <th className="px-4 py-3 text-left">Usage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {stats.map(({ emp, taken, balance, usedPct }) => (
              <tr key={emp.employeeId} className="bg-[#111] hover:bg-[#161616]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={PHOTOS[emp.employeeId]} alt="" className="w-8 h-8 rounded-lg object-cover object-top bg-[#2a2a2a] flex-shrink-0" onError={e => { e.target.style.display = "none"; }} />
                    <div><p className="text-white font-medium">{emp.name}</p><p className="text-[#555]">{emp.employeeId}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-[#888]">{ANNUAL_LEAVE}</td>
                <td className="px-4 py-3 text-center text-red-400 font-bold">{taken}</td>
                <td className="px-4 py-3 text-center text-green-400 font-bold">{balance}</td>
                <td className="px-4 py-3 min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[#e32028] transition-all" style={{ width: `${usedPct}%` }} />
                    </div>
                    <span className="text-[#555] text-[10px] w-8 text-right">{usedPct}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
