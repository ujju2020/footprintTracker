import { useState } from 'react';
import { Leaf, Car, Bus, Bike, Utensils, Zap, Sun } from 'lucide-react';
import './Onboarding.css';

const questions = [
  {
    id: 'transport',
    title: 'How do you primarily get around?',
    options: [
      { label: 'Car (Gas/Diesel)', value: 2.5, icon: <Car size={32} /> },
      { label: 'Public Transit', value: 1.0, icon: <Bus size={32} /> },
      { label: 'Bike / Walk', value: 0.1, icon: <Bike size={32} /> },
    ]
  },
  {
    id: 'diet',
    title: 'How would you describe your diet?',
    options: [
      { label: 'Meat-heavy', value: 2.0, icon: <Utensils size={32} /> },
      { label: 'Average', value: 1.5, icon: <Utensils size={32} /> },
      { label: 'Vegetarian/Vegan', value: 0.8, icon: <Leaf size={32} /> },
    ]
  },
  {
    id: 'energy',
    title: 'What kind of energy powers your home?',
    options: [
      { label: 'Standard Grid', value: 1.5, icon: <Zap size={32} /> },
      { label: 'Renewable / Solar', value: 0.5, icon: <Sun size={32} /> },
    ]
  }
];

const Onboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleSelect = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300); // Small delay for visual feedback
    } else {
      // Calculate final results
      const totalScore = Object.values(newAnswers).reduce((sum, val) => sum + val, 0);
      
      // Rough category breakdown based on answers + some base values for unasked categories
      const categoryBreakdown = [
        { name: 'Transport', value: newAnswers.transport || 1.0, color: '#0ea5e9' },
        { name: 'Diet', value: newAnswers.diet || 1.5, color: '#22c55e' },
        { name: 'Home Energy', value: newAnswers.energy || 1.5, color: '#d97706' },
        { name: 'Shopping', value: 0.8, color: '#8b5cf6' }, // Base value since we didn't ask
      ];
      
      onComplete({
        score: Number(totalScore.toFixed(1)) + 0.8, // Add the shopping base value
        categoryBreakdown
      });
    }
  };

  const progressPercentage = ((currentStep) / questions.length) * 100;

  return (
    <div className="onboarding-container">
      <div className="onboarding-card glass-panel">
        <div className="onboarding-header">
          <Leaf className="logo-icon" size={40} style={{ color: 'var(--neon-green)', filter: 'drop-shadow(0 0 10px var(--neon-green-glow))', margin: '0 auto 1rem' }} />
          <h1 className="text-gradient">Welcome to Footprint Tracker</h1>
          <p>Let's calculate your baseline carbon footprint to get started.</p>
        </div>

        <div className="progress-container" style={{ marginBottom: '2rem' }}>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercentage}%`, transition: 'width 0.3s ease' }}
            ></div>
          </div>
        </div>

        <div className="question-section">
          <h2>{questions[currentStep].title}</h2>
          <div className="options-grid">
            {questions[currentStep].options.map((option, idx) => (
              <button 
                key={idx} 
                className={`option-btn ${answers[questions[currentStep].id] === option.value ? 'selected' : ''}`}
                onClick={() => handleSelect(questions[currentStep].id, option.value)}
                aria-pressed={answers[questions[currentStep].id] === option.value}
              >
                <div className="option-icon">{option.icon}</div>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
