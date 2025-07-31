"use client";

import "../styles/leaflet.css";
import { Map as MapLeaflet, type ZoomPanOptions } from "leaflet";
import { useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Image from "next/image";

import { Minus } from "@/assets/icons/Minus";
import { Plus } from "@/assets/icons/Plus";
import { cn } from "@/lib/utils";
import memojiSmile from "@/assets/images/memoji-smile.png";

const LATITUDE = 30.26563;
const LONGITUDE = -97.70333;

const ZOOM_STEP = 2;
const zoomOptions: ZoomPanOptions = {
	animate: true,
	duration: 0.5,
	easeLinearity: 0.25,
};

const MAX_ZOOM = 13;
const MIN_ZOOM = 1;

const MAP_URL = "/api/map/{z}/{x}/{y}.png";

interface ZoomButtonProps
	extends Pick<
		React.HTMLProps<HTMLButtonElement>,
		"onClick" | "children" | "className"
	> {
	hide?: boolean;
}

const ZoomButton = (props: ZoomButtonProps) => {
	const { onClick, children, className, hide } = props;
	return (
		<button
			onClick={onClick}
			className={cn(
				"absolute size-10 rounded-full bg-zinc-950 text-3xl leading-none outline outline-2 outline-slate-700",
				"scale-100 transition-all duration-300 hover:outline-4",
				"flex items-center justify-center",
				hide && "scale-0",
				className
			)}
			aria-hidden={hide}
			tabIndex={hide ? -1 : 0}
		>
			{children}
		</button>
	);
};

interface Props {
	className?: string;
}

const BentoItemMapLocation = ({ className }: Props) => {
	const mapRef = useRef<MapLeaflet>(null);
	const [currentZoom, setCurrentZoom] = useState(10);

	// Calculate scale factor: normal size at max zoom, smaller at min zoom
	const getScaleFactor = (zoom: number) => {
		const normalizedZoom = (zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM);
		return 0.1 + normalizedZoom * 0.9; // Scale from 0.2x to 1x
	};

	const scaleFactor = getScaleFactor(currentZoom);

	const zoomIn = () => {
		if (mapRef.current) {
			const newZoom = Math.min(currentZoom + ZOOM_STEP, MAX_ZOOM);
			mapRef.current.setZoom(newZoom, zoomOptions);
			setCurrentZoom(newZoom);
		}
	};

	const zoomOut = () => {
		if (mapRef.current) {
			const newZoom = Math.max(currentZoom - ZOOM_STEP, MIN_ZOOM);
			mapRef.current.setZoom(newZoom, zoomOptions);
			setCurrentZoom(newZoom);
		}
	};

	return (
		// Make sure you set the height and width of the map container otherwise the map won't show
		<div className="group h-full">
			<MapContainer
				ref={mapRef}
				zoom={11}
				center={[LATITUDE, LONGITUDE]}
				dragging={false}
				touchZoom={true} // Enables pinch-to-zoom on touch devices
				scrollWheelZoom={false} // Disables zooming with the mouse wheel
				doubleClickZoom={false} // Disables zooming on double-click
				zoomControl={false} // Hides the zoom control
				attributionControl={false} // Hides the attribution control
				className={cn(
					"brightness-[0.64] -hue-rotate-[24deg] saturate-[0.86]",
					"h-full min-h-full w-full",
					className
				)}
				trackResize
				whenReady={() => {
					if (mapRef.current) {
						setCurrentZoom(mapRef.current.getZoom());
					}
				}}
			>
				<TileLayer
					url={MAP_URL}
					zoomOffset={-1}
					minZoom={1}
					tileSize={512}
					eventHandlers={{
						tileloadstart: (event) => {
							event.tile.setAttribute("loading", "lazy");
						},
					}}
				/>
			</MapContainer>
			<div className="absolute inset-0 flex items-center justify-center z-0">
				<div
					className="relative size-20 transition-transform duration-300 ease-out"
					style={{ transform: `scale(${scaleFactor})` }}
				>
					<div className="absolute inset-0 rounded-full bg-gradient-to-t from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
					<div className="relative size-full rounded-full overflow-hidden bg-emerald-400/20 backdrop-blur-sm border-2 border-emerald-300/30">
						<Image
							src={memojiSmile}
							alt="Location marker"
							fill
							className="object-cover scale-75"
							sizes="80px"
						/>
					</div>
				</div>
			</div>

			<ZoomButton
				onClick={zoomOut}
				className="bottom-4 left-4"
				hide={currentZoom <= MIN_ZOOM}
			>
				<Minus className="size-4" />
			</ZoomButton>

			<ZoomButton
				onClick={zoomIn}
				className="bottom-4 right-4"
				hide={currentZoom >= MAX_ZOOM}
			>
				<Plus className="size-4" />
			</ZoomButton>
		</div>
	);
};

export default BentoItemMapLocation;
