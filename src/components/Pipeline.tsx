import { Deal } from '../types';
import { DollarSign, Calendar, ArrowRight } from 'lucide-react';

interface PipelineProps {
  deals: Deal[];
  onUpdateStage: (id: string, stage: Deal['stage']) => void;
}

const stages: { key: Deal['stage']; label: string; color: string }[] = [
  { key: 'lead', label: 'Lead', color: 'bg-slate-500' },
  { key: 'qualified', label: 'Qualified', color: 'bg-blue-500' },
  { key: 'proposal', label: 'Proposal', color: 'bg-purple-500' },
  { key: 'negotiation', label: 'Negotiation', color: 'bg-amber-500' },
  { key: 'closed-won', label: 'Won', color: 'bg-emerald-500' },
  { key: 'closed-lost', label: 'Lost', color: 'bg-red-500' },
];

export default function Pipeline({ deals, onUpdateStage }: PipelineProps) {
  const getDealsByStage = (stage: Deal['stage']) =>
    deals.filter((d) => d.stage === stage);

  const getStageTotal = (stage: Deal['stage']) =>
    getDealsByStage(stage).reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Deal Pipeline</h1>
        <p className="text-slate-500 mt-1">
          {deals.filter((d) => !['closed-won', 'closed-lost'].includes(d.stage)).length} active
          deals worth $
          {deals
            .filter((d) => !['closed-won', 'closed-lost'].includes(d.stage))
            .reduce((sum, d) => sum + d.value, 0)
            .toLocaleString()}
        </p>
      </div>

      {/* Pipeline Stages */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {stages.map((stage, stageIdx) => {
          const stageDeals = getDealsByStage(stage.key);
          return (
            <div key={stage.key} className="min-w-[240px] flex-1">
              {/* Stage Header */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                <h3 className="text-sm font-semibold text-slate-700">{stage.label}</h3>
                <span className="text-xs text-slate-400 ml-auto">
                  {stageDeals.length} • ${getStageTotal(stage.key).toLocaleString()}
                </span>
              </div>

              {/* Deals */}
              <div className="space-y-2">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {deal.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{deal.contactName}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="flex items-center gap-1 text-sm font-semibold text-slate-900">
                        <DollarSign size={12} />
                        {deal.value.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar size={10} />
                        {deal.expectedClose}
                      </span>
                    </div>
                    {/* Probability bar */}
                    <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${stage.color} opacity-70`}
                        style={{ width: `${deal.probability}%` }}
                      />
                    </div>

                    {/* Move actions */}
                    {stageIdx < stages.length - 1 && (
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] text-slate-400">Move to:</span>
                        <div className="flex gap-1">
                          {stageIdx < 4 && (
                            <button
                              onClick={() => onUpdateStage(deal.id, stages[stageIdx + 1].key)}
                              className="flex items-center gap-0.5 text-[10px] text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                              {stages[stageIdx + 1].label}
                              <ArrowRight size={10} />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {stageDeals.length === 0 && (
                  <div className="text-center py-6 text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                    No deals
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
