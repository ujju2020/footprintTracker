import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Goals from './Goals';

describe('Goals Component', () => {
  it('renders correctly', () => {
    render(<Goals activeGoals={[]} />);
    expect(screen.getByText('Your Goals')).toBeTruthy();
  });

  it('calls toggleGoal when Start Goal is clicked', () => {
    const toggleMock = vi.fn();
    render(<Goals activeGoals={[]} toggleGoal={toggleMock} />);
    const buttons = screen.getAllByText('Start Goal');
    fireEvent.click(buttons[0]);
    expect(toggleMock).toHaveBeenCalled();
  });

  it('renders specific recommendation based on highest category', () => {
    const breakdown = [
      { name: 'Transport', value: 50 },
      { name: 'Diet', value: 10 }
    ];
    render(<Goals activeGoals={[]} categoryBreakdown={breakdown} />);
    expect(screen.getByText(/We noticed Transport makes up the largest part/)).toBeTruthy();
  });
});
