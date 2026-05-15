import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ArrowLeft, 
  Check, 
  X, 
  Clock, 
  Send, 
  History,
  Search,
  CheckCircle2
} from 'lucide-react';
import studentsData from '../data/students.json';

const StudentAttendance = ({ onBack, monitorClass = "Y3A" }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    const myStudents = studentsData.filter(s => s.className === monitorClass);
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

  const handleSubmit = () => {
    console.log("Submitting Attendance for", monitorClass, attendance);
    setIsSubmitted(true);
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
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-800">Attendance Submitted</h2>
        <p className="text-slate-500 mt-2">Successfully recorded for {today}</p>
        <button onClick={onBack} className="mt-8 bg-[#2e5a88] text-white px-8 py-3 rounded-xl font-bold">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[#2e5a88]">
            <Users size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">{monitorClass} Roll Call</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Student Attendance</h1>
          <p className="text-slate-400 font-bold mt-1 italic">{today}</p>
        </div>

        <div className="flex gap-3">
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#2e5a88] transition-all">
            <History size={20} />
          </button>
          <button onClick={onBack} className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all text-sm">
            <ArrowLeft size={18} /> Back
          </button>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Present" count={stats.present} color="text-emerald-500" bg="bg-emerald-50" />
        <StatCard label="Absent" count={stats.absent} color="text-red-500" bg="bg-red-50" />
        <StatCard label="Late" count={stats.late} color="text-amber-500" bg="bg-amber-50" />
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text"
          placeholder="Search student name..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2e5a88]/20 transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
        <div className="divide-y divide-slate-50">
          {filteredStudents.map((student) => (
            <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-slate-50/50 transition-all gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{student.name}</h4>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">ID: {student.studentId || student.id}</p>
                </div>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-xl">
                <StatusBtn 
                  active={attendance[student.id] === 'present'} 
                  onClick={() => toggleStatus(student.id, 'present')}
                  color="bg-emerald-500"
                  icon={<Check size={14}/>}
                  label="Present"
                />
                <StatusBtn 
                  active={attendance[student.id] === 'late'} 
                  onClick={() => toggleStatus(student.id, 'late')}
                  color="bg-amber-500"
                  icon={<Clock size={14}/>}
                  label="Late"
                />
                <StatusBtn 
                  active={attendance[student.id] === 'absent'} 
                  onClick={() => toggleStatus(student.id, 'absent')}
                  color="bg-red-500"
                  icon={<X size={14}/>}
                  label="Absent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 pb-20">
        <button 
          onClick={handleSubmit}
          className="w-full bg-[#2e5a88] text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-900/20 hover:bg-[#1e3f63] hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
        >
          <Send size={18} /> Submit Attendance Report
        </button>
      </div>
    </div>
  );
};
const StatCard = ({ label, count, color, bg }) => (
  <div className={`${bg} p-4 rounded-2xl border border-white/50 text-center`}>
    <p className={`text-2xl font-black ${color}`}>{count}</p>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
  </div>
);

const StatusBtn = ({ active, onClick, color, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
      active ? `${color} text-white shadow-lg` : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {icon} {label}
  </button>
);

export default StudentAttendance;