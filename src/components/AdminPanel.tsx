import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Database, 
  Settings, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Server, 
  HardDrive, 
  Cpu, 
  Wifi, 
  Lock, 
  Key, 
  UserPlus, 
  UserMinus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  RefreshCw,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Globe,
  Mail,
  Phone
} from 'lucide-react';

interface SystemMetric {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  icon: any;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrateur' | 'Géomaticien' | 'Visiteur';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdAt: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'system' | 'security' | 'logs'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'Administrateur' | 'Géomaticien' | 'Visiteur'>('all');
  const [showAddUser, setShowAddUser] = useState(false);

  const systemMetrics: SystemMetric[] = [
    {
      name: 'CPU',
      value: '23%',
      status: 'good',
      trend: 'stable',
      icon: Cpu
    },
    {
      name: 'Mémoire',
      value: '67%',
      status: 'warning',
      trend: 'up',
      icon: HardDrive
    },
    {
      name: 'Stockage',
      value: '45%',
      status: 'good',
      trend: 'down',
      icon: Database
    },
    {
      name: 'Réseau',
      value: '98%',
      status: 'good',
      trend: 'stable',
      icon: Wifi
    }
  ];

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'admin@sonaged.com',
      role: 'Administrateur',
      status: 'active',
      lastLogin: '2024-01-16T09:15:00Z',
      createdAt: '2023-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@sonaged.com',
      role: 'Géomaticien',
      status: 'active',
      lastLogin: '2024-01-16T08:30:00Z',
      createdAt: '2023-03-20T14:30:00Z'
    },
    {
      id: '3',
      name: 'Pierre Durand',
      email: 'pierre.durand@sonaged.com',
      role: 'Géomaticien',
      status: 'inactive',
      lastLogin: '2024-01-14T16:45:00Z',
      createdAt: '2023-06-10T09:15:00Z'
    },
    {
      id: '4',
      name: 'Sophie Laurent',
      email: 'sophie.laurent@sonaged.com',
      role: 'Visiteur',
      status: 'active',
      lastLogin: '2024-01-16T07:20:00Z',
      createdAt: '2023-09-05T11:00:00Z'
    },
    {
      id: '5',
      name: 'Thomas Bernard',
      email: 'thomas.bernard@sonaged.com',
      role: 'Visiteur',
      status: 'suspended',
      lastLogin: '2024-01-12T13:10:00Z',
      createdAt: '2023-11-18T16:45:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'warning':
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrateur':
        return 'bg-red-100 text-red-800';
      case 'Géomaticien':
        return 'bg-blue-100 text-blue-800';
      case 'Visiteur':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return TrendingUp;
      case 'down':
        return TrendingDown;
      default:
        return BarChart3;
    }
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const OverviewSection = () => (
    <div className="space-y-6">
      {/* Métriques système */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = getTrendIcon(metric.trend);
          
          return (
            <div key={metric.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  metric.status === 'good' ? 'bg-green-100' :
                  metric.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    metric.status === 'good' ? 'text-green-600' :
                    metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                </div>
                <TrendIcon className={`w-4 h-4 ${
                  metric.trend === 'up' ? 'text-red-500' :
                  metric.trend === 'down' ? 'text-green-500' : 'text-gray-500'
                }`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{metric.name}</h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(metric.status)}`}>
                {metric.status === 'good' ? 'Normal' :
                 metric.status === 'warning' ? 'Attention' : 'Critique'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Utilisateurs</h3>
              <p className="text-sm text-gray-600">Total des comptes</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">{mockUsers.length}</p>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-green-600">
              {mockUsers.filter(u => u.status === 'active').length} actifs
            </span>
            <span className="text-red-600">
              {mockUsers.filter(u => u.status === 'suspended').length} suspendus
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Sessions</h3>
              <p className="text-sm text-gray-600">Connexions actives</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">12</p>
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+15% cette semaine</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Alertes</h3>
              <p className="text-sm text-gray-600">Dernières 24h</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">3</p>
          <div className="flex items-center space-x-2 text-sm text-orange-600">
            <Clock className="w-4 h-4" />
            <span>2 en attente</span>
          </div>
        </div>
      </div>

      {/* Activité récente */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Activité Récente</h3>
        <div className="space-y-4">
          {[
            { action: 'Connexion utilisateur', user: 'Marie Martin', time: 'Il y a 5 minutes', type: 'login' },
            { action: 'Modification des paramètres', user: 'Jean Dupont', time: 'Il y a 15 minutes', type: 'settings' },
            { action: 'Export de données', user: 'Sophie Laurent', time: 'Il y a 1 heure', type: 'export' },
            { action: 'Création d\'utilisateur', user: 'Jean Dupont', time: 'Il y a 2 heures', type: 'user' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${
                activity.type === 'login' ? 'bg-green-100' :
                activity.type === 'settings' ? 'bg-blue-100' :
                activity.type === 'export' ? 'bg-purple-100' : 'bg-orange-100'
              }`}>
                {activity.type === 'login' && <Users className="w-4 h-4 text-green-600" />}
                {activity.type === 'settings' && <Settings className="w-4 h-4 text-blue-600" />}
                {activity.type === 'export' && <Download className="w-4 h-4 text-purple-600" />}
                {activity.type === 'user' && <UserPlus className="w-4 h-4 text-orange-600" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">par {activity.user}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const UsersSection = () => (
    <div className="space-y-6">
      {/* Header avec actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Gestion des Utilisateurs</h3>
          <p className="text-gray-600">Gérez les comptes et permissions des utilisateurs</p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Nouvel Utilisateur</span>
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
            onChange={(e) => setFilterRole(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Tous les rôles</option>
            <option value="Administrateur">Administrateur</option>
            <option value="Géomaticien">Géomaticien</option>
            <option value="Visiteur">Visiteur</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>{filteredUsers.length} utilisateur(s)</span>
          </div>
        </div>
      </div>

      {/* Statistiques des rôles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { role: 'Administrateur', count: mockUsers.filter(u => u.role === 'Administrateur').length, color: 'red' },
          { role: 'Géomaticien', count: mockUsers.filter(u => u.role === 'Géomaticien').length, color: 'blue' },
          { role: 'Visiteur', count: mockUsers.filter(u => u.role === 'Visiteur').length, color: 'gray' }
        ].map((stat) => (
          <div key={stat.role} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                <Shield className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{stat.role}</h4>
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Liste des utilisateurs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière connexion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status === 'active' ? 'Actif' :
                       user.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(user.lastLogin).toLocaleDateString('fr-FR')} à {new Date(user.lastLogin).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 rounded">
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

      {/* Modal d'ajout d'utilisateur */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Nouvel Utilisateur</h3>
              <button
                onClick={() => setShowAddUser(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="jean.dupont@sonaged.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rôle
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="Visiteur">Visiteur</option>
                  <option value="Géomaticien">Géomaticien</option>
                  <option value="Administrateur">Administrateur</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe temporaire
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddUser(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  setShowAddUser(false);
                  alert('Utilisateur créé avec succès !');
                }}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const SystemSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Surveillance Système</h3>
        <p className="text-gray-600">Monitoring des performances et de la santé du système</p>
      </div>

      {/* Métriques détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systemMetrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = getTrendIcon(metric.trend);
          
          return (
            <div key={metric.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${
                    metric.status === 'good' ? 'bg-green-100' :
                    metric.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      metric.status === 'good' ? 'text-green-600' :
                      metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{metric.name}</h4>
                    <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <TrendIcon className={`w-6 h-6 mb-2 ${
                    metric.trend === 'up' ? 'text-red-500' :
                    metric.trend === 'down' ? 'text-green-500' : 'text-gray-500'
                  }`} />
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status === 'good' ? 'Normal' :
                     metric.status === 'warning' ? 'Attention' : 'Critique'}
                  </span>
                </div>
              </div>
              
              {/* Barre de progression */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    metric.status === 'good' ? 'bg-green-500' :
                    metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: metric.value }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Services système */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Services Système</h4>
        <div className="space-y-3">
          {[
            { name: 'Base de données', status: 'running', uptime: '99.9%' },
            { name: 'Serveur web', status: 'running', uptime: '99.8%' },
            { name: 'Service de géolocalisation', status: 'running', uptime: '99.7%' },
            { name: 'Service de notifications', status: 'warning', uptime: '98.5%' },
            { name: 'Backup automatique', status: 'running', uptime: '100%' }
          ].map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  service.status === 'running' ? 'bg-green-500' :
                  service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="font-medium text-gray-900">{service.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Uptime: {service.uptime}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  service.status === 'running' ? 'bg-green-100 text-green-800' :
                  service.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {service.status === 'running' ? 'En marche' :
                   service.status === 'warning' ? 'Attention' : 'Arrêté'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sécurité Système</h3>
        <p className="text-gray-600">Configuration et monitoring de la sécurité</p>
      </div>

      {/* Alertes de sécurité */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h4 className="font-semibold text-red-900">Alertes de Sécurité</h4>
        </div>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Tentative de connexion suspecte</p>
                <p className="text-sm text-gray-600">IP: 192.168.1.100 - Il y a 2 heures</p>
              </div>
              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                Investiguer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration de sécurité */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-blue-500" />
            Authentification
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Authentification à deux facteurs</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Activé
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Complexité des mots de passe</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Forte
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Expiration des sessions</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                24h
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-500" />
            Protection
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Pare-feu</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Actif
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Chiffrement SSL/TLS</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Activé
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Sauvegarde chiffrée</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Activé
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LogsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Journaux Système</h3>
          <p className="text-gray-600">Historique des événements et activités</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50">
          <RefreshCw className="w-4 h-4" />
          <span>Actualiser</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Tous les logs</option>
              <option>Connexions</option>
              <option>Erreurs</option>
              <option>Sécurité</option>
              <option>Système</option>
            </select>
            <input
              type="text"
              placeholder="Rechercher dans les logs..."
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-1 p-4">
            {[
              { time: '2024-01-16 09:15:23', level: 'INFO', message: 'Connexion utilisateur: marie.martin@sonaged.com', ip: '192.168.1.50' },
              { time: '2024-01-16 09:10:15', level: 'WARN', message: 'Tentative de connexion échouée', ip: '192.168.1.100' },
              { time: '2024-01-16 09:05:42', level: 'INFO', message: 'Sauvegarde automatique terminée', ip: 'SYSTEM' },
              { time: '2024-01-16 08:58:31', level: 'ERROR', message: 'Erreur de connexion à la base de données', ip: 'SYSTEM' },
              { time: '2024-01-16 08:45:12', level: 'INFO', message: 'Démarrage du service de géolocalisation', ip: 'SYSTEM' }
            ].map((log, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg text-sm font-mono">
                <span className="text-gray-500 w-32">{log.time}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium w-16 text-center ${
                  log.level === 'INFO' ? 'bg-blue-100 text-blue-800' :
                  log.level === 'WARN' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {log.level}
                </span>
                <span className="flex-1 text-gray-900">{log.message}</span>
                <span className="text-gray-500 w-24">{log.ip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection />;
      case 'users':
        return <UsersSection />;
      case 'system':
        return <SystemSection />;
      case 'security':
        return <SecuritySection />;
      case 'logs':
        return <LogsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Panneau d'Administration</h2>
          <p className="text-gray-600">Gestion système avancée et surveillance</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-green-600 font-medium">Système opérationnel</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'users', label: 'Utilisateurs', icon: Users },
              { id: 'system', label: 'Système', icon: Server },
              { id: 'security', label: 'Sécurité', icon: Shield },
              { id: 'logs', label: 'Journaux', icon: Activity }
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
      </div>
    </div>
  );
};

export default AdminPanel;