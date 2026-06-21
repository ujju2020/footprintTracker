import { X, Bike, Trees, Utensils, Zap, ShoppingBag } from 'lucide-react';
import './LogActivityModal.css';

const presetActivities = [
  { title: 'Biked to Work', desc: 'Commute without car', impact: -2.5, icon: <Bike size={24} />, type: 'transit' },
  { title: 'Planted a Tree', desc: 'Carbon offset', impact: -5.0, icon: <Trees size={24} />, type: 'nature' },
  { title: 'Vegan Meal', desc: 'Dinner', impact: -1.2, icon: <Utensils size={24} />, type: 'diet' },
  { title: 'Line Dried Clothes', desc: 'Saved energy', impact: -0.8, icon: <Zap size={24} />, type: 'energy' },
  { title: 'Used Reusable Bag', desc: 'Grocery run', impact: -0.2, icon: <ShoppingBag size={24} />, type: 'shopping' },
];

const LogActivityModal = ({ isOpen, onClose, onLog }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Log Activity</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <p className="modal-subtitle">Select an eco-friendly action you took today:</p>
        
        <div className="activity-grid">
          {presetActivities.map((activity, idx) => (
            <button 
              key={idx} 
              className="activity-card"
              onClick={() => {
                onLog({
                  title: activity.title,
                  desc: activity.desc,
                  impact: activity.impact,
                  icon: activity.type === 'transit' ? '🚲' : 
                        activity.type === 'nature' ? '🌲' :
                        activity.type === 'diet' ? '🥗' :
                        activity.type === 'energy' ? '⚡' : '🛍️',
                  type: activity.type
                });
                onClose();
              }}
            >
              <div className={`modal-activity-icon ${activity.type}`}>{activity.icon}</div>
              <div className="modal-activity-details">
                <h4>{activity.title}</h4>
                <span className="impact-text">{activity.impact} kg CO₂e</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogActivityModal;
