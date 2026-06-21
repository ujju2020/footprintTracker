import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

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
});
