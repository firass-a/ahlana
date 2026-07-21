"use client";

import { CircleMarker, MapContainer, Popup, Polyline, TileLayer } from "react-leaflet";

export interface MapPoint {
  id: string;
  name: string;
  coordinates: [number, number];
  detail?: string;
}

export default function TravelMap({ points, route = false, className = "h-[500px]" }: { points: MapPoint[]; route?: boolean; className?: string }) {
  const center = points[0]?.coordinates ?? [36.7538, 3.0588];
  return <MapContainer center={center} zoom={route ? 6 : 5} scrollWheelZoom className={`z-0 w-full ${className}`}>
    <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    {points.map((point,index)=><CircleMarker key={point.id} center={point.coordinates} radius={route ? 9 : 7} pathOptions={{color:"#fff",weight:3,fillColor:index===0?"#d59659":"#214b3b",fillOpacity:1}}><Popup><strong>{point.name}</strong><br/>{point.detail}</Popup></CircleMarker>)}
    {route && <Polyline positions={points.map(point=>point.coordinates)} pathOptions={{color:"#d59659",weight:4,dashArray:"8 10"}}/>}
  </MapContainer>;
}
