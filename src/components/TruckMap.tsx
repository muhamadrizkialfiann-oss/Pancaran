import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as L from 'leaflet';

interface TruckLocation {
  id: string;
  lat: number;
  lng: number;
  label: string;
  status: string;
  type?: string;
}

interface TruckMapProps {
  locations: TruckLocation[];
  center?: [number, number];
  zoom?: number;
  darkMode?: boolean;
}

export const TruckMap: React.FC<TruckMapProps> = ({ 
  locations, 
  center = [-2.5489, 118.0149],
  zoom = 5,
  darkMode = false
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fix for default Leaflet marker icons using CDN URLs
    // This needs to run on client side only
    const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
    const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
    
    const DefaultIcon = L.icon({
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    setMounted(true);
  }, []);

  if (!mounted || typeof window === 'undefined') {
    return (
      <div className="w-full h-full min-h-[300px] bg-slate-100 animate-pulse flex items-center justify-center rounded-2xl">
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Loading Map Engine...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[300px] border border-slate-200 rounded-2xl overflow-hidden shadow-inner relative z-10">
      <style>
        {`
          .leaflet-container {
            width: 100%;
            height: 100%;
            background: ${darkMode ? '#0f172a' : '#f8fafc'};
          }
          ${darkMode ? `
            .leaflet-tile {
              filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
            }
            .leaflet-container .leaflet-control-attribution {
              background: rgba(15, 23, 42, 0.7);
              color: #94a3b8;
            }
          ` : ''}
        `}
      </style>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <div className="p-1 font-sans">
                <p className="font-black text-[10px] uppercase text-brand-dark mb-1">{loc.id}</p>
                <p className="text-[10px] font-bold text-slate-600 mb-1">{loc.label}</p>
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${
                  loc.status === 'Ready' ? 'bg-green-100 text-green-700 border-green-200' :
                  loc.status === 'In-Transit' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                  'bg-yellow-100 text-yellow-700 border-yellow-200'
                }`}>
                  {loc.status}
                </span>
                {loc.type && <p className="text-[8px] text-slate-400 mt-2">Type: {loc.type}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
