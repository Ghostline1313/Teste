import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  FileText, 
  Database, 
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  Eye,
  Filter,
  Search,
  RefreshCw,
  FileSpreadsheet,
  FileJson,
  Map as MapIcon,
  Globe,
  BarChart3,
  Users,
  Truck,
  AlertTriangle,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface DataFile {
  id: string;
  name: string;
  type: 'csv' | 'json' | 'geojson' | 'xlsx';
  size: string;
  uploadDate: string;
  status: 'processing' | 'completed' | 'error';
  category: 'points' | 'routes' | 'alerts' | 'stats';
  description: string;
}

interface DownloadableDataset {
  id: string;
  title: string;
  description: string;
  category: 'geospatial' | 'analytics' | 'operational' | 'administrative';
  icon: any;
  color: string;
  formats: Array<{
    type: 'csv' | 'xlsx' | 'json' | 'shp';
    description: string;
    estimatedSize: string;
  }>;
  lastUpdated: string;
  recordCount: number;
  details: string[];
}

const DataManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'download' | 'history'>('download');
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: number}>({});
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'geospatial' | 'analytics' | 'operational' | 'administrative'>('all');

  const mockFiles: DataFile[] = [
    {
      id: '1',
      name: 'points_collecte_janvier.csv',
      type: 'csv',
      size: '2.4 MB',
      uploadDate: '2024-01-16T10:30:00Z',
      status: 'completed',
      category: 'points',
      description: 'Points de collecte mis à jour pour janvier 2024'
    },
    {
      id: '2',
      name: 'tournees_optimisees.json',
      type: 'json',
      size: '856 KB',
      uploadDate: '2024-01-15T14:22:00Z',
      status: 'completed',
      category: 'routes',
      description: 'Données des tournées optimisées'
    },
    {
      id: '3',
      name: 'zones_intervention.geojson',
      type: 'geojson',
      size: '1.2 MB',
      uploadDate: '2024-01-14T09:15:00Z',
      status: 'processing',
      category: 'points',
      description: 'Zones géographiques d\'intervention'
    }
  ];

  // ✅ NOUVEAUX DATASETS DISPONIBLES AVEC TOUS LES FORMATS
  const availableDatasets: DownloadableDataset[] = [
    {
      id: 'points-collecte',
      title: 'Points de Collecte',
      description: 'Localisation et informations détaillées de tous les points de collecte',
      category: 'geospatial',
      icon: MapIcon,
      color: 'blue',
      formats: [
        { type: 'csv', description: 'Données tabulaires avec coordonnées', estimatedSize: '2.1 MB' },
        { type: 'xlsx', description: 'Fichier Excel avec feuilles multiples', estimatedSize: '2.8 MB' },
        { type: 'json', description: 'Format structuré pour développeurs', estimatedSize: '1.9 MB' },
        { type: 'shp', description: 'Shapefile pour SIG (avec .dbf, .shx)', estimatedSize: '3.2 MB' }
      ],
      lastUpdated: '2024-01-16',
      recordCount: 342,
      details: [
        'Coordonnées GPS précises',
        'Types de conteneurs',
        'Capacités et niveaux de remplissage',
        'Historique des collectes',
        'Statuts en temps réel'
      ]
    },
    {
      id: 'circuits-collecte',
      title: 'Circuits de Collecte',
      description: 'Tracés des circuits de collecte et informations des tournées',
      category: 'geospatial',
      icon: Globe,
      color: 'green',
      formats: [
        { type: 'csv', description: 'Points des circuits avec séquences', estimatedSize: '1.8 MB' },
        { type: 'xlsx', description: 'Planification détaillée par circuit', estimatedSize: '2.3 MB' },
        { type: 'json', description: 'Géométries et propriétés des circuits', estimatedSize: '1.5 MB' },
        { type: 'shp', description: 'Lignes vectorielles des circuits', estimatedSize: '2.7 MB' }
      ],
      lastUpdated: '2024-01-15',
      recordCount: 28,
      details: [
        'Tracés GPS des circuits',
        'Temps de parcours estimés',
        'Véhicules assignés',
        'Fréquences de collecte',
        'Optimisations de routes'
      ]
    },
    {
      id: 'zones-intervention',
      title: 'Zones d\'Intervention',
      description: 'Délimitations des zones de service et secteurs d\'intervention',
      category: 'geospatial',
      icon: Database,
      color: 'purple',
      formats: [
        { type: 'csv', description: 'Limites des zones avec attributs', estimatedSize: '950 KB' },
        { type: 'xlsx', description: 'Analyse par zone avec statistiques', estimatedSize: '1.4 MB' },
        { type: 'json', description: 'Polygones GeoJSON des zones', estimatedSize: '1.1 MB' },
        { type: 'shp', description: 'Polygones vectoriels des zones', estimatedSize: '1.6 MB' }
      ],
      lastUpdated: '2024-01-14',
      recordCount: 15,
      details: [
        'Délimitations précises des secteurs',
        'Population desservie par zone',
        'Densité de points de collecte',
        'Responsables de secteur',
        'Statistiques de performance'
      ]
    },
    {
      id: 'statistiques-performance',
      title: 'Statistiques de Performance',
      description: 'Données analytiques et métriques de performance complètes',
      category: 'analytics',
      icon: BarChart3,
      color: 'orange',
      formats: [
        { type: 'csv', description: 'Séries temporelles et indicateurs', estimatedSize: '3.5 MB' },
        { type: 'xlsx', description: 'Tableaux de bord avec graphiques', estimatedSize: '4.2 MB' },
        { type: 'json', description: 'Métriques structurées par période', estimatedSize: '2.8 MB' },
        { type: 'shp', description: 'Performance géolocalisée par zone', estimatedSize: '2.1 MB' }
      ],
      lastUpdated: '2024-01-16',
      recordCount: 1250,
      details: [
        'Collecte quotidienne et hebdomadaire',
        'Taux de recyclage par zone',
        'Performance des circuits',
        'Alertes et incidents',
        'Tendances historiques'
      ]
    },
    {
      id: 'vehicules-flotte',
      title: 'Flotte de Véhicules',
      description: 'Informations sur les véhicules et leur utilisation',
      category: 'operational',
      icon: Truck,
      color: 'red',
      formats: [
        { type: 'csv', description: 'Liste des véhicules et caractéristiques', estimatedSize: '680 KB' },
        { type: 'xlsx', description: 'Suivi maintenance et utilisation', estimatedSize: '920 KB' },
        { type: 'json', description: 'Données techniques et historique', estimatedSize: '750 KB' },
        { type: 'shp', description: 'Positions GPS et trajets', estimatedSize: '1.3 MB' }
      ],
      lastUpdated: '2024-01-15',
      recordCount: 45,
      details: [
        'Caractéristiques techniques',
        'Historique de maintenance',
        'Consommation de carburant',
        'Trajets et kilométrage',
        'Affectations aux circuits'
      ]
    },
    {
      id: 'alertes-incidents',
      title: 'Alertes et Incidents',
      description: 'Historique des alertes, incidents et interventions',
      category: 'operational',
      icon: AlertTriangle,
      color: 'yellow',
      formats: [
        { type: 'csv', description: 'Journal des alertes avec timestamps', estimatedSize: '1.2 MB' },
        { type: 'xlsx', description: 'Analyse des incidents par type', estimatedSize: '1.6 MB' },
        { type: 'json', description: 'Détails structurés des incidents', estimatedSize: '1.1 MB' },
        { type: 'shp', description: 'Localisation géographique des incidents', estimatedSize: '890 KB' }
      ],
      lastUpdated: '2024-01-16',
      recordCount: 156,
      details: [
        'Types d\'alertes et sévérité',
        'Temps de résolution',
        'Localisation des incidents',
        'Actions correctives prises',
        'Analyse des tendances'
      ]
    },
    {
      id: 'planning-collecte',
      title: 'Planning de Collecte',
      description: 'Planification et calendrier des collectes',
      category: 'administrative',
      icon: Calendar,
      color: 'indigo',
      formats: [
        { type: 'csv', description: 'Calendrier avec fréquences', estimatedSize: '2.3 MB' },
        { type: 'xlsx', description: 'Planning détaillé par équipe', estimatedSize: '3.1 MB' },
        { type: 'json', description: 'Structure de planification', estimatedSize: '1.8 MB' },
        { type: 'shp', description: 'Zones de collecte programmée', estimatedSize: '2.5 MB' }
      ],
      lastUpdated: '2024-01-15',
      recordCount: 890,
      details: [
        'Fréquences de collecte par zone',
        'Affectation des équipes',
        'Calendrier des interventions',
        'Optimisation des tournées',
        'Gestion des congés et absences'
      ]
    },
    {
      id: 'mobilier-urbain',
      title: 'Mobilier Urbain',
      description: 'Inventaire complet du mobilier urbain de collecte',
      category: 'administrative',
      icon: Users,
      color: 'teal',
      formats: [
        { type: 'csv', description: 'Inventaire avec caractéristiques', estimatedSize: '1.7 MB' },
        { type: 'xlsx', description: 'Suivi maintenance et état', estimatedSize: '2.2 MB' },
        { type: 'json', description: 'Données techniques détaillées', estimatedSize: '1.4 MB' },
        { type: 'shp', description: 'Localisation précise du mobilier', estimatedSize: '1.9 MB' }
      ],
      lastUpdated: '2024-01-14',
      recordCount: 267,
      details: [
        'Types de mobilier (PRN, PP, Bacs)',
        'État et maintenance',
        'Capacités et utilisation',
        'Dates d\'installation',
        'Fabricants et modèles'
      ]
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'csv':
      case 'xlsx':
        return FileSpreadsheet;
      case 'json':
        return FileJson;
      case 'geojson':
      case 'shp':
        return MapIcon;
      default:
        return FileText;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'csv':
        return '📊';
      case 'xlsx':
        return '📈';
      case 'json':
        return '🔧';
      case 'shp':
        return '🗺️';
      default:
        return '📄';
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'csv':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'xlsx':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'json':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'shp':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'geospatial':
        return 'bg-blue-100 text-blue-800';
      case 'analytics':
        return 'bg-orange-100 text-orange-800';
      case 'operational':
        return 'bg-red-100 text-red-800';
      case 'administrative':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'geospatial':
        return 'Géospatial';
      case 'analytics':
        return 'Analytique';
      case 'operational':
        return 'Opérationnel';
      case 'administrative':
        return 'Administratif';
      default:
        return category;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
    setUploadProgress(0);
    
    // Simulation d'upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(null), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // ✅ FONCTION DE TÉLÉCHARGEMENT POUR TOUS LES FORMATS
  const handleDownload = (datasetId: string, format: 'csv' | 'xlsx' | 'json' | 'shp') => {
    const downloadId = `${datasetId}_${format}`;
    
    // Initialiser la progression
    setDownloadProgress(prev => ({ ...prev, [downloadId]: 0 }));
    
    // Simulation du processus de génération et téléchargement
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const currentProgress = prev[downloadId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          
          // Simulation du téléchargement réel
          setTimeout(() => {
            const dataset = availableDatasets.find(d => d.id === datasetId);
            const fileName = `geoportail_${datasetId}_${new Date().toISOString().split('T')[0]}.${format === 'shp' ? 'zip' : format}`;
            
            // Créer un blob avec des données simulées
            let content = '';
            let mimeType = '';
            
            switch (format) {
              case 'csv':
                content = generateCSVContent(datasetId);
                mimeType = 'text/csv';
                break;
              case 'xlsx':
                content = 'Données Excel simulées'; // Dans une vraie app, utiliser une lib comme xlsx
                mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                break;
              case 'json':
                content = generateJSONContent(datasetId);
                mimeType = 'application/json';
                break;
              case 'shp':
                content = 'Archive Shapefile simulée'; // Dans une vraie app, générer un vrai shapefile
                mimeType = 'application/zip';
                break;
            }
            
            // Créer et déclencher le téléchargement
            const blob = new Blob([content], { type: mimeType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            // Nettoyer la progression
            setDownloadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[downloadId];
              return newProgress;
            });
            
            // Afficher un message de succès
            alert(`✅ Téléchargement terminé !\nDataset: ${dataset?.title}\nFormat: ${format.toUpperCase()}\nFichier: ${fileName}\nTaille: ${(blob.size / 1024).toFixed(1)} KB`);
          }, 500);
          
          return 100;
        }
        return currentProgress + 15;
      });
    }, 200);
  };

  // Fonctions pour générer du contenu simulé
  const generateCSVContent = (datasetId: string) => {
    switch (datasetId) {
      case 'points-collecte':
        return `ID,Nom,Adresse,Latitude,Longitude,Type,Statut,Capacite,Niveau
1,Place République,75003 Paris,48.8675,2.3634,Conteneur,Plein,1100,95
2,Parc Buttes-Chaumont,75019 Paris,48.8799,2.3831,Recyclage,Moitié,800,60
3,Marché Saint-Germain,75006 Paris,48.8534,2.3347,Organique,Débordement,600,110`;
      case 'circuits-collecte':
        return `ID,Nom,Distance_KM,Duree_Min,Vehicule,Points_Collecte
1,Circuit Centre,15.6,150,Camion-A12,"1,4"
2,Circuit Nord,22.3,195,Camion-B07,"2,5"
3,Circuit Marché,8.9,105,Camion-C15,"3"`;
      default:
        return 'ID,Nom,Type,Statut\n1,Donnée A,Type1,Actif\n2,Donnée B,Type2,Inactif';
    }
  };

  const generateJSONContent = (datasetId: string) => {
    switch (datasetId) {
      case 'points-collecte':
        return JSON.stringify({
          export_date: new Date().toISOString(),
          dataset: 'points-collecte',
          total_records: 342,
          data: [
            { id: 1, nom: 'Place République', type: 'conteneur', coordonnees: [48.8675, 2.3634] },
            { id: 2, nom: 'Parc Buttes-Chaumont', type: 'recyclage', coordonnees: [48.8799, 2.3831] }
          ]
        }, null, 2);
      default:
        return JSON.stringify({ 
          message: `Données ${datasetId} exportées depuis Geoportail Sonaged`,
          export_date: new Date().toISOString()
        }, null, 2);
    }
  };

  // Filtrer les datasets par catégorie
  const filteredDatasets = selectedCategory === 'all' 
    ? availableDatasets 
    : availableDatasets.filter(dataset => dataset.category === selectedCategory);

  const UploadSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Téléverser des Données</h3>
        <p className="text-gray-600">Importez vos fichiers de données pour enrichir la plateforme</p>
      </div>

      {/* Upload Zone */}
      <div
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-colors
          ${dragActive 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">
          Glissez-déposez vos fichiers ici
        </h4>
        <p className="text-gray-600 mb-4">
          ou cliquez pour sélectionner des fichiers
        </p>
        <input
          type="file"
          multiple
          accept=".csv,.json,.geojson,.xlsx,.shp"
          className="hidden"
          id="file-upload"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          Sélectionner des fichiers
        </label>
        <p className="text-xs text-gray-500 mt-2">
          Formats supportés: CSV, JSON, GeoJSON, XLSX, SHP (max 100MB)
        </p>
      </div>

      {/* Upload Progress */}
      {uploadProgress !== null && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">Téléversement en cours...</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-blue-700 mt-1">{uploadProgress}% terminé</p>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Recommandations pour l'import</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Données Géospatiales (CSV)</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Colonnes: nom, adresse, latitude, longitude, type</li>
              <li>• Encodage: UTF-8</li>
              <li>• Séparateur: virgule</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Données Géographiques</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Format GeoJSON recommandé</li>
              <li>• Système de coordonnées: WGS84</li>
              <li>• Propriétés métier incluses</li>
            </ul>
          </div>
        </div>
        
        {/* ✅ SECTION POUR LA LIMITE 100MB */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h5 className="font-semibold text-green-800 mb-2 flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Capacité de Téléversement Étendue
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
            <div>
              <p className="font-medium mb-1">Limite de taille augmentée :</p>
              <ul className="space-y-1">
                <li>• <strong>Maximum :</strong> 100 MB par fichier</li>
                <li>• <strong>Recommandé :</strong> Fichiers &lt; 50 MB</li>
                <li>• <strong>Optimal :</strong> Fichiers &lt; 25 MB</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">Types de données volumineux :</p>
              <ul className="space-y-1">
                <li>• Données GeoJSON complexes</li>
                <li>• Fichiers CSV avec millions d'entrées</li>
                <li>• Bases de données géospatiales</li>
              </ul>
            </div>
          </div>
          <div className="mt-3 p-3 bg-green-100 rounded-lg">
            <p className="text-xs text-green-800 font-medium">
              💡 <strong>Conseil :</strong> Pour des fichiers &gt; 50 MB, privilégiez les heures creuses pour un traitement optimal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // ✅ NOUVELLE SECTION DE TÉLÉCHARGEMENT AVEC TOUS LES DATASETS
  const DownloadSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Télécharger des Données</h3>
          <p className="text-gray-600">Exportez les données de la plateforme dans différents formats</p>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-600">{availableDatasets.length} datasets disponibles</span>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Filter className="w-5 h-5 mr-2 text-blue-500" />
          Filtrer par Catégorie
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'Toutes les catégories', count: availableDatasets.length },
            { value: 'geospatial', label: 'Géospatial', count: availableDatasets.filter(d => d.category === 'geospatial').length },
            { value: 'analytics', label: 'Analytique', count: availableDatasets.filter(d => d.category === 'analytics').length },
            { value: 'operational', label: 'Opérationnel', count: availableDatasets.filter(d => d.category === 'operational').length },
            { value: 'administrative', label: 'Administratif', count: availableDatasets.filter(d => d.category === 'administrative').length }
          ].map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                selectedCategory === category.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{category.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                selectedCategory === category.value
                  ? 'bg-white/20 text-white'
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Liste des datasets */}
      <div className="grid grid-cols-1 gap-6">
        {filteredDatasets.map((dataset) => {
          const Icon = dataset.icon;
          
          return (
            <div key={dataset.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              {/* Header du dataset */}
              <div className="flex items-start space-x-4 mb-6">
                <div className={`p-4 rounded-xl bg-${dataset.color}-100 flex-shrink-0`}>
                  <Icon className={`w-8 h-8 text-${dataset.color}-600`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900 text-xl">{dataset.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(dataset.category)}`}>
                      {getCategoryText(dataset.category)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{dataset.description}</p>
                  
                  {/* Métadonnées */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4" />
                      <span>{dataset.recordCount.toLocaleString()} enregistrements</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Mis à jour le {new Date(dataset.lastUpdated).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Détails du contenu */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-800 mb-3">Contenu inclus :</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {dataset.details.map((detail, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>

              {/* Formats disponibles */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-800 mb-4">Formats de téléchargement disponibles :</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dataset.formats.map((format) => {
                    const downloadId = `${dataset.id}_${format.type}`;
                    const isDownloading = downloadProgress[downloadId] !== undefined;
                    const progress = downloadProgress[downloadId] || 0;
                    
                    return (
                      <div key={format.type} className={`border-2 rounded-xl p-4 transition-all ${getFormatColor(format.type)}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getFormatIcon(format.type)}</span>
                            <div>
                              <h6 className="font-bold text-lg">{format.type.toUpperCase()}</h6>
                              <p className="text-sm opacity-80">{format.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs opacity-70">Taille estimée</div>
                            <div className="font-semibold">{format.estimatedSize}</div>
                          </div>
                        </div>

                        {/* Barre de progression */}
                        {isDownloading && (
                          <div className="mb-3 p-3 bg-white/50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Download className="w-4 h-4" />
                              <span className="text-sm font-medium">Génération {format.type.toUpperCase()}...</span>
                            </div>
                            <div className="w-full bg-white/70 rounded-full h-2">
                              <div
                                className="bg-current h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <p className="text-xs mt-1">{progress}% terminé</p>
                          </div>
                        )}

                        {/* Bouton de téléchargement */}
                        <button
                          onClick={() => handleDownload(dataset.id, format.type)}
                          disabled={isDownloading}
                          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all transform ${
                            isDownloading
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-white/80 hover:bg-white text-current hover:scale-105 shadow-md hover:shadow-lg'
                          }`}
                        >
                          <Download className="w-5 h-5" />
                          <span>
                            {isDownloading 
                              ? `Génération...` 
                              : `Télécharger ${format.type.toUpperCase()}`
                            }
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message si aucun dataset */}
      {filteredDatasets.length === 0 && (
        <div className="text-center py-12">
          <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun dataset trouvé</h3>
          <p className="text-gray-600">Aucun dataset ne correspond à la catégorie sélectionnée</p>
        </div>
      )}

      {/* Informations générales */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Informations sur les Formats
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/60 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">📊</span>
              <strong className="text-green-800">CSV</strong>
            </div>
            <p className="text-blue-700">Format tabulaire, compatible Excel et outils d'analyse</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">📈</span>
              <strong className="text-blue-800">XLSX</strong>
            </div>
            <p className="text-blue-700">Format Excel natif avec feuilles multiples et formatage</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">🔧</span>
              <strong className="text-purple-800">JSON</strong>
            </div>
            <p className="text-blue-700">Format structuré pour développeurs et APIs</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">🗺️</span>
              <strong className="text-orange-800">SHP</strong>
            </div>
            <p className="text-blue-700">Shapefile pour SIG (ArcGIS, QGIS) avec géométries</p>
          </div>
        </div>
      </div>
    </div>
  );

  const HistorySection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Historique des Fichiers</h3>
          <p className="text-gray-600">Gérez vos fichiers téléversés et leurs statuts</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50">
          <RefreshCw className="w-4 h-4" />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un fichier..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
          />
        </div>
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="all">Toutes les catégories</option>
          <option value="points">Points de collecte</option>
          <option value="routes">Tournées</option>
          <option value="alerts">Alertes</option>
          <option value="stats">Statistiques</option>
        </select>
      </div>

      {/* Files List */}
      <div className="space-y-4">
        {mockFiles.map((file) => {
          const FileIcon = getFileIcon(file.type);
          return (
            <div key={file.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{file.name}</h4>
                    <p className="text-sm text-gray-600">{file.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">{file.size}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(file.uploadDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(file.status)}`}>
                    {file.status === 'completed' ? 'Terminé' : 
                     file.status === 'processing' ? 'En cours' : 'Erreur'}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                    <Eye className="w-4 h-4" />
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
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion des Données</h2>
        <p className="text-gray-600">Importez et exportez vos données de gestion des déchets</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'upload', label: 'Téléverser', icon: Upload },
            { id: 'download', label: 'Télécharger', icon: Download },
            { id: 'history', label: 'Historique', icon: FileText }
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
                {tab.id === 'download' && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                    ACTIF
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === 'upload' && <UploadSection />}
        {activeTab === 'download' && <DownloadSection />}
        {activeTab === 'history' && <HistorySection />}
      </div>
    </div>
  );
};

export default DataManagement;