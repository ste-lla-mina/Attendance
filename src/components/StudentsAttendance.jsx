import React, { useState, useEffect } from 'react';
import { 
  Users, ArrowLeft, Check, X, Clock, Send, History, Search, CheckCircle2 
} from 'lucide-react';
import studentsData from '../data/students.json';

const StudentAttendance = ({ onBack, monitorClass = "Y1A" }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  useEffect(() => {
    const myStudents = studentsData.filter(s => s.class === monitorClass);
    
    setStudents(myStudents);

    const initialStatus = {};
    myStudents.forEach(s => {
      initialStatus[s.id] = 'present';
    });
    setAttendance(initialStatus);
  }, [monitorClass]);

  const toggleStatus = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    present: Object.values(attendance).filter(v => v === 'present').length,
    absent: Object.values(attendance).filter(v => v === 'absent').length,
    late: Object.values(attendance).filter(v => v === 'late').length,
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in-95">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-800">Attendance Sent!</h2>
        <p className="text-slate-500">Record saved for {monitorClass}</p>
        <button onClick={onBack} className="mt-6 bg-[#2e5a88] text-white px-8 py-3 rounded-xl font-bold">Return Home</button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Attendance</h1>
          <div className="flex items-center gap-3 mt-1 text-slate-400 font-bold italic">
            <span>{today}</span>
            <span className="text-[#2e5a88] not-italic">— Class {monitorClass}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <History size={18} /> {showHistory ? "Close History" : "View History"}
          </button>
          <button onClick={onBack} className="flex items-center gap-2 bg-[#2e5a88] text-white px-5 py-3 rounded-2xl font-bold hover:bg-[#1e3f63] transition-all shadow-lg">
            <ArrowLeft size={18} /> Back
          </button>
        </div>
      </div>

      {showHistory ? (
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 text-center animate-in slide-in-from-right-4">
          <History size={48} className="mx-auto text-slate-200 mb-4" />
          <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">No Recent History</h3>
          <p className="text-slate-400 mt-2">Previous attendance reports will appear here.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-center">
              <p className="text-2xl font-black text-emerald-600">{stats.present}</p>
              <p className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest">Present</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-center">
              <p className="text-2xl font-black text-amber-600">{stats.late}</p>
              <p className="text-[10px] font-black text-amber-600/60 uppercase tracking-widest">Late</p>
            </div>
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-center">
              <p className="text-2xl font-black text-red-600">{stats.absent}</p>
              <p className="text-[10px] font-black text-red-600/60 uppercase tracking-widest">Absent</p>
            </div>
          </div>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" placeholder="Find a student..."
              className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2e5a88]/10 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden mb-10">
            <div className="divide-y divide-slate-50">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 hover:bg-slate-50/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#2e5a88] text-white rounded-full flex items-center justify-center font-black text-xs">
                      {student.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <h4 className="font-bold text-slate-700 text-lg">{student.name}</h4>
                  </div>

                  <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                    <StatusBtn active={attendance[student.id] === 'present'} onClick={() => toggleStatus(student.id, 'present')} color="bg-emerald-500" label="P" />
                    <StatusBtn active={attendance[student.id] === 'late'} onClick={() => toggleStatus(student.id, 'late')} color="bg-amber-500" label="L" />
                    <StatusBtn active={attendance[student.id] === 'absent'} onClick={() => toggleStatus(student.id, 'absent')} color="bg-red-500" label="A" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setIsSubmitted(true)}
            className="w-full bg-[#2e5a88] text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-xl shadow-blue-900/20 hover:bg-[#1e3f63] hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
          >
            <Send size={18} /> Submit Attendance
          </button>
        </>
      )}
    </div>
  );
};

const StatusBtn = ({ active, onClick, color, label }) => (
  <button 
    onClick={onClick}
    className={`w-12 h-10 rounded-lg font-black transition-all ${
      active ? `${color} text-white shadow-md` : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {label}
  </button>
);

export default StudentAttendance;