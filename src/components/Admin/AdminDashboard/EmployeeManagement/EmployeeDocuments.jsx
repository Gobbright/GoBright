import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { PHOTOS } from "../photos";

const DOC_TYPES = [
  { key: "aadhaar",     label: "Aadhaar Card",        icon: "🪪" },
  { key: "pan",         label: "PAN Card",             icon: "💳" },
  { key: "resume",      label: "Resume / CV",          icon: "📄" },
  { key: "certificates",label: "Certificates",         icon: "🎓" },
  { key: "bank",        label: "Bank Details",         icon: "🏦" },
  { key: "offer",       label: "Offer Letter",         icon: "📬" },
  { key: "appointment", label: "Appointment Letter",   icon: "📋" },
  { key: "other",       label: "Other Documents",      icon: "📁" },
];

export default function EmployeeDocuments() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { employeeId } = useParams();
  const emp = state?.emp;
  const [uploading, setUploading] = useState(null);
  const [docs, setDocs] = useState({});

  async function handleUpload(key, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(key);
    await new Promise(r => setTimeout(r, 800));
    setDocs(prev => ({ ...prev, [key]: { name: file.name, size: (file.size / 1024).toFixed(1) + " KB", uploadedAt: new Date().toLocaleDateString("en-IN") } }));
    setUploading(null);
  }

  function handleRemove(key) {
    setDocs(prev => { const n = { ...prev }; delete n[key]; return n; });
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#555] hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-3 flex-1">
          {emp && <img src={PHOTOS[emp.employeeId]} alt="" className="w-10 h-10 rounded-xl object-cover object-top border border-[#2a2a2a]" />}
          <div>
            <h2 className="text-white font-bold text-base">{emp?.name || employeeId} — Documents</h2>
            <p className="text-[#555] text-xs">{emp?.position}</p>
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DOC_TYPES.map(doc => {
          const uploaded = docs[doc.key];
          return (
            <div key={doc.key} className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{doc.icon}</span>
                  <div>
                    <p className="text-white text-xs font-semibold">{doc.label}</p>
                    {uploaded && <p className="text-[#555] text-[10px] mt-0.5">{uploaded.name} · {uploaded.size}</p>}
                  </div>
                </div>
                {uploaded && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-900/40 text-green-400 font-semibold">Uploaded</span>
                )}
              </div>

              {uploaded ? (
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 text-[10px] font-semibold transition-colors">
                    View
                  </button>
                  <button onClick={() => handleRemove(doc.key)}
                    className="flex-1 py-2 rounded-xl bg-red-900/30 text-red-400 hover:bg-red-900/50 text-[10px] font-semibold transition-colors">
                    Remove
                  </button>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => handleUpload(doc.key, e)} />
                  <div className="flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-[#333] hover:border-[#e32028]/40 text-[#555] hover:text-white transition-colors">
                    {uploading === doc.key ? (
                      <span className="text-[10px]">Uploading…</span>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span className="text-[10px] font-semibold">Upload</span>
                      </>
                    )}
                  </div>
                </label>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[#333] text-[10px] text-center mt-4">Supported: PDF, JPG, PNG · Max 5MB per file</p>
    </div>
  );
}
