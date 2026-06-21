import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from './Layout';

describe('Layout Component', () => {
  it('renders correctly', () => {
    render(
      <Layout activeTab="Dashboard" onTabChange={() => {}} userName="Test User">
        <div>Child Content</div>
      </Layout>
    );
    expect(screen.getByText('Child Content')).toBeTruthy();
  });
});
