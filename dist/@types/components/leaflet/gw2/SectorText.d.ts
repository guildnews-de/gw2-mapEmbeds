/// <reference types="react" />
import { LatLng } from 'leaflet';
import './SectorText.scss';
interface MapTextMarkProps {
    text: string;
    coord: LatLng;
}
declare function MapTextMark(props: MapTextMarkProps): JSX.Element;
export default MapTextMark;
