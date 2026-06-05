import { useOutletContext } from "react-router-dom";
import { exportCSV } from "../../helpers";
import { PHOTOS } from "../../photos";

export default function SalaryReport() {
  const { employees, monthRecs, currentMonth } = useOutletContext();

  const stats = employees.map(emp => {
    const recs    = monthRecs.filter(r => r.employeeId === emp.employeeId);
    const present = recs.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
    const absent  = recs.filter(r => r.isAbsent).length;
    const leave   = recs.filter(r => r.isLeave).length;
    const salary  = emp.salary || 0;
    const perDay  = salary > 0 ? Math.round(salary / 26) : 0;
    const deduct  = perDay * absent;
    const net     = salary - deduct;
    return { emp, present, absent, leave, salary, deduct, net };
  });

  function doExport() {
    const rows = stats.map(s => ({
      date: currentMonth, employeeId: s.emp.employeeId, employeeName: s.emp.name,
      position: s.emp.position, presentDays: s.present, absentDays: s.absent,
      leaveDays: s.leave, basicSalary: s.salary, deduction: s.deduct, netSalary: s.net,
    }));
    exportCSV(rows, `salary_report_${currentMonth}`);
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-white font-bold text-lg">Salary Attendance Report</h2>
          <p className="text-[#555] text-xs">{currentMonth} · Deduction based on absent days</p>
        </div>
        <div className="flex gap-2">
          <button onClick={doExport} className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl">Export CSV</button>
          <button onClick={() => window.print()} className="px-3 py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl">Print / PDF</button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead><tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
            <th className="px-4 py-3 text-left">Employee</th>
            <th className="px-4 py-3 text-center">Present</th>
            <th className="px-4 py-3 text-center">Absent</th>
            <th className="px-4 py-3 text-right">Basic Salary</th>
            <th className="px-4 py-3 text-right">Deduction</th>
            <th className="px-4 py-3 text-right">Net Salary</th>
          </tr></thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {stats.map(({ emp, present, absent, salary, deduct, net }) => (
              <tr key={emp.employeeId} className="bg-[#111] hover:bg-[#161616]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={PHOTOS[emp.employeeId]} alt="" className="w-7 h-7 rounded-lg object-cover object-top bg-[#2a2a2a]" onError={e => { e.target.style.display = "none"; }} />
                    <div><p className="text-white font-medium">{emp.name}</p><p className="text-[#555]">{emp.employeeId}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-green-400 font-bold">{present}</td>
                <td className="px-4 py-3 text-center text-red-400 font-bold">{absent}</td>
                <td className="px-4 py-3 text-right text-white">{salary > 0 ? `₹${salary.toLocaleString()}` : "—"}</td>
                <td className="px-4 py-3 text-right text-red-400">{deduct > 0 ? `-₹${deduct.toLocaleString()}` : "—"}</td>
                <td className="px-4 py-3 text-right text-green-400 font-bold">{net > 0 ? `₹${net.toLocaleString()}` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[#444] text-[10px] mt-3">* Deduction calculated on 26 working days per month basis.</p>
    </div>
  );
}
