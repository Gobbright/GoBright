import { useOutletContext } from "react-router-dom";
import { PHOTOS } from "../../photos";

export default function SalaryHistory() {
  const { employees } = useOutletContext();

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-1">Salary History</h2>
      <p className="text-[#555] text-sm mb-5">Past salary records and payment history for all employees.</p>
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1a1a1a] text-[#888] uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-right">Salary / Package</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {employees.map(emp => (
              <tr key={emp.employeeId} className="bg-[#111] hover:bg-[#161616]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={PHOTOS[emp.employeeId]} alt="" className="w-8 h-8 rounded-lg object-cover object-top bg-[#2a2a2a] flex-shrink-0" onError={e => { e.target.style.display = "none"; }} />
                    <div><p className="text-white font-medium">{emp.name}</p><p className="text-[#555]">{emp.employeeId}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#888]">{emp.position}</td>
                <td className="px-4 py-3 text-right text-green-400 font-bold">{emp.salary ? `₹${emp.salary.toLocaleString()}` : <span className="text-[#444]">Not set</span>}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${emp.inactive ? "bg-red-900/40 text-red-400" : "bg-green-900/40 text-green-400"}`}>{emp.inactive ? "Inactive" : "Active"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
