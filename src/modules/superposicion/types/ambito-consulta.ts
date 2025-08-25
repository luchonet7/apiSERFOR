export interface GeoFeature {
    type: "Feature";
    geometry: {
        type: string;
        coordinates: any[];
    };
    properties: {
        name?: string;
        id?: string;
        [key: string]: any;
    };
}

export interface AmbitoConsulta {
    id: string;
    name: string;
    geojson: GeoFeature;
    visible: boolean;
    color: string;
    area?: number;
    source?: string;
}
