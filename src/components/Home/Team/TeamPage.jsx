import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { members } from "./Team";
import PageHeroBackdrop from "../../PageHeroBackdrop";

const API = import.meta.env.VITE_ATTENDANCE_API_URL || "http://localhost:5001/api";

function EyeIcon({ show }) {
  return show ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
    </svg>
  );
}

/* -- Password Modal -- */
function PasswordModal({ member, onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr]           = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const r = await fetch(`${API}/auth/employee-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: member.id, password }),
      });
      const d = await r.json();
      if (d.success) onSuccess(d.employee);
      else setErr(d.message || "Incorrect password.");
    } catch { setErr("Cannot connect to server."); }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 px-4 pb-6 sm:pb-0">
      <div className="w-full max-w-sm bg-[#111] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#2a2a2a]">
          <p className="text-[#555] text-xs uppercase tracking-wider">Employee Verification</p>
          <button onClick={onClose} className="text-[#555] hover:text-white text-xl transition-colors">x</button>
        </div>
        <div className="p-5">
          {/* Mini preview */}
          <div className="flex items-center gap-3 mb-5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3">
            {member.img ? (
              <img src={member.img} alt="" className="w-14 h-14 rounded-xl object-cover object-top flex-shrink-0" />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-[#2a2a2a] flex-shrink-0" />
            )}
            <div>
              <p className="text-white font-semibold text-sm">{member.name}</p>
              <p className="text-[#e32028] text-xs mt-0.5">{member.role}</p>
              <p className="text-[#555] text-xs font-mono mt-0.5">{member.id}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoFocus
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 pr-11 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333]"
                  required
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition-colors">
                  <EyeIcon show={showPass} />
                </button>
              </div>
            </div>
            {err && <p className="text-red-400 text-xs bg-red-900/20 border border-red-800/30 rounded-lg px-3 py-2">{err}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-[#e32028] hover:bg-[#c41d23] disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
              {loading ? "Verifying..." : "Verify & Go to Attendance ->"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------
   TEAM PAGE
-------------------------------------- */
export default function TeamPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  function handleSuccess(employee) {
    setSelected(null);
    navigate("/attendance", { state: { employee, photo: selected.img } });
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-x-0 top-0 h-[360px] pointer-events-none">
        <PageHeroBackdrop gridHeight="55%" imageOpacity={0.08} />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(227,32,40,0.07),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-[-20%] right-[-20%] h-[35%] pointer-events-none"
        style={{ backgroundImage:`linear-gradient(rgba(227,32,40,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(227,32,40,0.4) 1px,transparent 1px)`, backgroundSize:"50px 50px", transform:"perspective(400px) rotateX(55deg)", transformOrigin:"bottom center", opacity:0.35 }} />
      <div className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none"
        style={{ backgroundImage:"radial-gradient(circle, rgba(227,32,40,0.3) 1.5px, transparent 1.5px)", backgroundSize:"18px 18px" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
        style={{ backgroundImage:"radial-gradient(circle, rgba(227,32,40,0.3) 1.5px, transparent 1.5px)", backgroundSize:"18px 18px" }} />

      {/* Top nav */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-[#1a1a1a]">
        <button onClick={() => navigate("/")} className="text-[#555] hover:text-white text-sm transition-colors flex items-center gap-1">
          &lt;- Home
        </button>
        <p className="text-white font-semibold text-sm">GoBright Team</p>
        <Link to="/admin"
          className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#e32028] transition-colors border border-[#2a2a2a] hover:border-[#e32028]/50 px-3 py-1.5 rounded-lg">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          Admin
        </Link>
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center pt-10 pb-8 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-10 sm:w-16 h-[2px] bg-[#e32028]" />
          <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">The People</span>
          <span className="w-10 sm:w-16 h-[2px] bg-[#e32028]" />
        </div>
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
          Our <span className="text-[#e32028]">Team</span>
        </h1>
        <p className="text-[#555] text-sm mt-3">Select your profile to mark attendance</p>
      </div>

      {/* Team grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-10 md:px-16 pb-16">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6">
          {members.map((m, i) => (
            <button key={i} onClick={() => setSelected(m)}
              className="group cursor-pointer text-left">
              <div className="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover:border-[#e32028]/60 transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(227,32,40,0.25)]">
                {m.img ? (
                  <img src={m.img} alt={m.name} className="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500" />
                ) : (
                  <div className="w-full aspect-[3/4] bg-[#1e1e1e]" />
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#e32028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
              <div className="mt-2.5 text-center">
                <p className="text-white text-xs sm:text-sm font-semibold group-hover:text-[#e32028] transition-colors duration-300 leading-tight">{m.name}</p>
                <p className="text-[#888] text-[10px] sm:text-xs mt-0.5">{m.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <PasswordModal
          member={selected}
          onClose={() => setSelected(null)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
