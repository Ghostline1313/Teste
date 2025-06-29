import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  Filter,
  AlertTriangle,
  RefreshCw,
  Map as MapIcon,
  Satellite,
  Mountain,
  Globe,
  Package,
  Recycle as Recycle2,
  Trash,
  Building2,
  Chrome as Broom,
  Settings,
  Download,
  Image,
  FileText
} from 'lucide-react';
import { mockCollectionPoints } from '../data/mockData';
import { CollectionPoint } from '../types';

const MapView: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  const [showLayersPanel, setShowLayersPanel] = useState(false);
  const [showTypesPanel, setShowTypesPanel] = useState(false);
  const [showExportPanel, setShowExportPanel] = useState(true);
  const [activeMapLayer, setActiveMapLayer] = useState<'osm' | 'google-standard' | 'google-satellite' | 'google-terrain' | 'google-hybrid'>('osm');
  const [exportProgress, setExportProgress] = useState<number | null>(null);
  const [exportFormat, setExportFormat] = useState<'jpeg' | 'png' | 'pdf'>('png');
  
  // État pour les types cochés/décochés
  const [checkedTypes, setCheckedTypes] = useState<{[key: string]: boolean}>({
    collecte: true,
    balayage: true,
    prn: true,
    pp: true,
    bacs: true,
    decharge: true
  });

  const mapLayers = [
    {
      id: 'osm',
      name: 'OpenStreetMap',
      description: 'Carte collaborative libre',
      icon: MapIcon,
      preview: 'bg-gradient-to-br from-blue-100 to-green-100',
      provider: 'OSM'
    },
    {
      id: 'google-standard',
      name: 'Google Standard',
      description: 'Carte routière Google',
      icon: MapIcon,
      preview: 'bg-gradient-to-br from-gray-100 to-blue-100',
      provider: 'Google'
    },
    {
      id: 'google-satellite',
      name: 'Google Satellite',
      description: 'Vue satellite Google',
      icon: Satellite,
      preview: 'bg-gradient-to-br from-green-200 to-yellow-100',
      provider: 'Google'
    },
    {
      id: 'google-terrain',
      name: 'Google Terrain',
      description: 'Relief et topographie Google',
      icon: Mountain,
      preview: 'bg-gradient-to-br from-orange-100 to-red-100',
      provider: 'Google'
    },
    {
      id: 'google-hybrid',
      name: 'Google Hybride',
      description: 'Satellite avec labels Google',
      icon: Globe,
      preview: 'bg-gradient-to-br from-purple-100 to-pink-100',
      provider: 'Google'
    }
  ];

  const typeOptions = [
    { value: 'collecte', label: 'Collecte', icon: Trash, color: 'blue', emoji: '🚛' },
    { value: 'balayage', label: 'Balayage', icon: Broom, color: 'orange', emoji: '🧹' },
    { value: 'prn', label: 'PRN', icon: Package, color: 'purple', emoji: '📦' },
    { value: 'pp', label: 'PP', icon: Recycle2, color: 'green', emoji: '♻️' },
    { value: 'bacs', label: 'BACS', icon: Trash, color: 'red', emoji: '🗑️' },
    { value: 'decharge', label: 'DECHARGE', icon: Building2, color: 'yellow', emoji: '🏭' }
  ];

  const exportFormats = [
    {
      value: 'jpeg',
      label: 'JPEG',
      description: 'Format image compressé, idéal pour le web',
      icon: Image,
      extension: '.jpg',
      color: 'blue'
    },
    {
      value: 'png',
      label: 'PNG',
      description: 'Format image haute qualité avec transparence',
      icon: Image,
      extension: '.png',
      color: 'green'
    },
    {
      value: 'pdf',
      label: 'PDF',
      description: 'Document vectoriel pour impression',
      icon: FileText,
      extension: '.pdf',
      color: 'red'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'empty': return 'bg-green-500';
      case 'half-full': return 'bg-yellow-500';
      case 'full': return 'bg-orange-500';
      case 'overflow': return 'bg-red-500';
      case 'maintenance': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'empty': return 'Vide';
      case 'half-full': return 'À moitié plein';
      case 'full': return 'Plein';
      case 'overflow': return 'Débordement';
      case 'maintenance': return 'Maintenance';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    const typeOption = typeOptions.find(t => t.value === type);
    return typeOption?.emoji || '🗑️';
  };

  const getMapBackground = () => {
    switch (activeMapLayer) {
      case 'google-satellite':
        return 'bg-gradient-to-br from-green-200 via-yellow-100 to-orange-100';
      case 'google-terrain':
        return 'bg-gradient-to-br from-orange-100 via-yellow-50 to-red-50';
      case 'google-hybrid':
        return 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50';
      case 'google-standard':
        return 'bg-gradient-to-br from-gray-50 to-blue-50';
      case 'osm':
      default:
        return 'bg-gradient-to-br from-green-50 to-blue-50';
    }
  };

  // Simulation de données avec les nouveaux types
  const getPointType = (point: CollectionPoint): string => {
    // Logique pour mapper les anciens types vers les nouveaux
    switch (point.type) {
      case 'container': return Math.random() > 0.5 ? 'collecte' : 'bacs';
      case 'recycling': return 'pp';
      case 'organic': return 'collecte';
      case 'hazardous': return 'decharge';
      default: return 'collecte';
    }
  };

  // Fonction pour gérer le changement d'état des cases à cocher
  const handleTypeToggle = (typeValue: string) => {
    setCheckedTypes(prev => ({
      ...prev,
      [typeValue]: !prev[typeValue]
    }));
  };

  // Fonction pour tout cocher/décocher
  const handleToggleAll = () => {
    const allChecked = Object.values(checkedTypes).every(checked => checked);
    const newState = typeOptions.reduce((acc, type) => ({
      ...acc,
      [type.value]: !allChecked
    }), {});
    setCheckedTypes(newState);
  };

  // Fonction d'exportation de la carte
  const handleExportMap = () => {
    setExportProgress(0);
    
    // Simulation du processus d'exportation
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          
          // Simulation du téléchargement
          setTimeout(() => {
            const fileName = `carte_geoportail_${new Date().toISOString().split('T')[0]}${exportFormats.find(f => f.value === exportFormat)?.extension}`;
            
            // Créer un lien de téléchargement simulé
            const link = document.createElement('a');
            link.href = '#'; // Dans une vraie application, ce serait l'URL du fichier généré
            link.download = fileName;
            
            // Afficher un message de succès
            alert(`Carte exportée avec succès !\nFormat: ${exportFormat.toUpperCase()}\nNom du fichier: ${fileName}\nRésolution: 500 DPI`);
            
            setExportProgress(null);
            setShowExportPanel(false);
          }, 500);
          
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  // Filtrer les points selon les types cochés
  const filteredPoints = mockCollectionPoints.filter(point => {
    const pointType = getPointType(point);
    return checkedTypes[pointType];
  });

  // Fonction pour obtenir les types visibles dans la légende (seulement les types cochés)
  const getVisibleTypesForLegend = () => {
    return typeOptions.filter(type => checkedTypes[type.value]);
  };

  // Compter les types cochés
  const checkedTypesCount = Object.values(checkedTypes).filter(Boolean).length;
  const allTypesChecked = checkedTypesCount === typeOptions.length;

  // Fonction pour obtenir les couleurs des types avec classes statiques
  const getTypeColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        bgChecked: 'bg-blue-100',
        textChecked: 'text-blue-700',
        border: 'border-blue-200'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        bgChecked: 'bg-orange-100',
        textChecked: 'text-orange-700',
        border: 'border-orange-200'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        bgChecked: 'bg-purple-100',
        textChecked: 'text-purple-700',
        border: 'border-purple-200'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        bgChecked: 'bg-green-100',
        textChecked: 'text-green-700',
        border: 'border-green-200'
      },
      red: {
        bg: 'bg-red-100',
        text: 'text-red-600',
        bgChecked: 'bg-red-100',
        textChecked: 'text-red-700',
        border: 'border-red-200'
      },
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        bgChecked: 'bg-yellow-100',
        textChecked: 'text-yellow-700',
        border: 'border-yellow-200'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  // Fonction pour obtenir les couleurs des formats avec classes statiques
  const getFormatColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200'
      },
      red: {
        bg: 'bg-red-100',
        text: 'text-red-600',
        border: 'border-red-200'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="h-full flex">
      {/* Map Area */}
      <div className={`flex-1 relative ${getMapBackground()} transition-all duration-500`}>
        {/* Map Controls */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Bouton Types avec indicateur */}
              <button
                onClick={() => setShowTypesPanel(!showTypesPanel)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                  showTypesPanel 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Types</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  showTypesPanel 
                    ? 'bg-white/20 text-white' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {checkedTypesCount}/{typeOptions.length}
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {/* Bouton Export */}
              <button
                onClick={() => setShowExportPanel(!showExportPanel)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 shadow-lg ${
                  showExportPanel 
                    ? 'bg-green-600 text-white ring-2 ring-green-300' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                <Download className="w-5 h-5" />
                <span className="font-semibold">Exporter la Carte</span>
                {showExportPanel && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setShowLayersPanel(!showLayersPanel)}
                    className={`p-1 rounded transition-colors ${
                      showLayersPanel ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Navigation className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <RefreshCw className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Panel */}
        {showExportPanel && (
          <div className="absolute top-20 right-4 z-20 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 w-96">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-green-600" />
                </div>
                <span>Exporter la Carte</span>
              </h3>
              <button
                onClick={() => setShowExportPanel(false)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded"
              >
                ×
              </button>
            </div>

            {/* Format Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                <Image className="w-4 h-4 mr-2 text-blue-500" />
                Format d'Exportation
              </h4>
              <div className="space-y-3">
                {exportFormats.map((format) => {
                  const Icon = format.icon;
                  const colorClasses = getFormatColorClasses(format.color);
                  return (
                    <label
                      key={format.value}
                      className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                        exportFormat === format.value
                          ? `border-${format.color}-500 bg-${format.color}-50 shadow-md`
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="exportFormat"
                        value={format.value}
                        checked={exportFormat === format.value}
                        onChange={(e) => setExportFormat(e.target.value as any)}
                        className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        exportFormat === format.value 
                          ? colorClasses.bg
                          : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          exportFormat === format.value 
                            ? colorClasses.text
                            : 'text-gray-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${
                            exportFormat === format.value ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {format.label}
                          </span>
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                            exportFormat === format.value 
                              ? `${colorClasses.bg} ${colorClasses.textChecked}` 
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {format.extension}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{format.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Export Options */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                <Settings className="w-4 h-4 mr-2 text-purple-500" />
                Options d'Exportation
              </h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700 font-medium">Inclure la légende</span>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                </label>
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700 font-medium">Inclure l'échelle</span>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                </label>
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700 font-medium">Inclure le titre</span>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                </label>
                <label className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-800 font-semibold">Ultra haute résolution (500 DPI)</span>
                    <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full font-bold">PREMIUM</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-green-300 text-green-600 focus:ring-green-500" />
                </label>
              </div>
            </div>

            {/* Export Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
              <h5 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                Informations d'Export
              </h5>
              <div className="text-xs text-blue-700 space-y-2">
                <div className="flex justify-between items-center">
                  <span>Fond de carte:</span>
                  <span className="font-semibold bg-white px-2 py-1 rounded">{mapLayers.find(l => l.id === activeMapLayer)?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Points affichés:</span>
                  <span className="font-semibold bg-white px-2 py-1 rounded">{filteredPoints.length}/{mockCollectionPoints.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Types visibles:</span>
                  <span className="font-semibold bg-white px-2 py-1 rounded">{checkedTypesCount}/{typeOptions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Format:</span>
                  <span className="font-semibold bg-white px-2 py-1 rounded">{exportFormat.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center border-t border-blue-200 pt-2">
                  <span className="font-semibold">Résolution:</span>
                  <span className="font-bold bg-green-100 text-green-800 px-2 py-1 rounded">500 DPI</span>
                </div>
              </div>
            </div>

            {/* Export Progress */}
            {exportProgress !== null && (
              <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Download className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-green-900">Exportation haute résolution en cours...</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300 shadow-sm"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-green-700 font-medium">{exportProgress}% terminé</p>
                  <p className="text-xs text-green-600">500 DPI • Qualité maximale</p>
                </div>
              </div>
            )}

            {/* Export Button */}
            <button
              onClick={handleExportMap}
              disabled={exportProgress !== null}
              className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all transform ${
                exportProgress !== null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              <Download className="w-6 h-6" />
              <span>
                {exportProgress !== null 
                  ? 'Génération 500 DPI...' 
                  : `Exporter en ${exportFormat.toUpperCase()} (500 DPI)`
                }
              </span>
              {exportProgress === null && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>

            {/* Format Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="font-semibold mb-2 text-gray-800 text-sm">📋 Recommandations (500 DPI):</p>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>• <strong>JPEG:</strong> Idéal pour partage web et email (fichier léger)</li>
                <li>• <strong>PNG:</strong> Qualité maximale avec transparence (fichier volumineux)</li>
                <li>• <strong>PDF:</strong> Parfait pour impression professionnelle et archivage</li>
              </ul>
              <div className="mt-3 p-2 bg-green-100 rounded-lg">
                <p className="text-xs text-green-800 font-medium">
                  ⚡ 500 DPI = Qualité d'impression professionnelle
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Types Panel */}
        {showTypesPanel && (
          <div className="absolute top-20 left-4 z-20 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Types d'Éléments</h3>
              <button
                onClick={() => setShowTypesPanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            {/* Bouton Tout cocher/décocher */}
            <div className="mb-4 pb-3 border-b border-gray-200">
              <button
                onClick={handleToggleAll}
                className={`w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  allTypesChecked
                    ? 'bg-red-50 text-red-700 hover:bg-red-100'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                <span>{allTypesChecked ? 'Tout décocher' : 'Tout cocher'}</span>
                <span className="text-xs">({checkedTypesCount}/{typeOptions.length})</span>
              </button>
            </div>

            {/* Liste des types avec cases à cocher */}
            <div className="space-y-2">
              {typeOptions.map((type) => {
                const Icon = type.icon;
                const isChecked = checkedTypes[type.value];
                const pointCount = mockCollectionPoints.filter(p => getPointType(p) === type.value).length;
                const colorClasses = getTypeColorClasses(type.color);
                
                return (
                  <label
                    key={type.value}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      isChecked
                        ? `${colorClasses.border} ${colorClasses.bgChecked}`
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleTypeToggle(type.value)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isChecked 
                        ? colorClasses.bg
                        : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isChecked 
                          ? colorClasses.text
                          : 'text-gray-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${
                          isChecked ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {type.label}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isChecked 
                            ? `${colorClasses.bg} ${colorClasses.textChecked}` 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {pointCount} points
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-lg">{type.emoji}</span>
                        <span className="text-xs text-gray-500">
                          {isChecked ? 'Visible sur la carte' : 'Masqué'}
                        </span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Résumé */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Points affichés:</span>
                <span className="font-semibold text-gray-900">{filteredPoints.length}/{mockCollectionPoints.length}</span>
              </div>
            </div>
          </div>
        )}

        {/* Layers Panel - CORRIGÉ */}
        {showLayersPanel && (
          <div className="absolute top-20 right-4 z-20 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Fonds de Carte</h3>
              <button
                onClick={() => setShowLayersPanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            {/* OSM Section */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                OpenStreetMap
              </h4>
              <div className="space-y-2">
                {mapLayers.filter(layer => layer.provider === 'OSM').map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <button
                      key={layer.id}
                      onClick={() => {
                        setActiveMapLayer(layer.id as any);
                        setShowLayersPanel(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                        activeMapLayer === layer.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg ${layer.preview} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${
                          activeMapLayer === layer.id ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1 text-left">
                        <h5 className={`font-medium ${
                          activeMapLayer === layer.id ? 'text-green-900' : 'text-gray-900'
                        }`}>
                          {layer.name}
                        </h5>
                        <p className="text-sm text-gray-600">{layer.description}</p>
                      </div>
                      {activeMapLayer === layer.id && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Google Maps Section */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Google Maps
              </h4>
              <div className="space-y-2">
                {mapLayers.filter(layer => layer.provider === 'Google').map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <button
                      key={layer.id}
                      onClick={() => {
                        setActiveMapLayer(layer.id as any);
                        setShowLayersPanel(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                        activeMapLayer === layer.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg ${layer.preview} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${
                          activeMapLayer === layer.id ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1 text-left">
                        <h5 className={`font-medium ${
                          activeMapLayer === layer.id ? 'text-green-900' : 'text-gray-900'
                        }`}>
                          {layer.name}
                        </h5>
                        <p className="text-sm text-gray-600">{layer.description}</p>
                      </div>
                      {activeMapLayer === layer.id && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Layer Options */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Options d'Affichage</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Afficher les noms de rues</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Afficher les points d'intérêt</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Mode sombre</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Afficher le trafic</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Current Layer Indicator */}
        <div className="absolute bottom-20 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 px-3 py-2">
          <div className="flex items-center space-x-2">
            {React.createElement(mapLayers.find(l => l.id === activeMapLayer)?.icon || MapIcon, {
              className: "w-4 h-4 text-green-600"
            })}
            <span className="text-sm font-medium text-gray-700">
              {mapLayers.find(l => l.id === activeMapLayer)?.name}
            </span>
            <div className={`w-2 h-2 rounded-full ${
              mapLayers.find(l => l.id === activeMapLayer)?.provider === 'OSM' ? 'bg-blue-500' : 'bg-red-500'
            }`}></div>
          </div>
        </div>

        {/* Simulated Map with Collection Points */}
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
          {/* Map Pattern Overlay based on selected layer */}
          <div className="absolute inset-0 opacity-10">
            {activeMapLayer === 'google-satellite' && (
              <div className="w-full h-full bg-gradient-to-br from-green-400 via-yellow-300 to-orange-300"></div>
            )}
            {activeMapLayer === 'google-terrain' && (
              <div className="w-full h-full">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,50 Q25,30 50,45 T100,40 L100,100 L0,100 Z" fill="rgba(139,69,19,0.3)" />
                  <path d="M0,60 Q25,45 50,55 T100,50 L100,100 L0,100 Z" fill="rgba(34,139,34,0.3)" />
                </svg>
              </div>
            )}
            {activeMapLayer === 'google-hybrid' && (
              <div className="w-full h-full bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200"></div>
            )}
            {activeMapLayer === 'osm' && (
              <div className="w-full h-full">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <rect width="100" height="100" fill="rgba(0,100,0,0.1)" />
                  <path d="M0,20 L100,20 M0,40 L100,40 M0,60 L100,60 M0,80 L100,80" stroke="rgba(0,0,255,0.1)" strokeWidth="0.5" />
                  <path d="M20,0 L20,100 M40,0 L40,100 M60,0 L60,100 M80,0 L80,100" stroke="rgba(0,0,255,0.1)" strokeWidth="0.5" />
                </svg>
              </div>
            )}
          </div>

          <div className="text-center text-gray-500 mb-8 relative z-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Carte Interactive</p>
              <p className="text-sm">Fond de carte: {mapLayers.find(l => l.id === activeMapLayer)?.name}</p>
              <p className="text-xs text-gray-400 mt-1">Cliquez sur les points pour voir les détails</p>
              <p className="text-xs text-blue-600 mt-2 font-medium">
                {filteredPoints.length} point(s) affiché(s) sur {mockCollectionPoints.length}
              </p>
            </div>
          </div>

          {/* Collection Points - Seulement les types cochés */}
          <div className="absolute inset-0">
            {filteredPoints.map((point, index) => {
              const pointType = getPointType(point);
              const typeOption = typeOptions.find(t => t.value === pointType);
              return (
                <div
                  key={point.id}
                  className="absolute cursor-pointer transform hover:scale-110 transition-transform z-20"
                  style={{
                    left: `${20 + (index % 4) * 20}%`,
                    top: `${20 + Math.floor(index / 4) * 25}%`
                  }}
                  onClick={() => setSelectedPoint(point)}
                >
                  <div className={`
                    w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center
                    ${getStatusColor(point.status)}
                    ${point.status === 'overflow' ? 'animate-pulse' : ''}
                  `}>
                    <span className="text-xs">
                      {getTypeIcon(pointType)}
                    </span>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                    <div className="font-medium">{point.name}</div>
                    <div className="text-gray-300">{typeOption?.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-3">Légende</h4>
          
          {/* Type Legend - Seulement les types cochés */}
          <div>
            {getVisibleTypesForLegend().length > 0 ? (
              <div className="space-y-1 text-xs">
                {getVisibleTypesForLegend().map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <span className="text-sm">{type.emoji}</span>
                    <span className="font-medium">{type.label}</span>
                    <span className="text-gray-500">
                      ({mockCollectionPoints.filter(p => getPointType(p) === type.value).length})
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-500 italic">
                Aucun type sélectionné
              </div>
            )}
            
            {/* Message informatif */}
            {getVisibleTypesForLegend().length < typeOptions.length && getVisibleTypesForLegend().length > 0 && (
              <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                <span className="font-medium">Filtre actif:</span> {typeOptions.length - getVisibleTypesForLegend().length} type(s) masqué(s)
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Panel */}
      {selectedPoint && (
        <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Détails du Point</h3>
            <button
              onClick={() => setSelectedPoint(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{getTypeIcon(getPointType(selectedPoint))}</span>
                <h4 className="font-medium text-gray-900">{selectedPoint.name}</h4>
              </div>
              <p className="text-sm text-gray-600">{selectedPoint.address}</p>
              <div className="mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  typeOptions.find(t => t.value === getPointType(selectedPoint))?.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                  typeOptions.find(t => t.value === getPointType(selectedPoint))?.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                  typeOptions.find(t => t.value === getPointType(selectedPoint))?.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                  typeOptions.find(t => t.value === getPointType(selectedPoint))?.color === 'green' ? 'bg-green-100 text-green-800' :
                  typeOptions.find(t => t.value === getPointType(selectedPoint))?.color === 'red' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {typeOptions.find(t => t.value === getPointType(selectedPoint))?.label}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedPoint.status)}`} />
              <span className="text-sm font-medium">{getStatusText(selectedPoint.status)}</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Niveau de remplissage</span>
                <span className="text-sm font-bold text-gray-900">{selectedPoint.currentLevel}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
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
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Dernière collecte</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {new Date(selectedPoint.lastCollection).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Prochaine collecte</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {new Date(selectedPoint.nextCollection).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>

            {selectedPoint.status === 'overflow' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-red-800">Action requise</span>
                </div>
                <p className="text-xs text-red-700 mt-1">Collecte d'urgence nécessaire</p>
              </div>
            )}

            <div className="flex space-x-2">
              <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                Programmer Collecte
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Historique
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;