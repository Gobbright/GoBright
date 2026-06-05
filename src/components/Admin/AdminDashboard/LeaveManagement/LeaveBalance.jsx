import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { PHOTOS } from "../photos";

const ANNUAL_LEAVE_DAYS = 12;
const MONTHLY_ALLOWANCE = 1;

function getMonthCount() {
  const now = new Date(Date.now() + 5.5 * 3600000);
  return now.getMonth() + 1;
}

export default function LeaveBalance() {
  const { allRecords, employees } = useOutletContext();
  const currentYear = new Date(Date.now() + 5.5 * 3600000).getFullYear().toString();

  const balances = useMemo(() => {
    const monthsPassed = getMonthCount();
    const earnedSoFar = monthsPassed * MONTHLY_ALLOWANCE;

    return employees.map(emp => {
      const taken = allRecords.filter(r =>
        r.employeeId === emp.employeeId &&
        r.isLeave &&
        r.date.startsWith(currentYear)
      ).length;

      const balance = Math.max(0, earnedSoFar - taken);
      const pct = earnedSoFar > 0 ? Math.round((taken / earnedSoFar) * 100) : 0;

      return { emp, taken, earned: earnedSoFar, balance, pct };
    });
  }, [allRecords, employees, currentYear]);

  const totalTaken   = balances.reduce((s, b) => s + b.taken, 0);
  const avgBalance   = balances.length ? Math.round(balances.reduce((s, b) => s + b.balance, 0) / balances.length) : 0;
  const highLeave    = balances.filter(b => b.taken >= b.earned).length;

  return (
    <div className="p-4 md:p-6">
      <div className="mb-5">
        <h2 className="text-white font-bold text-lg">Leave Balance</h2>
        <p className="text-[#555] text-xs mt-0.5">Year {currentYear} · {MONTHLY_ALLOWANCE} day/month allowance · {ANNUAL_LEAVE_DAYS} days annual</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          ["Total Leaves Taken", totalTaken, "text-purple-400"],
          ["Avg Balance Left",   avgBalance,  "text-green-400"],
          ["Zero Balance",       highLeave,   "text-red-400"],
        ].map(([label, val, color]) => (
          <div key={label} className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 text-center">
            <p className={`text-2xl font-black ${color}`}>{val}</p>
            <p className="text-[#555] text-[11px] mt-1 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {balances.map(({ emp, taken, earned, balance, pct }) => (
          <div key={emp.employeeId} className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <img src={PHOTOS[emp.employeeId]} alt="" className="w-9 h-9 rounded-xl object-cover object-top border border-[#2a2a2a]" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{emp.name}</p>
                <p className="text-[#555] text-[10px]">{emp.employeeId}</p>
              </div>
              <div className="text-right">
                <p className={`text-base font-black ${balance === 0 ? "text-red-400" : balance <= 2 ? "text-yellow-400" : "text-green-400"}`}>
                  {balance}
                </p>
                <p className="text-[#555] text-[10px]">left</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-[#555]">
                <span>{taken} taken of {earned} earned</span>
                <span>{pct}% used</span>
              </div>
              <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${pct >= 100 ? "bg-red-500" : pct >= 75 ? "bg-yellow-500" : "bg-green-500"}`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
