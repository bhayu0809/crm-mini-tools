import {
  ArrowRight,
  UserPlus,
  PhoneCall,
  FileText,
  Briefcase,
  Trophy,
  RefreshCw,
  Target,
  Users,
  Mail,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function Flow() {
  const flowSteps = [
    {
      id: 1,
      title: 'Lead Generation',
      description: 'Capture new leads from various sources',
      icon: <UserPlus size={24} />,
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      details: ['Website forms', 'Social media', 'Referrals', 'Cold outreach'],
    },
    {
      id: 2,
      title: 'Qualification',
      description: 'Assess lead fit and interest level',
      icon: <Target size={24} />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      details: ['BANT analysis', 'Needs assessment', 'Budget check', 'Decision maker ID'],
    },
    {
      id: 3,
      title: 'Engagement',
      description: 'Build relationship and nurture interest',
      icon: <PhoneCall size={24} />,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      details: ['Discovery calls', 'Email sequences', 'Product demos', 'Content sharing'],
    },
    {
      id: 4,
      title: 'Proposal',
      description: 'Present solution and pricing',
      icon: <FileText size={24} />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      details: ['Custom proposals', 'Pricing options', 'ROI analysis', 'Case studies'],
    },
    {
      id: 5,
      title: 'Negotiation',
      description: 'Finalize terms and close the deal',
      icon: <Briefcase size={24} />,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      details: ['Contract review', 'Term negotiation', 'Objection handling', 'Final approval'],
    },
    {
      id: 6,
      title: 'Closed Won',
      description: 'Deal successfully closed',
      icon: <Trophy size={24} />,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      details: ['Onboarding', 'Customer success', 'Upsell opportunities', 'Referral requests'],
    },
  ];

  const feedbackLoop = {
    title: 'Feedback & Retention',
    description: 'Continuous improvement and customer retention',
    icon: <RefreshCw size={24} />,
    color: 'from-pink-500 to-rose-500',
  };

  const metrics = [
    { label: 'Avg. Lead Response Time', value: '< 5 min', icon: <Mail size={16} /> },
    { label: 'Lead to Customer Rate', value: '24%', icon: <Users size={16} /> },
    { label: 'Proposal Win Rate', value: '68%', icon: <CheckCircle2 size={16} /> },
    { label: 'Avg. Deal Cycle', value: '32 days', icon: <AlertCircle size={16} /> },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">CRM General Flow</h1>
        <p className="text-slate-500 mt-1">
          Visual representation of the customer journey from lead to loyal customer
        </p>
      </div>

      {/* Flow Diagram */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {flowSteps.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              {/* Step Card */}
              <div
                className={`${step.bgColor} border ${step.borderColor} rounded-xl p-4 w-48 text-center relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mx-auto shadow-md`}
                >
                  {step.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mt-3 text-sm">{step.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{step.description}</p>

                {/* Details tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg p-3 w-52 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <p className="text-xs font-medium text-slate-700 mb-1.5">Key Activities:</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, i) => (
                      <li key={i} className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-400" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Arrow */}
              {idx < flowSteps.length - 1 && (
                <div className="flex items-center mx-1">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400" />
                  <ArrowRight size={14} className="text-slate-400 -ml-0.5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feedback Loop */}
        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-md">
              {feedbackLoop.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{feedbackLoop.title}</p>
              <p className="text-xs text-slate-500">{feedbackLoop.description}</p>
            </div>
          </div>
        </div>

        {/* Loop back arrow */}
        <div className="flex justify-center mt-2">
          <svg width="200" height="40" viewBox="0 0 200 40" className="text-pink-300">
            <path
              d="M 180 0 C 180 30, 20 30, 20 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <polygon points="16,4 20,0 24,4" fill="currentColor" />
          </svg>
        </div>
        <p className="text-center text-xs text-slate-400 -mt-2">
          Continuous loop: Feedback informs lead generation & qualification
        </p>
      </div>

      {/* Key Metrics */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Flow Performance Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                {metric.icon}
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{metric.value}</p>
                <p className="text-xs text-slate-500">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
              <Target size={14} className="text-blue-600" />
            </span>
            Lead Qualification Criteria
          </h3>
          <ul className="space-y-2">
            {[
              'Budget: Does the prospect have budget allocated?',
              'Authority: Are we talking to the decision maker?',
              'Need: Does our solution solve their problem?',
              'Timeline: When do they need a solution?',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center">
              <RefreshCw size={14} className="text-purple-600" />
            </span>
            Best Practices
          </h3>
          <ul className="space-y-2">
            {[
              'Respond to leads within 5 minutes',
              'Personalize every communication',
              'Track all touchpoints in CRM',
              'Follow up consistently (3-5x before giving up)',
              'Use data to refine your process',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 size={14} className="text-purple-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Automation Flow */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white">
        <h3 className="font-semibold text-lg mb-4">🤖 Automation Triggers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              trigger: 'New Lead Created',
              action: 'Auto-assign to rep + Send welcome email',
            },
            {
              trigger: 'Deal moves to Proposal',
              action: 'Create follow-up task + Notify manager',
            },
            {
              trigger: 'Deal Closed Won',
              action: 'Start onboarding sequence + CS handoff',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-xs text-slate-400 mb-1">When:</p>
              <p className="text-sm font-medium text-indigo-300">{item.trigger}</p>
              <p className="text-xs text-slate-400 mt-2 mb-1">Then:</p>
              <p className="text-sm text-slate-200">{item.action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
