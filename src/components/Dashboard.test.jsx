import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  it('renders correctly', () => {
    render(<Dashboard userName="Test User" score={10} recentActivities={[]} />);
    expect(screen.getByText('Log Activity')).toBeTruthy();
  });
});
