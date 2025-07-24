'use client'

import 'leaflet/dist/leaflet.css'

import { Map as MapLeaflet, type ZoomPanOptions } from 'leaflet'
import { useRef, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import { Minus } from '@/assets/icons/Minus'
import { Plus } from '@/assets/icons/Plus'
import { cn } from '@/lib/utils'

const LATITUDE = 30.274250
const LONGITUDE = -97.740584

const ZOOM_STEP = 2
const zoomOptions: ZoomPanOptions = {
  animate: true,
  duration: 0.5,
  easeLinearity: 0.25
}

const MAX_ZOOM = 18
const MIN_ZOOM = 9

const MAP_URL = '/api/map/{z}/{x}/{y}.png'

interface ZoomButtonProps
  extends Pick<
    React.HTMLProps<HTMLButtonElement>,
    'onClick' | 'children' | 'className'
  > {
  hide?: boolean
}

const ZoomButton = (props: ZoomButtonProps) => {
  const { onClick, children, className, hide } = props
  return (
    <button
      onClick={onClick}
      className={cn(
        'absolute size-10 rounded-full bg-zinc-950 text-3xl leading-none outline outline-2 outline-slate-700',
        'scale-100 transition-all duration-300 hover:outline-4',
        'flex items-center justify-center',
        hide && 'scale-0',
        className
      )}
      aria-hidden={hide}
      tabIndex={hide ? -1 : 0}
    >
      {children}
    </button>
  )
}

interface Props {
  className?: string
}

const BentoItemMapLocation = ({ className }: Props) => {
  const mapRef = useRef<MapLeaflet>(null)
  const [currentZoom, setCurrentZoom] = useState(10)

  const zoomIn = () => {
    setCurrentZoom((prev) => {
      const newZoom = prev + ZOOM_STEP
      mapRef.current?.setZoom(newZoom, zoomOptions)
      return newZoom
    })
  }

  const zoomOut = () => {
    setCurrentZoom((prev) => {
      const newZoom = prev - ZOOM_STEP
      mapRef.current?.setZoom(newZoom, zoomOptions)
      return newZoom
    })
  }

  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <div className='group h-full'>
      <MapContainer
        ref={mapRef}
        zoom={10}
        center={[LATITUDE, LONGITUDE]}
        dragging={false}
        touchZoom={false} // Disables pinch-to-zoom on touch devices
        scrollWheelZoom={false} // Disables zooming with the mouse wheel
        doubleClickZoom={false} // Disables zooming on double-click
        zoomControl={false} // Hides the zoom control
        attributionControl={false} // Hides the attribution control
        className={cn(
          'brightness-[0.64] -hue-rotate-[24deg] saturate-[0.86]',
          'h-full min-h-full w-full',
          className
        )}
        trackResize
        whenReady={() => {
          if (mapRef.current) {
            setCurrentZoom(mapRef.current.getZoom())
          }
        }}
      >
        <TileLayer
          url={MAP_URL}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          tileSize={256}
          zoomOffset={0}
        />
      </MapContainer>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='relative size-16'>
          <div className='absolute size-full animate-ping rounded-full bg-emerald-300/20 opacity-65 blur-sm'></div>
          <div className='drop-shadow-green size-full rounded-full bg-emerald-400/30'></div>
        </div>
      </div>

      <ZoomButton
        onClick={zoomOut}
        className='bottom-4 left-4'
        hide={currentZoom <= MIN_ZOOM}
      >
        <Minus className='size-4' />
      </ZoomButton>

      <ZoomButton
        onClick={zoomIn}
        className='bottom-4 right-4'
        hide={currentZoom >= MAX_ZOOM}
      >
        <Plus className='size-4' />
      </ZoomButton>
    </div>
  )
}

export default BentoItemMapLocation