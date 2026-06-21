import { useState } from 'react';
import { Award, Shield, User, Leaf } from 'lucide-react';
import SettingsModal from './SettingsModal';
import './Profile.css';

const Profile = ({ userName, onSaveName, recentActivities, score, userSettings, onSaveSettings }) => {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null });

  const totalSaved = recentActivities.reduce((acc, act) => acc + Math.abs(act.impact), 0).toFixed(1);
  const avatarLetter = userName ? userName.charAt(0).toUpperCase() : 'U';

  const openSettings = (type) => {
    setModalConfig({ isOpen: true, type });
  };

  const closeSettings = () => {
    setModalConfig({ isOpen: false, type: null });
  };

  return (
    <div className="profile-container">
      <div className="profile-header glass-panel">
        <div className="profile-avatar-large">
          <span>{avatarLetter}</span>
        </div>
        <div className="profile-info">
          <h1>{userName}</h1>
          <div className="profile-badges">
            <span className="level-badge text-gradient"><Shield size={16} /> Eco Warrior</span>
            <span className="join-date">Joined June 2026</span>
          </div>
        </div>
      </div>

      <div className="profile-stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon text-gradient"><Leaf size={32} /></div>
          <div className="stat-details">
            <h3>{totalSaved} kg</h3>
            <p>Total CO₂e Saved</p>
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon text-gradient"><User size={32} /></div>
          <div className="stat-details">
            <h3>{recentActivities.length}</h3>
            <p>Activities Logged</p>
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon text-gradient"><Award size={32} /></div>
          <div className="stat-details">
            <h3>{score} tons</h3>
            <p>Current Footprint</p>
          </div>
        </div>
      </div>

      <div className="profile-content-grid">
        <div className="achievements-section glass-panel">
          <h2>Your Achievements</h2>
          <div className="achievement-list">
            <div className="achievement-item earned">
              <div className="achievement-icon gold"><Award size={24} /></div>
              <div className="achievement-text">
                <h4>7 Day Streak</h4>
                <p>Logged activities for 7 consecutive days.</p>
              </div>
            </div>
            <div className="achievement-item earned">
              <div className="achievement-icon green"><Shield size={24} /></div>
              <div className="achievement-text">
                <h4>Transit Hero</h4>
                <p>Used public transit 5 times in a week.</p>
              </div>
            </div>
            <div className="achievement-item locked">
              <div className="achievement-icon gray"><Leaf size={24} /></div>
              <div className="achievement-text">
                <h4>Plant Powered</h4>
                <p>Log 10 plant-based meals.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="settings-section glass-panel">
          <h2>Account Settings</h2>
          <div className="settings-list">
            <button className="settings-btn" onClick={() => openSettings('edit_profile')}>Edit Profile</button>
            <button className="settings-btn" onClick={() => openSettings('notifications')}>Notification Preferences</button>
            <button className="settings-btn" onClick={() => openSettings('privacy')}>Privacy Settings</button>
            <button className="settings-btn danger" onClick={() => openSettings('delete_account')}>Delete Account</button>
          </div>
        </div>
      </div>

      <SettingsModal 
        isOpen={modalConfig.isOpen}
        onClose={closeSettings}
        settingType={modalConfig.type}
        currentName={userName}
        onSaveName={onSaveName}
        userSettings={userSettings}
        onSaveSettings={onSaveSettings}
      />
    </div>
  );
};

export default Profile;
