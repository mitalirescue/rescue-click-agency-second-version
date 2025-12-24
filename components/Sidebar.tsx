import React from 'react';
import { Icons } from './Icon';
import { TabView } from '../types';

interface SidebarProps {
  activeTab: TabView;
  onTabChange: (tab: TabView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems: { id: TabView; icon: React.ElementType; label: string }[] = [
    { id: 'chat', icon: Icons.Chat, label: 'Chat & Vision' },
    { id: 'images', icon: Icons.Image, label: 'Image Studio' },
  ];

  return (
    <div className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Icons.Sparkles className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 hidden md:block">
          Nebula
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-slate-800 text-white shadow-md shadow-slate-900/50'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-400' : 'group-hover:text-indigo-400'}`} />
            <span className="font-medium hidden md:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <p className="text-xs text-slate-500 font-medium mb-1 hidden md:block">Powered by</p>
          <div className="flex items-center gap-2">
            <Icons.Cpu className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-semibold text-slate-300 hidden md:block">Gemini 2.5 Flash</span>
          </div>
        </div>
      </div>
    </div>
  );
};
