import React from 'react';
import { 
  Map, 
  MapPin, 
  Settings,
  Menu,
  X,
  Database,
  FileText,
  Building2
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen, onToggle }) => {
  const menuItems = [
    { id: 'map', label: 'Cartographie', icon: Map },
    { id: 'points', label: 'Circuits', icon: MapPin },
    { id: 'mobilier-urbain', label: 'Mobilier Urbain', icon: Building2 },
    { id: 'donnees', label: 'Données', icon: Database },
    { id: 'rapport-sig', label: 'Rapport SIG', icon: FileText },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
              <img 
                src="/460080839_836855091958059_5736557114325302727_n.jpg" 
                alt="SONAGED Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-green-600">Geoportail</h1>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Sonaged</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onTabChange(item.id);
                      if (window.innerWidth < 1024) onToggle();
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                      ${activeTab === item.id 
                        ? 'bg-green-50 text-green-700 border-l-4 border-green-500' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;