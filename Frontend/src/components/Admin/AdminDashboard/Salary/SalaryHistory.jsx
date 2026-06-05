import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { PHOTOS } from "../photos";

const DEFAULT_SALARY = 20000;
const DAILY_DIVISOR  = 26;
const LATE_DEDUCT    = 200;

function isLateArrival(rec) {
  if (!rec?.inTime) return false;
  const ist = new Date(new Date(rec.inTime).getTime() + 5.5 * 3600000);
  return ist.toISOString().substr(11, 5) > "09:30";
}

function getMonths(allRecords) {
  const set = new Set(allRecords.map(r => r.date.slice(0, 7)));
  return Array.from(set).sort((a, b) => b.localeCompare(a));
}

export default function SalaryHistory() {
  const { allRecords, employees } = useOutletContext();
  const [empId, setEmpId] = useState(employees[0]?.employeeId || "");

  const months = useMemo(() => getMonths(allRecords.filter(r => r.employeeId === empId)), [allRecords, empId]);

  const history = useMemo(() => {
    return months.map(month => {
      const recs     = allRecords.filter(r => r.employeeId === empId && r.date.startsWith(month));
      const emp      = employees.find(e => e.employeeId === empId);
      const base     = Number(emp?.salary) || DEFAULT_SALARY;
      const absent   = recs.filter(r => r.isAbsent).length;
      const latedays = recs.filter(r => isLateArrival(r)).length;
      const abDeduct = Math.round(absent * (base / DAILY_DIVISOR));
      const ltDeduct = latedays * LATE_DEDUCT;
      const net      = Math.max(0, base - abDeduct - ltDeduct);
      const present  = recs.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
      const [YY, MM] = month.split("-");
      const label    = new Date(Number(YY), Number(MM) - 1).toLocaleString("en-IN", { month: "long", year: "numeric" });
      return { month, label, base, absent, latedays, abDeduct, ltDeduct, net, present };
    });
  }, [allRecords, employees, empId, months]);

  const emp = useMemo(() => employees.find(e => e.employeeId === empId), [employees, empId]);

  function doExport() {
    const hdr = ["Month","Base Salary","Present","Absent","Late","Deductions","Net Salary"];
    const data = history.map(h => [h.label, h.base, h.present, h.absent, h.latedays, h.abDeduct + h.ltDeduct, h.net]);
    const csv = [hdr, ...data].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = `salary_history_${empId}.csv`; a.click();
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Salary History</h2>
          <p className="text-[#555] text-xs mt-0.5">{history.length} months of records</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={empId} onChange={e => setEmpId(e.target.value)}
            className="bg-[#111] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors">
            {employees.map(e => <option key={e.employeeId} value={e.employeeId}>{e.name}</option>)}
          </select>
          <button onClick={doExport}
            className="px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white text-xs font-semibold transition-colors">CSV</button>
        </div>
      </div>

      {emp && (
        <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-3 mb-5 flex items-center gap-3">
          <img src={PHOTOS[emp.employeeId]} alt="" className="w-10 h-10 rounded-xl object-cover object-top border border-[#2a2a2a]" />
          <div>
            <p className="text-white font-semibold text-sm">{emp.name}</p>
            <p className="text-[#555] text-xs">{emp.employeeId} · {emp.position}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-white font-bold">₹{(Number(emp.salary) || DEFAULT_SALARY).toLocaleString("en-IN")}</p>
            <p className="text-[#555] text-[10px]">Basic Salary</p>
          </div>
        </div>
      )}

      {history.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#2a2a2a] py-12 text-center">
          <p className="text-[#555] text-sm">No salary history available.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Month</th>
                <th className="px-4 py-3 text-right">Basic</th>
                <th className="px-4 py-3 text-center hidden sm:table-cell">Present</th>
                <th className="px-4 py-3 text-center hidden sm:table-cell">Absent</th>
                <th className="px-4 py-3 text-right hidden md:table-cell">Deductions</th>
                <th className="px-4 py-3 text-right">Net Pay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {history.map(h => (
                <tr key={h.month} className="bg-[#111] hover:bg-[#161616] transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{h.label}</td>
                  <td className="px-4 py-3 text-right text-[#888]">₹{h.base.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-center text-green-400 font-bold hidden sm:table-cell">{h.present}</td>
                  <td className="px-4 py-3 text-center text-red-400 font-bold hidden sm:table-cell">{h.absent}</td>
                  <td className="px-4 py-3 text-right hidden md:table-cell">
                    <span className={(h.abDeduct + h.ltDeduct) > 0 ? "text-red-400" : "text-[#555]"}>
                      {(h.abDeduct + h.ltDeduct) > 0 ? `−₹${(h.abDeduct + h.ltDeduct).toLocaleString("en-IN")}` : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-green-400 font-bold">₹{h.net.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
