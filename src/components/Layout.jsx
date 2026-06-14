import { Leaf, LayoutDashboard, Target, User, Menu } from 'lucide-react';
import './Layout.css';

const Layout = ({ children, activeTab, onTabChange, userName }) => {
  return (
    <div className="layout-container">
      <aside className="sidebar glass-panel">
        <div className="logo">
          <Leaf className="logo-icon" size={32} />
          <span className="text-gradient">Footprint Tracker</span>
        </div>
        
        <nav className="nav-links">
          <a href="#" className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onTabChange('Dashboard'); }}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#" className={`nav-item ${activeTab === 'Goals' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onTabChange('Goals'); }}>
            <Target size={20} />
            <span>Goals</span>
          </a>
          <a href="#" className={`nav-item ${activeTab === 'Profile' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onTabChange('Profile'); }}>
            <User size={20} />
            <span>Profile</span>
          </a>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-badge">
            <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
            <div className="user-info">
              <span className="user-name">{userName}</span>
              <span className="user-level text-gradient">Eco Warrior</span>
            </div>
          </div>
        </div>
      </aside>
      
      <main className="main-content">
        <header className="mobile-header glass-panel">
          <Menu size={24} />
          <div className="logo">
            <Leaf className="logo-icon" size={24} />
            <span className="text-gradient">Footprint Tracker</span>
          </div>
        </header>
        <div className="content-inner">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
