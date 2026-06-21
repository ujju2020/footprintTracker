import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScoreCard from './ScoreCard';

describe('ScoreCard Component', () => {
  it('renders the correct score', () => {
    render(<ScoreCard score={14.5} />);
    expect(screen.getByText('14.5')).toBeTruthy();
  });

  it('renders the badge text', () => {
    render(<ScoreCard score={14.5} />);
    expect(screen.getAllByText('Good Standing')[0]).toBeTruthy();
  });
});
