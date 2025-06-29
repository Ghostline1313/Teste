import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MapView from './components/MapView';
import CollectionPoints from './components/CollectionPoints';
import DataManagement from './components/DataManagement';
import RapportSIG from './components/RapportSIG';
import MobilierUrbain from './components/MobilierUrbain';
import Settings from './components/Settings';
import UserProfile from './components/UserProfile';
import AdminPanel from './components/AdminPanel';
import HomePage from './components/HomePage';

function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'app' | 'home' | 'user-profile' | 'admin-panel'>('app');

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'home':
        setCurrentPage('home');
        break;
      case 'user-profile':
        setCurrentPage('user-profile');
        break;
      case 'admin-panel':
        setCurrentPage('admin-panel');
        break;
      default:
        setCurrentPage('app');
        break;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return <MapView />;
      case 'points':
        return <CollectionPoints />;
      case 'mobilier-urbain':
        return <MobilierUrbain />;
      case 'donnees':
        return <DataManagement />;
      case 'rapport-sig':
        return <RapportSIG />;
      case 'settings':
        return <Settings />;
      default:
        return <MapView />;
    }
  };

  // Rendu de la page d'accueil
  if (currentPage === 'home') {
    return <HomePage />;
  }

  // Rendu de la page de profil utilisateur
  if (currentPage === 'user-profile') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage('app')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span>←</span>
              <span>Retour à l'application</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>
        <UserProfile />
      </div>
    );
  }

  // Rendu du panneau d'administration
  if (currentPage === 'admin-panel') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage('app')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span>←</span>
              <span>Retour à l'application</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Administrateur</span>
            </div>
          </div>
        </div>
        <AdminPanel />
      </div>
    );
  }

  // Rendu de l'application principale
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={handleNavigation}
        />
        
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;