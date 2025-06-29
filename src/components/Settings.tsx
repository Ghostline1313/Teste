import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Database,
  Shield,
  Save,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Key,
  Lock,
  UserPlus,
  UserCheck,
  UserX,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Crown,
  Settings2,
  Activity,
  FileText,
  Monitor,
  Zap,
  Globe,
  Server,
  HardDrive,
  Cpu,
  Wifi,
  Bell,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'administrateur' | 'geomaticien' | 'visiteur';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
  permissions: string[];
}

interface SecurityLog {
  id: string;
  timestamp: string;
  event: string;
  user: string;
  ip: string;
  status: 'success' | 'failed' | 'warning';
  details: string;
}

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface AdminAction {
  id: string;
  timestamp: string;
  admin: string;
  action: string;
  target: string;
  details: string;
  impact: 'low' | 'medium' | 'high';
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const tabs = [
    { id: 'admin', label: 'Admin/Gestionnaire', icon: Crown },
    { id: 'users', label: 'Utilisateurs', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'data', label: 'Données', icon: Database },
  ];

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Marie Dubois',
      email: 'marie.dubois@sonaged.com',
      role: 'administrateur',
      status: 'active',
      lastLogin: '2024-01-16T14:30:00Z',
      createdAt: '2023-06-15T09:00:00Z',
      permissions: ['read', 'write', 'delete', 'admin', 'manage_users', 'system_config']
    },
    {
      id: '2',
      name: 'Jean Martin',
      email: 'jean.martin@sonaged.com',
      role: 'geomaticien',
      status: 'active',
      lastLogin: '2024-01-16T11:45:00Z',
      createdAt: '2023-08-20T10:30:00Z',
      permissions: ['read', 'write', 'gis_analysis', 'map_editing', 'data_export']
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      email: 'sophie.laurent@sonaged.com',
      role: 'geomaticien',
      status: 'active',
      lastLogin: '2024-01-15T16:20:00Z',
      createdAt: '2023-09-10T14:15:00Z',
      permissions: ['read', 'write', 'gis_analysis', 'map_editing', 'data_export']
    },
    {
      id: '4',
      name: 'Pierre Durand',
      email: 'pierre.durand@sonaged.com',
      role: 'visiteur',
      status: 'active',
      lastLogin: '2024-01-16T08:30:00Z',
      createdAt: '2023-11-05T11:00:00Z',
      permissions: ['read', 'view_maps', 'view_reports']
    },
    {
      id: '5',
      name: 'Claire Moreau',
      email: 'claire.moreau@sonaged.com',
      role: 'visiteur',
      status: 'pending',
      lastLogin: 'Jamais connecté',
      createdAt: '2024-01-15T16:45:00Z',
      permissions: ['read']
    },
    {
      id: '6',
      name: 'Thomas Bernard',
      email: 'thomas.bernard@sonaged.com',
      role: 'geomaticien',
      status: 'inactive',
      lastLogin: '2024-01-10T12:15:00Z',
      createdAt: '2023-07-12T08:30:00Z',
      permissions: ['read', 'write', 'gis_analysis']
    }
  ];

  const mockSecurityLogs: SecurityLog[] = [
    {
      id: '1',
      timestamp: '2024-01-16T14:30:00Z',
      event: 'Connexion réussie',
      user: 'marie.dubois@sonaged.com',
      ip: '192.168.1.100',
      status: 'success',
      details: 'Connexion administrateur depuis le bureau principal'
    },
    {
      id: '2',
      timestamp: '2024-01-16T14:25:00Z',
      event: 'Tentative de connexion échouée',
      user: 'inconnu@test.com',
      ip: '203.45.67.89',
      status: 'failed',
      details: 'Mot de passe incorrect (3 tentatives)'
    },
    {
      id: '3',
      timestamp: '2024-01-16T13:15:00Z',
      event: 'Export de données SIG',
      user: 'jean.martin@sonaged.com',
      ip: '192.168.1.105',
      status: 'warning',
      details: 'Export shapefile de 500+ points par géomaticien'
    },
    {
      id: '4',
      timestamp: '2024-01-16T11:45:00Z',
      event: 'Connexion réussie',
      user: 'jean.martin@sonaged.com',
      ip: '192.168.1.105',
      status: 'success',
      details: 'Connexion géomaticien depuis poste SIG'
    },
    {
      id: '5',
      timestamp: '2024-01-16T10:30:00Z',
      event: 'Consultation de rapports',
      user: 'pierre.durand@sonaged.com',
      ip: '192.168.1.110',
      status: 'success',
      details: 'Accès visiteur aux rapports publics'
    }
  ];

  const mockSystemMetrics: SystemMetric[] = [
    { id: '1', name: 'CPU', value: 45, unit: '%', status: 'good', trend: 'stable' },
    { id: '2', name: 'RAM', value: 68, unit: '%', status: 'warning', trend: 'up' },
    { id: '3', name: 'Stockage', value: 23, unit: '%', status: 'good', trend: 'up' },
    { id: '4', name: 'Réseau', value: 156, unit: 'Mbps', status: 'good', trend: 'stable' },
    { id: '5', name: 'Base de données', value: 2.4, unit: 'GB', status: 'good', trend: 'up' },
    { id: '6', name: 'Utilisateurs actifs', value: 12, unit: '', status: 'good', trend: 'up' }
  ];

  const mockAdminActions: AdminAction[] = [
    {
      id: '1',
      timestamp: '2024-01-16T14:30:00Z',
      admin: 'Marie Dubois',
      action: 'Création utilisateur',
      target: 'claire.moreau@sonaged.com',
      details: 'Nouveau compte visiteur créé',
      impact: 'low'
    },
    {
      id: '2',
      timestamp: '2024-01-16T13:15:00Z',
      admin: 'Marie Dubois',
      action: 'Modification permissions',
      target: 'jean.martin@sonaged.com',
      details: 'Ajout permission export_data',
      impact: 'medium'
    },
    {
      id: '3',
      timestamp: '2024-01-16T11:20:00Z',
      admin: 'Marie Dubois',
      action: 'Sauvegarde système',
      target: 'Base de données',
      details: 'Sauvegarde manuelle déclenchée',
      impact: 'high'
    },
    {
      id: '4',
      timestamp: '2024-01-16T09:45:00Z',
      admin: 'Marie Dubois',
      action: 'Configuration sécurité',
      target: 'Politique 2FA',
      details: '2FA obligatoire pour administrateurs',
      impact: 'high'
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'administrateur':
        return 'bg-red-100 text-red-800';
      case 'geomaticien':
        return 'bg-blue-100 text-blue-800';
      case 'visiteur':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'administrateur':
        return 'Administrateur';
      case 'geomaticien':
        return 'Géomaticien';
      case 'visiteur':
        return 'Visiteur';
      default:
        return role;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'administrateur':
        return '👑'; // Couronne pour administrateur
      case 'geomaticien':
        return '🗺️'; // Carte pour géomaticien
      case 'visiteur':
        return '👁️'; // Œil pour visiteur
      default:
        return '👤';
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'administrateur':
        return 'Accès complet au système, gestion des utilisateurs et configuration';
      case 'geomaticien':
        return 'Analyse SIG, édition de cartes, export de données géospatiales';
      case 'visiteur':
        return 'Consultation des cartes et rapports en lecture seule';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'inactive':
        return 'Inactif';
      case 'pending':
        return 'En attente';
      default:
        return status;
    }
  };

  const getLogStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      case 'stable':
        return '➡️';
      default:
        return '➡️';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Statistiques par rôle
  const adminCount = mockUsers.filter(u => u.role === 'administrateur').length;
  const geomaticienCount = mockUsers.filter(u => u.role === 'geomaticien').length;
  const visiteurCount = mockUsers.filter(u => u.role === 'visiteur').length;
  const activeCount = mockUsers.filter(u => u.status === 'active').length;
  const pendingCount = mockUsers.filter(u => u.status === 'pending').length;
  const inactiveCount = mockUsers.filter(u => u.status === 'inactive').length;

  // ✅ NOUVELLE SECTION ADMIN/GESTIONNAIRE
  const AdminManagerSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <Crown className="w-6 h-6 mr-3 text-yellow-600" />
            Panneau d'Administration
          </h3>
          <p className="text-gray-600">Supervision et contrôle du système Geoportail Sonaged</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-600">Système Opérationnel</span>
        </div>
      </div>

      {/* Vue d'ensemble du système */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
        <h4 className="font-semibold text-yellow-900 mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2" />
          Vue d'Ensemble du Système
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockSystemMetrics.map((metric) => (
            <div key={metric.id} className={`p-4 rounded-lg border-2 ${getMetricStatusColor(metric.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-sm">{metric.name}</h5>
                <span className="text-lg">{getTrendIcon(metric.trend)}</span>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className="text-sm opacity-70">{metric.unit}</span>
              </div>
              <div className="mt-2">
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                  metric.status === 'good' ? 'bg-green-200 text-green-800' :
                  metric.status === 'warning' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  {metric.status === 'good' ? 'Normal' :
                   metric.status === 'warning' ? 'Attention' : 'Critique'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions d'administration rapides */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-blue-500" />
          Actions Rapides d'Administration
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h5 className="font-semibold text-gray-900">Nouvel Utilisateur</h5>
                <p className="text-sm text-gray-600">Créer un compte</p>
              </div>
            </div>
          </button>

          <button className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h5 className="font-semibold text-gray-900">Sauvegarde</h5>
                <p className="text-sm text-gray-600">Sauvegarder maintenant</p>
              </div>
            </div>
          </button>

          <button className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h5 className="font-semibold text-gray-900">Rapport Système</h5>
                <p className="text-sm text-gray-600">Générer rapport</p>
              </div>
            </div>
          </button>

          <button className="p-4 border-2 border-orange-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200">
                <Settings2 className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <h5 className="font-semibold text-gray-900">Configuration</h5>
                <p className="text-sm text-gray-600">Paramètres système</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Journal des actions administratives */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-500" />
            Journal des Actions Administratives
          </h4>
          <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
            <span>Actualiser</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Horodatage</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Administrateur</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Action</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Cible</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Impact</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Détails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockAdminActions.map((action) => (
                <tr key={action.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {new Date(action.timestamp).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-yellow-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{action.admin}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">{action.action}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{action.target}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(action.impact)}`}>
                      {action.impact === 'low' ? 'Faible' : 
                       action.impact === 'medium' ? 'Moyen' : 'Élevé'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{action.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configuration système avancée */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration serveur */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Server className="w-5 h-5 mr-2 text-blue-500" />
            Configuration Serveur
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Cpu className="w-5 h-5 text-blue-600" />
                <div>
                  <h5 className="font-medium text-blue-900">Mode Performance</h5>
                  <p className="text-sm text-blue-700">Optimisation automatique des ressources</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <HardDrive className="w-5 h-5 text-green-600" />
                <div>
                  <h5 className="font-medium text-green-900">Compression Données</h5>
                  <p className="text-sm text-green-700">Compression automatique des archives</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Wifi className="w-5 h-5 text-purple-600" />
                <div>
                  <h5 className="font-medium text-purple-900">Cache Intelligent</h5>
                  <p className="text-sm text-purple-700">Mise en cache des données fréquentes</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications administrateur */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-500" />
            Notifications Administrateur
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <h5 className="font-medium text-red-900">Alertes Critiques</h5>
                  <p className="text-sm text-red-700">Notifications immédiates par email et SMS</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-600" />
                <div>
                  <h5 className="font-medium text-yellow-900">Rapports Quotidiens</h5>
                  <p className="text-sm text-yellow-700">Résumé quotidien par email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <div>
                  <h5 className="font-medium text-blue-900">Activité Utilisateurs</h5>
                  <p className="text-sm text-blue-700">Notifications d'activité suspecte</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Configuration des contacts */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-3">Contacts d'Urgence</h5>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value="admin@sonaged.com"
                    className="flex-1 text-sm border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <input
                    type="tel"
                    value="+33 1 23 45 67 89"
                    className="flex-1 text-sm border border-gray-300 rounded px-2 py-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance et diagnostics */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Settings2 className="w-5 h-5 mr-2 text-gray-500" />
          Maintenance et Diagnostics
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-left">
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <h5 className="font-semibold text-blue-900">Test Système</h5>
            </div>
            <p className="text-sm text-blue-700">Vérifier l'intégrité du système</p>
          </button>

          <button className="p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors text-left">
            <div className="flex items-center space-x-3 mb-2">
              <RefreshCw className="w-5 h-5 text-green-600" />
              <h5 className="font-semibold text-green-900">Redémarrage</h5>
            </div>
            <p className="text-sm text-green-700">Redémarrer les services système</p>
          </button>

          <button className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left">
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <h5 className="font-semibold text-purple-900">Logs Système</h5>
            </div>
            <p className="text-sm text-purple-700">Consulter les journaux détaillés</p>
          </button>
        </div>
      </div>
    </div>
  );

  const UsersSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestion des Utilisateurs</h3>
          <p className="text-gray-600">Gérez les comptes utilisateurs : Administrateurs, Géomaticiens et Visiteurs</p>
        </div>
        <button 
          onClick={() => setShowAddUser(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Nouvel Utilisateur</span>
        </button>
      </div>

      {/* Statistiques par rôle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">👑</div>
            <div>
              <p className="text-sm font-medium text-red-600">Administrateurs</p>
              <p className="text-2xl font-bold text-red-900">{adminCount}</p>
              <p className="text-xs text-red-700">Accès complet au système</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🗺️</div>
            <div>
              <p className="text-sm font-medium text-blue-600">Géomaticiens</p>
              <p className="text-2xl font-bold text-blue-900">{geomaticienCount}</p>
              <p className="text-xs text-blue-700">Analyse SIG et cartographie</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">👁️</div>
            <div>
              <p className="text-sm font-medium text-green-600">Visiteurs</p>
              <p className="text-2xl font-bold text-green-900">{visiteurCount}</p>
              <p className="text-xs text-green-700">Consultation en lecture seule</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques par statut */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600">Total Utilisateurs</p>
              <p className="text-xl font-bold text-blue-900">{mockUsers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-600">Actifs</p>
              <p className="text-xl font-bold text-green-900">{activeCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-600">En Attente</p>
              <p className="text-xl font-bold text-yellow-900">{pendingCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <UserX className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-600">Inactifs</p>
              <p className="text-xl font-bold text-red-900">{inactiveCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Tous les rôles</option>
            <option value="administrateur">Administrateur</option>
            <option value="geomaticien">Géomaticien</option>
            <option value="visiteur">Visiteur</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>{filteredUsers.length} utilisateur(s)</span>
          </div>
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Utilisateur</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Rôle</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Statut</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Dernière Connexion</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getRoleIcon(user.role)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {getRoleText(user.role)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusText(user.status)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">
                      {user.lastLogin === 'Jamais connecté' 
                        ? user.lastLogin 
                        : new Date(user.lastLogin).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                      }
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Détails Utilisateur */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Détails de l'Utilisateur</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h4>
                    <p className="text-gray-600">{selectedUser.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-lg">{getRoleIcon(selectedUser.role)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                        {getRoleText(selectedUser.role)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                        {getStatusText(selectedUser.status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description du rôle */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold text-gray-800 mb-2">Description du rôle</h5>
                  <p className="text-sm text-gray-600">{getRoleDescription(selectedUser.role)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Créé le</label>
                    <p className="text-gray-900">{new Date(selectedUser.createdAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Dernière connexion</label>
                    <p className="text-gray-900">
                      {selectedUser.lastLogin === 'Jamais connecté' 
                        ? selectedUser.lastLogin 
                        : new Date(selectedUser.lastLogin).toLocaleDateString('fr-FR')
                      }
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">Permissions</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.permissions.map((permission, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Modifier
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Réinitialiser Mot de Passe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nouvel Utilisateur */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Nouvel Utilisateur</h3>
                <button
                  onClick={() => setShowAddUser(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                    <input
                      type="text"
                      placeholder="Ex: Jean Dupont"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="jean.dupont@sonaged.com"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Rôle</label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { value: 'administrateur', icon: '👑', title: 'Administrateur', desc: 'Accès complet au système, gestion des utilisateurs et configuration' },
                      { value: 'geomaticien', icon: '🗺️', title: 'Géomaticien', desc: 'Analyse SIG, édition de cartes, export de données géospatiales' },
                      { value: 'visiteur', icon: '👁️', title: 'Visiteur', desc: 'Consultation des cartes et rapports en lecture seule' }
                    ].map((role) => (
                      <label key={role.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="radio" name="role" value={role.value} className="text-blue-600" />
                        <div className="text-2xl">{role.icon}</div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{role.title}</h5>
                          <p className="text-sm text-gray-600">{role.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowAddUser(false)}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Créer l'Utilisateur
                  </button>
                  <button 
                    onClick={() => setShowAddUser(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Paramètres de Sécurité</h3>
        <p className="text-gray-600">Configurez la sécurité et surveillez les activités</p>
      </div>

      {/* Politique de Mot de Passe */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Key className="w-5 h-5 mr-2 text-blue-500" />
          Politique de Mot de Passe
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longueur Minimale
            </label>
            <input
              type="number"
              value="8"
              min="6"
              max="20"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiration (jours)
            </label>
            <input
              type="number"
              value="90"
              min="30"
              max="365"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <div className="flex items-center space-x-3">
            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
            <span className="text-sm text-gray-700">Exiger des caractères majuscules</span>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
            <span className="text-sm text-gray-700">Exiger des caractères minuscules</span>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
            <span className="text-sm text-gray-700">Exiger des chiffres</span>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-sm text-gray-700">Exiger des caractères spéciaux</span>
          </div>
        </div>
      </div>

      {/* Authentification à Deux Facteurs */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-green-500" />
          Authentification à Deux Facteurs (2FA)
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <h5 className="font-medium text-red-900">2FA Obligatoire pour Administrateurs</h5>
              <p className="text-sm text-red-700">Exiger la 2FA pour tous les comptes administrateurs</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h5 className="font-medium text-blue-900">2FA Recommandée pour Géomaticiens</h5>
              <p className="text-sm text-blue-700">Recommander la 2FA pour les comptes géomaticiens</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <h5 className="font-medium text-green-900">2FA Optionnelle pour Visiteurs</h5>
              <p className="text-sm text-green-700">Permettre aux visiteurs d'activer la 2FA</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Sessions et Connexions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-purple-500" />
          Sessions et Connexions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée de Session (minutes)
            </label>
            <input
              type="number"
              value="480"
              min="30"
              max="1440"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tentatives de Connexion Max
            </label>
            <input
              type="number"
              value="5"
              min="3"
              max="10"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Journal de Sécurité */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Journal de Sécurité
          </h4>
          <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
            <span>Actualiser</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-900">Horodatage</th>
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-900">Événement</th>
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-900">Utilisateur</th>
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-900">IP</th>
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-900">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockSecurityLogs.slice(0, 5).map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-sm text-gray-900">
                    {new Date(log.timestamp).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-900">{log.event}</td>
                  <td className="py-2 px-3 text-sm text-gray-600">{log.user}</td>
                  <td className="py-2 px-3 text-sm text-gray-600 font-mono">{log.ip}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLogStatusColor(log.status)}`}>
                      {log.status === 'success' ? 'Succès' : 
                       log.status === 'failed' ? 'Échec' : 'Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Voir tous les logs de sécurité →
          </button>
        </div>
      </div>
    </div>
  );

  const DataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Paramètres des Données</h3>
        <p className="text-gray-600">Configuration de la gestion et sauvegarde des données</p>
      </div>

      {/* Sauvegarde Automatique */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2 text-blue-500" />
          Sauvegarde Automatique
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fréquence de Sauvegarde
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="daily">Quotidienne</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuelle</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heure de Sauvegarde
            </label>
            <input
              type="time"
              value="02:00"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rétention (jours)
            </label>
            <input
              type="number"
              value="30"
              min="7"
              max="365"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emplacement de Sauvegarde
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="local">Serveur Local</option>
              <option value="cloud">Cloud Storage</option>
              <option value="both">Les Deux</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div>
            <h5 className="font-medium text-green-900">Sauvegarde Automatique Active</h5>
            <p className="text-sm text-green-700">Prochaine sauvegarde: Aujourd'hui à 02:00</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Sauvegarder Maintenant
          </button>
        </div>
      </div>

      {/* Archivage des Données */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Download className="w-5 h-5 mr-2 text-purple-500" />
          Archivage des Données
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div>
              <h5 className="font-medium text-purple-900">Archivage Automatique</h5>
              <p className="text-sm text-purple-700">Archiver automatiquement les données anciennes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archiver après (mois)
              </label>
              <input
                type="number"
                value="12"
                min="6"
                max="60"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format d'Archive
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option value="zip">ZIP</option>
                <option value="tar">TAR</option>
                <option value="7z">7Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Purge des Données */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Trash2 className="w-5 h-5 mr-2 text-red-500" />
          Purge des Données
        </h4>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-red-900">Attention: Suppression Définitive</h5>
                <p className="text-sm text-red-700 mt-1">
                  La purge supprime définitivement les données. Cette action est irréversible.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purger après (années)
              </label>
              <input
                type="number"
                value="5"
                min="2"
                max="10"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Types de Données à Purger
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option value="logs">Logs uniquement</option>
                <option value="temp">Données temporaires</option>
                <option value="all">Toutes les données anciennes</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-sm text-gray-700">Activer la purge automatique</span>
          </div>
        </div>
      </div>

      {/* Statistiques de Stockage */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
          Utilisation du Stockage
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-900">2.4 GB</p>
            <p className="text-sm text-blue-600">Base de Données</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-900">1.8 GB</p>
            <p className="text-sm text-green-600">Fichiers Uploadés</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-900">856 MB</p>
            <p className="text-sm text-purple-600">Sauvegardes</p>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Espace Utilisé</span>
            <span className="text-sm text-gray-600">5.1 GB / 50 GB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full" style={{ width: '10.2%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'admin':
        return <AdminManagerSettings />;
      case 'users':
        return <UsersSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'data':
        return <DataSettings />;
      default:
        return <AdminManagerSettings />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Paramètres</h2>
        <p className="text-gray-600">Configuration du Geoportail Sonaged</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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
                  {tab.id === 'admin' && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                      ACTIF
                    </span>
                  )}
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
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex justify-end">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Enregistrer les Modifications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;