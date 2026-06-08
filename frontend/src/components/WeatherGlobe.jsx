import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";

function WeatherGlobe({ coordinates }) {
  const globeRef = useRef();

  useEffect(() => {
    if (!globeRef.current) return;

    if (coordinates && coordinates.lat && coordinates.lon) {
      globeRef.current.controls().autoRotate = false;

      // Tightened zoom view slightly to ensure atmosphere fits safely during locks
      globeRef.current.pointOfView(
        {
          lat: coordinates.lat,
          lng: coordinates.lon,
          altitude: 0.85,
        },
        2500,
      );
    } else {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.4;

      // 🎯 Pushed back from 2.0 to 2.35 so the entire globe + halo fits without clipping the box
      globeRef.current.pointOfView({ altitude: 2.35 }, 1000);
    }
  }, [coordinates]);

  const pointData =
    coordinates && coordinates.lat
      ? [
          {
            lat: coordinates.lat,
            lng: coordinates.lon,
            size: 2,
            color: "#3b82f6",
          },
        ]
      : [];

  const ringsData =
    coordinates && coordinates.lat
      ? [
          {
            lat: coordinates.lat,
            lng: coordinates.lon,
            maxRadius: 11, // Adjusted radius to prevent ripple container breaks
            propagationSpeed: 3.5,
            repeatPeriod: 900,
          },
        ]
      : [];

  return (
    <div className="w-full h-[340px] bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl flex items-center justify-center relative backdrop-blur-md">
      {coordinates && (
        <div className="absolute top-4 left-4 z-10 bg-slate-950/80 border border-blue-500/30 px-2.5 py-1 rounded-md flex items-center gap-1.5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <p className="text-[10px] font-mono font-bold tracking-wider text-blue-400 uppercase">
            VECTOR LOCK: {coordinates.lat.toFixed(2)}°,{" "}
            {coordinates.lon.toFixed(2)}°
          </p>
        </div>
      )}

      <Globe
        ref={globeRef}
        width={540}
        height={340}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere={true}
        atmosphereColor="#3b82f6"
        atmosphereAltitude={0.12} // 🎯 Reduced thickness slightly to ensure standard containment bounds
        ringsData={ringsData}
        ringLat={(d) => d.lat}
        ringLng={(d) => d.lng}
        ringMaxRadius={(d) => d.maxRadius}
        ringColor={() => "#3b82f6"}
        ringPropagationSpeed={(d) => d.propagationSpeed}
        ringRepeatPeriod={(d) => d.repeatPeriod}
        pointsData={pointData}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointColor={(d) => d.color}
        pointRadius={0.6}
        pointAltitude={0.02}
      />
    </div>
  );
}

export default WeatherGlobe;
