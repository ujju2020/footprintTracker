import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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

  it('calls onTabChange when a tab is clicked', () => {
    const tabMock = vi.fn();
    render(
      <Layout activeTab="Dashboard" onTabChange={tabMock} userName="Test User">
        <div>Child Content</div>
      </Layout>
    );
    // There are desktop and mobile navs, so multiple elements might be found.
    const goalsTabs = screen.getAllByText('Goals');
    fireEvent.click(goalsTabs[0]); // Desktop
    expect(tabMock).toHaveBeenCalledWith('Goals');

    const profileTabs = screen.getAllByText('Profile');
    fireEvent.click(profileTabs[0]);
    expect(tabMock).toHaveBeenCalledWith('Profile');
  });

  it('toggles mobile menu when menu button is clicked', () => {
    render(
      <Layout activeTab="Dashboard" onTabChange={() => {}} userName="Test User">
        <div>Child Content</div>
      </Layout>
    );
    const openBtn = screen.getByLabelText('Open menu');
    fireEvent.click(openBtn);
    // Menu is open
    const closeBtn = screen.getByLabelText('Close menu');
    fireEvent.click(closeBtn);
    // Menu is closed
    expect(screen.getByText('Child Content')).toBeTruthy();
  });
});
