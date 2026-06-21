import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from './firebase';

import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Goals from './components/Goals';
import Profile from './components/Profile';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userName, setUserName] = useState('Ujjwal');
  const [carbonData, setCarbonData] = useState({
    score: 0,
    categoryBreakdown: []
  });
  const [activeGoals, setActiveGoals] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [userSettings, setUserSettings] = useState({ notifications: true, privacy: false });

  // Load from Firebase on Mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userRef = doc(db, 'users', 'ujjwal_profile');
        // Add a 3-second timeout so it doesn't hang on the loading screen
        const docSnap = await Promise.race([
          getDoc(userRef),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase connection timeout')), 3000))
        ]);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserName(data.userName || 'Ujjwal');
          setHasCompletedOnboarding(data.hasCompletedOnboarding || false);
          setCarbonData(data.carbonData || { score: 0, categoryBreakdown: [] });
          setActiveGoals(data.activeGoals || []);
          setRecentActivities(data.recentActivities || []);
          setUserSettings(data.userSettings || { notifications: true, privacy: false });
        }
      } catch (error) {
        console.error("Error fetching user data from Firebase:", error);
      } finally {
        setIsInitializing(false);
      }
    };
    loadUserData();
  }, []);

  // Helper to sync state to Firebase
  const syncToFirebase = async (updates) => {
    try {
      const userRef = doc(db, 'users', 'ujjwal_profile');
      await setDoc(userRef, {
        userName,
        hasCompletedOnboarding,
        carbonData,
        activeGoals,
        recentActivities,
        userSettings,
        ...updates // Merge latest changes to avoid race conditions
      }, { merge: true });
    } catch (error) {
      console.error("Error saving to Firebase:", error);
    }
  };

  const handleOnboardingComplete = (data) => {
    setCarbonData(data);
    setHasCompletedOnboarding(true);
    syncToFirebase({ carbonData: data, hasCompletedOnboarding: true });
  };

  const handleLogActivity = (activity) => {
    const newScore = Number(Math.max(0, carbonData.score + activity.impact).toFixed(1));
    const newCarbonData = { ...carbonData, score: newScore };
    
    const newActivities = [{
      id: Date.now(),
      ...activity
    }, ...recentActivities];

    setCarbonData(newCarbonData);
    setRecentActivities(newActivities);
    
    syncToFirebase({ carbonData: newCarbonData, recentActivities: newActivities });
  };

  const toggleGoal = (goalId) => {
    const newActiveGoals = activeGoals.includes(goalId) 
      ? activeGoals.filter(id => id !== goalId)
      : [...activeGoals, goalId];
      
    setActiveGoals(newActiveGoals);
    syncToFirebase({ activeGoals: newActiveGoals });
  };

  const handleSaveName = (newName) => {
    setUserName(newName);
    syncToFirebase({ userName: newName });
  };

  const handleSaveSettings = (newSettings) => {
    const updatedSettings = { ...userSettings, ...newSettings };
    setUserSettings(updatedSettings);
    syncToFirebase({ userSettings: updatedSettings });
  };

  if (isInitializing) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#22c55e' }}>
        <h2>Connecting to Cloud...</h2>
      </div>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <Dashboard 
            userName={userName}
            score={carbonData.score} 
            categoryBreakdown={carbonData.categoryBreakdown} 
            recentActivities={recentActivities}
            onLogActivity={handleLogActivity}
          />
        );
      case 'Goals':
        return (
          <Goals 
            categoryBreakdown={carbonData.categoryBreakdown}
            activeGoals={activeGoals}
            toggleGoal={toggleGoal}
          />
        );
      case 'Profile':
        return (
          <Profile 
            userName={userName}
            onSaveName={handleSaveName}
            recentActivities={recentActivities} 
            score={carbonData.score} 
            userSettings={userSettings}
            onSaveSettings={handleSaveSettings}
          />
        );
      default:
        return (
          <Dashboard 
            userName={userName}
            score={carbonData.score} 
            categoryBreakdown={carbonData.categoryBreakdown} 
            recentActivities={recentActivities}
            onLogActivity={handleLogActivity}
          />
        );
    }
  };

  return (
    <Layout userName={userName} activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
