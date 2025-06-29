import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  FileText, 
  File,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  Eye,
  Search,
  RefreshCw,
  Filter,
  Edit3,
  Share2,
  Calendar,
  User,
  Tag
} from 'lucide-react';

interface SIGDocument {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'pptx';
  size: string;
  uploadDate: string;
  lastModified: string;
  status: 'active' | 'archived' | 'draft';
  category: 'rapport' | 'analyse' | 'presentation' | 'donnees';
  author: string;
  description: string;
  tags: string[];
  downloadCount: number;
}

const RapportSIG: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'documents' | 'upload' | 'categories'>('documents');
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const mockDocuments: SIGDocument[] = [
    {
      id: '1',
      name: 'Rapport_Annuel_Collecte_2024.pdf',
      type: 'pdf',
      size: '3.2 MB',
      uploadDate: '2024-01-15T10:30:00Z',
      lastModified: '2024-01-16T14:22:00Z',
      status: 'active',
      category: 'rapport',
      author: 'Marie Dubois',
      description: 'Rapport annuel sur les performances de collecte des déchets',
      tags: ['2024', 'collecte', 'performance', 'annuel'],
      downloadCount: 45
    },
    {
      id: '2',
      name: 'Analyse_Zones_Critiques.docx',
      type: 'docx',
      size: '1.8 MB',
      uploadDate: '2024-01-14T09:15:00Z',
      lastModified: '2024-01-14T16:30:00Z',
      status: 'active',
      category: 'analyse',
      author: 'Jean Martin',
      description: 'Analyse détaillée des zones à forte concentration de déchets',
      tags: ['analyse', 'zones', 'critique', 'géospatial'],
      downloadCount: 23
    },
    {
      id: '3',
      name: 'Donnees_Statistiques_Q1.xlsx',
      type: 'xlsx',
      size: '856 KB',
      uploadDate: '2024-01-12T11:45:00Z',
      lastModified: '2024-01-13T08:20:00Z',
      status: 'active',
      category: 'donnees',
      author: 'Sophie Laurent',
      description: 'Données statistiques du premier trimestre 2024',
      tags: ['statistiques', 'Q1', 'données', 'trimestre'],
      downloadCount: 67
    },
    {
      id: '4',
      name: 'Presentation_Conseil_Municipal.pptx',
      type: 'pptx',
      size: '4.1 MB',
      uploadDate: '2024-01-10T15:20:00Z',
      lastModified: '2024-01-11T10:15:00Z',
      status: 'draft',
      category: 'presentation',
      author: 'Pierre Durand',
      description: 'Présentation pour le conseil municipal sur la gestion des déchets',
      tags: ['présentation', 'conseil', 'municipal', 'gestion'],
      downloadCount: 12
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'docx':
        return '📝';
      case 'xlsx':
        return '📊';
      case 'pptx':
        return '📋';
      default:
        return '📁';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'draft':
        return 'Brouillon';
      case 'archived':
        return 'Archivé';
      default:
        return status;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rapport':
        return 'bg-blue-100 text-blue-800';
      case 'analyse':
        return 'bg-purple-100 text-purple-800';
      case 'presentation':
        return 'bg-orange-100 text-orange-800';
      case 'donnees':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'rapport':
        return 'Rapport';
      case 'analyse':
        return 'Analyse';
      case 'presentation':
        return 'Présentation';
      case 'donnees':
        return 'Données';
      default:
        return category;
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

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesType = filterType === 'all' || doc.type === filterType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const DocumentsSection = () => (
    <div className="space-y-6">
      {/* Header - SANS le bouton "Nouveau Document" */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Documents SIG</h3>
        <p className="text-gray-600">Gérez vos rapports et documents géospatiaux</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Toutes les catégories</option>
            <option value="rapport">Rapports</option>
            <option value="analyse">Analyses</option>
            <option value="presentation">Présentations</option>
            <option value="donnees">Données</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Tous les formats</option>
            <option value="pdf">PDF</option>
            <option value="docx">Word</option>
            <option value="xlsx">Excel</option>
            <option value="pptx">PowerPoint</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>{filteredDocuments.length} document(s)</span>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{getFileIcon(doc.type)}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{doc.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{doc.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(doc.uploadDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <span>{doc.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                  {getStatusText(doc.status)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                {getCategoryText(doc.category)}
              </span>
              <span className="text-xs text-gray-500">
                {doc.downloadCount} téléchargements
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {doc.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  #{tag}
                </span>
              ))}
              {doc.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{doc.tags.length - 3}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center justify-center space-x-1">
                <Download className="w-4 h-4" />
                <span>Télécharger</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                <Edit3 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document trouvé</h3>
          <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </div>
  );

  const UploadSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Téléverser des Documents</h3>
        <p className="text-gray-600">Ajoutez vos rapports SIG, analyses et présentations</p>
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
          Glissez-déposez vos documents ici
        </h4>
        <p className="text-gray-600 mb-4">
          ou cliquez pour sélectionner des fichiers
        </p>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          className="hidden"
          id="document-upload"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
        />
        <label
          htmlFor="document-upload"
          className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          Sélectionner des fichiers
        </label>
        <p className="text-xs text-gray-500 mt-2">
          Formats supportés: PDF, Word, Excel, PowerPoint (max 25MB)
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

      {/* Document Information Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Informations du Document</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre du Document
            </label>
            <input
              type="text"
              placeholder="Ex: Rapport mensuel janvier 2024"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="">Sélectionner une catégorie</option>
              <option value="rapport">Rapport</option>
              <option value="analyse">Analyse</option>
              <option value="presentation">Présentation</option>
              <option value="donnees">Données</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Description du contenu du document..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (séparés par des virgules)
            </label>
            <input
              type="text"
              placeholder="Ex: 2024, collecte, analyse, performance"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const CategoriesSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestion des Catégories</h3>
        <p className="text-gray-600">Organisez vos documents par catégories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Rapports', count: 12, color: 'blue', description: 'Rapports officiels et analyses' },
          { name: 'Analyses', count: 8, color: 'purple', description: 'Études et analyses techniques' },
          { name: 'Présentations', count: 5, color: 'orange', description: 'Supports de présentation' },
          { name: 'Données', count: 15, color: 'green', description: 'Fichiers de données brutes' }
        ].map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center mb-4`}>
              <FileText className={`w-6 h-6 text-${category.color}-600`} />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{category.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{category.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">{category.count}</span>
              <span className="text-sm text-gray-500">documents</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rapport SIG</h2>
        <p className="text-gray-600">Gestion des documents et rapports géospatiaux</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'upload', label: 'Téléverser', icon: Upload },
            { id: 'categories', label: 'Catégories', icon: Tag }
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
      <div>
        {activeTab === 'documents' && <DocumentsSection />}
        {activeTab === 'upload' && <UploadSection />}
        {activeTab === 'categories' && <CategoriesSection />}
      </div>
    </div>
  );
};

export default RapportSIG;