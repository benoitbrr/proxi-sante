import type { Map as MapboxMap } from 'mapbox-gl'

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

export const MAP_STYLE = 'mapbox://styles/mapbox/light-v11'

export const DEFAULT_CENTER: [number, number] = [2.3522, 48.8566] // Paris
export const DEFAULT_ZOOM = 6

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}

export function getBoundsFromMap(map: MapboxMap): MapBounds {
  const bounds = map.getBounds()
  return {
    north: bounds?.getNorth() ?? 90,
    south: bounds?.getSouth() ?? -90,
    east: bounds?.getEast() ?? 180,
    west: bounds?.getWest() ?? -180,
  }
}

export function isPointInBounds(
  lat: number,
  lng: number,
  bounds: MapBounds
): boolean {
  return (
    lat >= bounds.south &&
    lat <= bounds.north &&
    lng >= bounds.west &&
    lng <= bounds.east
  )
}

export const SPECIALTIES = [
  'Médecine générale',
  'Cardiologie',
  'Dermatologie',
  'Pédiatrie',
  'Gynécologie',
  'Ophtalmologie',
  'Psychiatrie',
  'Radiologie',
  'Anesthésie',
  'Chirurgie',
] as const

export const CONTRACT_TYPES = [
  'CDI',
  'CDD',
  'Stage',
  'Remplacement',
  'Remplacement ponctuel',
  'Libéral',
] as const

export type Specialty = typeof SPECIALTIES[number]
export type ContractType = typeof CONTRACT_TYPES[number]
