'use client'

import { useEffect, useRef, useState } from 'react'
import { X, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FloatingLocationMapProps {
  personName?: string
  latitude?: number
  longitude?: number
}

export function FloatingLocationMap({
  personName = 'John',
  latitude = 42.6526,
  longitude = -73.7562, // Default to Rensselaer, NY (close to Albany)
}: FloatingLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [mapInstance, setMapInstance] = useState<any>(null)

  useEffect(() => {
    if (!isVisible) return

    const initMap = async () => {
      // Dynamically import leaflet to avoid SSR issues
      const L = (await import('leaflet')).default

      // Fix for default marker icons in Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })

      if (mapRef.current && !mapInstance) {
        const map = L.map(mapRef.current, {
          center: [latitude, longitude],
          zoom: 13,
          zoomControl: false,
          attributionControl: false,
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map)

        const marker = L.marker([latitude, longitude]).addTo(map)
        marker.bindPopup(`<strong>${personName} is here! 📍</strong>`).openPopup()

        setMapInstance(map)
      }
    }

    initMap()

    return () => {
      if (mapInstance) {
        mapInstance.remove()
        setMapInstance(null)
      }
    }
  }, [isVisible, latitude, longitude, personName, mapInstance])

  if (!isVisible) return null

  return (
    <>
      {/* Import Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />



      <div className="border-gradient unique-shape shadow-2xl animate-in slide-in-from-right-5 duration-700 w-80 h-72">
        <div className="relative w-full h-full inner-shape overflow-hidden">
          {/* Subtle background */}
          <div className="absolute inset-0 bg-gray-50/50 pointer-events-none" />

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gray-800 text-white px-4 py-3 flex items-center justify-between shadow-lg backdrop-blur-md bg-opacity-90" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide">
                {personName}&apos;s Location
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-gray-700 rounded-full transition-all hover:rotate-90 duration-300"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Map Container */}
          <div ref={mapRef} className="w-full h-full" />

          {/* Status Badge */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gray-400 rounded-full blur-sm opacity-50" />
              <div className="relative bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border-2 border-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full" />
                  <span className="text-xs font-bold text-gray-800">Active Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

