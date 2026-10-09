import { useState } from 'react';
import { Activity } from '../types';
import {
  Phone,
  Mail,
  Calendar,
  CheckSquare,
  StickyNote,
  Plus,
  X,
  Check,
  Clock,
} from 'lucide-react';

interface ActivitiesProps {
  activities: Activity[];
  onToggleComplete: (id: string) => void;
  onAddActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => void;
}

export default function Activities({ activities, onToggleComplete, onAddActivity }: ActivitiesProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'task' as Activity['type'],
    title: '',
    description: '',
    contactId: '',
    contactName: '',
    dueDate: '',
    completed: false,
  });

  const filtered = activities.filter((a) => {
    const matchesStatus =
      filter === 'all' ||
      (filter === 'pending' && !a.completed) ||
      (filter === 'completed' && a.completed);
    const matchesType = typeFilter === 'all' || a.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const getTypeIcon = (type: Activity['type']) => {
    switch (type) {
      case 'call':
        return <Phone size={14} className="text-green-600" />;
      case 'email':
        return <Mail size={14} className="text-blue-600" />;
      case 'meeting':
        return <Calendar size={14} className="text-purple-600" />;
      case 'task':
        return <CheckSquare size={14} className="text-amber-600" />;
      case 'note':
        return <StickyNote size={14} className="text-slate-600" />;
    }
  };

  const getTypeBg = (type: Activity['type']) => {
    switch (type) {
      case 'call':
        return 'bg-green-50 border-green-200';
      case 'email':
        return 'bg-blue-50 border-blue-200';
      case 'meeting':
        return 'bg-purple-50 border-purple-200';
      case 'task':
        return 'bg-amber-50 border-amber-200';
      case 'note':
        return 'bg-slate-50 border-slate-200';
    }
  };

  const handleAdd = () => {
    if (newActivity.title && newActivity.contactName && newActivity.dueDate) {
      onAddActivity(newActivity);
      setNewActivity({
        type: 'task',
        title: '',
        description: '',
        contactId: '',
        contactName: '',
        dueDate: '',
        completed: false,
      });
      setShowAddModal(false);
    }
  };

  const pendingCount = activities.filter((a) => !a.completed).length;
  const completedCount = activities.filter((a) => a.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Activities</h1>
          <p className="text-slate-500 mt-1">
            {pendingCount} pending • {completedCount} completed
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={16} />
          <span className="text-sm font-medium">Add Activity</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex bg-slate-100 rounded-lg p-0.5">
          {(['all', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === f
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex bg-slate-100 rounded-lg p-0.5">
          {['all', 'call', 'email', 'meeting', 'task', 'note'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                typeFilter === t
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-2">
        {filtered.map((activity) => (
          <div
            key={activity.id}
            className={`flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-sm ${
              activity.completed
                ? 'bg-slate-50 border-slate-200 opacity-60'
                : getTypeBg(activity.type)
            }`}
          >
            {/* Checkbox */}
            <button
              onClick={() => onToggleComplete(activity.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                activity.completed
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-slate-300 hover:border-indigo-400'
              }`}
            >
              {activity.completed && <Check size={12} className="text-white" />}
            </button>

            {/* Icon */}
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
              {getTypeIcon(activity.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p
                  className={`text-sm font-medium ${
                    activity.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                  }`}
                >
                  {activity.title}
                </p>
                <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
                  <Clock size={10} />
                  {activity.dueDate}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{activity.description}</p>
              <p className="text-xs text-slate-400 mt-1">
                {activity.contactName} • {activity.type}
              </p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            No activities found.
          </div>
        )}
      </div>

      {/* Add Activity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Add Activity</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-md hover:bg-slate-100 text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select
                  value={newActivity.type}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, type: e.target.value as Activity['type'] })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                >
                  <option value="task">Task</option>
                  <option value="call">Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                  <option value="note">Note</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                  placeholder="Activity title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 resize-none"
                  rows={2}
                  placeholder="Details..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact *</label>
                <input
                  type="text"
                  value={newActivity.contactName}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, contactName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                  placeholder="Contact name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Due Date *</label>
                <input
                  type="date"
                  value={newActivity.dueDate}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, dueDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
