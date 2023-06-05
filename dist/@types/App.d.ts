import './App.scss';
export interface MarkerEmbed extends Omit<HTMLElement, 'dataset'> {
    dataset: {
        gw2mapIds?: string;
        gw2mapMarker?: string;
        gw2mapColor?: string;
        gw2mapMode?: string;
    };
}
declare class App {
    static getHash(obj: unknown): string;
    private targets;
    private gw2mClass;
    constructor();
    renderButtons(): void;
    renderOffcanvas(): void;
}
export default App;
