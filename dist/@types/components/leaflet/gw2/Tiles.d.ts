/// <reference types="react" />
import { PointTuple } from 'leaflet';
interface GW2LayerProps {
    bounds: PointTuple;
}
declare function GW2Layer(props: GW2LayerProps): JSX.Element;
export default GW2Layer;
