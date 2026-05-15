import React, { useState, useEffect } from 'react';
import { Clock, User, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
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

const LessonTracking = ({ monitorClass = "Y3A" }) => {
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

  if (loading) return <div className="p-10 text-center font-bold text-slate-400">Loading Timetable...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {currentLesson ? (
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-blue-900/5 border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Live Session • {monitorClass}</p>
              </div>
              <h2 className="text-5xl font-black text-slate-800 tracking-tighter leading-tight">
                {currentLesson.subject}
              </h2>
            </div>
            
            <div className="bg-[#2e5a88] text-white p-6 rounded-[2rem] shadow-xl shadow-blue-900/20 min-w-[160px] text-center">
              <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Period</p>
              <p className="text-xl font-bold">{currentLesson.timeSlot}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 mb-10">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#2e5a88] shadow-sm">
              <User size={28} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Instructor</p>
              <p className="text-2xl font-bold text-slate-700">{currentLesson.teacher}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="group flex items-center justify-center gap-3 bg-[#2e5a88] text-white py-6 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-[#1e3f63] hover:shadow-lg transition-all active:scale-95">
              <CheckCircle size={20} className="group-hover:scale-110 transition-transform" /> 
              Confirm Presence
            </button>
            <button className="group flex items-center justify-center gap-3 bg-white text-red-500 border-2 border-red-50 py-6 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-red-50 transition-all active:scale-95">
              <AlertCircle size={20} className="group-hover:shake transition-transform" /> 
              Report Absence
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-[3rem] py-20 px-10 text-center border-2 border-dashed border-slate-200 animate-in fade-in duration-700">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6 shadow-sm">
            <Calendar size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">No Active Lessons</h3>
          <p className="text-slate-400 font-medium mt-2">There is nothing scheduled for {monitorClass} at this time.</p>
        </div>
      )}
    </div>
  );
};

export default LessonTracking;