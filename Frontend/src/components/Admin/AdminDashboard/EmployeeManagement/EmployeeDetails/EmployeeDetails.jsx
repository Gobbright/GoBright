import { useOutletContext, useNavigate } from "react-router-dom";
import { PHOTOS } from "../../photos";
import { statusLabel } from "../../helpers";

const FIELD = (label, value) => (
  <div key={label} className="bg-[#0d0d0d] rounded-xl p-3">
    <p className="text-[#555] text-[10px] uppercase tracking-wider mb-1">{label}</p>
    <p className="text-white text-xs font-semibold">{value || <span className="text-[#444]">—</span>}</p>
  </div>
);

export default function EmployeeDetails() {
  const { employees, todayRecs } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-1">Employee Details</h2>
      <p className="text-[#555] text-sm mb-5">Full profile information for all employees.</p>
      <div className="space-y-4">
        {employees.map(emp => {
          const rec = todayRecs[emp.employeeId];
          const st  = rec ? statusLabel(rec) : { text: "No Data", cls: "bg-[#2a2a2a] text-[#555]" };
          return (
            <div key={emp.employeeId} className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <img src={PHOTOS[emp.employeeId]} alt="" className="w-14 h-14 rounded-2xl object-cover object-top border border-[#2a2a2a] bg-[#2a2a2a] flex-shrink-0" onError={e => { e.target.style.display = "none"; }} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{emp.name}</p>
                  <p className="text-[#e32028] text-xs font-mono">{emp.employeeId}</p>
                  <p className="text-[#555] text-xs">{emp.position}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${st.cls}`}>{st.text}</span>
                  <button onClick={() => navigate(`/admin/dashboard/employee/${emp.employeeId}`, { state: { emp } })}
                    className="text-[10px] px-3 py-1.5 bg-[#e32028]/10 border border-[#e32028]/30 text-[#e32028] rounded-lg hover:bg-[#e32028]/20 transition-colors">
                    View
                  </button>
                </div>
              </div>
              {/* Fields */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {FIELD("Employee ID",    emp.employeeId)}
                {FIELD("Full Name",      emp.name)}
                {FIELD("Designation",    emp.position)}
                {FIELD("Department",     emp.department || "—")}
                {FIELD("Mobile Number",  emp.mobile || "—")}
                {FIELD("Email",          emp.email || "—")}
                {FIELD("Joining Date",   emp.joiningDate || "—")}
                {FIELD("Salary",         emp.salary ? `₹${emp.salary}` : "—")}
                {FIELD("Address",        emp.address || "—")}
                {FIELD("Status",         emp.inactive ? "Inactive" : "Active")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
