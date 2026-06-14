import { Zap, Car, Utensils, Target, CheckCircle2, PlayCircle } from 'lucide-react';
import './Goals.css';

const GOALS_LIBRARY = [
  { id: 'g1', title: 'Cycle Commuter', desc: 'Bike to work 3 days this week', impact: '-5.0 kg', icon: <Car size={24} />, category: 'Transport' },
  { id: 'g2', title: 'Transit Hero', desc: 'Take the bus for all errands', impact: '-3.2 kg', icon: <Car size={24} />, category: 'Transport' },
  { id: 'g3', title: 'Meatless Monday', desc: 'Eat 100% plant-based for a day', impact: '-4.1 kg', icon: <Utensils size={24} />, category: 'Diet' },
  { id: 'g4', title: 'Local Eater', desc: 'Buy groceries from a local market', impact: '-1.5 kg', icon: <Utensils size={24} />, category: 'Diet' },
  { id: 'g5', title: 'Unplugged Night', desc: 'Turn off all screens after 8 PM', impact: '-0.8 kg', icon: <Zap size={24} />, category: 'Home Energy' },
  { id: 'g6', title: 'Cold Wash', desc: 'Wash all laundry in cold water', impact: '-1.2 kg', icon: <Zap size={24} />, category: 'Home Energy' },
];

const Goals = ({ categoryBreakdown, activeGoals, toggleGoal }) => {
  // Find the highest emission category
  const highestCategory = categoryBreakdown && categoryBreakdown.length > 0 
    ? categoryBreakdown.reduce((prev, current) => (prev.value > current.value) ? prev : current)
    : { name: 'Unknown', value: 0 };

  const getRecommendation = () => {
    switch (highestCategory.name) {
      case 'Transport':
        return "We noticed Transport makes up the largest part of your footprint. Try our 'Cycle Commuter' challenge to make a big dent!";
      case 'Diet':
        return "Diet is your highest emission area. Taking on 'Meatless Monday' could significantly lower your score.";
      case 'Home Energy':
        return "Home Energy is currently your biggest impact. The 'Cold Wash' goal is an easy way to start reducing it.";
      default:
        return "Ready to reduce your footprint? Pick a goal below to get started!";
    }
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h1>Your Goals</h1>
        <p>Take on challenges to actively lower your carbon score.</p>
      </div>

      <div className="insight-banner glass-panel">
        <div className="insight-icon">
          <Target size={32} />
        </div>
        <div className="insight-content">
          <h3>Personalized Insight</h3>
          <p>{getRecommendation()}</p>
        </div>
      </div>

      <h2 className="section-title">Goal Library</h2>
      
      <div className="goals-grid">
        {GOALS_LIBRARY.map(goal => {
          const isActive = activeGoals.includes(goal.id);
          
          return (
            <div key={goal.id} className={`goal-card glass-panel ${isActive ? 'active-border' : ''}`}>
              <div className="goal-card-header">
                <div className={`goal-icon ${goal.category.toLowerCase().replace(' ', '-')}`}>
                  {goal.icon}
                </div>
                {isActive && <span className="active-badge"><CheckCircle2 size={14}/> Active</span>}
              </div>
              
              <div className="goal-card-body">
                <h3>{goal.title}</h3>
                <p>{goal.desc}</p>
                <span className="goal-impact text-gradient">Est. Impact: {goal.impact} CO₂e</span>
              </div>
              
              <div className="goal-card-footer">
                <button 
                  className={isActive ? 'btn-secondary' : 'btn-primary'}
                  onClick={() => toggleGoal(goal.id)}
                  style={{ width: '100%' }}
                >
                  {isActive ? 'Abandon Goal' : <><PlayCircle size={18} /> Start Goal</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;
