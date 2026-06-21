import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Profile from './Profile';

describe('Profile Component', () => {
  it('renders correctly', () => {
    render(<Profile userName="Test User" score={10} recentActivities={[]} onSaveName={() => {}} userSettings={{ notifications: true, privacy: false }} onSaveSettings={() => {}} />);
    expect(screen.getByText('Account Settings')).toBeTruthy();
  });

  it('opens SettingsModal when Edit Profile is clicked', () => {
    render(<Profile userName="Test User" score={10} recentActivities={[]} onSaveName={() => {}} userSettings={{ notifications: true, privacy: false }} onSaveSettings={() => {}} />);
    const editBtn = screen.getByText('Edit Profile');
    fireEvent.click(editBtn);
    expect(screen.getByText('This is how your name will appear on the dashboard and leaderboards.')).toBeTruthy();
    
    // Also click others to cover branches
    fireEvent.click(screen.getByText('Notification Preferences'));
    expect(screen.getByText('Enable Push Notifications')).toBeTruthy();
    
    fireEvent.click(screen.getByText('Privacy Settings'));
    expect(screen.getByText('Make Profile Public')).toBeTruthy();
    
    fireEvent.click(screen.getByText('Delete Account'));
    expect(screen.getByText('Are you sure?')).toBeTruthy();
  });
});
