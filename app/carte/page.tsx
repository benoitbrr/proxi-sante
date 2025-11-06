'use client'

import { useEffect, useState, useRef } from 'react'
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox'
import { createClient } from '@/lib/supabase'
import { MAPBOX_TOKEN, MAP_STYLE, DEFAULT_CENTER, DEFAULT_ZOOM, FRANCE_BOUNDS } from '@/lib/mapbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Briefcase, Euro, Clock, X } from 'lucide-react'
import 'mapbox-gl/dist/mapbox-gl.css'

interface Structure {
  id: string
  name: string
  city: string
  latitude: number
  longitude: number
  is_verified: boolean
}

interface Offer {
  id: string
  title: string
  specialty: string
  contract_type: string
  is_full_time: boolean
  salary_min: number | null
  salary_max: number | null
  description: string
  structure: Structure
}

export default function CartePage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [hoveredStructureId, setHoveredStructureId] = useState<string | null>(null)
  const [viewport, setViewport] = useState({
    latitude: DEFAULT_CENTER[1],
    longitude: DEFAULT_CENTER[0],
    zoom: DEFAULT_ZOOM,
  })
  const mapRef = useRef<any>(null)

  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('offers')
      .select(`
        *,
        structure:structures(
          id,
          name,
          city,
          latitude,
          longitude,
          is_verified
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading offers:', error)
      return
    }

    setOffers(data as Offer[])
  }

  const groupedByStructure = offers.reduce((acc, offer) => {
    const structureId = offer.structure.id
    if (!acc[structureId]) {
      acc[structureId] = {
        structure: offer.structure,
        offers: [],
      }
    }
    acc[structureId].offers.push(offer)
    return acc
  }, {} as Record<string, { structure: Structure; offers: Offer[] }>)

  const handleMarkerClick = (structureId: string) => {
    const group = groupedByStructure[structureId]
    if (group && group.offers.length > 0) {
      setSelectedOffer(group.offers[0])
      
      // Zoom sur la structure
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [group.structure.longitude, group.structure.latitude],
          zoom: 12,
          duration: 1000,
        })
      }
    }
  }

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'À définir'
    if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} €`
    if (min) return `À partir de ${min.toLocaleString()} €`
    return `Jusqu'à ${max?.toLocaleString()} €`
  }

  return (
    <div className="relative h-[calc(100vh-64px)]">
      {/* Carte */}
      <Map
        ref={mapRef}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle={MAP_STYLE}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        maxBounds={FRANCE_BOUNDS}
        minZoom={5}
        maxZoom={18}
      >
        <NavigationControl position="top-right" />

        {/* Marqueurs */}
        {Object.values(groupedByStructure).map(({ structure, offers: structureOffers }) => (
          <Marker
            key={structure.id}
            latitude={structure.latitude}
            longitude={structure.longitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              handleMarkerClick(structure.id)
            }}
          >
            <div
              className={`
                relative cursor-pointer transition-transform hover:scale-110
                ${hoveredStructureId === structure.id ? 'scale-110' : ''}
              `}
              onMouseEnter={() => setHoveredStructureId(structure.id)}
              onMouseLeave={() => setHoveredStructureId(null)}
            >
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-lg
                  ${structure.is_verified ? 'bg-bordeaux-800' : 'bg-bordeaux-600'}
                `}
              >
                <MapPin className="h-5 w-5 text-white" />
              </div>
              {structureOffers.length > 1 && (
                <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-bordeaux-900 text-[10px] font-bold text-white">
                  {structureOffers.length}
                </div>
              )}
            </div>
          </Marker>
        ))}
      </Map>

      {/* Panel latéral avec liste des offres */}
      <div className="absolute left-4 top-4 bottom-4 w-96 overflow-y-auto bg-white rounded-lg shadow-xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <h2 className="text-xl font-bold text-gray-900">
            Offres disponibles
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {offers.length} offre{offers.length > 1 ? 's' : ''} active{offers.length > 1 ? 's' : ''}
          </p>
        </div>

        <div className="p-4 space-y-4">
          {Object.values(groupedByStructure).map(({ structure, offers: structureOffers }) => (
            <Card
              key={structure.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedOffer?.structure.id === structure.id ? 'ring-2 ring-bordeaux-800' : ''
              }`}
              onClick={() => handleMarkerClick(structure.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{structure.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {structure.city}
                    </CardDescription>
                  </div>
                  {structure.is_verified && (
                    <Badge variant="success" className="text-xs">
                      Vérifié
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {structureOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-2 rounded-md bg-gray-50 hover:bg-gray-100 text-sm"
                  >
                    <div className="font-medium text-gray-900">{offer.specialty}</div>
                    <div className="text-xs text-gray-600 mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {offer.contract_type}
                      </span>
                      {offer.is_full_time && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Temps plein
                        </span>
                      )}
                    </div>
                    {(offer.salary_min || offer.salary_max) && (
                      <div className="text-xs text-bordeaux-800 font-medium mt-1 flex items-center gap-1">
                        <Euro className="h-3 w-3" />
                        {formatSalary(offer.salary_min, offer.salary_max)}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {offers.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-sm">Aucune offre disponible pour le moment</p>
            </div>
          )}
        </div>
      </div>

      {/* Détails de l'offre sélectionnée */}
      {selectedOffer && (
        <div className="absolute right-4 top-4 w-96 bg-white rounded-lg shadow-xl">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{selectedOffer.title}</CardTitle>
                  <CardDescription className="mt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{selectedOffer.structure.name}</span>
                      {selectedOffer.structure.is_verified && (
                        <Badge variant="success" className="text-xs">
                          Vérifié
                        </Badge>
                      )}
                    </div>
                    <div className="text-gray-600 mt-1">{selectedOffer.structure.city}</div>
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOffer(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Détails</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span>{selectedOffer.contract_type}</span>
                    {selectedOffer.is_full_time && (
                      <>
                        <span>•</span>
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Temps plein</span>
                      </>
                    )}
                  </div>
                  {(selectedOffer.salary_min || selectedOffer.salary_max) && (
                    <div className="flex items-center gap-2 text-bordeaux-800 font-medium">
                      <Euro className="h-4 w-4" />
                      <span>{formatSalary(selectedOffer.salary_min, selectedOffer.salary_max)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedOffer.description}
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  Contacter
                </Button>
                <Button variant="outline">
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
