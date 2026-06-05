export const API = import.meta.env.VITE_ATTENDANCE_API_URL || "http://localhost:5001/api";

function fS(d, o) {
  if (!d) return "--";
  return new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", ...o });
}
export const fT = (d) => fS(d, { hour: "2-digit", minute: "2-digit", hour12: true });
export const fD = (s) => {
  if (!s) return "--";
  const [y, m, dy] = s.split("-");
  return new Date(Number(y), Number(m) - 1, Number(dy)).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};
export function fM(m) {
  if (!m || m <= 0) return "0m";
  const h = Math.floor(m / 60);
  const mn = Math.round(m % 60);
  return h > 0 ? `${h}h ${mn}m` : `${mn}m`;
}
export function workMins(rec) {
  if (!rec?.inTime || !rec?.outTime) return 0;
  return Math.max(0, Math.round((new Date(rec.outTime) - new Date(rec.inTime)) / 60000 - (rec.totalBreakMinutes || 0)));
}
export function durationMins(a, b) {
  if (!a || !b) return 0;
  return Math.max(0, Math.round((new Date(b) - new Date(a)) / 60000));
}
export function statusLabel(rec) {
  if (rec.isLeave)  return { text: "Leave",   cls: "bg-purple-900/40 text-purple-400" };
  if (rec.isAbsent) return { text: "Absent",  cls: "bg-red-900/40 text-red-400" };
  if (!rec.inTime)  return { text: "No Data", cls: "bg-[#2a2a2a] text-[#555]" };
  if (!rec.outTime) return { text: "Active",  cls: "bg-green-900/40 text-green-400" };
  return { text: "Present", cls: "bg-blue-900/40 text-blue-400" };
}
export function exportCSV(records, filename) {
  const hdr = ["Date","Employee ID","Name","Position","In Time","Break (min)","Out Time","Work Hours","Field In","Field Out","Field Total","Shoot In","Shoot Out","Shoot Total","Status"];
  const rows = records.map(r => [
    r.date, r.employeeId, r.employeeName, r.position,
    fT(r.inTime), r.totalBreakMinutes || 0, fT(r.outTime), fM(workMins(r)),
    fT(r.fieldWorkInTime), fT(r.fieldWorkOutTime), fM(durationMins(r.fieldWorkInTime, r.fieldWorkOutTime)),
    fT(r.shootWorkInTime), fT(r.shootWorkOutTime), fM(durationMins(r.shootWorkInTime, r.shootWorkOutTime)),
    r.isLeave ? "Leave" : r.isAbsent ? "Absent" : r.inTime ? "Present" : "No Data",
  ]);
  const csv = [hdr, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = filename + ".csv";
  a.click();
}
