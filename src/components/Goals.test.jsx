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
    const breakdown1 = [{ name: 'Transport', value: 50 }, { name: 'Diet', value: 10 }];
    const { rerender } = render(<Goals activeGoals={[]} categoryBreakdown={breakdown1} />);
    expect(screen.getByText(/We noticed Transport makes up the largest part/)).toBeTruthy();

    const breakdown2 = [{ name: 'Diet', value: 50 }, { name: 'Transport', value: 10 }];
    rerender(<Goals activeGoals={[]} categoryBreakdown={breakdown2} />);
    expect(screen.getByText(/Diet is your highest emission area/)).toBeTruthy();

    const breakdown3 = [{ name: 'Home Energy', value: 50 }, { name: 'Transport', value: 10 }];
    rerender(<Goals activeGoals={[]} categoryBreakdown={breakdown3} />);
    expect(screen.getByText(/Home Energy is currently your biggest impact/)).toBeTruthy();

    const breakdown4 = [{ name: 'Other', value: 50 }];
    rerender(<Goals activeGoals={[]} categoryBreakdown={breakdown4} />);
    expect(screen.getByText(/Ready to reduce your footprint/)).toBeTruthy();
  });
});
