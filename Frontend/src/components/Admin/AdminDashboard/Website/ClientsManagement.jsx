import { useState, useEffect } from "react";

const API = import.meta.env.VITE_ATTENDANCE_API_URL || "http://localhost:5001/api";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      </div>
      <p className="text-zinc-500 font-medium">No clients added yet</p>
      <p className="text-zinc-700 text-sm mt-1">Add your first client below</p>
    </div>
  );
}

export default function ClientsManagement() {
  const [clients, setClients]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving,  setSaving]    = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [err, setErr]           = useState("");
  const [success, setSuccess]   = useState("");

  const [form, setForm] = useState({ name: "", logo: "" });

  async function load() {
    setLoading(true);
    try {
      const r = await fetch(`${API}/website/client`);
      const d = await r.json();
      setClients(d.items || []);
    } catch { setErr("Failed to load clients."); }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function flash(msg, isErr = false) {
    if (isErr) { setErr(msg); setSuccess(""); }
    else { setSuccess(msg); setErr(""); }
    setTimeout(() => { setErr(""); setSuccess(""); }, 3000);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.name.trim()) return flash("Client name is required.", true);
    setSaving(true);
    try {
      const r = await fetch(`${API}/website/client`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), logo: form.logo.trim() }),
      });
      const d = await r.json();
      if (d.success) { flash("Client added!"); setForm({ name: "", logo: "" }); load(); }
      else flash(d.message || "Failed.", true);
    } catch { flash("Server error.", true); }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Remove this client?")) return;
    setDeleting(id);
    try {
      await fetch(`${API}/website/client/${id}`, { method: "DELETE" });
      flash("Client removed.");
      load();
    } catch { flash("Failed to delete.", true); }
    setDeleting(null);
  }

  return (
    <div className="p-5 md:p-8 space-y-8 bg-[#0d0d0d] min-h-full">

      {/* Header */}
      <div>
        <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest mb-1">Website Content</p>
        <h1 className="text-white font-black text-2xl">Clients Management</h1>
        <p className="text-zinc-600 text-sm mt-1">Manage client logos shown on the home page</p>
      </div>

      {/* Alert */}
      {err     && <div className="bg-red-900/20 border border-red-800/40 rounded-xl px-4 py-3 text-red-400 text-sm">{err}</div>}
      {success && <div className="bg-green-900/20 border border-green-800/40 rounded-xl px-4 py-3 text-green-400 text-sm">{success}</div>}

      {/* Add Form */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6">
        <p className="text-white font-bold text-base mb-5">Add New Client</p>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Client / Company Name *</label>
              <input
                type="text"
                placeholder="e.g. Namma Trip"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333]"
              />
            </div>
            <div>
              <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Logo Image URL (optional)</label>
              <input
                type="url"
                placeholder="https://example.com/logo.png"
                value={form.logo}
                onChange={e => setForm(f => ({ ...f, logo: e.target.value }))}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333]"
              />
            </div>
          </div>
          <button type="submit" disabled={saving}
            className="bg-[#e32028] hover:bg-[#c41d23] disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2">
            {saving ? "Adding..." : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                </svg>
                Add Client
              </>
            )}
          </button>
        </form>
      </div>

      {/* Clients List */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
          <p className="text-white font-bold text-base">All Clients</p>
          <span className="text-xs px-2.5 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-zinc-500 font-semibold">{clients.length} clients</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-[#e32028] border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : clients.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="divide-y divide-[#1e1e1e]">
            {clients.map(c => (
              <div key={c._id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#1a1a1a] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center overflow-hidden flex-shrink-0">
                  {c.logo ? (
                    <img src={c.logo} alt={c.name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <span className="text-[#e32028] font-black text-sm">{c.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">{c.name}</p>
                  {c.logo && <p className="text-zinc-600 text-xs mt-0.5 truncate">{c.logo}</p>}
                </div>
                <button
                  onClick={() => handleDelete(c._id)}
                  disabled={deleting === c._id}
                  className="w-8 h-8 rounded-lg bg-red-900/20 border border-red-900/30 text-red-400 hover:bg-red-900/40 transition-colors flex items-center justify-center flex-shrink-0"
                >
                  {deleting === c._id ? (
                    <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin"/>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
