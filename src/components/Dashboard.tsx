import { Contact, Deal, Activity } from '../types';
import {
  Users,
  DollarSign,
  TrendingUp,
  Target,
  Phone,
  Mail,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface DashboardProps {
  contacts: Contact[];
  deals: Deal[];
  activities: Activity[];
}

export default function Dashboard({ contacts, deals, activities }: DashboardProps) {
  const totalRevenue = deals
    .filter((d) => d.stage === 'closed-won')
    .reduce((sum, d) => sum + d.value, 0);
  const pipelineValue = deals
    .filter((d) => !['closed-won', 'closed-lost'].includes(d.stage))
    .reduce((sum, d) => sum + d.value, 0);
  const activeDeals = deals.filter(
    (d) => !['closed-won', 'closed-lost'].includes(d.stage)
  ).length;
  const pendingTasks = activities.filter((a) => !a.completed).length;

  const recentActivities = [...activities]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const topDeals = [...deals]
    .filter((d) => !['closed-won', 'closed-lost'].includes(d.stage))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  const stats = [
    {
      label: 'Total Contacts',
      value: contacts.length,
      icon: <Users size={20} />,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      up: true,
    },
    {
      label: 'Revenue Won',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <DollarSign size={20} />,
      color: 'from-emerald-500 to-emerald-600',
      change: '+8%',
      up: true,
    },
    {
      label: 'Pipeline Value',
      value: `$${pipelineValue.toLocaleString()}`,
      icon: <TrendingUp size={20} />,
      color: 'from-purple-500 to-purple-600',
      change: '+23%',
      up: true,
    },
    {
      label: 'Active Deals',
      value: activeDeals,
      icon: <Target size={20} />,
      color: 'from-amber-500 to-orange-500',
      change: '-2',
      up: false,
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone size={14} className="text-green-500" />;
      case 'email':
        return <Mail size={14} className="text-blue-500" />;
      case 'meeting':
        return <Calendar size={14} className="text-purple-500" />;
      default:
        return <Target size={14} className="text-slate-500" />;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'lead':
        return 'bg-slate-100 text-slate-700';
      case 'qualified':
        return 'bg-blue-100 text-blue-700';
      case 'proposal':
        return 'bg-purple-100 text-purple-700';
      case 'negotiation':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's your CRM overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}
              >
                {stat.icon}
              </div>
              <span
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  stat.up ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Deals */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Top Deals in Pipeline</h2>
          <div className="space-y-3">
            {topDeals.map((deal) => (
              <div
                key={deal.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {deal.contactName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{deal.title}</p>
                    <p className="text-xs text-slate-500">{deal.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStageColor(
                      deal.stage
                    )}`}
                  >
                    {deal.stage}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    ${deal.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Recent Activities</h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      activity.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                    }`}
                  >
                    {activity.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {activity.contactName} • {activity.dueDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              {pendingTasks} pending tasks
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">CRM Pipeline Health</h3>
            <p className="text-indigo-100 text-sm mt-1">
              {deals.filter((d) => d.stage === 'closed-won').length} deals won •{' '}
              {deals.filter((d) => d.stage === 'closed-lost').length} deals lost •{' '}
              {activeDeals} active
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{Math.round((deals.filter((d) => d.stage === 'closed-won').length / deals.length) * 100)}%</p>
              <p className="text-xs text-indigo-200">Win Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">${Math.round(pipelineValue / (activeDeals || 1)).toLocaleString()}</p>
              <p className="text-xs text-indigo-200">Avg Deal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
