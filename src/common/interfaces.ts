import type { PointTuple } from 'leaflet';

export class MarkerEmbedData {
  marker: string[];
  color: string;
  mode: string;
  constructor(props: MarkerEmbed['dataset']) {
    const {
      gw2mapMarker = '1,1',
      gw2mapColor = 'blue',
      gw2mapMode = 'points',
    } = props;

    this.marker = gw2mapMarker?.split(';');
    this.color = gw2mapColor;
    this.mode = gw2mapMode;
  }
}

export interface MarkerEmbed extends Omit<HTMLElement, 'dataset'> {
  dataset: {
    gw2mapIds?: string;
    gw2mapMarker?: string;
    gw2mapColor?: string;
    gw2mapMode?: string;
  };
}

export class MapsInitEmbedData {
  ids: string[];
  lang: string;
  debug: boolean;
  constructor(props: MapsInitEmbed['dataset']) {
    const { gw2mapIds = '', gw2mapLang = 'de', gw2mapDebug = 'false' } = props;

    if (gw2mapIds != '') {
      this.ids = gw2mapIds.split(',');
    } else {
      this.ids = [];
    }
    this.lang = gw2mapLang;
    this.debug = gw2mapDebug === 'true' ? true : false;
  }
}

export interface MapsInitEmbed extends Omit<HTMLElement, 'dataset'> {
  dataset: {
    gw2mapIds?: string;
    gw2mapLang?: string;
    gw2mapDebug?: string;
  };
}

export interface GW2ApiPoi {
  name: string;
  coord: PointTuple;
  type: string;
  floor?: 1;
  chat_link?: string;
  icon?: string;
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
