import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LogActivityModal from './LogActivityModal';

describe('LogActivityModal Component', () => {
  it('renders correctly', () => {
    render(<LogActivityModal isOpen={true} onClose={() => {}} onLog={() => {}} />);
    expect(screen.getByText('Log Activity')).toBeTruthy();
  });

  it('calls onClose when close button is clicked', () => {
    const closeMock = vi.fn();
    render(<LogActivityModal isOpen={true} onClose={closeMock} onLog={() => {}} />);
    const closeBtn = screen.getByLabelText('Close activity modal');
    fireEvent.click(closeBtn);
    expect(closeMock).toHaveBeenCalled();
  });

  it('calls onLog when an activity is clicked', () => {
    const logMock = vi.fn();
    render(<LogActivityModal isOpen={true} onClose={() => {}} onLog={logMock} />);
    const activityBtn = screen.getByText('Biked to Work');
    fireEvent.click(activityBtn);
    expect(logMock).toHaveBeenCalled();
  });
});
