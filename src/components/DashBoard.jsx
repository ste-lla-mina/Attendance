import React, { useState } from 'react';
import { 
  Users, UserCheck, LayoutDashboard, Settings, 
  LogOut, Bell, Search, ChevronRight, GraduationCap 
} from 'lucide-react';
import LogoImg from '../assets/logo.jpg';

const Dashboard = ({ onLogout, userEmail }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-900 overflow-hidden">
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col z-20 shadow-sm">
        <div className="p-8 flex items-center gap-3">
          <div className="bg-white rounded-2xl shadow-lg p-1 border border-slate-50">
            <img src={LogoImg} alt="Logo" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-2xl font-black text-[#2e5a88] tracking-tight">ClassNet</span>
        </div>

        <nav className="flex-1 px-6 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'overview' ? 'bg-[#2e5a88] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('teachers')}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'teachers' ? 'bg-[#2e5a88] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <UserCheck size={20} /> Teacher Attendance
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'students' ? 'bg-[#2e5a88] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <GraduationCap size={20} /> Student Attendance
          </button>
        </nav>

        <div className="p-6 border-t border-slate-50">
          <button className="w-full flex items-center gap-4 px-5 py-4 text-slate-400 hover:bg-slate-50 rounded-2xl font-bold transition-all">
            <Settings size={20} /> Settings
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 bg-white border-b border-slate-100 px-10 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Search students or teachers..." 
              className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 font-bold text-sm focus:ring-2 focus:ring-[#2e5a88]/10 outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-10 w-[1px] bg-slate-100"></div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-800 leading-none">Monitor Account</p>
                <p className="text-[10px] font-bold text-[#2e5a88] uppercase mt-1 tracking-wider">{userEmail}</p>
              </div>
              <div className="w-12 h-12 bg-[#2e5a88] rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-100">
                {userEmail?.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={onLogout}
                className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-7xl mx-auto space-y-8">
            <header>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight capitalize">
                {activeTab === 'overview' ? 'Daily Dashboard' : `${activeTab} Management`}
              </h2>
              <p className="text-slate-400 font-medium">Welcome back! Here is what's happening in your class today.</p>
            </header>

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Teachers Present" value="12/14" icon={<UserCheck className="text-emerald-500"/>} color="emerald" />
                <StatCard title="Students Present" value="284/300" icon={<GraduationCap className="text-[#2e5a88]"/>} color="blue" />
                <StatCard title="Active Classes" value="8" icon={<LayoutDashboard className="text-amber-500"/>} color="amber" />
              </div>
            )}

            {activeTab === 'teachers' && <PlaceholderContent title="Teacher Attendance Interface" />}
            {activeTab === 'students' && <PlaceholderContent title="Student Attendance Interface" />}
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="space-y-1">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</p>
      <p className="text-3xl font-black text-slate-900">{value}</p>
    </div>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
  </div>
);

const PlaceholderContent = ({ title }) => (
  <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
    <Users size={48} className="mx-auto text-slate-200 mb-4" />
    <h3 className="text-slate-800 font-black text-xl">{title}</h3>
    <p className="text-slate-400 font-bold max-w-xs mx-auto mt-2">Section is ready for data integration and logic modules.</p>
  </div>
);

export default Dashboard;