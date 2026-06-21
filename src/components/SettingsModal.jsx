import { useState, useEffect } from 'react';
import { X, Save, AlertTriangle } from 'lucide-react';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose, settingType, currentName, onSaveName, userSettings = { notifications: true, privacy: false }, onSaveSettings }) => {
  const [nameInput, setNameInput] = useState(currentName);
  const [notifications, setNotifications] = useState(userSettings.notifications);
  const [privacy, setPrivacy] = useState(userSettings.privacy);

  // Reset input when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNameInput(currentName);
      setNotifications(userSettings?.notifications ?? true);
      setPrivacy(userSettings?.privacy ?? false);
    }
  }, [isOpen, currentName, userSettings?.notifications, userSettings?.privacy]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (settingType === 'edit_profile' && nameInput.trim() !== '') {
      onSaveName(nameInput.trim());
    } else if (settingType === 'notifications') {
      onSaveSettings({ notifications });
    } else if (settingType === 'privacy') {
      onSaveSettings({ privacy });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {settingType === 'edit_profile' && 'Edit Profile'}
            {settingType === 'notifications' && 'Notification Preferences'}
            {settingType === 'privacy' && 'Privacy Settings'}
            {settingType === 'delete_account' && 'Delete Account'}
          </h2>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close settings"><X size={24} /></button>
        </div>
        
        <div className="settings-modal-body">
          {settingType === 'edit_profile' && (
            <div className="form-group">
              <label htmlFor="displayNameInput">Display Name</label>
              <input 
                id="displayNameInput"
                type="text" 
                value={nameInput} 
                onChange={(e) => setNameInput(e.target.value)}
                className="settings-input"
              />
              <p className="input-hint">This is how your name will appear on the dashboard and leaderboards.</p>
            </div>
          )}

          {settingType === 'notifications' && (
            <div className="form-group">
              <label htmlFor="notificationsToggle" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input 
                  id="notificationsToggle"
                  type="checkbox" 
                  checked={notifications} 
                  onChange={(e) => setNotifications(e.target.checked)} 
                  style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                />
                Enable Push Notifications
              </label>
              <p className="input-hint" style={{ marginTop: '0.5rem' }}>Receive reminders to log your daily activities.</p>
            </div>
          )}

          {settingType === 'privacy' && (
            <div className="form-group">
              <label htmlFor="privacyToggle" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input 
                  id="privacyToggle"
                  type="checkbox" 
                  checked={privacy} 
                  onChange={(e) => setPrivacy(e.target.checked)} 
                  style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                />
                Make Profile Public
              </label>
              <p className="input-hint" style={{ marginTop: '0.5rem' }}>Allow other users to see your carbon footprint and achievements on leaderboards.</p>
            </div>
          )}

          {settingType === 'delete_account' && (
            <div className="danger-zone">
              <AlertTriangle size={48} color="#ef4444" />
              <h3>Are you sure?</h3>
              <p>This action cannot be undone. All your carbon tracking data will be permanently lost.</p>
            </div>
          )}
        </div>

        <div className="settings-modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          
          {settingType === 'delete_account' ? (
            <button type="button" className="btn-primary danger-bg" onClick={onClose}>Yes, Delete</button>
          ) : (
            <button type="button" className="btn-primary" onClick={handleSave}>
              <Save size={18} /> Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
