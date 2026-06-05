import { useNavigate } from "react-router-dom";

export default function Salary() {
  const navigate = useNavigate();
  const sections = [
    { label: "Generate Payslip",  desc: "Create and download payslip for any employee",   to: "payslip", icon: "🧾", color: "border-green-800/50 hover:border-green-500/60" },
    { label: "Salary History",    desc: "View past salary records and payment history",    to: "history", icon: "📊", color: "border-blue-800/50 hover:border-blue-500/60" },
  ];

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-1">Salary / Payroll</h2>
      <p className="text-[#555] text-sm mb-5">Manage employee salaries, payslips and payroll history.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map(s => (
          <button key={s.to} onClick={() => navigate(s.to)}
            className={`bg-[#111] border ${s.color} rounded-2xl p-6 text-left transition-all hover:-translate-y-0.5`}>
            <p className="text-4xl mb-3">{s.icon}</p>
            <p className="text-white font-semibold text-sm">{s.label}</p>
            <p className="text-[#555] text-xs mt-1">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
