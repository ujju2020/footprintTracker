import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Goals from './Goals';

describe('Goals Component', () => {
  it('renders correctly', () => {
    render(<Goals activeGoals={[]} />);
    expect(screen.getByText('Your Goals')).toBeTruthy();
  });
});
