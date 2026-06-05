import { useState, useEffect } from "react";
import logo from "../../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";

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

export default function AdminPage() {
  const navigate = useNavigate();
  const [name,    setName]    = useState("");
  const [pass,    setPass]    = useState("");
  const [showP,   setShowP]   = useState(false);
  const [err,     setErr]     = useState("");
  const [loading, setLoading] = useState(false);

  // if already logged in, go straight to dashboard
  useEffect(() => {
    if (sessionStorage.getItem("gb_admin") === "1") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const r = await fetch(`${API}/auth/owner-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), password: pass }),
      });
      const d = await r.json();
      if (d.success) {
        sessionStorage.setItem("gb_admin", "1");
        navigate("/admin/dashboard", { replace: true });
      } else {
        setErr(d.message || "Invalid credentials.");
      }
    } catch {
      setErr("Cannot connect to server.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(227,32,40,0.07),transparent_60%)] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={logo} alt="GoBright" className="h-14 mx-auto mb-4 object-contain" />
          <h1 className="text-white text-2xl font-bold">Admin Login</h1>
          <p className="text-[#555] text-sm mt-1">GoBright Attendance</p>
        </div>

        <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-6 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Name</label>
              <input type="text" placeholder="Admin name" value={name}
                onChange={e => setName(e.target.value)} autoComplete="off"
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333]"
                required />
            </div>
            <div>
              <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Password</label>
              <div className="relative">
                <input type={showP ? "text" : "password"} placeholder="Admin password" value={pass}
                  onChange={e => setPass(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 pr-11 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333]"
                  required />
                <button type="button" onClick={() => setShowP(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition-colors">
                  <EyeIcon show={showP} />
                </button>
              </div>
            </div>
            {err && (
              <div className="bg-red-900/20 border border-red-800/40 rounded-xl px-4 py-2.5">
                <p className="text-red-400 text-xs">{err}</p>
              </div>
            )}
            <button type="submit" disabled={loading}
              className="w-full bg-[#e32028] hover:bg-[#c41d23] disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
              {loading ? "Verifying…" : "Login"}
            </button>
          </form>
        </div>

        <div className="mt-4 text-center">
          <button onClick={() => navigate("/")} className="text-[#555] hover:text-white text-xs transition-colors">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
