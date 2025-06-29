import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Camera, 
  Save, 
  Edit3, 
  Lock, 
  Bell, 
  Globe, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings
} from 'lucide-react';

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences' | 'notifications'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const [profileData, setProfileData] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'admin@sonaged.com',
    phone: '+33 1 23 45 67 89',
    position: 'Administrateur Système',
    department: 'Gestion des Déchets',
    address: '123 Rue de la République, 75001 Paris',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-16T09:15:00Z'
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    loginNotifications: true
  });

  const [preferencesData, setPreferencesData] = useState({
    language: 'fr',
    timezone: 'Europe/Paris',
    dateFormat: 'DD/MM/YYYY',
    theme: 'light',
    autoSave: true,
    compactView: false
  });

  const [notificationsData, setNotificationsData] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    weeklyReports: true,
    systemUpdates: true,
    maintenanceAlerts: true
  });

  const handleSave = () => {
    setSaveStatus('saving');
    
    // Simulation de sauvegarde
    setTimeout(() => {
      setSaveStatus('saved');
      setIsEditing(false);
      
      // Reset status après 3 secondes
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }, 1500);
  };

  const handlePasswordChange = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas !');
      return;
    }
    
    if (securityData.newPassword.length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères !');
      return;
    }

    setSaveStatus('saving');
    
    // Simulation de changement de mot de passe
    setTimeout(() => {
      setSaveStatus('saved');
      setSecurityData({
        ...securityData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }, 1500);
  };

  const ProfileSection = () => (
    <div className="space-y-6">
      {/* Photo de profil */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-12 h-12 text-white" />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</h3>
          <p className="text-gray-600">{profileData.position}</p>
          <p className="text-sm text-gray-500">{profileData.department}</p>
          <div className="flex items-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-600 font-medium">En ligne</span>
          </div>
        </div>
      </div>

      {/* Informations personnelles */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Informations Personnelles</h4>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? 'Annuler' : 'Modifier'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Prénom
            </label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Nom
            </label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Téléphone
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Shield className="w-4 h-4 inline mr-2" />
              Poste
            </label>
            <input
              type="text"
              value={profileData.position}
              onChange={(e) => setProfileData({...profileData, position: e.target.value})}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Settings className="w-4 h-4 inline mr-2" />
              Département
            </label>
            <input
              type="text"
              value={profileData.department}
              onChange={(e) => setProfileData({...profileData, department: e.target.value})}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Adresse
            </label>
            <input
              type="text"
              value={profileData.address}
              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Informations du compte */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-4">Informations du Compte</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700">
              <strong>Date d'inscription :</strong> {new Date(profileData.joinDate).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700">
              <strong>Dernière connexion :</strong> {new Date(profileData.lastLogin).toLocaleDateString('fr-FR')} à {new Date(profileData.lastLogin).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className="space-y-6">
      {/* Changement de mot de passe */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-red-500" />
          Changer le Mot de Passe
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe actuel
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={securityData.currentPassword}
                onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="Entrez votre mot de passe actuel"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={securityData.newPassword}
                onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="Entrez votre nouveau mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmer le nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={securityData.confirmPassword}
                onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="Confirmez votre nouveau mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            onClick={handlePasswordChange}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
          >
            <Lock className="w-4 h-4" />
            <span>Changer le Mot de Passe</span>
          </button>
        </div>
      </div>

      {/* Options de sécurité */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-green-500" />
          Options de Sécurité
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h5 className="font-medium text-gray-900">Authentification à deux facteurs</h5>
              <p className="text-sm text-gray-600">Sécurisez votre compte avec une vérification supplémentaire</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={securityData.twoFactorEnabled}
                onChange={(e) => setSecurityData({...securityData, twoFactorEnabled: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h5 className="font-medium text-gray-900">Notifications de connexion</h5>
              <p className="text-sm text-gray-600">Recevez un email lors de chaque connexion</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={securityData.loginNotifications}
                onChange={(e) => setSecurityData({...securityData, loginNotifications: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const PreferencesSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-blue-500" />
          Préférences Générales
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Langue
            </label>
            <select
              value={preferencesData.language}
              onChange={(e) => setPreferencesData({...preferencesData, language: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuseau horaire
            </label>
            <select
              value={preferencesData.timezone}
              onChange={(e) => setPreferencesData({...preferencesData, timezone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
              <option value="Europe/London">Europe/London (UTC+0)</option>
              <option value="America/New_York">America/New_York (UTC-5)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format de date
            </label>
            <select
              value={preferencesData.dateFormat}
              onChange={(e) => setPreferencesData({...preferencesData, dateFormat: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thème
            </label>
            <select
              value={preferencesData.theme}
              onChange={(e) => setPreferencesData({...preferencesData, theme: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
              <option value="auto">Automatique</option>
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h5 className="font-medium text-gray-900">Sauvegarde automatique</h5>
              <p className="text-sm text-gray-600">Sauvegarder automatiquement vos modifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={preferencesData.autoSave}
                onChange={(e) => setPreferencesData({...preferencesData, autoSave: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h5 className="font-medium text-gray-900">Vue compacte</h5>
              <p className="text-sm text-gray-600">Affichage condensé des informations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={preferencesData.compactView}
                onChange={(e) => setPreferencesData({...preferencesData, compactView: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationsSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-yellow-500" />
          Préférences de Notification
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h5 className="font-medium text-gray-900">Alertes par email</h5>
              <p className="text-sm text-gray-600">Recevoir les alertes importantes par email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notificationsData.emailAlerts}
                onChange={(e) => setNotificationsData({...notificationsData, emailAlerts: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h5 className="font-medium text-gray-900">Alertes SMS</h5>
              <p className="text-sm text-gray-600">Recevoir les alertes critiques par SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notificationsData.smsAlerts}
                onChange={(e) => setNotificationsData({...notificationsData, smsAlerts: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h5 className="font-medium text-gray-900">Notifications push</h5>
              <p className="text-sm text-gray-600">Notifications dans le navigateur</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notificationsData.pushNotifications}
                onChange={(e) => setNotificationsData({...notificationsData, pushNotifications: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h5 className="font-medium text-gray-900">Rapports hebdomadaires</h5>
              <p className="text-sm text-gray-600">Résumé hebdomadaire des activités</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notificationsData.weeklyReports}
                onChange={(e) => setNotificationsData({...notificationsData, weeklyReports: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h5 className="font-medium text-gray-900">Mises à jour système</h5>
              <p className="text-sm text-gray-600">Notifications des mises à jour de la plateforme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notificationsData.systemUpdates}
                onChange={(e) => setNotificationsData({...notificationsData, systemUpdates: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h5 className="font-medium text-gray-900">Alertes de maintenance</h5>
              <p className="text-sm text-gray-600">Notifications de maintenance programmée</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notificationsData.maintenanceAlerts}
                onChange={(e) => setNotificationsData({...notificationsData, maintenanceAlerts: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'security':
        return <SecuritySection />;
      case 'preferences':
        return <PreferencesSection />;
      case 'notifications':
        return <NotificationsSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Paramètres du Profil</h2>
          <p className="text-gray-600">Gérez vos informations personnelles et préférences</p>
        </div>
        
        {/* Status de sauvegarde */}
        {saveStatus !== 'idle' && (
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            saveStatus === 'saving' ? 'bg-blue-50 text-blue-700' :
            saveStatus === 'saved' ? 'bg-green-50 text-green-700' :
            'bg-red-50 text-red-700'
          }`}>
            {saveStatus === 'saving' && <Clock className="w-4 h-4 animate-spin" />}
            {saveStatus === 'saved' && <CheckCircle className="w-4 h-4" />}
            {saveStatus === 'error' && <AlertCircle className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {saveStatus === 'saving' && 'Sauvegarde en cours...'}
              {saveStatus === 'saved' && 'Modifications sauvegardées'}
              {saveStatus === 'error' && 'Erreur de sauvegarde'}
            </span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'profile', label: 'Profil', icon: User },
              { id: 'security', label: 'Sécurité', icon: Lock },
              { id: 'preferences', label: 'Préférences', icon: Settings },
              { id: 'notifications', label: 'Notifications', icon: Bell }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>

        {/* Save Button */}
        {(activeTab === 'profile' || activeTab === 'preferences' || activeTab === 'notifications') && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex justify-end space-x-3">
              {isEditing && (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              )}
              <button 
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saveStatus === 'saving' ? (
                  <Clock className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{saveStatus === 'saving' ? 'Sauvegarde...' : 'Enregistrer les Modifications'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;