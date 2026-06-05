import { useOutletContext } from "react-router-dom";
import { PHOTOS } from "../../photos";
import { statusLabel } from "../../helpers";

export default function ViewProfile() {
  const { employees, todayRecs } = useOutletContext();

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-1">Employee Profiles</h2>
      <p className="text-[#555] text-sm mb-5">Click any employee to view full profile.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {employees.map(emp => {
          const rec = todayRecs[emp.employeeId];
          const st  = rec ? statusLabel(rec) : { text: "No Data", cls: "bg-[#2a2a2a] text-[#555]" };
          return (
            <div key={emp.employeeId} className="bg-[#111] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#e32028]/60 transition-all group cursor-pointer">
              <div className="relative w-full h-28">
                <img src={PHOTOS[emp.employeeId]} alt="" className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 bg-[#2a2a2a]" onError={e => { e.target.style.display = "none"; }} />
                <div className="absolute top-2 left-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${st.cls}`}>{st.text}</span>
                </div>
              </div>
              <div className="p-3 text-center">
                <p className="text-white text-xs font-bold truncate">{emp.name}</p>
                <p className="text-[#555] text-[10px]">{emp.employeeId}</p>
                <p className="text-[#888] text-[10px] mt-0.5 truncate">{emp.position}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
