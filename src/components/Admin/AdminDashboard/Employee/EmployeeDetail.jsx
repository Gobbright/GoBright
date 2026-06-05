import { useState, useEffect } from "react";
import { useParams, useLocation, useOutletContext } from "react-router-dom";
import { API, fM } from "../helpers";
import { PHOTOS } from "../photos";
import { TodayCard, RecordCard } from "../Shared";

export default function EmployeeDetail() {
  const { employeeId } = useParams();
  const { state }      = useLocation();
  const { employees, todayStr, handleDelete } = useOutletContext();

  const emp = state?.emp || employees.find(e => e.employeeId === employeeId);

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const r = await fetch(`${API}/attendance/employee/${employeeId}`);
      const d = await r.json();
      setRecords(d.records || []);
      setLoading(false);
    })();
  }, [employeeId]);

  const todayRecords = records.filter(r => r.date === todayStr);
  const histRecords  = records.filter(r => r.date !== todayStr);

  async function onDelete(recId) {
    await handleDelete(recId);
    setRecords(prev => prev.filter(r => r._id !== recId));
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <img src={PHOTOS[employeeId]} alt="" className="w-14 h-14 rounded-2xl object-cover object-top border border-[#2a2a2a]" />
        <div>
          <p className="text-white font-bold text-base">{emp?.name}</p>
          <p className="text-[#e32028] text-xs font-mono">{employeeId}</p>
          <p className="text-[#555] text-xs">{emp?.position}</p>
        </div>
      </div>

      {loading ? <p className="text-[#555] text-center py-10">Loading…</p> : (
        <>
          {todayRecords.length > 0 ? (
            <div className="mb-6">
              {todayRecords.map(rec => <TodayCard key={rec._id} rec={rec} onDelete={onDelete} />)}
            </div>
          ) : (
            <div className="mb-6 rounded-2xl border-2 border-dashed border-[#2a2a2a] px-4 py-6 text-center">
              <p className="text-[#444] text-sm">No attendance record for today</p>
            </div>
          )}

          {histRecords.length > 0 && (
            <div>
              <p className="text-[#555] text-xs uppercase tracking-wider mb-3 font-semibold">History ({histRecords.length} records)</p>
              <div className="space-y-2">
                {histRecords.map(rec => <RecordCard key={rec._id} rec={rec} onDelete={onDelete} />)}
              </div>
            </div>
          )}

          {records.length === 0 && <p className="text-[#555] text-center py-10">No records found.</p>}
        </>
      )}
    </div>
  );
}
