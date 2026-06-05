import { useOutletContext } from "react-router-dom";
import { PHOTOS } from "../../photos";

const DOC_TYPES = [
  "Aadhaar Card", "PAN Card", "Resume", "Certificates",
  "Bank Details", "Offer Letter", "Appointment Letter", "Other Documents",
];

export default function EmployeeDocuments() {
  const { employees } = useOutletContext();

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-white font-bold text-lg mb-1">Employee Documents</h2>
      <p className="text-[#555] text-sm mb-5">Manage all employee documents and files.</p>
      <div className="space-y-4">
        {employees.map(emp => (
          <div key={emp.employeeId} className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <img src={PHOTOS[emp.employeeId]} alt="" className="w-10 h-10 rounded-xl object-cover object-top bg-[#2a2a2a] flex-shrink-0" onError={e => { e.target.style.display = "none"; }} />
              <div>
                <p className="text-white font-semibold text-sm">{emp.name}</p>
                <p className="text-[#555] text-xs">{emp.employeeId} · {emp.position}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DOC_TYPES.map(doc => (
                <div key={doc} className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-3 flex flex-col items-center gap-2 text-center">
                  <svg className="w-6 h-6 text-[#444]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  <p className="text-[#555] text-[10px] leading-tight">{doc}</p>
                  <button className="text-[9px] px-2 py-1 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white transition-colors">Upload</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
