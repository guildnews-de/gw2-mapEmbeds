/// <reference types="react" />
import { GW2ApiSector } from '../../../redux/apiMiddleware';
interface GW2SectorsProps {
    sectors: Record<number, GW2ApiSector>;
}
declare function GW2Sectors(props: GW2SectorsProps): JSX.Element;
export default GW2Sectors;
