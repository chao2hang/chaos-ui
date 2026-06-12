"use client"
import * as React from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
)

export interface MapMarker {
  id: string
  position: [number, number]
  title?: string
  description?: string
  onClick?: () => void
}

interface MapViewProps extends React.ComponentProps<"div"> {
  center?: [number, number]
  zoom?: number
  markers?: MapMarker[]
  height?: number | string
  className?: string
  scrollWheelZoom?: boolean
}

export function MapView({
  center = [39.9042, 116.4074],
  zoom = 11,
  markers = [],
  height = 400,
  className,
  scrollWheelZoom = true,
  ...props
}: MapViewProps) {
  return (
    <div
      data-slot="map-view"
      className={cn("overflow-hidden rounded-md border", className)}
      style={{ height }}
      {...props}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m) => (
          <Marker key={m.id} position={m.position} eventHandlers={m.onClick ? { click: m.onClick } : undefined}>
            <Popup>
              {m.title && <strong>{m.title}</strong>}
              {m.description && <div>{m.description}</div>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
