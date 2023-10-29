import type { PointTuple } from 'leaflet';

export interface MarkerEmbed extends Omit<HTMLElement, 'dataset'> {
  dataset: {
    gw2mapIds?: string;
    gw2mapMarker?: string;
    gw2mapColor?: string;
    gw2mapMode?: string;
  };
}

export interface GW2ApiPoi {
  name: string;
  coord: PointTuple;
  type?: string;
  floor?: 1;
  chat_link?: string;
}

export interface GW2ApiSector {
  name: string;
  coord: [number, number];
  bounds: [number, number][];
  chat_link: string;
}

export interface GW2ApiMapsResponse {
  id?: number;
  name?: string;
  min_level?: number;
  max_level?: number;
  default_floor?: number;
  type?: string;
  floors?: number[];
  region_id?: number;
  region_name?: string;
  continent_id?: number;
  continent_name?: string;
  map_rect?: [[number, number], [number, number]];
  continent_rect?: [[number, number], [number, number]];
}

export interface GW2ApiRegionsResponse {
  name?: string;
  min_level?: number;
  max_level?: number;
  default_floor?: number;
  label_coord?: [number, number];
  map_rect?: [[number, number], [number, number]];
  continent_rect?: [[number, number], [number, number]];
  points_of_interest?: Record<number, GW2ApiPoi>;
  sectors?: Record<number, GW2ApiSector>;
  id?: number;
}

export interface GW2ApiError {
  text: string;
}