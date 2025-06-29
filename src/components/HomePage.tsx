import React from 'react';
import { 
  Map, 
  MapPin, 
  Users, 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  Globe, 
  BarChart3, 
  Truck, 
  Recycle, 
  Building2, 
  Database,
  Star,
  Play,
  Download,
  Mail,
  Phone,
  MapIcon
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <img 
                  src="/460080839_836855091958059_5736557114325302727_n.jpg" 
                  alt="SONAGED Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-600">Geoportail</h1>
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Sonaged</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
                Fonctionnalités
              </a>
              <a href="#about" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
                À propos
              </a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
                Contact
              </a>
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium">
                Se connecter
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                <span>Solution de gestion des déchets</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Gestion Intelligente des 
                <span className="text-green-600"> Déchets Urbains</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Optimisez la collecte des déchets avec notre plateforme géospatiale avancée. 
                Surveillez, analysez et gérez efficacement vos circuits de collecte en temps réel.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Découvrir la démo</span>
                </button>
                <button className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-xl hover:bg-green-50 transition-colors font-semibold text-lg flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Documentation</span>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Tableau de Bord</h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-600">Points actifs</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">342</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Truck className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-gray-600">Collectes</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">89%</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Circuit Centre - Terminé</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Circuit Nord - En cours</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Circuit Sud - Planifié</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités Avancées
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une suite complète d'outils pour optimiser la gestion des déchets urbains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Map,
                title: 'Cartographie Interactive',
                description: 'Visualisez vos circuits de collecte sur des cartes interactives avec géolocalisation en temps réel.',
                color: 'blue'
              },
              {
                icon: BarChart3,
                title: 'Analyses Avancées',
                description: 'Tableaux de bord et rapports détaillés pour optimiser vos opérations de collecte.',
                color: 'green'
              },
              {
                icon: Truck,
                title: 'Gestion des Circuits',
                description: 'Planifiez et optimisez vos tournées de collecte avec des algorithmes intelligents.',
                color: 'orange'
              },
              {
                icon: Database,
                title: 'Gestion des Données',
                description: 'Import/export de données en multiple formats : CSV, Excel, JSON, Shapefile.',
                color: 'purple'
              },
              {
                icon: Building2,
                title: 'Mobilier Urbain',
                description: 'Inventaire complet du mobilier urbain avec suivi de maintenance.',
                color: 'red'
              },
              {
                icon: Shield,
                title: 'Sécurité Avancée',
                description: 'Authentification multi-facteurs et gestion granulaire des permissions.',
                color: 'indigo'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
                  <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trois Types d'Utilisateurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme adaptée à tous les niveaux d'accès et de responsabilité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                type: 'Administrateur',
                icon: Shield,
                color: 'red',
                permissions: [
                  'Gestion complète du système',
                  'Administration des utilisateurs',
                  'Configuration avancée',
                  'Accès aux journaux système',
                  'Gestion de la sécurité'
                ]
              },
              {
                type: 'Géomaticien',
                icon: MapIcon,
                color: 'blue',
                permissions: [
                  'Gestion des données géospatiales',
                  'Création et modification des circuits',
                  'Analyse et rapports SIG',
                  'Export de données',
                  'Gestion du mobilier urbain'
                ]
              },
              {
                type: 'Visiteur',
                icon: Users,
                color: 'gray',
                permissions: [
                  'Consultation des cartes',
                  'Visualisation des données',
                  'Accès aux rapports publics',
                  'Téléchargement limité',
                  'Mode lecture seule'
                ]
              }
            ].map((userType, index) => {
              const Icon = userType.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-${userType.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 text-${userType.color}-600`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{userType.type}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {userType.permissions.map((permission, permIndex) => (
                      <div key={permIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                À propos de Geoportail Sonaged
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Geoportail Sonaged est une solution innovante de gestion des déchets urbains qui combine 
                les technologies géospatiales avancées avec une interface utilisateur intuitive.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Notre plateforme permet aux collectivités et entreprises de gestion des déchets 
                d'optimiser leurs opérations, de réduire leurs coûts et d'améliorer leur impact environnemental.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-gray-600">Points de collecte</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                  <div className="text-gray-600">Circuits optimisés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                  <div className="text-gray-600">Disponibilité</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support technique</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <Recycle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-600">Recyclage</div>
                    <div className="text-xl font-bold text-gray-900">68%</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-600">Efficacité</div>
                    <div className="text-xl font-bold text-gray-900">94%</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Impact Environnemental</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CO₂ économisé</span>
                      <span className="font-semibold text-green-600">-25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Kilomètres réduits</span>
                      <span className="font-semibold text-green-600">-30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Coûts optimisés</span>
                      <span className="font-semibold text-green-600">-20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prêt à optimiser votre gestion des déchets ? Notre équipe est là pour vous accompagner.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">contact@sonaged.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Téléphone</h4>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Adresse</h4>
                    <p className="text-gray-600">123 Rue de la République<br />75001 Paris, France</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Demande d'Information</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Dupont"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="jean.dupont@exemple.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organisation
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Nom de votre organisation"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Décrivez vos besoins..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Envoyer le message</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                  <img 
                    src="/460080839_836855091958059_5736557114325302727_n.jpg" 
                    alt="SONAGED Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Geoportail</h3>
                  <p className="text-xs font-semibold text-green-400 uppercase tracking-wide">Sonaged</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Solution innovante de gestion des déchets urbains avec technologies géospatiales avancées.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Fonctionnalités</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Cartographie interactive</li>
                <li>Gestion des circuits</li>
                <li>Analyses avancées</li>
                <li>Mobilier urbain</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Documentation</li>
                <li>Tutoriels</li>
                <li>Support technique</li>
                <li>Formation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>contact@sonaged.com</li>
                <li>+33 1 23 45 67 89</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Geoportail Sonaged. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;