"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ControlPanel from "./control-panel";
import GridLines from "./grid-lines";
import { MAP_CONFIG } from "./maps-config";
import RobotMarkers from "./robot-marker";
import StatusPanel from "./status-panel";

interface Robot {
  id: string;
  location: { x: number; y: number };
  heading: number;
  color?: string;
  name?: string;
}

interface GridMapProps {
  robots: Robot[];
}

const GridMap: React.FC<GridMapProps> = ({ robots = [] }) => {
  const [scale, setScale] = useState<number>(1);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  // Helper functions for coordinate conversions
  const rosToScreen = useCallback((x: number, y: number) => {
    return {
      x: x + MAP_CONFIG.SIZE / 2,
      y: MAP_CONFIG.SIZE / 2 - y,
    };
  }, []);

  const screenToRos = useCallback((screenX: number, screenY: number) => {
    return {
      x: screenX - MAP_CONFIG.SIZE / 2,
      y: MAP_CONFIG.SIZE / 2 - screenY,
    };
  }, []);

  const calculateMinZoom = useCallback(() => {
    if (!mapContainerRef.current) return MAP_CONFIG.MIN_ZOOM;
    const containerW = mapContainerRef.current.clientWidth;
    const containerH = mapContainerRef.current.clientHeight;
    return Math.max(containerW / MAP_CONFIG.SIZE, containerH / MAP_CONFIG.SIZE, MAP_CONFIG.MIN_ZOOM);
  }, []);

  const constrainPanning = useCallback((newTranslateX: number, newTranslateY: number, currentScale: number) => {
    if (!mapContainerRef.current) return { x: newTranslateX, y: newTranslateY };

    const containerW = mapContainerRef.current.clientWidth;
    const containerH = mapContainerRef.current.clientHeight;
    const scaledMapW = MAP_CONFIG.SIZE * currentScale;
    const scaledMapH = MAP_CONFIG.SIZE * currentScale;

    let constrainedX = newTranslateX;
    let constrainedY = newTranslateY;

    if (scaledMapW > containerW) {
      const maxX = 0;
      const minX = containerW - scaledMapW;
      constrainedX = Math.max(minX, Math.min(maxX, newTranslateX));
    } else {
      constrainedX = (containerW - scaledMapW) / 2;
    }

    if (scaledMapH > containerH) {
      const maxY = 0;
      const minY = containerH - scaledMapH;
      constrainedY = Math.max(minY, Math.min(maxY, newTranslateY));
    } else {
      constrainedY = (containerH - scaledMapH) / 2;
    }

    return { x: constrainedX, y: constrainedY };
  }, []);

  const updateTransform = useCallback(
    (newScale: number, newTranslateX: number, newTranslateY: number) => {
      const minZoom = calculateMinZoom();
      const constrainedScale = Math.max(minZoom, Math.min(MAP_CONFIG.MAX_ZOOM, newScale));
      const constrained = constrainPanning(newTranslateX, newTranslateY, constrainedScale);

      setScale(constrainedScale);
      setTranslateX(constrained.x);
      setTranslateY(constrained.y);
    },
    [calculateMinZoom, constrainPanning],
  );

  const performZoom = useCallback(
    (zoomFactor: number, centerX: number, centerY: number) => {
      const worldX = (centerX - translateX) / scale;
      const worldY = (centerY - translateY) / scale;

      const newScale = scale * zoomFactor;

      const newTranslateX = centerX - worldX * newScale;
      const newTranslateY = centerY - worldY * newScale;

      updateTransform(newScale, newTranslateX, newTranslateY);
    },
    [scale, translateX, translateY, updateTransform],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - translateX,
      y: e.clientY - translateY,
    });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newTranslateX = e.clientX - dragStart.x;
      const newTranslateY = e.clientY - dragStart.y;

      updateTransform(scale, newTranslateX, newTranslateY);
    },
    [isDragging, dragStart, scale, updateTransform],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const rect = mapContainerRef.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY > 0 ? 1 - MAP_CONFIG.WHEEL_SENSITIVITY : 1 + MAP_CONFIG.WHEEL_SENSITIVITY;
    performZoom(zoomFactor, mouseX, mouseY);
  };

  const zoomIn = () => {
    const centerX = mapContainerRef.current!.clientWidth / 2;
    const centerY = mapContainerRef.current!.clientHeight / 2;
    performZoom(1 + MAP_CONFIG.ZOOM_STEP, centerX, centerY);
  };

  const zoomOut = () => {
    const centerX = mapContainerRef.current!.clientWidth / 2;
    const centerY = mapContainerRef.current!.clientHeight / 2;
    performZoom(1 - MAP_CONFIG.ZOOM_STEP, centerX, centerY);
  };

  const resetView = useCallback(() => {
    const containerW = mapContainerRef.current!.clientWidth;
    const containerH = mapContainerRef.current!.clientHeight;
    updateTransform(1, containerW / 2 - MAP_CONFIG.SIZE / 2, containerH / 2 - MAP_CONFIG.SIZE / 2);
  }, [updateTransform]);

  useEffect(() => {
    resetView();
  }, [resetView]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const currentCenter = useCallback(() => {
    if (!mapContainerRef.current) return { x: 0, y: 0 };

    const containerW = mapContainerRef.current.clientWidth;
    const containerH = mapContainerRef.current.clientHeight;

    const viewportCenterX = containerW / 2;
    const viewportCenterY = containerH / 2;

    const worldX = (viewportCenterX - translateX) / scale;
    const worldY = (viewportCenterY - translateY) / scale;

    return screenToRos(worldX, worldY);
  }, [translateX, translateY, scale, screenToRos]);

  return (
    <section className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <section
        ref={mapContainerRef}
        className={`relative h-full w-full bg-slate-900 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        aria-label="Interactive map"
      >
        <div
          ref={mapRef}
          className="absolute bg-slate-900"
          style={{
            width: `${1500}px`,
            height: `${1500}px`,
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          <GridLines screenToRos={screenToRos} />
          <RobotMarkers robots={robots} rosToScreen={rosToScreen} />
        </div>
      </section>

      <ControlPanel onZoomIn={zoomIn} onZoomOut={zoomOut} onResetView={resetView} />
      <StatusPanel scale={scale} currentCenter={currentCenter()} robots={robots} />
    </section>
  );
};

export default GridMap;
