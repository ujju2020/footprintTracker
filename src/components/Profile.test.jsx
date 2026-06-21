import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Profile from './Profile';

describe('Profile Component', () => {
  it('renders correctly', () => {
    render(<Profile userName="Test User" score={10} recentActivities={[]} onSaveName={() => {}} userSettings={{ notifications: true, privacy: false }} onSaveSettings={() => {}} />);
    expect(screen.getByText('Account Settings')).toBeTruthy();
  });
});
