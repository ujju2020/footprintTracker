import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Onboarding from './Onboarding';

describe('Onboarding Component', () => {
  it('renders correctly', () => {
    render(<Onboarding onComplete={() => {}} />);
    expect(screen.getByText('Welcome to Footprint Tracker')).toBeTruthy();
  });
});
