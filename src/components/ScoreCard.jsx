import { ArrowDown, TrendingDown } from 'lucide-react';
import './ScoreCard.css';

const ScoreCard = ({ score = 4.2, previousScore = 4.8 }) => {
  const reduction = ((previousScore - score) / previousScore * 100).toFixed(1);

  return (
    <div className="score-card glass-panel">
      <div className="score-header">
        <h2>Your Carbon Footprint</h2>
        <span className="badge text-gradient">Good Standing</span>
      </div>
      
      <div className="score-body">
        <div className="score-main">
          <span className="score-value text-gradient">{score}</span>
          <span className="score-unit">tons CO₂e</span>
        </div>
        
        <div className="score-stats">
          <div className="stat-item positive">
            <TrendingDown size={20} />
            <span>{reduction}% from last month</span>
          </div>
          <div className="stat-item neutral">
            <ArrowDown size={20} />
            <span>1.2 tons below average</span>
          </div>
        </div>
      </div>
      
      <div className="score-footer">
        <div className="progress-container">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '40%' }}></div>
          </div>
          <div className="progress-labels">
            <span>0</span>
            <span>Target: 2.0</span>
            <span>Avg: 5.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
