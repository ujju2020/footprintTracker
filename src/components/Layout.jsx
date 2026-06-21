import { useState } from 'react';
import { Leaf, LayoutDashboard, Target, User, Menu, X } from 'lucide-react';
import './Layout.css';

const Layout = ({ children, activeTab, onTabChange, userName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabClick = (tab) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false); // Close menu on mobile after selection
  };

  return (
    <div className="layout-container">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      <aside className={`sidebar glass-panel ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <Leaf className="logo-icon" size={32} />
            <span className="text-gradient">Footprint Tracker</span>
          </div>
          <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="nav-links">
          <a href="#" className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleTabClick('Dashboard'); }}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#" className={`nav-item ${activeTab === 'Goals' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleTabClick('Goals'); }}>
            <Target size={20} />
            <span>Goals</span>
          </a>
          <a href="#" className={`nav-item ${activeTab === 'Profile' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleTabClick('Profile'); }}>
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
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
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
