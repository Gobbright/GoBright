import { useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { PHOTOS } from "../photos";

const DEFAULT_SALARY = 20000;

export default function Salary() {
  const { employees, allRecords } = useOutletContext();
  const navigate = useNavigate();
  const currentMonth = new Date(Date.now() + 5.5 * 3600000).toISOString().slice(0, 7);

  const summary = useMemo(() => {
    const recs = allRecords.filter(r => r.date.startsWith(currentMonth));
    return employees.map(emp => {
      const empRecs  = recs.filter(r => r.employeeId === emp.employeeId);
      const absent   = empRecs.filter(r => r.isAbsent).length;
      const base     = Number(emp.salary) || DEFAULT_SALARY;
      const daily    = base / 26;
      const deduct   = absent * daily;
      const net      = Math.max(0, base - deduct);
      return { emp, base, deduct: Math.round(deduct), net: Math.round(net) };
    });
  }, [employees, allRecords, currentMonth]);

  const totalBase = summary.reduce((s, r) => s + r.base, 0);
  const totalNet  = summary.reduce((s, r) => s + r.net, 0);
  const totalDeduct = totalBase - totalNet;

  const views = [
    { label: "Generate Payslip", desc: "Create & download payslip for any employee", path: "/admin/dashboard/salary/generate-payslip", badgeCls: "bg-green-900/40 text-green-400" },
    { label: "Salary History",   desc: "View past salary disbursements per employee", path: "/admin/dashboard/salary/history",          badgeCls: "bg-blue-900/40 text-blue-400" },
    { label: "Salary Report",    desc: "Monthly salary vs attendance deductions",      path: "/admin/dashboard/reports/salary",          badgeCls: "bg-orange-900/40 text-orange-400" },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-5">
        <h2 className="text-white font-bold text-lg">Salary / Payroll</h2>
        <p className="text-[#555] text-xs mt-0.5">{currentMonth} payroll overview</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          ["Total Basic",  `₹${totalBase.toLocaleString("en-IN")}`,   "text-white"],
          ["Deductions",   `₹${totalDeduct.toLocaleString("en-IN")}`, "text-red-400"],
          ["Net Payable",  `₹${totalNet.toLocaleString("en-IN")}`,    "text-green-400"],
        ].map(([label, val, color]) => (
          <div key={label} className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 text-center">
            <p className={`text-base font-black ${color}`}>{val}</p>
            <p className="text-[#555] text-[11px] mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {views.map(v => (
          <button key={v.path} onClick={() => navigate(v.path)}
            className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 text-left hover:border-[#e32028]/30 transition-all hover:-translate-y-0.5 group">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold block mb-2 w-fit ${v.badgeCls}`}>{v.label}</span>
            <p className="text-[#555] text-[11px]">{v.desc}</p>
          </button>
        ))}
      </div>

      {/* Employee salary table */}
      <p className="text-[#555] text-[10px] uppercase tracking-wider mb-3 font-semibold">This Month — Employee Summary</p>
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-right">Basic Salary</th>
              <th className="px-4 py-3 text-right hidden sm:table-cell">Deduction</th>
              <th className="px-4 py-3 text-right">Net Pay</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {summary.map(({ emp, base, deduct, net }) => (
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
                <td className="px-4 py-3 text-right text-[#888]">₹{base.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right hidden sm:table-cell">
                  <span className={deduct > 0 ? "text-red-400" : "text-[#555]"}>
                    {deduct > 0 ? `−₹${deduct.toLocaleString("en-IN")}` : "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-green-400 font-bold">₹{net.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => navigate("/admin/dashboard/salary/generate-payslip", { state: { emp } })}
                    className="px-2 py-1 rounded-lg bg-[#e32028]/20 text-[#e32028] hover:bg-[#e32028]/40 text-[10px] font-semibold transition-colors"
                  >
                    Payslip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
