import { useOutletContext, useNavigate } from "react-router-dom";
import { PHOTOS } from "../../photos";
import { statusLabel } from "../../helpers";

export default function EmployeeReport() {
  const { employees, todayRecs, allRecords } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-1">Employee Report</h2>
      <p className="text-[#555] text-sm mb-5">Click an employee to view their full attendance report.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {employees.map(emp => {
          const rec   = todayRecs[emp.employeeId];
          const st    = rec ? statusLabel(rec) : { text: "No Data", cls: "bg-[#2a2a2a] text-[#555]" };
          const total = allRecords.filter(r => r.employeeId === emp.employeeId).length;
          return (
            <button key={emp.employeeId}
              onClick={() => navigate(`/admin/dashboard/employee/${emp.employeeId}`, { state: { emp } })}
              className="bg-[#111] border border-[#2a2a2a] hover:border-[#e32028]/60 rounded-2xl overflow-hidden text-left transition-all group">
              <div className="w-full h-28">
                <img src={PHOTOS[emp.employeeId]} alt="" className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 bg-[#2a2a2a]" onError={e => { e.target.style.display = "none"; }} />
              </div>
              <div className="p-3">
                <p className="text-white text-xs font-bold truncate">{emp.name}</p>
                <p className="text-[#555] text-[10px]">{emp.employeeId}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${st.cls}`}>{st.text}</span>
                  <span className="text-[#555] text-[9px]">{total} records</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
