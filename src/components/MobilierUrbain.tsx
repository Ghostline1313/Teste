import React, { useState } from 'react';
import { 
  Building2, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Search, 
  Calendar, 
  Wrench, 
  Package, 
  Recycle as Recycle2, 
  Trash, 
  Navigation,
  Upload,
  FileText,
  CheckCircle,
  X,
  Map as MapIcon,
  ArrowRight
} from 'lucide-react';
import { mockUrbanFurniture } from '../data/mockData';
import { UrbanFurniture } from '../types';

const MobilierUrbain: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState<'all' | 'PRN' | 'PP' | 'Bacs' | 'Decharge'>('all');
  const [selectedItem, setSelectedItem] = useState<UrbanFurniture | null>(null);
  
  // États pour le téléversement GeoJSON avec sélection de type
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedMobilierType, setSelectedMobilierType] = useState<'PRN' | 'PP' | 'Bacs' | 'Decharge' | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'damaged': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'maintenance': return 'Maintenance';
      case 'inactive': return 'Inactif';
      case 'damaged': return 'Endommagé';
      default: return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PRN': return 'bg-blue-100 text-blue-800';
      case 'PP': return 'bg-green-100 text-green-800';
      case 'Bacs': return 'bg-purple-100 text-purple-800';
      case 'Decharge': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PRN': return Package;
      case 'PP': return Recycle2;
      case 'Bacs': return Trash;
      case 'Decharge': return Building2;
      default: return Building2;
    }
  };

  const getTypeDescription = (type: string) => {
    switch (type) {
      case 'PRN': return 'Point de Regroupement Normalisé';
      case 'PP': return 'Point de Propreté';
      case 'Bacs': return 'Bacs de Collecte';
      case 'Decharge': return 'Point de Décharge';
      default: return type;
    }
  };

  // Options de types de mobilier pour la sélection
  const mobilierTypeOptions = [
    {
      value: 'PRN',
      label: 'PRN',
      fullName: 'Points de Regroupement Normalisés',
      description: 'Points de regroupement normalisés pour la collecte des déchets ménagers et assimilés',
      icon: Package,
      color: 'blue',
      emoji: '📦'
    },
    {
      value: 'PP',
      label: 'PP',
      fullName: 'Points de Propreté',
      description: 'Points de propreté pour le tri sélectif et le recyclage des déchets',
      icon: Recycle2,
      color: 'green',
      emoji: '♻️'
    },
    {
      value: 'Bacs',
      label: 'Bacs',
      fullName: 'Bacs de Collecte',
      description: 'Bacs de collecte sélective et conteneurs spécialisés pour différents types de déchets',
      icon: Trash,
      color: 'purple',
      emoji: '🗑️'
    },
    {
      value: 'Decharge',
      label: 'Décharge',
      fullName: 'Points de Décharge',
      description: 'Points de décharge pour déchets volumineux, spéciaux et matériaux de construction',
      icon: Building2,
      color: 'orange',
      emoji: '🏭'
    }
  ];

  // Fonctions de gestion du téléversement GeoJSON
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    // Vérifier que c'est un fichier GeoJSON
    if (!file.name.toLowerCase().endsWith('.geojson') && !file.name.toLowerCase().endsWith('.json')) {
      alert('Veuillez sélectionner un fichier GeoJSON (.geojson ou .json)');
      return;
    }

    setUploadedFile(file);
    setUploadProgress(0);
    setUploadSuccess(false);
    
    // Simulation du processus d'upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadSuccess(true);
            setUploadProgress(null);
          }, 500);
          return 100;
        }
        return prev + 12;
      });
    }, 250);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadProgress(null);
    setUploadSuccess(false);
    setDragActive(false);
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setSelectedMobilierType(null);
    resetUpload();
  };

  const startUploadProcess = () => {
    setShowUploadModal(true);
    setSelectedMobilierType(null);
  };

  const filteredItems = mockUrbanFurniture.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = filterType === 'all' || item.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const prnCount = mockUrbanFurniture.filter(item => item.type === 'PRN').length;
  const ppCount = mockUrbanFurniture.filter(item => item.type === 'PP').length;
  const bacsCount = mockUrbanFurniture.filter(item => item.type === 'Bacs').length;
  const dechargeCount = mockUrbanFurniture.filter(item => item.type === 'Decharge').length;

  const handleViewOnMap = (item: UrbanFurniture) => {
    // Cette fonction sera appelée pour afficher l'élément sur la carte
    console.log('Afficher sur la carte:', item);
    // Ici on pourrait déclencher une navigation vers la cartographie avec les coordonnées
    // ou ouvrir un modal avec une mini-carte
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mobilier Urbain</h2>
          <p className="text-gray-600">Gestion du mobilier urbain de collecte des déchets</p>
        </div>
        {/* Bouton Téléverser GeoJSON */}
        <button 
          onClick={startUploadProcess}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg"
        >
          <Upload className="w-4 h-4" />
          <span>Téléverser GeoJSON</span>
        </button>
      </div>

      {/* Type Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">PRN</p>
              <p className="text-2xl font-bold text-gray-900">{prnCount}</p>
              <p className="text-xs text-gray-500">Points Regroupement</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Recycle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">PP</p>
              <p className="text-2xl font-bold text-gray-900">{ppCount}</p>
              <p className="text-xs text-gray-500">Points Propreté</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Trash className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Bacs</p>
              <p className="text-2xl font-bold text-gray-900">{bacsCount}</p>
              <p className="text-xs text-gray-500">Bacs Collecte</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Building2 className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Décharge</p>
              <p className="text-2xl font-bold text-gray-900">{dechargeCount}</p>
              <p className="text-xs text-gray-500">Points Décharge</p>
            </div>
          </div>
        </div>
      </div>

      {/* Type Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Type de Mobilier</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Building2 className="w-4 h-4 inline mr-2" />
            Tous ({mockUrbanFurniture.length})
          </button>
          <button
            onClick={() => setFilterType('PRN')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'PRN'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            PRN ({prnCount})
          </button>
          <button
            onClick={() => setFilterType('PP')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'PP'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Recycle2 className="w-4 h-4 inline mr-2" />
            PP ({ppCount})
          </button>
          <button
            onClick={() => setFilterType('Bacs')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'Bacs'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Trash className="w-4 h-4 inline mr-2" />
            Bacs ({bacsCount})
          </button>
          <button
            onClick={() => setFilterType('Decharge')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'Decharge'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Building2 className="w-4 h-4 inline mr-2" />
            Décharge ({dechargeCount})
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactif</option>
            <option value="damaged">Endommagé</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>{filteredItems.length} résultat(s)</span>
          </div>
        </div>
      </div>

      {/* Current Filter Info */}
      {filterType !== 'all' && (
        <div className={`rounded-lg p-4 ${
          filterType === 'PRN' ? 'bg-blue-50 border border-blue-200' :
          filterType === 'PP' ? 'bg-green-50 border border-green-200' :
          filterType === 'Bacs' ? 'bg-purple-50 border border-purple-200' :
          'bg-orange-50 border border-orange-200'
        }`}>
          <div className="flex items-center space-x-3">
            {React.createElement(getTypeIcon(filterType), { 
              className: `w-5 h-5 ${
                filterType === 'PRN' ? 'text-blue-600' :
                filterType === 'PP' ? 'text-green-600' :
                filterType === 'Bacs' ? 'text-purple-600' :
                'text-orange-600'
              }` 
            })}
            <div>
              <h4 className={`font-semibold ${
                filterType === 'PRN' ? 'text-blue-800' :
                filterType === 'PP' ? 'text-green-800' :
                filterType === 'Bacs' ? 'text-purple-800' :
                'text-orange-800'
              }`}>
                {getTypeDescription(filterType)}
              </h4>
              <p className={`text-sm ${
                filterType === 'PRN' ? 'text-blue-700' :
                filterType === 'PP' ? 'text-green-700' :
                filterType === 'Bacs' ? 'text-purple-700' :
                'text-orange-700'
              }`}>
                {filterType === 'PRN' ? 'Points de regroupement normalisés pour la collecte des déchets' :
                 filterType === 'PP' ? 'Points de propreté pour le tri sélectif et recyclage' :
                 filterType === 'Bacs' ? 'Bacs de collecte sélective et conteneurs spécialisés' :
                 'Points de décharge pour déchets volumineux et spéciaux'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const TypeIcon = getTypeIcon(item.type);
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <TypeIcon className={`w-4 h-4 ${
                        item.type === 'PRN' ? 'text-blue-500' :
                        item.type === 'PP' ? 'text-green-500' :
                        item.type === 'Bacs' ? 'text-purple-500' :
                        'text-orange-500'
                      }`} />
                    </div>
                    <p className="text-sm text-gray-600">{item.address}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                  {item.capacity && (
                    <span className="text-xs text-gray-500">Capacité: {item.capacity}L</span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                {/* Fill Level (if applicable) */}
                {item.capacity && item.currentLevel !== undefined && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Remplissage</span>
                      <span className="text-sm font-bold text-gray-900">{item.currentLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          item.currentLevel > 90 ? 'bg-red-500' :
                          item.currentLevel > 70 ? 'bg-orange-500' :
                          item.currentLevel > 30 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(item.currentLevel, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Wrench className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Dernière</span>
                    </div>
                    <p className="text-xs font-medium text-gray-900">
                      {new Date(item.lastMaintenance).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Prochaine</span>
                    </div>
                    <p className="text-xs font-medium text-gray-900">
                      {new Date(item.nextMaintenance).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                {/* Alert */}
                {item.status === 'damaged' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-red-800">Réparation requise</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Voir</span>
                  </button>
                  <button
                    onClick={() => handleViewOnMap(item)}
                    className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center space-x-1"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Carte</span>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun mobilier trouvé</h3>
          <p className="text-gray-600">
            {filterType !== 'all' 
              ? `Aucun ${getTypeDescription(filterType).toLowerCase()} ne correspond à vos critères`
              : 'Essayez de modifier vos filtres de recherche'
            }
          </p>
        </div>
      )}

      {/* Modal de Téléversement GeoJSON avec Sélection de Type */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Upload className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Téléverser un Mobilier Urbain GeoJSON</h3>
                    <p className="text-sm text-gray-600">Importez des données géospatiales de mobilier urbain</p>
                  </div>
                </div>
                <button
                  onClick={closeUploadModal}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Étape 1: Sélection du type de mobilier */}
              {!selectedMobilierType && !uploadSuccess && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Sélectionnez le type de mobilier urbain
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Choisissez le type de mobilier que contient votre fichier GeoJSON
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mobilierTypeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => setSelectedMobilierType(option.value as any)}
                          className={`group p-6 border-2 rounded-xl hover:shadow-lg transition-all duration-300 text-left ${
                            option.color === 'blue' ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50' :
                            option.color === 'green' ? 'border-green-200 hover:border-green-400 hover:bg-green-50' :
                            option.color === 'purple' ? 'border-purple-200 hover:border-purple-400 hover:bg-purple-50' :
                            'border-orange-200 hover:border-orange-400 hover:bg-orange-50'
                          }`}
                        >
                          <div className="flex items-center space-x-4 mb-4">
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-colors ${
                              option.color === 'blue' ? 'bg-blue-100 group-hover:bg-blue-200' :
                              option.color === 'green' ? 'bg-green-100 group-hover:bg-green-200' :
                              option.color === 'purple' ? 'bg-purple-100 group-hover:bg-purple-200' :
                              'bg-orange-100 group-hover:bg-orange-200'
                            }`}>
                              <Icon className={`w-8 h-8 ${
                                option.color === 'blue' ? 'text-blue-600' :
                                option.color === 'green' ? 'text-green-600' :
                                option.color === 'purple' ? 'text-purple-600' :
                                'text-orange-600'
                              }`} />
                            </div>
                            <div>
                              <h5 className="text-xl font-bold text-gray-900 mb-1">{option.fullName}</h5>
                              <p className={`font-medium ${
                                option.color === 'blue' ? 'text-blue-600' :
                                option.color === 'green' ? 'text-green-600' :
                                option.color === 'purple' ? 'text-purple-600' :
                                'text-orange-600'
                              }`}>
                                {option.emoji} {option.label}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {option.description}
                          </p>
                          <div className={`flex items-center font-medium ${
                            option.color === 'blue' ? 'text-blue-600' :
                            option.color === 'green' ? 'text-green-600' :
                            option.color === 'purple' ? 'text-purple-600' :
                            'text-orange-600'
                          }`}>
                            <span>Sélectionner ce type</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Informations supplémentaires */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h5 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Informations importantes
                    </h5>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>• <strong>PRN :</strong> Points de regroupement pour déchets ménagers et assimilés</p>
                      <p>• <strong>PP :</strong> Points de propreté pour tri sélectif et recyclage</p>
                      <p>• <strong>Bacs :</strong> Conteneurs et bacs de collecte spécialisés</p>
                      <p>• <strong>Décharge :</strong> Points de décharge pour déchets volumineux et spéciaux</p>
                      <p>• Cette sélection déterminera comment vos données seront catégorisées</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Étape 2: Zone de téléversement */}
              {selectedMobilierType && !uploadSuccess && (
                <div className="space-y-6">
                  {/* Confirmation du type sélectionné */}
                  <div className={`p-4 rounded-xl border-2 ${
                    selectedMobilierType === 'PRN' ? 'bg-blue-50 border-blue-200' :
                    selectedMobilierType === 'PP' ? 'bg-green-50 border-green-200' :
                    selectedMobilierType === 'Bacs' ? 'bg-purple-50 border-purple-200' :
                    'bg-orange-50 border-orange-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {React.createElement(getTypeIcon(selectedMobilierType), {
                          className: `w-6 h-6 ${
                            selectedMobilierType === 'PRN' ? 'text-blue-600' :
                            selectedMobilierType === 'PP' ? 'text-green-600' :
                            selectedMobilierType === 'Bacs' ? 'text-purple-600' :
                            'text-orange-600'
                          }`
                        })}
                        <div>
                          <h5 className={`font-semibold ${
                            selectedMobilierType === 'PRN' ? 'text-blue-800' :
                            selectedMobilierType === 'PP' ? 'text-green-800' :
                            selectedMobilierType === 'Bacs' ? 'text-purple-800' :
                            'text-orange-800'
                          }`}>
                            Type sélectionné: {getTypeDescription(selectedMobilierType)}
                          </h5>
                          <p className={`text-sm ${
                            selectedMobilierType === 'PRN' ? 'text-blue-700' :
                            selectedMobilierType === 'PP' ? 'text-green-700' :
                            selectedMobilierType === 'Bacs' ? 'text-purple-700' :
                            'text-orange-700'
                          }`}>
                            Les éléments importés seront catégorisés comme {selectedMobilierType}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedMobilierType(null)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Zone de téléversement */}
                  <div
                    className={`
                      border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
                      ${dragActive 
                        ? 'border-green-500 bg-green-50 scale-105' 
                        : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                      }
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                        dragActive ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <MapIcon className={`w-8 h-8 ${
                          dragActive ? 'text-green-600' : 'text-gray-400'
                        }`} />
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {dragActive ? 'Relâchez pour téléverser' : 'Glissez-déposez votre fichier GeoJSON'}
                        </h4>
                        <p className="text-gray-600 mb-4">
                          ou cliquez pour sélectionner un fichier
                        </p>
                      </div>
                      
                      <input
                        type="file"
                        accept=".geojson,.json"
                        className="hidden"
                        id="mobilier-geojson-upload"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0]);
                          }
                        }}
                      />
                      <label
                        htmlFor="mobilier-geojson-upload"
                        className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer transition-colors font-medium shadow-md hover:shadow-lg"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Sélectionner un fichier GeoJSON
                      </label>
                      
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>Formats acceptés: .geojson, .json</p>
                        <p>Taille maximale: 50 MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Informations sur le fichier téléversé */}
                  {uploadedFile && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div className="flex-1">
                          <h5 className="font-semibold text-blue-900">{uploadedFile.name}</h5>
                          <p className="text-sm text-blue-700">
                            Taille: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • 
                            Type: {getTypeDescription(selectedMobilierType)}
                          </p>
                        </div>
                        <button
                          onClick={resetUpload}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Barre de progression */}
                  {uploadProgress !== null && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Upload className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-green-900">
                          Traitement du mobilier {selectedMobilierType}...
                        </span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-green-700">{uploadProgress}% terminé</p>
                        <p className="text-xs text-green-600">Analyse des géométries...</p>
                      </div>
                    </div>
                  )}

                  {/* Informations sur le format GeoJSON pour mobilier urbain */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-500" />
                      Format GeoJSON pour {getTypeDescription(selectedMobilierType)}
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Structure recommandée :</h5>
                        <div className="bg-gray-800 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                          <pre>{`{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [2.3522, 48.8566]
      },
      "properties": {
        "name": "${selectedMobilierType} Châtelet",
        "type": "${selectedMobilierType}",
        "address": "Place du Châtelet, Paris",
        "capacity": ${selectedMobilierType === 'Decharge' ? '5000' : '1200'},
        "status": "active",
        "description": "${getTypeDescription(selectedMobilierType)} centre-ville"
      }
    }
  ]
}`}</pre>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Propriétés supportées :</h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="space-y-1">
                            <div><span className="font-medium">name:</span> Nom du mobilier</div>
                            <div><span className="font-medium">type:</span> {selectedMobilierType}</div>
                            <div><span className="font-medium">address:</span> Adresse complète</div>
                            <div><span className="font-medium">capacity:</span> Capacité en litres</div>
                          </div>
                          <div className="space-y-1">
                            <div><span className="font-medium">status:</span> active, maintenance...</div>
                            <div><span className="font-medium">description:</span> Description</div>
                            <div><span className="font-medium">manufacturer:</span> Fabricant</div>
                            <div><span className="font-medium">model:</span> Modèle</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Étape 3: Message de succès */}
              {uploadSuccess && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Mobilier {selectedMobilierType} importé avec succès !
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Le fichier <span className="font-semibold">{uploadedFile?.name}</span> a été traité et intégré.
                    </p>
                    
                    {/* Résumé de l'import */}
                    <div className="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
                      <h5 className="font-semibold text-gray-900 mb-3">Résumé de l'import</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Éléments importés:</span>
                          <span className="font-semibold text-gray-900">18</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type de mobilier:</span>
                          <span className={`font-semibold ${
                            selectedMobilierType === 'PRN' ? 'text-blue-600' :
                            selectedMobilierType === 'PP' ? 'text-green-600' :
                            selectedMobilierType === 'Bacs' ? 'text-purple-600' :
                            'text-orange-600'
                          }`}>
                            {getTypeDescription(selectedMobilierType)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Éléments actifs:</span>
                          <span className="font-semibold text-green-600">16</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">En maintenance:</span>
                          <span className="font-semibold text-yellow-600">2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacité totale:</span>
                          <span className="font-semibold text-purple-600">
                            {selectedMobilierType === 'Decharge' ? '72,000L' : '21,600L'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={closeUploadModal}
                      className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      Terminer
                    </button>
                    <button
                      onClick={() => {
                        closeUploadModal();
                        // Ici on pourrait naviguer vers la carte pour voir les nouveaux éléments
                      }}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <MapIcon className="w-4 h-4" />
                      <span>Voir sur la Carte</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Détails du Mobilier</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {React.createElement(getTypeIcon(selectedItem.type), { className: "w-5 h-5 text-gray-600" })}
                    <h4 className="font-medium text-gray-900">{selectedItem.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{selectedItem.address}</p>
                  <p className="text-sm text-gray-600 mt-2">{selectedItem.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                      {getStatusText(selectedItem.status)}
                    </span>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedItem.type)}`}>
                      {getTypeDescription(selectedItem.type)}
                    </span>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-3">Informations Techniques</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedItem.manufacturer && (
                      <div>
                        <span className="text-gray-500">Fabricant:</span>
                        <p className="font-medium">{selectedItem.manufacturer}</p>
                      </div>
                    )}
                    {selectedItem.model && (
                      <div>
                        <span className="text-gray-500">Modèle:</span>
                        <p className="font-medium">{selectedItem.model}</p>
                      </div>
                    )}
                    {selectedItem.material && (
                      <div>
                        <span className="text-gray-500">Matériau:</span>
                        <p className="font-medium">{selectedItem.material}</p>
                      </div>
                    )}
                    {selectedItem.capacity && (
                      <div>
                        <span className="text-gray-500">Capacité:</span>
                        <p className="font-medium">{selectedItem.capacity}L</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fill Level */}
                {selectedItem.capacity && selectedItem.currentLevel !== undefined && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Niveau de remplissage</span>
                      <span className="text-sm font-bold text-gray-900">{selectedItem.currentLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          selectedItem.currentLevel > 90 ? 'bg-red-500' :
                          selectedItem.currentLevel > 70 ? 'bg-orange-500' :
                          selectedItem.currentLevel > 30 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(selectedItem.currentLevel, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0L</span>
                      <span>{selectedItem.capacity}L</span>
                    </div>
                  </div>
                )}

                {/* Maintenance Dates */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Installation</label>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {new Date(selectedItem.installationDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Dernière maintenance</label>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {new Date(selectedItem.lastMaintenance).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Prochaine maintenance</label>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {new Date(selectedItem.nextMaintenance).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Localisation</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Latitude:</span>
                      <p className="font-medium">{selectedItem.latitude}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Longitude:</span>
                      <p className="font-medium">{selectedItem.longitude}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewOnMap(selectedItem)}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Voir sur la Carte</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Modifier
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Maintenance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilierUrbain;