import './App.scss';
export interface MarkerEmbed extends Omit<HTMLElement, 'dataset'> {
    dataset: {
        gw2mapIds?: string;
        gw2mapMarker?: string;
        gw2mapColor?: string;
    };
}
declare class App {
    static getHash(obj: unknown): string;
    private targets;
    constructor();
    renderButtons(): void;
    renderOffcanvas(): void;
}
export default App;
