/// <reference types="react" />
import { withPane } from '@react-leaflet/core';
import { type TileLayer } from 'leaflet';
import { TileLayerProps } from 'react-leaflet';
type TileLayerOptions = ReturnType<typeof withPane>;
export declare function leafletOfflineLayer(urlTemplate: string, options: TileLayerOptions): TileLayer;
export declare const CachedTileLayer: import("react").ForwardRefExoticComponent<TileLayerProps & import("react").RefAttributes<TileLayer>>;
export {};
