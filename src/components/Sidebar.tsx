import { ViewType } from '../types';
import {
  LayoutDashboard,
  Users,
  GitBranch,
  ListChecks,
  Workflow,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems: { view: ViewType; label: string; icon: React.ReactNode }[] = [
  { view: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { view: 'contacts', label: 'Contacts', icon: <Users size={20} /> },
  { view: 'pipeline', label: 'Pipeline', icon: <GitBranch size={20} /> },
  { view: 'activities', label: 'Activities', icon: <ListChecks size={20} /> },
  { view: 'flow', label: 'CRM Flow', icon: <Workflow size={20} /> },
];

export default function Sidebar({ currentView, onViewChange, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-50 flex flex-col ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-700/50">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm shrink-0">
          C
        </div>
        {!collapsed && (
          <span className="font-semibold text-lg tracking-tight whitespace-nowrap">
            CRM Mini
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left ${
              currentView === item.view
                ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            title={collapsed ? item.label : undefined}
          >
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="px-2 pb-4">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
