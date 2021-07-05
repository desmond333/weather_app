export interface weatherItemType {
    id: number,
    city: string
    coordinates: coordinatesType
    temperature: string,
    rainfall: string
}

export type coordinatesType = [number, number] | null