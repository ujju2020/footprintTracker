import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SettingsModal from './SettingsModal';

describe('SettingsModal Component', () => {
  it('renders correctly', () => {
    render(<SettingsModal isOpen={true} settingType="edit_profile" currentName="Test User" onClose={() => {}} onSaveName={() => {}} />);
    expect(screen.getByText('Edit Profile')).toBeTruthy();
  });
});
