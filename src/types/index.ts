export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'container' | 'recycling' | 'hazardous' | 'organic';
  status: 'empty' | 'half-full' | 'full' | 'overflow' | 'maintenance';
  capacity: number;
  currentLevel: number;
  lastCollection: string;
  nextCollection: string;
}

export interface WasteStats {
  totalCollected: number;
  recyclingRate: number;
  activePoints: number;
  alertPoints: number;
  dailyCollection: number;
  weeklyTrend: number;
}

export interface CollectionRoute {
  id: string;
  name: string;
  points: string[];
  estimatedTime: string;
  distance: number;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed';
  assignedTruck: string;
  startTime: string;
}

export interface Alert {
  id: string;
  pointId: string;
  pointName: string;
  type: 'overflow' | 'maintenance' | 'delay' | 'equipment';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface UrbanFurniture {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'PRN' | 'PP' | 'Bacs' | 'Decharge';
  status: 'active' | 'maintenance' | 'inactive' | 'damaged';
  installationDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  description: string;
  capacity?: number;
  currentLevel?: number;
  material?: string;
  manufacturer?: string;
  model?: string;
}