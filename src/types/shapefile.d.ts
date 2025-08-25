declare module 'shapefile' {
    export interface ShapefileSource {
        read (): Promise<{ done: boolean; value?: any }>;
    }

    export function open (source: ArrayBuffer): Promise<ShapefileSource>;
}
