import React, { useState } from 'react';
import { Search, User, Menu, LogOut, Settings, Shield } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onNavigate }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    // Confirmation de déconnexion
    const confirmLogout = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (confirmLogout) {
      // Simulation de la déconnexion
      console.log('Utilisateur déconnecté');
      setShowUserMenu(false);
      
      // Redirection vers la page d'accueil
      if (onNavigate) {
        onNavigate('home');
      } else {
        // Fallback : redirection simulée
        alert('Déconnexion réussie !\nRedirection vers la page d\'accueil...');
        // Dans une vraie application, ici on ferait :
        // window.location.href = '/';
        // ou router.push('/');
      }
    }
  };

  const handleProfileSettings = () => {
    setShowUserMenu(false);
    
    // Redirection vers les paramètres du profil utilisateur
    if (onNavigate) {
      onNavigate('user-profile');
    } else {
      // Fallback : redirection simulée
      alert('Redirection vers les paramètres du profil utilisateur...');
      // Dans une vraie application, ici on ferait :
      // window.location.href = '/profile';
      // ou router.push('/profile');
    }
  };

  const handleAdminPanel = () => {
    setShowUserMenu(false);
    
    // Redirection vers le panneau d'administration
    if (onNavigate) {
      onNavigate('admin-panel');
    } else {
      // Fallback : redirection simulée
      alert('Redirection vers le panneau d\'administration...');
      // Dans une vraie application, ici on ferait :
      // window.location.href = '/admin';
      // ou router.push('/admin');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden sm:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un circuit..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-80"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Menu Utilisateur avec Déconnexion */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-700">Admin</p>
                <p className="text-xs text-gray-500">Gestionnaire</p>
              </div>
            </button>

            {/* Menu Déroulant */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                {/* Header du menu */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Administrateur</h4>
                      <p className="text-sm text-gray-600">Gestionnaire Principal</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">En ligne</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informations du compte */}
                <div className="p-4 border-b border-gray-100">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email :</span>
                      <span className="font-medium text-gray-900">admin@sonaged.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rôle :</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Super Admin
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dernière connexion :</span>
                      <span className="font-medium text-gray-900">Aujourd'hui 09:15</span>
                    </div>
                  </div>
                </div>

                {/* Actions du menu */}
                <div className="p-2">
                  <button
                    onClick={handleProfileSettings}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Settings className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Paramètres du Profil</div>
                      <div className="text-xs text-gray-500">Modifier vos informations</div>
                    </div>
                  </button>

                  <button
                    onClick={handleAdminPanel}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Shield className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Panneau d'Administration</div>
                      <div className="text-xs text-gray-500">Gestion système avancée</div>
                    </div>
                  </button>

                  {/* Séparateur */}
                  <div className="border-t border-gray-100 my-2"></div>

                  {/* Bouton de Déconnexion */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                  >
                    <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600" />
                    <div>
                      <div className="font-medium">Se Déconnecter</div>
                      <div className="text-xs text-red-500">Fermer la session</div>
                    </div>
                  </button>
                </div>

                {/* Footer du menu */}
                <div className="p-3 bg-gray-50 rounded-b-xl border-t border-gray-100">
                  <div className="text-xs text-gray-500 text-center">
                    <div>Geoportail Sonaged v2.1.0</div>
                    <div>Session sécurisée • SSL/TLS</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay pour fermer le menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;