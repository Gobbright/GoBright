import { useState, useMemo, useRef } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { fD, workMins, fM } from "../helpers";
import { PHOTOS } from "../photos";

const DEFAULT_SALARY = 20000;
const DAILY_DIVISOR  = 26;
const LATE_DEDUCT    = 200;

function isLateArrival(rec) {
  if (!rec?.inTime) return false;
  const ist = new Date(new Date(rec.inTime).getTime() + 5.5 * 3600000);
  return ist.toISOString().substr(11, 5) > "09:30";
}

export default function GeneratePayslip() {
  const { employees, allRecords } = useOutletContext();
  const { state } = useLocation();
  const printRef = useRef();

  const [empId, setEmpId]   = useState(state?.emp?.employeeId || employees[0]?.employeeId || "");
  const [month, setMonth]   = useState(() => new Date(Date.now() + 5.5 * 3600000).toISOString().slice(0, 7));
  const [bonus, setBonus]   = useState("0");

  const emp = useMemo(() => employees.find(e => e.employeeId === empId), [employees, empId]);
  const recs = useMemo(() => allRecords.filter(r => r.employeeId === empId && r.date.startsWith(month)), [allRecords, empId, month]);

  const base     = Number(emp?.salary) || DEFAULT_SALARY;
  const present  = recs.filter(r => !r.isAbsent && !r.isLeave && r.inTime).length;
  const absent   = recs.filter(r => r.isAbsent).length;
  const leave    = recs.filter(r => r.isLeave).length;
  const latedays = recs.filter(r => isLateArrival(r)).length;
  const totalHrs = recs.reduce((s, r) => s + workMins(r), 0);
  const daily    = base / DAILY_DIVISOR;
  const abDeduct = Math.round(absent * daily);
  const ltDeduct = latedays * LATE_DEDUCT;
  const bonusAmt = Number(bonus) || 0;
  const net      = Math.max(0, base - abDeduct - ltDeduct + bonusAmt);

  const [YY, MM] = month.split("-");
  const monthName = new Date(Number(YY), Number(MM) - 1).toLocaleString("en-IN", { month: "long", year: "numeric" });

  function doPrint() {
    const w = window.open("", "_blank");
    w.document.write(`<html><head><title>Payslip - ${emp?.name} - ${monthName}</title>
    <style>body{font-family:Arial;background:#fff;color:#000;padding:32px}
    table{width:100%;border-collapse:collapse;margin-top:16px}
    th,td{border:1px solid #ccc;padding:8px 12px;font-size:12px}
    th{background:#f5f5f5;text-align:left}
    .title{font-size:20px;font-weight:bold;text-align:center;margin-bottom:4px}
    .sub{text-align:center;color:#555;font-size:13px;margin-bottom:20px}
    .net{font-size:16px;font-weight:bold;color:#e32028}
    </style></head><body>
    <div class="title">GoBright — Payslip</div>
    <div class="sub">${monthName}</div>
    <table>
      <tr><th>Employee Name</th><td>${emp?.name}</td><th>Employee ID</th><td>${empId}</td></tr>
      <tr><th>Designation</th><td>${emp?.position}</td><th>Month</th><td>${monthName}</td></tr>
    </table>
    <table style="margin-top:16px">
      <tr><th>Earnings</th><th>Amount</th><th>Deductions</th><th>Amount</th></tr>
      <tr><td>Basic Salary</td><td>₹${base.toLocaleString("en-IN")}</td><td>Absent Deduction (${absent} days)</td><td>₹${abDeduct.toLocaleString("en-IN")}</td></tr>
      <tr><td>Bonus</td><td>₹${bonusAmt.toLocaleString("en-IN")}</td><td>Late Deduction (${latedays} days)</td><td>₹${ltDeduct.toLocaleString("en-IN")}</td></tr>
      <tr><td><strong>Total Earnings</strong></td><td><strong>₹${(base + bonusAmt).toLocaleString("en-IN")}</strong></td><td><strong>Total Deductions</strong></td><td><strong>₹${(abDeduct + ltDeduct).toLocaleString("en-IN")}</strong></td></tr>
    </table>
    <table style="margin-top:8px">
      <tr><th>Net Salary</th><td class="net">₹${net.toLocaleString("en-IN")}</td><th>Attendance Days</th><td>${present} / ${present + absent + leave}</td></tr>
    </table>
    <p style="margin-top:24px;font-size:11px;color:#888;text-align:center">This is a system-generated payslip by GoBright.</p>
    </body></html>`);
    w.document.close();
    w.print();
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl">
      <div className="mb-5">
        <h2 className="text-white font-bold text-lg">Generate Payslip</h2>
        <p className="text-[#555] text-xs mt-0.5">Preview and download payslip for any employee</p>
      </div>

      {/* Filters */}
      <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[#888] text-[10px] uppercase tracking-wider mb-1.5">Employee</label>
            <select value={empId} onChange={e => setEmpId(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors">
              {employees.map(e => <option key={e.employeeId} value={e.employeeId}>{e.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[#888] text-[10px] uppercase tracking-wider mb-1.5">Month</label>
            <input type="month" value={month} onChange={e => setMonth(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors" />
          </div>
          <div>
            <label className="block text-[#888] text-[10px] uppercase tracking-wider mb-1.5">Bonus (₹)</label>
            <input type="number" value={bonus} onChange={e => setBonus(e.target.value)} min="0"
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e32028]/60 transition-colors" />
          </div>
        </div>
      </div>

      {/* Payslip Preview */}
      {emp && (
        <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-5 mb-4" ref={printRef}>
          {/* Header */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#2a2a2a]">
            <div>
              <p className="text-white font-black text-base">GoBright</p>
              <p className="text-[#555] text-xs">Pay Slip — {monthName}</p>
            </div>
            <img src={PHOTOS[emp.employeeId]} alt="" className="w-12 h-12 rounded-xl object-cover object-top border border-[#2a2a2a]" />
          </div>

          {/* Employee info */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {[["Name", emp.name], ["Employee ID", empId], ["Designation", emp.position], ["Month", monthName]].map(([k, v]) => (
              <div key={k} className="bg-[#0d0d0d] rounded-xl p-2.5">
                <p className="text-[#555] text-[10px] uppercase tracking-wider">{k}</p>
                <p className="text-white text-xs font-semibold mt-0.5">{v}</p>
              </div>
            ))}
          </div>

          {/* Attendance summary */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            {[[present, "Present", "text-green-400"], [absent, "Absent", "text-red-400"], [leave, "Leave", "text-purple-400"], [fM(totalHrs), "Hrs Worked", "text-blue-400"]].map(([val, label, color]) => (
              <div key={label} className="bg-[#0d0d0d] rounded-xl p-2.5 text-center">
                <p className={`text-sm font-black ${color}`}>{val}</p>
                <p className="text-[#555] text-[10px] mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Earnings & Deductions */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="text-[#555] text-[10px] uppercase tracking-wider mb-2 font-semibold">Earnings</p>
              <div className="space-y-1.5">
                {[["Basic Salary", `₹${base.toLocaleString("en-IN")}`], ["Bonus", `₹${bonusAmt.toLocaleString("en-IN")}`]].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs">
                    <span className="text-[#888]">{k}</span>
                    <span className="text-green-400 font-semibold">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs border-t border-[#2a2a2a] pt-1.5 mt-1.5">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-green-400 font-bold">₹{(base + bonusAmt).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#555] text-[10px] uppercase tracking-wider mb-2 font-semibold">Deductions</p>
              <div className="space-y-1.5">
                {[["Absent (" + absent + " days)", `₹${abDeduct.toLocaleString("en-IN")}`], ["Late (" + latedays + " days)", `₹${ltDeduct.toLocaleString("en-IN")}`]].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs">
                    <span className="text-[#888]">{k}</span>
                    <span className="text-red-400 font-semibold">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs border-t border-[#2a2a2a] pt-1.5 mt-1.5">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-red-400 font-bold">₹{(abDeduct + ltDeduct).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net salary */}
          <div className="bg-gradient-to-r from-[#e32028]/20 to-[#c41d23]/10 border border-[#e32028]/30 rounded-2xl p-4 flex items-center justify-between">
            <p className="text-white font-bold">Net Salary Payable</p>
            <p className="text-[#e32028] text-xl font-black">₹{net.toLocaleString("en-IN")}</p>
          </div>
        </div>
      )}

      <button onClick={doPrint}
        className="w-full py-3 rounded-2xl bg-[#e32028] hover:bg-[#c41d23] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
        Download / Print Payslip
      </button>
    </div>
  );
}
