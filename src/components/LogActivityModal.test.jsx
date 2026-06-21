import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LogActivityModal from './LogActivityModal';

describe('LogActivityModal Component', () => {
  it('renders correctly', () => {
    render(<LogActivityModal isOpen={true} onClose={() => {}} onLogActivity={() => {}} />);
    expect(screen.getByText('Log Activity')).toBeTruthy();
  });
});
