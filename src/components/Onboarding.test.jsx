import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Onboarding from './Onboarding';

describe('Onboarding Component', () => {
  it('renders correctly', () => {
    render(<Onboarding onComplete={() => {}} />);
    expect(screen.getByText('Welcome to Footprint Tracker')).toBeTruthy();
  });

  it('advances steps when an option is selected', async () => {
    render(<Onboarding onComplete={() => {}} />);
    const carBtn = screen.getByText('Car (Gas/Diesel)');
    fireEvent.click(carBtn);
    await waitFor(() => {
      expect(screen.getByText('How would you describe your diet?')).toBeTruthy();
    });
  });

  it('completes onboarding when all questions are answered', async () => {
    const completeMock = vi.fn();
    render(<Onboarding onComplete={completeMock} />);
    
    // Step 1: Transport
    fireEvent.click(screen.getByText('Car (Gas/Diesel)'));
    await waitFor(() => expect(screen.getByText('How would you describe your diet?')).toBeTruthy());
    
    // Step 2: Diet
    fireEvent.click(screen.getByText('Average'));
    await waitFor(() => expect(screen.getByText('What kind of energy powers your home?')).toBeTruthy());
    
    // Step 3: Energy
    fireEvent.click(screen.getByText('Standard Grid'));
    
    expect(completeMock).toHaveBeenCalled();
  });
});
