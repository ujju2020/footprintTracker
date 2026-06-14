import { useState, useEffect } from 'react';
import { X, Save, AlertTriangle } from 'lucide-react';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose, settingType, currentName, onSaveName }) => {
  const [nameInput, setNameInput] = useState(currentName);

  // Reset input when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setNameInput(currentName);
    }
  }, [isOpen, currentName]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (settingType === 'edit_profile' && nameInput.trim() !== '') {
      onSaveName(nameInput.trim());
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
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="settings-modal-body">
          {settingType === 'edit_profile' && (
            <div className="form-group">
              <label>Display Name</label>
              <input 
                type="text" 
                value={nameInput} 
                onChange={(e) => setNameInput(e.target.value)}
                className="settings-input"
              />
              <p className="input-hint">This is how your name will appear on the dashboard and leaderboards.</p>
            </div>
          )}

          {(settingType === 'notifications' || settingType === 'privacy') && (
            <div className="coming-soon-message">
              <p>This feature is not yet connected to a backend in this MVP version.</p>
              <p>Settings will be available in v2.0!</p>
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
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          
          {settingType === 'delete_account' ? (
            <button className="btn-primary danger-bg" onClick={onClose}>Yes, Delete</button>
          ) : (
            <button className="btn-primary" onClick={handleSave}>
              <Save size={18} /> Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
