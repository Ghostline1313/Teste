import React, { useState } from 'react';
import { 
  MapPin, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  AlertTriangle, 
  Clock, 
  Truck, 
  Search, 
  Chrome as Broom, 
  Recycle,
  Upload,
  FileText,
  CheckCircle,
  X,
  Map as MapIcon,
  Download,
  ArrowRight
} from 'lucide-react';
import { mockCollectionPoints } from '../data/mockData';
import { CollectionPoint } from '../types';

const CollectionPoints: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [circuitType, setCircuitType] = useState<'all' | 'balayage' | 'collecte'>('all');
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  
  // États pour le téléversement GeoJSON
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCircuitType, setSelectedCircuitType] = useState<'balayage' | 'collecte' | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'empty': return 'bg-green-100 text-green-800';
      case 'half-full': return 'bg-yellow-100 text-yellow-800';
      case 'full': return 'bg-orange-100 text-orange-800';
      case 'overflow': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'empty': return 'Vide';
      case 'half-full': return 'À moitié';
      case 'full': return 'Plein';
      case 'overflow': return 'Débordement';
      case 'maintenance': return 'Maintenance';
      default: return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'container': return 'bg-blue-100 text-blue-800';
      case 'recycling': return 'bg-green-100 text-green-800';
      case 'organic': return 'bg-yellow-100 text-yellow-800';
      case 'hazardous': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'container': return 'Conteneur';
      case 'recycling': return 'Recyclage';
      case 'organic': return 'Organique';
      case 'hazardous': return 'Dangereux';
      default: return type;
    }
  };

  // Simulation de données avec types de circuits
  const getCircuitType = (point: CollectionPoint): 'balayage' | 'collecte' => {
    // Logique pour déterminer le type de circuit basé sur les propriétés du point
    if (point.type === 'recycling' || point.type === 'organic') {
      return 'collecte';
    }
    return Math.random() > 0.5 ? 'balayage' : 'collecte';
  };

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
    setSelectedCircuitType(null);
    resetUpload();
  };

  const startUploadProcess = () => {
    setShowUploadModal(true);
    setSelectedCircuitType(null);
  };

  const filteredPoints = mockCollectionPoints.filter(point => {
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         point.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || point.status === filterStatus;
    const matchesType = filterType === 'all' || point.type === filterType;
    const pointCircuitType = getCircuitType(point);
    const matchesCircuitType = circuitType === 'all' || pointCircuitType === circuitType;
    
    return matchesSearch && matchesStatus && matchesType && matchesCircuitType;
  });

  const balayageCount = mockCollectionPoints.filter(p => getCircuitType(p) === 'balayage').length;
  const collecteCount = mockCollectionPoints.filter(p => getCircuitType(p) === 'collecte').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Circuits</h2>
          <p className="text-gray-600">Gestion des circuits de balayage et de collecte</p>
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

      {/* Circuit Type Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Circuits</p>
              <p className="text-2xl font-bold text-gray-900">{mockCollectionPoints.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Broom className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Circuits Balayage</p>
              <p className="text-2xl font-bold text-gray-900">{balayageCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Recycle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Circuits Collecte</p>
              <p className="text-2xl font-bold text-gray-900">{collecteCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Circuit Type Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Type de Circuit</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCircuitType('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              circuitType === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            Tous les Circuits ({mockCollectionPoints.length})
          </button>
          <button
            onClick={() => setCircuitType('balayage')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              circuitType === 'balayage'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Broom className="w-4 h-4 inline mr-2" />
            Balayage ({balayageCount})
          </button>
          <button
            onClick={() => setCircuitType('collecte')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              circuitType === 'collecte'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Recycle className="w-4 h-4 inline mr-2" />
            Collecte ({collecteCount})
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
            <option value="empty">Vide</option>
            <option value="half-full">À moitié</option>
            <option value="full">Plein</option>
            <option value="overflow">Débordement</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Tous les types</option>
            <option value="container">Conteneur</option>
            <option value="recycling">Recyclage</option>
            <option value="organic">Organique</option>
            <option value="hazardous">Dangereux</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>{filteredPoints.length} résultat(s)</span>
          </div>
        </div>
      </div>

      {/* Current Filter Info */}
      {circuitType !== 'all' && (
        <div className={`rounded-lg p-4 ${
          circuitType === 'balayage' 
            ? 'bg-orange-50 border border-orange-200' 
            : 'bg-green-50 border border-green-200'
        }`}>
          <div className="flex items-center space-x-3">
            {circuitType === 'balayage' ? (
              <Broom className="w-5 h-5 text-orange-600" />
            ) : (
              <Recycle className="w-5 h-5 text-green-600" />
            )}
            <div>
              <h4 className={`font-semibold ${
                circuitType === 'balayage' ? 'text-orange-800' : 'text-green-800'
              }`}>
                Circuits de {circuitType === 'balayage' ? 'Balayage' : 'Collecte'}
              </h4>
              <p className={`text-sm ${
                circuitType === 'balayage' ? 'text-orange-700' : 'text-green-700'
              }`}>
                {circuitType === 'balayage' 
                  ? 'Circuits dédiés au nettoyage et balayage des voies publiques'
                  : 'Circuits dédiés à la collecte des déchets et recyclables'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPoints.map((point) => {
          const pointCircuitType = getCircuitType(point);
          return (
            <div key={point.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{point.name}</h3>
                      {pointCircuitType === 'balayage' ? (
                        <Broom className="w-4 h-4 text-orange-500" />
                      ) : (
                        <Recycle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{point.address}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(point.status)}`}>
                      {getStatusText(point.status)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pointCircuitType === 'balayage' 
                      ? 'bg-orange-100 text-orange-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {pointCircuitType === 'balayage' ? 'Balayage' : 'Collecte'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(point.type)}`}>
                    {getTypeText(point.type)}
                  </span>
                  <span className="text-xs text-gray-500">Capacité: {point.capacity}L</span>
                </div>

                {/* Fill Level */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Remplissage</span>
                    <span className="text-sm font-bold text-gray-900">{point.currentLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        point.currentLevel > 90 ? 'bg-red-500' :
                        point.currentLevel > 70 ? 'bg-orange-500' :
                        point.currentLevel > 30 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(point.currentLevel, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Dernière</span>
                    </div>
                    <p className="text-xs font-medium text-gray-900">
                      {new Date(point.lastCollection).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Truck className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Prochaine</span>
                    </div>
                    <p className="text-xs font-medium text-gray-900">
                      {new Date(point.nextCollection).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                {/* Alert */}
                {point.status === 'overflow' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-red-800">Intervention requise</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedPoint(point)}
                    className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Voir</span>
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
      {filteredPoints.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun circuit trouvé</h3>
          <p className="text-gray-600">
            {circuitType !== 'all' 
              ? `Aucun circuit de ${circuitType} ne correspond à vos critères`
              : 'Essayez de modifier vos filtres de recherche'
            }
          </p>
        </div>
      )}

      {/* Modal de Téléversement GeoJSON avec Sélection de Type */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Upload className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Téléverser un Circuit GeoJSON</h3>
                    <p className="text-sm text-gray-600">Importez des données géospatiales de circuits</p>
                  </div>
                </div>
                <button
                  onClick={closeUploadModal}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Étape 1: Sélection du type de circuit */}
              {!selectedCircuitType && !uploadSuccess && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Sélectionnez le type de circuit
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Choisissez si ce fichier GeoJSON contient des circuits de balayage ou de collecte
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Option Balayage */}
                    <button
                      onClick={() => setSelectedCircuitType('balayage')}
                      className="group p-8 border-2 border-orange-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 text-left"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                          <Broom className="w-8 h-8 text-orange-600" />
                        </div>
                        <div>
                          <h5 className="text-xl font-bold text-gray-900 mb-1">Circuits de Balayage</h5>
                          <p className="text-orange-600 font-medium">🧹 Nettoyage des voies</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Circuits dédiés au nettoyage et balayage des voies publiques, 
                        trottoirs et espaces urbains. Incluent les itinéraires de balayeuses 
                        et équipes de nettoyage.
                      </p>
                      <div className="mt-4 flex items-center text-orange-600 font-medium">
                        <span>Sélectionner ce type</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>

                    {/* Option Collecte */}
                    <button
                      onClick={() => setSelectedCircuitType('collecte')}
                      className="group p-8 border-2 border-green-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-300 text-left"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <Recycle className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                          <h5 className="text-xl font-bold text-gray-900 mb-1">Circuits de Collecte</h5>
                          <p className="text-green-600 font-medium">♻️ Collecte des déchets</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Circuits dédiés à la collecte des déchets ménagers, recyclables 
                        et organiques. Incluent les tournées de camions de collecte 
                        et points de ramassage.
                      </p>
                      <div className="mt-4 flex items-center text-green-600 font-medium">
                        <span>Sélectionner ce type</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>

                  {/* Informations supplémentaires */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h5 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Informations importantes
                    </h5>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>• <strong>Balayage :</strong> Optimisé pour les itinéraires de nettoyage urbain</p>
                      <p>• <strong>Collecte :</strong> Optimisé pour les tournées de ramassage des déchets</p>
                      <p>• Cette sélection déterminera comment vos données seront catégorisées et affichées</p>
                      <p>• Vous pourrez modifier ce paramètre après l'import si nécessaire</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Étape 2: Zone de téléversement */}
              {selectedCircuitType && !uploadSuccess && (
                <div className="space-y-6">
                  {/* Confirmation du type sélectionné */}
                  <div className={`p-4 rounded-xl border-2 ${
                    selectedCircuitType === 'balayage' 
                      ? 'bg-orange-50 border-orange-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {selectedCircuitType === 'balayage' ? (
                          <Broom className="w-6 h-6 text-orange-600" />
                        ) : (
                          <Recycle className="w-6 h-6 text-green-600" />
                        )}
                        <div>
                          <h5 className={`font-semibold ${
                            selectedCircuitType === 'balayage' ? 'text-orange-800' : 'text-green-800'
                          }`}>
                            Type sélectionné: {selectedCircuitType === 'balayage' ? 'Balayage' : 'Collecte'}
                          </h5>
                          <p className={`text-sm ${
                            selectedCircuitType === 'balayage' ? 'text-orange-700' : 'text-green-700'
                          }`}>
                            Les circuits importés seront catégorisés comme circuits de {selectedCircuitType}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedCircuitType(null)}
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
                        id="circuit-geojson-upload"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0]);
                          }
                        }}
                      />
                      <label
                        htmlFor="circuit-geojson-upload"
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
                            Type: {selectedCircuitType === 'balayage' ? 'Balayage' : 'Collecte'}
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
                          Traitement du circuit {selectedCircuitType}...
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

                  {/* Informations sur le format GeoJSON pour circuits */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-500" />
                      Format GeoJSON pour Circuits
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
        "type": "LineString",
        "coordinates": [[2.3522, 48.8566], [2.3525, 48.8570]]
      },
      "properties": {
        "name": "Circuit Centre ${selectedCircuitType === 'balayage' ? 'Balayage' : 'Collecte'}",
        "type": "${selectedCircuitType}",
        "frequency": "daily",
        "duration": "2h30",
        "vehicle_type": "${selectedCircuitType === 'balayage' ? 'balayeuse' : 'camion_collecte'}"
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
                            <div><span className="font-medium">name:</span> Nom du circuit</div>
                            <div><span className="font-medium">type:</span> balayage ou collecte</div>
                            <div><span className="font-medium">frequency:</span> Fréquence (daily, weekly...)</div>
                          </div>
                          <div className="space-y-1">
                            <div><span className="font-medium">duration:</span> Durée estimée</div>
                            <div><span className="font-medium">vehicle_type:</span> Type de véhicule</div>
                            <div><span className="font-medium">description:</span> Description</div>
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
                      Circuit {selectedCircuitType} importé avec succès !
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Le fichier <span className="font-semibold">{uploadedFile?.name}</span> a été traité et intégré.
                    </p>
                    
                    {/* Résumé de l'import */}
                    <div className="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
                      <h5 className="font-semibold text-gray-900 mb-3">Résumé de l'import</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Circuits importés:</span>
                          <span className="font-semibold text-gray-900">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type de circuit:</span>
                          <span className={`font-semibold ${
                            selectedCircuitType === 'balayage' ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {selectedCircuitType === 'balayage' ? 'Balayage' : 'Collecte'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Points de passage:</span>
                          <span className="font-semibold text-blue-600">156</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Distance totale:</span>
                          <span className="font-semibold text-purple-600">47.2 km</span>
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
                        // Ici on pourrait naviguer vers la carte pour voir les nouveaux circuits
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

      {/* Point Details Modal */}
      {selectedPoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Détails du Circuit</h3>
                <button
                  onClick={() => setSelectedPoint(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{selectedPoint.name}</h4>
                    {getCircuitType(selectedPoint) === 'balayage' ? (
                      <Broom className="w-4 h-4 text-orange-500" />
                    ) : (
                      <Recycle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{selectedPoint.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPoint.status)}`}>
                      {getStatusText(selectedPoint.status)}
                    </span>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getCircuitType(selectedPoint) === 'balayage' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {getCircuitType(selectedPoint) === 'balayage' ? 'Balayage' : 'Collecte'}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Niveau de remplissage</span>
                    <span className="text-sm font-bold text-gray-900">{selectedPoint.currentLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        selectedPoint.currentLevel > 90 ? 'bg-red-500' :
                        selectedPoint.currentLevel > 70 ? 'bg-orange-500' :
                        selectedPoint.currentLevel > 30 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(selectedPoint.currentLevel, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0L</span>
                    <span>{selectedPoint.capacity}L</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Dernière collecte</label>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {new Date(selectedPoint.lastCollection).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Prochaine collecte</label>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {new Date(selectedPoint.nextCollection).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                    Programmer Collecte
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Modifier
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

export default CollectionPoints;