import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PHOTOS } from "../../photos";

export default function Payslip() {
  const { employees, monthRecs, currentMonth } = useOutletContext();
  const [selectedEmp, setSelectedEmp] = useState("");

  const emp     = employees.find(e => e.employeeId === selectedEmp);
  const recs    = monthRecs.filter(r => r.employeeId === selectedEmp);
  const present = recs.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
  const absent  = recs.filter(r => r.isAbsent).length;
  const leave   = recs.filter(r => r.isLeave).length;
  const salary  = emp?.salary || 0;
  const perDay  = salary > 0 ? Math.round(salary / 26) : 0;
  const bonus   = 0;
  const deduct  = perDay * absent;
  const net     = salary + bonus - deduct;

  return (
    <div className="p-4 md:p-6 max-w-2xl">
      <h2 className="text-white font-bold text-lg mb-5">Generate Payslip</h2>

      {/* Select employee */}
      <div className="mb-5">
        <label className="text-[#888] text-[10px] uppercase tracking-wider mb-1 block">Select Employee</label>
        <select value={selectedEmp} onChange={e => setSelectedEmp(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e32028]">
          <option value="">-- Choose Employee --</option>
          {employees.map(e => <option key={e.employeeId} value={e.employeeId}>{e.name} ({e.employeeId})</option>)}
        </select>
      </div>

      {emp && (
        <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          {/* Payslip header */}
          <div className="bg-[#e32028] px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-base">GoBright</p>
              <p className="text-white/70 text-xs">Payslip — {currentMonth}</p>
            </div>
            <button onClick={() => window.print()} className="px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-colors">
              Download PDF
            </button>
          </div>

          {/* Employee info */}
          <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center gap-4">
            <img src={PHOTOS[emp.employeeId]} alt="" className="w-14 h-14 rounded-xl object-cover object-top bg-[#2a2a2a]" onError={e => { e.target.style.display = "none"; }} />
            <div>
              <p className="text-white font-bold">{emp.name}</p>
              <p className="text-[#555] text-xs">{emp.employeeId} · {emp.position}</p>
            </div>
          </div>

          {/* Attendance summary */}
          <div className="px-6 py-4 border-b border-[#2a2a2a]">
            <p className="text-[#555] text-[10px] uppercase tracking-wider mb-3">Attendance Summary</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[{ l: "Present", v: present, c: "text-green-400" }, { l: "Absent", v: absent, c: "text-red-400" }, { l: "Leave", v: leave, c: "text-purple-400" }]
                .map(s => (
                  <div key={s.l} className="bg-[#0d0d0d] rounded-xl p-3">
                    <p className={`text-xl font-black ${s.c}`}>{s.v}</p>
                    <p className="text-[#555] text-[10px] mt-0.5">{s.l}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Salary breakdown */}
          <div className="px-6 py-4">
            <p className="text-[#555] text-[10px] uppercase tracking-wider mb-3">Salary Breakdown</p>
            <div className="space-y-2">
              {[
                { label: "Basic Salary",    value: `₹${salary.toLocaleString()}`,  color: "text-white" },
                { label: "Bonus",           value: `₹${bonus.toLocaleString()}`,   color: "text-green-400" },
                { label: "Leave Deduction", value: `-₹${deduct.toLocaleString()}`, color: "text-red-400" },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-[#555] text-xs">{r.label}</span>
                  <span className={`text-xs font-semibold ${r.color}`}>{r.value}</span>
                </div>
              ))}
              <div className="border-t border-[#2a2a2a] pt-2 flex items-center justify-between">
                <span className="text-white text-sm font-bold">Net Salary</span>
                <span className="text-[#e32028] text-lg font-black">₹{net.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
