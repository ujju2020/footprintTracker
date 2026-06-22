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
    
    // Click transit
    fireEvent.click(screen.getByText('Biked to Work'));
    expect(logMock).toHaveBeenCalled();
    
    // Click nature
    fireEvent.click(screen.getByText('Planted a Tree'));
    expect(logMock).toHaveBeenCalledTimes(2);

    // Click diet
    fireEvent.click(screen.getByText('Vegan Meal'));
    expect(logMock).toHaveBeenCalledTimes(3);

    // Click energy
    fireEvent.click(screen.getByText('Line Dried Clothes'));
    expect(logMock).toHaveBeenCalledTimes(4);

    // Click shopping
    fireEvent.click(screen.getByText('Used Reusable Bag'));
    expect(logMock).toHaveBeenCalledTimes(5);
  });
});
