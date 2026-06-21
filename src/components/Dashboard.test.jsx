import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  it('renders correctly', () => {
    render(<Dashboard userName="Test User" score={10} recentActivities={[]} />);
    expect(screen.getByText('Log Activity')).toBeTruthy();
  });

  it('opens LogActivityModal when button is clicked', () => {
    render(<Dashboard userName="Test User" score={10} recentActivities={[]} />);
    const logButton = screen.getByText('Log Activity');
    fireEvent.click(logButton);
    expect(screen.getByText('Select an eco-friendly action you took today:')).toBeTruthy();
  });

  it('renders recent activities when provided', () => {
    const activities = [
      { id: 1, title: "Biked to Work", desc: "5 miles", impact: -2.0, category: "Transport", date: new Date().toISOString() }
    ];
    render(<Dashboard userName="Test User" score={10} categoryBreakdown={[]} recentActivities={activities} />);
    expect(screen.getByText(/Biked to Work/i)).toBeTruthy();
  });
});
