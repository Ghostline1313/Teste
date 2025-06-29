import { CollectionPoint, WasteStats, CollectionRoute, Alert, UrbanFurniture } from '../types';

export const mockCollectionPoints: CollectionPoint[] = [
  {
    id: '1',
    name: 'Place de la République',
    address: '75003 Paris, France',
    latitude: 48.8675,
    longitude: 2.3634,
    type: 'container',
    status: 'full',
    capacity: 1100,
    currentLevel: 95,
    lastCollection: '2024-01-15',
    nextCollection: '2024-01-16'
  },
  {
    id: '2',
    name: 'Parc des Buttes-Chaumont',
    address: '75019 Paris, France',
    latitude: 48.8799,
    longitude: 2.3831,
    type: 'recycling',
    status: 'half-full',
    capacity: 800,
    currentLevel: 60,
    lastCollection: '2024-01-14',
    nextCollection: '2024-01-17'
  },
  {
    id: '3',
    name: 'Marché Saint-Germain',
    address: '75006 Paris, France',
    latitude: 48.8534,
    longitude: 2.3347,
    type: 'organic',
    status: 'overflow',
    capacity: 600,
    currentLevel: 110,
    lastCollection: '2024-01-13',
    nextCollection: '2024-01-16'
  },
  {
    id: '4',
    name: 'Centre Commercial Châtelet',
    address: '75001 Paris, France',
    latitude: 48.8607,
    longitude: 2.3471,
    type: 'container',
    status: 'empty',
    capacity: 1200,
    currentLevel: 15,
    lastCollection: '2024-01-15',
    nextCollection: '2024-01-18'
  },
  {
    id: '5',
    name: 'Zone Industrielle Nord',
    address: '75018 Paris, France',
    latitude: 48.8989,
    longitude: 2.3456,
    type: 'hazardous',
    status: 'maintenance',
    capacity: 500,
    currentLevel: 0,
    lastCollection: '2024-01-10',
    nextCollection: '2024-01-20'
  }
];

export const mockWasteStats: WasteStats = {
  totalCollected: 1247,
  recyclingRate: 68,
  activePoints: 342,
  alertPoints: 23,
  dailyCollection: 89,
  weeklyTrend: 12
};

export const mockRoutes: CollectionRoute[] = [
  {
    id: 'route-1',
    name: 'Circuit Centre',
    points: ['1', '4'],
    estimatedTime: '2h 30min',
    distance: 15.6,
    status: 'in-progress',
    assignedTruck: 'Camion-A12',
    startTime: '08:00'
  },
  {
    id: 'route-2',
    name: 'Circuit Nord',
    points: ['2', '5'],
    estimatedTime: '3h 15min',
    distance: 22.3,
    status: 'planned',
    assignedTruck: 'Camion-B07',
    startTime: '10:00'
  },
  {
    id: 'route-3',
    name: 'Circuit Marché',
    points: ['3'],
    estimatedTime: '1h 45min',
    distance: 8.9,
    status: 'completed',
    assignedTruck: 'Camion-C15',
    startTime: '06:00'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    pointId: '3',
    pointName: 'Marché Saint-Germain',
    type: 'overflow',
    severity: 'critical',
    message: 'Conteneur débordant détecté',
    timestamp: '2024-01-16T09:15:00Z',
    resolved: false
  },
  {
    id: 'alert-2',
    pointId: '1',
    pointName: 'Place de la République',
    type: 'overflow',
    severity: 'high',
    message: 'Conteneur presque plein',
    timestamp: '2024-01-16T08:30:00Z',
    resolved: false
  },
  {
    id: 'alert-3',
    pointId: '5',
    pointName: 'Zone Industrielle Nord',
    type: 'maintenance',
    severity: 'medium',
    message: 'Maintenance programmée requise',
    timestamp: '2024-01-16T07:45:00Z',
    resolved: true
  }
];

export const mockUrbanFurniture: UrbanFurniture[] = [
  {
    id: 'prn-1',
    name: 'PRN Champs-Élysées',
    address: 'Avenue des Champs-Élysées, 75008 Paris',
    latitude: 48.8698,
    longitude: 2.3076,
    type: 'PRN',
    status: 'active',
    installationDate: '2023-03-15',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-04-10',
    description: 'Point de Regroupement Normalisé pour déchets ménagers',
    capacity: 2400,
    currentLevel: 65,
    material: 'Acier galvanisé',
    manufacturer: 'EcoUrban',
    model: 'PRN-2400L'
  },
  {
    id: 'prn-2',
    name: 'PRN Place Vendôme',
    address: 'Place Vendôme, 75001 Paris',
    latitude: 48.8677,
    longitude: 2.3281,
    type: 'PRN',
    status: 'maintenance',
    installationDate: '2023-05-20',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15',
    description: 'Point de Regroupement Normalisé zone commerciale',
    capacity: 1800,
    currentLevel: 0,
    material: 'Acier inoxydable',
    manufacturer: 'UrbanTech',
    model: 'PRN-1800L'
  },
  {
    id: 'pp-1',
    name: 'PP Jardin du Luxembourg',
    address: 'Jardin du Luxembourg, 75006 Paris',
    latitude: 48.8462,
    longitude: 2.3372,
    type: 'PP',
    status: 'active',
    installationDate: '2023-06-10',
    lastMaintenance: '2024-01-08',
    nextMaintenance: '2024-03-08',
    description: 'Point de Propreté pour tri sélectif',
    capacity: 1200,
    currentLevel: 45,
    material: 'Plastique recyclé',
    manufacturer: 'EcoDesign',
    model: 'PP-TRI-1200'
  },
  {
    id: 'pp-2',
    name: 'PP Gare du Nord',
    address: 'Place Napoléon III, 75010 Paris',
    latitude: 48.8809,
    longitude: 2.3553,
    type: 'PP',
    status: 'active',
    installationDate: '2023-04-25',
    lastMaintenance: '2024-01-12',
    nextMaintenance: '2024-04-12',
    description: 'Point de Propreté zone transport',
    capacity: 1500,
    currentLevel: 78,
    material: 'Composite',
    manufacturer: 'CleanCity',
    model: 'PP-TRANSPORT-1500'
  },
  {
    id: 'bacs-1',
    name: 'Bacs Rue de Rivoli',
    address: 'Rue de Rivoli, 75004 Paris',
    latitude: 48.8566,
    longitude: 2.3522,
    type: 'Bacs',
    status: 'active',
    installationDate: '2023-02-14',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-07-05',
    description: 'Ensemble de bacs de collecte sélective',
    capacity: 800,
    currentLevel: 55,
    material: 'Plastique HDPE',
    manufacturer: 'WasteTech',
    model: 'BACS-SEL-800'
  },
  {
    id: 'bacs-2',
    name: 'Bacs Montmartre',
    address: 'Place du Tertre, 75018 Paris',
    latitude: 48.8867,
    longitude: 2.3407,
    type: 'Bacs',
    status: 'damaged',
    installationDate: '2023-01-30',
    lastMaintenance: '2023-12-20',
    nextMaintenance: '2024-02-20',
    description: 'Bacs de collecte zone touristique',
    capacity: 600,
    currentLevel: 90,
    material: 'Plastique renforcé',
    manufacturer: 'ProWaste',
    model: 'BACS-TOUR-600'
  },
  {
    id: 'decharge-1',
    name: 'Décharge Bois de Vincennes',
    address: 'Bois de Vincennes, 75012 Paris',
    latitude: 48.8280,
    longitude: 2.4325,
    type: 'Decharge',
    status: 'active',
    installationDate: '2022-11-15',
    lastMaintenance: '2024-01-03',
    nextMaintenance: '2024-06-03',
    description: 'Point de décharge pour déchets verts',
    capacity: 5000,
    currentLevel: 35,
    material: 'Béton armé',
    manufacturer: 'EcoInfra',
    model: 'DECHARGE-VERTS-5000'
  },
  {
    id: 'decharge-2',
    name: 'Décharge Zone Industrielle',
    address: 'Zone Industrielle Nord, 75019 Paris',
    latitude: 48.8989,
    longitude: 2.3856,
    type: 'Decharge',
    status: 'inactive',
    installationDate: '2022-08-20',
    lastMaintenance: '2023-11-15',
    nextMaintenance: '2024-05-15',
    description: 'Point de décharge industrielle temporairement fermé',
    capacity: 8000,
    currentLevel: 0,
    material: 'Acier et béton',
    manufacturer: 'IndustrialWaste',
    model: 'DECHARGE-IND-8000'
  }
];