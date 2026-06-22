import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

import { getDoc } from 'firebase/firestore';

// Mock Firebase
vi.mock('firebase/firestore', () => {
  return {
    doc: vi.fn(),
    getDoc: vi.fn(() => Promise.resolve({
      exists: () => true,
      data: () => ({
        userName: 'Test User',
        hasCompletedOnboarding: true,
        carbonData: { score: 10, categoryBreakdown: [] },
        activeGoals: [],
        recentActivities: [],
        userSettings: { notifications: true, privacy: false }
      })
    })),
    setDoc: vi.fn(),
    getFirestore: vi.fn(),
  };
});

vi.mock('../firebase', () => ({
  db: {}
}));

describe('App Component', () => {
  it('renders loading state initially and then loads Dashboard', async () => {
    render(<App />);
    expect(screen.getByText('Connecting to Cloud...')).toBeTruthy();
    
    await waitFor(() => {
      expect(screen.getByText('Log Activity')).toBeTruthy();
    });
  });

  it('switches tabs correctly', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Log Activity')).toBeTruthy(); // Wait for dashboard
    });

    const goalsTabs = screen.getAllByText('Goals');
    fireEvent.click(goalsTabs[0]); // Desktop tab
    
    await waitFor(() => {
      expect(screen.getByText('Your Goals')).toBeTruthy();
    });

    const profileTabs = screen.getAllByText('Profile');
    fireEvent.click(profileTabs[0]); // Desktop tab
    
    await waitFor(() => {
      expect(screen.getByText('Account Settings')).toBeTruthy();
    });
  });

  it('handles goal toggling', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Log Activity')).toBeTruthy());
    
    // Go to Goals
    const goalsTabs = screen.getAllByText('Goals');
    fireEvent.click(goalsTabs[0]);
    await waitFor(() => expect(screen.getByText('Your Goals')).toBeTruthy());
    
    // Click a goal
    const startGoalBtns = screen.getAllByText('Start Goal');
    fireEvent.click(startGoalBtns[0]);
    
    // It should now say Abandon Goal or we just verify it was clicked
    await waitFor(() => expect(screen.getAllByText('Abandon Goal').length).toBeGreaterThan(0));
  });

  it('handles profile updates', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Log Activity')).toBeTruthy());
    
    const profileTabs = screen.getAllByText('Profile');
    fireEvent.click(profileTabs[0]);
    await waitFor(() => expect(screen.getByText('Account Settings')).toBeTruthy());
    
    // Open edit profile
    fireEvent.click(screen.getByText('Edit Profile'));
    await waitFor(() => expect(screen.getByLabelText('Display Name')).toBeTruthy());
    
    // Save new name
    fireEvent.change(screen.getByLabelText('Display Name'), { target: { value: 'New Test Name' } });
    fireEvent.click(screen.getByText('Save Changes'));
    
    await waitFor(() => expect(screen.getByText('New Test Name')).toBeTruthy());

    // Open notifications
    fireEvent.click(screen.getByText('Notification Preferences'));
    await waitFor(() => expect(screen.getByLabelText('Enable Push Notifications')).toBeTruthy());
    fireEvent.click(screen.getByLabelText('Enable Push Notifications'));
    fireEvent.click(screen.getByText('Save Changes'));
  });

  it('renders onboarding if not completed and completes it', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        hasCompletedOnboarding: false
      })
    });
    
    render(<App />);
    await waitFor(() => expect(screen.getByText('Welcome to Footprint Tracker')).toBeTruthy());
    
    // Transport
    fireEvent.click(screen.getByText('Car (Gas/Diesel)'));
    await waitFor(() => expect(screen.getByText('How would you describe your diet?')).toBeTruthy());
    
    // Diet
    fireEvent.click(screen.getByText('Average'));
    await waitFor(() => expect(screen.getByText('What kind of energy powers your home?')).toBeTruthy());
    
    // Energy
    fireEvent.click(screen.getByText('Standard Grid'));
    
    // Should render Dashboard
    await waitFor(() => expect(screen.getByText('Log Activity')).toBeTruthy());
  });
});
