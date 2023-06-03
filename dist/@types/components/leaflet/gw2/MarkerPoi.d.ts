/// <reference types="react" />
import { GW2ApiPoi } from '../../../redux/apiMiddleware';
import './tooltip.scss';
declare function MarkerPoi(props: {
    markers: GW2ApiPoi[];
    perm?: boolean;
}): JSX.Element;
export default MarkerPoi;
