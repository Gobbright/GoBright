import { useState, useEffect } from "react";

const API = import.meta.env.VITE_ATTENDANCE_API_URL || "http://localhost:5001/api";

const BLANK = { name: "", role: "", photo: "" };

export default function WebsiteTeam() {
  const [members, setMembers]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving,  setSaving]    = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [err, setErr]           = useState("");
  const [success, setSuccess]   = useState("");
  const [form, setForm]         = useState({ ...BLANK });
  const [editId, setEditId]     = useState(null);

  async function load() {
    setLoading(true);
    try {
      const r = await fetch(`${API}/website/team`);
      const d = await r.json();
      setMembers(d.items || []);
    } catch { setErr("Failed to load team."); }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function flash(msg, isErr = false) {
    if (isErr) { setErr(msg); setSuccess(""); }
    else { setSuccess(msg); setErr(""); }
    setTimeout(() => { setErr(""); setSuccess(""); }, 3000);
  }

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  function startEdit(m) {
    setEditId(m._id);
    setForm({ name: m.name, role: m.role || "", photo: m.photo || "" });
  }

  function cancelEdit() { setEditId(null); setForm({ ...BLANK }); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return flash("Name is required.", true);
    if (!form.role.trim()) return flash("Role is required.", true);
    setSaving(true);
    try {
      const url    = editId ? `${API}/website/team/${editId}` : `${API}/website/team`;
      const method = editId ? "PUT" : "POST";
      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), role: form.role.trim(), photo: form.photo.trim() }),
      });
      const d = await r.json();
      if (d.success) {
        flash(editId ? "Member updated!" : "Member added!");
        setForm({ ...BLANK }); setEditId(null); load();
      } else flash(d.message || "Failed.", true);
    } catch { flash("Server error.", true); }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Remove this team member?")) return;
    setDeleting(id);
    try {
      await fetch(`${API}/website/team/${id}`, { method: "DELETE" });
      flash("Member removed.");
      load();
    } catch { flash("Failed to delete.", true); }
    setDeleting(null);
  }

  const inputCls = "w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333]";

  return (
    <div className="p-5 md:p-8 space-y-8 bg-[#0d0d0d] min-h-full">

      <div>
        <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest mb-1">Website Content</p>
        <h1 className="text-white font-black text-2xl">Team Management</h1>
        <p className="text-zinc-600 text-sm mt-1">Manage team members shown on the website</p>
      </div>

      {err     && <div className="bg-red-900/20 border border-red-800/40 rounded-xl px-4 py-3 text-red-400 text-sm">{err}</div>}
      {success && <div className="bg-green-900/20 border border-green-800/40 rounded-xl px-4 py-3 text-green-400 text-sm">{success}</div>}

      {/* Add / Edit Form */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6">
        <p className="text-white font-bold text-base mb-5">{editId ? "Edit Member" : "Add New Member"}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Full Name *</label>
              <input type="text" placeholder="e.g. Mr. Ramesh Kumar" value={form.name} onChange={e => set("name", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Role / Position *</label>
              <input type="text" placeholder="e.g. Managing Director" value={form.role} onChange={e => set("role", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Photo URL (optional)</label>
            <input type="url" placeholder="https://example.com/photo.jpg" value={form.photo} onChange={e => set("photo", e.target.value)} className={inputCls} />
          </div>

          {/* Photo preview */}
          {form.photo && (
            <div className="flex items-center gap-3">
              <img src={form.photo} alt="preview" className="w-14 h-14 rounded-xl object-cover border border-[#2a2a2a]" onError={e => { e.target.style.display = "none"; }} />
              <p className="text-zinc-600 text-xs">Photo preview</p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button type="submit" disabled={saving}
              className="bg-[#e32028] hover:bg-[#c41d23] disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2">
              {saving ? (editId ? "Saving..." : "Adding...") : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editId ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"}/>
                  </svg>
                  {editId ? "Save Changes" : "Add Member"}
                </>
              )}
            </button>
            {editId && (
              <button type="button" onClick={cancelEdit}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white border border-[#2a2a2a] hover:border-[#444] transition-colors">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Team List */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
          <p className="text-white font-bold text-base">All Team Members</p>
          <span className="text-xs px-2.5 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-zinc-500 font-semibold">{members.length} members</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-[#e32028] border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : members.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-zinc-500 font-medium">No team members added yet</p>
            <p className="text-zinc-700 text-sm mt-1">Add your first team member above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {members.map(m => (
              <div key={m._id} className={`bg-[#111] border rounded-2xl overflow-hidden transition-colors ${editId === m._id ? "border-[#e32028]/50" : "border-[#2a2a2a]"}`}>
                <div className="aspect-[3/2] bg-[#1a1a1a] overflow-hidden relative">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[#e32028] font-black text-4xl">{m.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-white font-semibold text-sm">{m.name}</p>
                  <p className="text-[#e32028] text-xs mt-0.5">{m.role}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => startEdit(m)}
                      className="flex-1 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-zinc-400 hover:text-white hover:border-[#e32028]/40 text-xs font-semibold transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(m._id)} disabled={deleting === m._id}
                      className="w-8 h-8 rounded-lg bg-red-900/20 border border-red-900/30 text-red-400 hover:bg-red-900/40 transition-colors flex items-center justify-center">
                      {deleting === m._id ? (
                        <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin"/>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
