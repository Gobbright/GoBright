import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { fM, workMins } from "../helpers";
import { PHOTOS } from "../photos";

const DEFAULT_SALARY = 20000;
const DAILY_RATE_DIVISOR = 26;
const LATE_DEDUCT_PER_LATE = 200;

export default function SalaryReport() {
  const { allRecords, employees } = useOutletContext();
  const [month, setMonth] = useState(() =>
    new Date(Date.now() + 5.5 * 3600000).toISOString().slice(0, 7)
  );

  const rows = useMemo(() => {
    const recs = allRecords.filter(r => r.date.startsWith(month));
    return employees.map(emp => {
      const empRecs = recs.filter(r => r.employeeId === emp.employeeId);
      const present  = empRecs.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
      const absent   = empRecs.filter(r => r.isAbsent).length;
      const leave    = empRecs.filter(r => r.isLeave).length;

      function isLate(rec) {
        if (!rec.inTime) return false;
        const ist = new Date(new Date(rec.inTime).getTime() + 5.5 * 3600000);
        const t = ist.toISOString().substr(11, 5);
        return t > "09:30";
      }
      const lateCount = empRecs.filter(r => isLate(r)).length;

      const baseSalary = Number(emp.salary) || DEFAULT_SALARY;
      const dailyRate  = baseSalary / DAILY_RATE_DIVISOR;
      const absentDeduction = absent * dailyRate;
      const lateDeduction   = lateCount * LATE_DEDUCT_PER_LATE;
      const netSalary       = Math.max(0, baseSalary - absentDeduction - lateDeduction);

      return { emp, present, absent, leave, lateCount, baseSalary, absentDeduction, lateDeduction, netSalary };
    });
  }, [allRecords, employees, month]);

  function doExport() {
    const hdr = ["Month","ID","Name","Position","Base Salary","Present","Absent","Leave","Late","Absent Deduct","Late Deduct","Net Salary"];
    const data = rows.map(r => [month, r.emp.employeeId, r.emp.name, r.emp.position, r.baseSalary, r.present, r.absent, r.leave, r.lateCount, r.absentDeduction.toFixed(2), r.lateDeduction, r.netSalary.toFixed(2)]);
    const csv = [hdr, ...data].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = `salary_report_${month}.csv`; a.click();
  }

  const totalNet = rows.reduce((s, r) => s + r.netSalary, 0);

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Salary Attendance Report</h2>
          <p className="text-[#555] text-xs mt-0.5">Total payable: <span className="text-green-400 font-semibold">₹{totalNet.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span></p>
        </div>
        <div className="flex items-center gap-2">
          <input type="month" value={month} onChange={e => setMonth(e.target.value)}
            className="bg-[#111] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors" />
          <button onClick={doExport}
            className="px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold transition-colors">CSV</button>
          <button onClick={() => window.print()}
            className="px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold transition-colors">Print</button>
        </div>
      </div>

      <div className="bg-yellow-900/20 border border-yellow-900/30 rounded-xl px-4 py-2.5 mb-4">
        <p className="text-yellow-400 text-[10px]">Deductions: ₹{(DEFAULT_SALARY / DAILY_RATE_DIVISOR).toFixed(0)}/absent day · ₹{LATE_DEDUCT_PER_LATE}/late. Set actual salary in Employee profile for accurate numbers.</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-right">Basic</th>
              <th className="px-4 py-3 text-center hidden sm:table-cell">Present</th>
              <th className="px-4 py-3 text-center hidden sm:table-cell">Absent</th>
              <th className="px-4 py-3 text-right hidden md:table-cell">Deductions</th>
              <th className="px-4 py-3 text-right">Net Pay</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {rows.map(({ emp, present, absent, leave, lateCount, baseSalary, absentDeduction, lateDeduction, netSalary }) => (
              <tr key={emp.employeeId} className="bg-[#111] hover:bg-[#161616] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top border border-[#2a2a2a]" />
                    <div>
                      <p className="text-white font-medium leading-none">{emp.name}</p>
                      <p className="text-[#555] text-[10px] mt-0.5">{emp.employeeId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-[#888]">₹{baseSalary.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-center text-green-400 font-bold hidden sm:table-cell">{present}</td>
                <td className="px-4 py-3 text-center text-red-400 font-bold hidden sm:table-cell">{absent}</td>
                <td className="px-4 py-3 text-right text-red-400 hidden md:table-cell">
                  {(absentDeduction + lateDeduction) > 0
                    ? `−₹${(absentDeduction + lateDeduction).toFixed(0)}`
                    : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-green-400 font-bold">₹{netSalary.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#1a1a1a]">
              <td colSpan={5} className="px-4 py-3 text-right text-[#888] text-xs font-semibold">Total Payable</td>
              <td className="px-4 py-3 text-right text-white font-black">₹{totalNet.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
