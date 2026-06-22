import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SettingsModal from './SettingsModal';

describe('SettingsModal Component', () => {
  it('renders correctly', () => {
    render(<SettingsModal isOpen={true} settingType="edit_profile" currentName="Test User" onClose={() => {}} onSaveName={() => {}} />);
    expect(screen.getByText('Edit Profile')).toBeTruthy();
  });

  it('calls onSaveName when Save is clicked', () => {
    const saveMock = vi.fn();
    render(<SettingsModal isOpen={true} settingType="edit_profile" currentName="Test User" onClose={() => {}} onSaveName={saveMock} />);
    const input = screen.getByLabelText('Display Name');
    fireEvent.change(input, { target: { value: 'New Name' } });
    const saveBtn = screen.getByText('Save Changes');
    fireEvent.click(saveBtn);
    expect(saveMock).toHaveBeenCalledWith('New Name');
  });

  it('calls onSaveSettings for notifications', () => {
    const saveMock = vi.fn();
    render(<SettingsModal isOpen={true} settingType="notifications" userSettings={{ notifications: false }} onClose={() => {}} onSaveSettings={saveMock} />);
    
    const toggle = screen.getByLabelText('Enable Push Notifications');
    fireEvent.click(toggle);

    const saveBtn = screen.getByText('Save Changes');
    fireEvent.click(saveBtn);
    expect(saveMock).toHaveBeenCalledWith({ notifications: true });
  });

  it('calls onSaveSettings for privacy', () => {
    const saveMock = vi.fn();
    render(<SettingsModal isOpen={true} settingType="privacy" userSettings={{ privacy: false }} onClose={() => {}} onSaveSettings={saveMock} />);
    
    const toggle = screen.getByLabelText('Make Profile Public');
    fireEvent.click(toggle);

    const saveBtn = screen.getByText('Save Changes');
    fireEvent.click(saveBtn);
    expect(saveMock).toHaveBeenCalledWith({ privacy: true });
  });

  it('calls onClose for delete_account', () => {
    const closeMock = vi.fn();
    render(<SettingsModal isOpen={true} settingType="delete_account" onClose={closeMock} onSaveSettings={() => {}} />);
    const delBtn = screen.getByText('Yes, Delete');
    fireEvent.click(delBtn);
    expect(closeMock).toHaveBeenCalled();
  });
});
