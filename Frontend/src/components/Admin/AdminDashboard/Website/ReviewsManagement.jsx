import { useState, useEffect } from "react";

const API = import.meta.env.VITE_ATTENDANCE_API_URL || "http://localhost:5001/api";

function Stars({ count, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => onChange && onChange(n)}>
          <svg className={`w-5 h-5 transition-colors ${n <= count ? "text-[#e32028]" : "text-[#333]"}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

const BLANK = { name: "", role: "", photo: "", rating: 5, text: "" };

export default function ReviewsManagement() {
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving,  setSaving]    = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [err, setErr]           = useState("");
  const [success, setSuccess]   = useState("");
  const [form, setForm]         = useState({ ...BLANK });

  async function load() {
    setLoading(true);
    try {
      const r = await fetch(`${API}/website/review`);
      const d = await r.json();
      setReviews(d.items || []);
    } catch { setErr("Failed to load reviews."); }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function flash(msg, isErr = false) {
    if (isErr) { setErr(msg); setSuccess(""); }
    else { setSuccess(msg); setErr(""); }
    setTimeout(() => { setErr(""); setSuccess(""); }, 3000);
  }

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.name.trim()) return flash("Reviewer name is required.", true);
    if (!form.text.trim()) return flash("Review text is required.", true);
    setSaving(true);
    try {
      const r = await fetch(`${API}/website/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:   form.name.trim(),
          role:   form.role.trim(),
          photo:  form.photo.trim(),
          rating: Number(form.rating),
          text:   form.text.trim(),
        }),
      });
      const d = await r.json();
      if (d.success) { flash("Review added!"); setForm({ ...BLANK }); load(); }
      else flash(d.message || "Failed.", true);
    } catch { flash("Server error.", true); }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Remove this review?")) return;
    setDeleting(id);
    try {
      await fetch(`${API}/website/review/${id}`, { method: "DELETE" });
      flash("Review removed.");
      load();
    } catch { flash("Failed to delete.", true); }
    setDeleting(null);
  }

  const inputCls = "w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e32028] placeholder-[#333]";

  return (
    <div className="p-5 md:p-8 space-y-8 bg-[#0d0d0d] min-h-full">

      <div>
        <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest mb-1">Website Content</p>
        <h1 className="text-white font-black text-2xl">Google Reviews</h1>
        <p className="text-zinc-600 text-sm mt-1">Manage customer reviews shown on the home page</p>
      </div>

      {err     && <div className="bg-red-900/20 border border-red-800/40 rounded-xl px-4 py-3 text-red-400 text-sm">{err}</div>}
      {success && <div className="bg-green-900/20 border border-green-800/40 rounded-xl px-4 py-3 text-green-400 text-sm">{success}</div>}

      {/* Add Form */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6">
        <p className="text-white font-bold text-base mb-5">Add New Review</p>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Reviewer Name *</label>
              <input type="text" placeholder="e.g. Ramesh Kumar" value={form.name} onChange={e => set("name", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Role / Company</label>
              <input type="text" placeholder="e.g. Founder, XYZ Company" value={form.role} onChange={e => set("role", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Photo URL (optional)</label>
              <input type="url" placeholder="https://example.com/photo.jpg" value={form.photo} onChange={e => set("photo", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Rating</label>
              <div className="flex items-center gap-3 h-[46px]">
                <Stars count={form.rating} onChange={v => set("rating", v)} />
                <span className="text-zinc-500 text-sm">{form.rating}/5</span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[#888] text-xs mb-1.5 block uppercase tracking-wider">Review Text *</label>
            <textarea
              rows={3}
              placeholder="Write the review..."
              value={form.text}
              onChange={e => set("text", e.target.value)}
              className={inputCls + " resize-none"}
            />
          </div>
          <button type="submit" disabled={saving}
            className="bg-[#e32028] hover:bg-[#c41d23] disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2">
            {saving ? "Adding..." : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                </svg>
                Add Review
              </>
            )}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
          <p className="text-white font-bold text-base">All Reviews</p>
          <span className="text-xs px-2.5 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-zinc-500 font-semibold">{reviews.length} reviews</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-[#e32028] border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-zinc-500 font-medium">No reviews added yet</p>
            <p className="text-zinc-700 text-sm mt-1">Add your first review above</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1e1e1e]">
            {reviews.map(rv => (
              <div key={rv._id} className="px-6 py-5 hover:bg-[#1a1a1a] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center overflow-hidden flex-shrink-0">
                    {rv.photo ? (
                      <img src={rv.photo} alt={rv.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[#e32028] font-black text-sm">{rv.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-white font-semibold text-sm">{rv.name}</p>
                        {rv.role && <p className="text-zinc-600 text-xs mt-0.5">{rv.role}</p>}
                      </div>
                      <button
                        onClick={() => handleDelete(rv._id)}
                        disabled={deleting === rv._id}
                        className="w-8 h-8 rounded-lg bg-red-900/20 border border-red-900/30 text-red-400 hover:bg-red-900/40 transition-colors flex items-center justify-center flex-shrink-0"
                      >
                        {deleting === rv._id ? (
                          <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin"/>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className="flex gap-0.5 my-2">
                      {Array.from({ length: rv.rating || 5 }).map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-[#e32028]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{rv.text}</p>
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
