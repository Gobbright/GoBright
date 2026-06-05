import { useState } from "react";
import { fT, fM, workMins, durationMins, statusLabel } from "./helpers";

/* ── Confirm Delete Modal ── */
export function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-xs bg-[#161616] border border-red-800/50 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-5 py-5 text-center">
          <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </div>
          <p className="text-white font-semibold">Delete Record?</p>
          <p className="text-[#888] text-sm mt-1">This cannot be undone.</p>
        </div>
        <div className="grid grid-cols-2 border-t border-[#2a2a2a]">
          <button onClick={onCancel}  className="py-3.5 text-[#888] hover:text-white text-sm font-medium border-r border-[#2a2a2a] transition-colors">Cancel</button>
          <button onClick={onConfirm} className="py-3.5 text-red-400 hover:bg-red-900/30 text-sm font-bold transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ── Field / Shoot block ── */
export function WorkBlock({ label, inTime, outTime }) {
  const total = durationMins(inTime, outTime);
  return (
    <div className="bg-[#0d0d0d] rounded-xl p-3">
      <p className="text-[#555] text-[10px] uppercase tracking-wider mb-2 font-semibold">{label}</p>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[#555]">In</span>
        <span className="text-green-400 font-semibold">{fT(inTime)}</span>
      </div>
      <div className="flex justify-between text-xs mb-2">
        <span className="text-[#555]">Out</span>
        <span className="text-blue-400 font-semibold">{outTime ? fT(outTime) : <span className="text-yellow-400">In Progress</span>}</span>
      </div>
      {total > 0 && (
        <div className="bg-[#e32028]/10 border border-[#e32028]/30 rounded-lg px-2 py-1 text-center">
          <span className="text-[#e32028] text-xs font-bold">{fM(total)}</span>
        </div>
      )}
    </div>
  );
}

/* ── Today Card ── */
export function TodayCard({ rec, onDelete }) {
  const [showDel, setShowDel] = useState(false);
  const st = statusLabel(rec);
  const wm = workMins(rec);
  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-[#e32028]/60 bg-gradient-to-b from-[#e32028]/10 to-[#1a1a1a]">
      <div className="bg-[#e32028] px-4 py-2 flex items-center justify-between">
        <span className="text-white text-xs font-bold uppercase tracking-widest">Today</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/20 text-white">{st.text}</span>
          <button onClick={() => setShowDel(true)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/30 text-white transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        {rec.isLeave  && <p className="text-purple-400 text-center font-semibold py-4">Sunday — Leave</p>}
        {rec.isAbsent && <p className="text-red-400 text-center font-semibold py-4">Marked Absent</p>}
        {!rec.isAbsent && !rec.isLeave && (
          <>
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="bg-[#111] rounded-2xl p-3 border border-green-900/40">
                <p className="text-[#555] text-[10px] uppercase tracking-wider mb-1">In Time</p>
                <p className="text-green-400 text-base font-bold">{fT(rec.inTime)}</p>
              </div>
              <div className="bg-[#111] rounded-2xl p-3 border border-yellow-900/40">
                <p className="text-[#555] text-[10px] uppercase tracking-wider mb-1">Break</p>
                <p className="text-yellow-400 text-base font-bold">{fM(rec.totalBreakMinutes)}</p>
              </div>
              <div className="bg-[#111] rounded-2xl p-3 border border-blue-900/40">
                <p className="text-[#555] text-[10px] uppercase tracking-wider mb-1">Out Time</p>
                <p className="text-blue-400 text-base font-bold">{rec.outTime ? fT(rec.outTime) : "--"}</p>
              </div>
            </div>
            {rec.inTime && (
              <div className="bg-[#e32028]/15 border border-[#e32028]/40 rounded-2xl px-5 py-4 flex items-center justify-between mb-4">
                <span className="text-[#e32028] font-bold text-sm">Total Work Hours</span>
                <span className="text-white text-2xl font-black">{fM(wm)}</span>
              </div>
            )}
            {(rec.fieldWorkInTime || rec.shootWorkInTime) && (
              <div className="grid grid-cols-2 gap-3">
                {rec.fieldWorkInTime  && <WorkBlock label="Field Work" inTime={rec.fieldWorkInTime}  outTime={rec.fieldWorkOutTime} />}
                {rec.shootWorkInTime  && <WorkBlock label="Shoot Work" inTime={rec.shootWorkInTime}  outTime={rec.shootWorkOutTime} />}
              </div>
            )}
          </>
        )}
      </div>
      {showDel && <DeleteModal onConfirm={() => { setShowDel(false); onDelete(rec._id); }} onCancel={() => setShowDel(false)} />}
    </div>
  );
}

const STATUS_BORDER = { Present: "border-l-blue-500", Active: "border-l-green-500", Absent: "border-l-red-500", Leave: "border-l-purple-500", "No Data": "border-l-[#333]" };

/* ── History Record Card ── */
export function RecordCard({ rec, onDelete }) {
  const [showDel, setShowDel] = useState(false);
  const st = statusLabel(rec);
  const wm = workMins(rec);
  const borderColor = STATUS_BORDER[st.text] || "border-l-[#333]";
  return (
    <div className={`bg-[#1a1a1a] border border-[#2a2a2a] border-l-4 ${borderColor} rounded-2xl p-4 relative`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-white text-sm font-bold">{fT(rec.date)}</p>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${st.cls}`}>{st.text}</span>
          <button onClick={() => setShowDel(true)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
      {!rec.isAbsent && !rec.isLeave && (
        <>
          <div className="grid grid-cols-3 gap-2 text-center mb-3">
            <div className="bg-[#111] rounded-xl p-2.5"><p className="text-[#555] text-[10px] mb-1">In</p><p className="text-green-400 text-xs font-bold">{fT(rec.inTime)}</p></div>
            <div className="bg-[#111] rounded-xl p-2.5"><p className="text-[#555] text-[10px] mb-1">Break</p><p className="text-yellow-400 text-xs font-bold">{fM(rec.totalBreakMinutes)}</p></div>
            <div className="bg-[#111] rounded-xl p-2.5"><p className="text-[#555] text-[10px] mb-1">Out</p><p className="text-blue-400 text-xs font-bold">{fT(rec.outTime)}</p></div>
          </div>
          {rec.inTime && rec.outTime && (
            <div className="flex items-center justify-between bg-[#111] rounded-xl px-3 py-2 mb-3">
              <span className="text-[#555] text-xs">Work Hours</span>
              <span className="text-white text-sm font-bold">{fM(wm)}</span>
            </div>
          )}
          {(rec.fieldWorkInTime || rec.shootWorkInTime) && (
            <div className="grid grid-cols-2 gap-2">
              {rec.fieldWorkInTime && <WorkBlock label="Field Work" inTime={rec.fieldWorkInTime} outTime={rec.fieldWorkOutTime} />}
              {rec.shootWorkInTime && <WorkBlock label="Shoot Work" inTime={rec.shootWorkInTime} outTime={rec.shootWorkOutTime} />}
            </div>
          )}
        </>
      )}
      {showDel && <DeleteModal onConfirm={() => { setShowDel(false); onDelete(rec._id); }} onCancel={() => setShowDel(false)} />}
    </div>
  );
}

/* ── View Header ── */
export function ViewHeader({ title, count, color = "text-white", onExport }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-white font-bold text-lg">{title}</h2>
        <p className={`text-sm font-semibold ${color}`}>{count} records</p>
      </div>
      {onExport && (
        <button onClick={onExport} className="flex items-center gap-1.5 px-4 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3"/></svg>
          Export CSV
        </button>
      )}
    </div>
  );
}
