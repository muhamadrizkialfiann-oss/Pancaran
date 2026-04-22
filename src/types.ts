export interface Shipment {
  id: string;
  truckPlate: string;
  driverName: string;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Cancelled';
  origin: string;
  destination: string;
  timestamp: string;
  type: string;
  [key: string]: any; // Allow dynamic fields
}
