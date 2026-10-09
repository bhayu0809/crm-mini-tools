import { useState } from 'react';
import { ViewType, Contact, Deal, Activity } from './types';
import { initialContacts, initialDeals, initialActivities } from './data';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Contacts from './components/Contacts';
import Pipeline from './components/Pipeline';
import Activities from './components/Activities';
import Flow from './components/Flow';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  // Contact handlers
  const handleAddContact = (contactData: Omit<Contact, 'id' | 'createdAt' | 'lastContact'>) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
    };
    setContacts([...contacts, newContact]);
  };

  const handleUpdateContactStatus = (id: string, status: Contact['status']) => {
    setContacts(contacts.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  // Deal handlers
  const handleUpdateDealStage = (id: string, stage: Deal['stage']) => {
    setDeals(
      deals.map((d) => {
        if (d.id === id) {
          const probabilityMap: Record<Deal['stage'], number> = {
            lead: 20,
            qualified: 40,
            proposal: 60,
            negotiation: 80,
            'closed-won': 100,
            'closed-lost': 0,
          };
          return { ...d, stage, probability: probabilityMap[stage] };
        }
        return d;
      })
    );
  };

  // Activity handlers
  const handleToggleActivity = (id: string) => {
    setActivities(activities.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a)));
  };

  const handleAddActivity = (activityData: Omit<Activity, 'id' | 'createdAt'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setActivities([...activities, newActivity]);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard contacts={contacts} deals={deals} activities={activities} />;
      case 'contacts':
        return (
          <Contacts
            contacts={contacts}
            onAddContact={handleAddContact}
            onUpdateStatus={handleUpdateContactStatus}
          />
        );
      case 'pipeline':
        return <Pipeline deals={deals} onUpdateStage={handleUpdateDealStage} />;
      case 'activities':
        return (
          <Activities
            activities={activities}
            onToggleComplete={handleToggleActivity}
            onAddActivity={handleAddActivity}
          />
        );
      case 'flow':
        return <Flow />;
      default:
        return <Dashboard contacts={contacts} deals={deals} activities={activities} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-60'
        } p-6 lg:p-8`}
      >
        {renderView()}
      </main>
    </div>
  );
}
