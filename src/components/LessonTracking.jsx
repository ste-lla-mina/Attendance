import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  User, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  ArrowLeft,
  LayoutDashboard
} from 'lucide-react';
import timetableData from '../data/timetable.json'; 
const getCurrentLesson = (timetable, monitorClass) => {
  const now = new Date();
  const currentDayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTimeStr = `${hours}:${minutes}`;

  const todayData = timetable.find(d => d.day === currentDayName);
  if (!todayData) return null;

  const activeTimeSlot = Object.keys(todayData.schedule).find(slot => {
    const [start, end] = slot.split('-'); 
    return currentTimeStr >= start && currentTimeStr <= end;
  });

  if (!activeTimeSlot) return null;

  const lessonInfo = todayData.schedule[activeTimeSlot][monitorClass];
  return lessonInfo ? { ...lessonInfo, timeSlot: activeTimeSlot } : null;
};

const LessonTracking = ({ onBack, monitorClass = "Y3A" }) => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateUI = () => {
      const lesson = getCurrentLesson(timetableData, monitorClass);
      setCurrentLesson(lesson);
      setLoading(false);
    };

    updateUI();
    const timer = setInterval(updateUI, 30000);
    return () => clearInterval(timer);
  }, [monitorClass]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2e5a88]"></div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard size={14} className="text-[#2e5a88]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Representative Portal</span>
          </div>
          <h1 className="text-3xl font-black text-[#2e5a88] tracking-tight">Lesson Tracking</h1>
        </div>

        <button 
          onClick={onBack}
          className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95 text-sm"
        >
          <ArrowLeft size={18} />
          Return to Home
        </button>
      </div>


      {currentLesson ? (
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">

          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10 relative z-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Live Session • {monitorClass}</p>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter leading-tight">
                {currentLesson.subject}
              </h2>
            </div>
            
            <div className="bg-[#2e5a88] text-white p-6 rounded-[2rem] shadow-xl shadow-blue-900/20 min-w-[180px] text-center">
              <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Current Period</p>
              <p className="text-2xl font-bold">{currentLesson.timeSlot}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 mb-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#2e5a88] shadow-sm border border-slate-100">
              <User size={30} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Instructor</p>
              <p className="text-2xl font-bold text-slate-700">{currentLesson.teacher}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="group flex items-center justify-center gap-3 bg-[#2e5a88] text-white py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-[#1e3f63] hover:shadow-xl hover:shadow-blue-900/20 transition-all active:scale-95">
              <CheckCircle size={22} className="group-hover:scale-110 transition-transform" /> 
              Teacher is Present
            </button>
            <button className="group flex items-center justify-center gap-3 bg-white text-red-500 border-2 border-red-50 py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-red-50 transition-all active:scale-95">
              <AlertCircle size={22} className="group-hover:rotate-12 transition-transform" /> 
              Teacher is Absent
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] py-24 px-10 text-center border border-slate-100 shadow-sm animate-in zoom-in-95 duration-700">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto mb-6">
            <Calendar size={48} />
          </div>
          <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">No Active Lessons</h3>
          <p className="text-slate-400 font-medium mt-2 max-w-sm mx-auto">
            The schedule for {monitorClass} shows no active periods right now. Please check back during the next lesson.
          </p>
        </div>
      )}
    </div>
  );
};

export default LessonTracking;