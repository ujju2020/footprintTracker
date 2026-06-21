import { useState } from 'react';
import ScoreCard from './ScoreCard';
import CategoryChart from './CategoryChart';
import LogActivityModal from './LogActivityModal';
import { Plus, Award } from 'lucide-react';
import DOMPurify from 'dompurify';
import './Dashboard.css';

const Dashboard = ({ userName, score, categoryBreakdown, recentActivities = [], onLogActivity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userName) }} />!</h1>
          <p>Here is your environmental impact at a glance.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Log Activity
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="main-col">
          <ScoreCard score={score} previousScore={score + 0.6} />
          
          <div className="recent-activities glass-panel">
            <h3>Recent Activities</h3>
            <div className="activity-list">
              {recentActivities.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No activities logged yet.</p>
              ) : (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>{activity.icon}</div>
                    <div className="activity-details">
                      <h4>{activity.title}</h4>
                      <span>{activity.desc}</span>
                    </div>
                    <div className="activity-impact positive">{activity.impact} kg CO₂e</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="side-col">
          <CategoryChart data={categoryBreakdown} />
          
          <div className="badges-panel glass-panel">
            <h3>Recent Badges</h3>
            <div className="badge-grid">
              <div className="badge-item">
                <div className="badge-icon gold"><Award size={24} /></div>
                <span>7 Day Streak</span>
              </div>
              <div className="badge-item">
                <div className="badge-icon green"><Award size={24} /></div>
                <span>Transit Hero</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LogActivityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLog={onLogActivity}
      />
    </>
  );
};

export default Dashboard;
