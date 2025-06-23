"use client";
import { Minus, Plus, Square } from "lucide-react";
import { useTheme } from "next-themes";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type MarkerProps = {
  location: { x: number; y: number };
  popupMessage: string;
};

const GridMap = ({ location, popupMessage }: MarkerProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [markerRotation, setMarkerRotation] = useState<number>(0);

  const { theme } = useTheme();

  const MAP_SIZE = 8000;
  const GRID_SIZE = 100;
  const MAJOR_GRID_INTERVAL = 5;
  const MAX_ZOOM = 3;
  const MIN_ZOOM = 0.1;
  const ZOOM_STEP = 0.2;
  const WHEEL_SENSITIVITY = 0.1;

  const calculateMinZoom = useCallback(() => {
    if (!mapContainerRef.current) return MIN_ZOOM;
    const containerW = mapContainerRef.current.clientWidth;
    const containerH = mapContainerRef.current.clientHeight;
    return Math.max(containerW / MAP_SIZE, containerH / MAP_SIZE, MIN_ZOOM);
  }, []);

  const constrainPanning = useCallback(
    (newTranslateX: number, newTranslateY: number, currentScale: number) => {
      if (!mapContainerRef.current)
        return { x: newTranslateX, y: newTranslateY };

      const containerW = mapContainerRef.current.clientWidth;
      const containerH = mapContainerRef.current.clientHeight;
      const scaledMapW = MAP_SIZE * currentScale;
      const scaledMapH = MAP_SIZE * currentScale;

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
    },
    []
  );

  const updateTransform = useCallback(
    (newScale: number, newTranslateX: number, newTranslateY: number) => {
      const minZoom = calculateMinZoom();
      const constrainedScale = Math.max(minZoom, Math.min(MAX_ZOOM, newScale));
      const constrained = constrainPanning(
        newTranslateX,
        newTranslateY,
        constrainedScale
      );

      setScale(constrainedScale);
      setTranslateX(constrained.x);
      setTranslateY(constrained.y);
    },
    [calculateMinZoom, constrainPanning]
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
    [scale, translateX, translateY, updateTransform]
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
    [isDragging, dragStart, scale, updateTransform]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const rect = mapContainerRef.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor =
      e.deltaY > 0 ? 1 - WHEEL_SENSITIVITY : 1 + WHEEL_SENSITIVITY;
    performZoom(zoomFactor, mouseX, mouseY);
  };

  const zoomIn = () => {
    const centerX = mapContainerRef.current!.clientWidth / 2;
    const centerY = mapContainerRef.current!.clientHeight / 2;
    performZoom(1 + ZOOM_STEP, centerX, centerY);
  };

  const zoomOut = () => {
    const centerX = mapContainerRef.current!.clientWidth / 2;
    const centerY = mapContainerRef.current!.clientHeight / 2;
    performZoom(1 - ZOOM_STEP, centerX, centerY);
  };

  const resetView = () => {
    const containerW = mapContainerRef.current!.clientWidth;
    const containerH = mapContainerRef.current!.clientHeight;
    updateTransform(
      1,
      -MAP_SIZE / 2 + containerW / 2,
      -MAP_SIZE / 2 + containerH / 2
    );
  };

  const _fitToScreen = () => {
    const minZoom = calculateMinZoom();
    const containerW = mapContainerRef.current!.clientWidth;
    const containerH = mapContainerRef.current!.clientHeight;
    const newTranslateX = (containerW - MAP_SIZE * minZoom) / 2;
    const newTranslateY = (containerH - MAP_SIZE * minZoom) / 2;
    updateTransform(minZoom, newTranslateX, newTranslateY);
  };

  useEffect(() => {
    if (mapContainerRef.current) {
      const containerW = mapContainerRef.current.clientWidth;
      const containerH = mapContainerRef.current.clientHeight;
      updateTransform(
        1,
        -MAP_SIZE / 2 + containerW / 2,
        -MAP_SIZE / 2 + containerH / 2
      );
    }
  }, [updateTransform]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkerRotation((prev) => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const gridLines = [];
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // Alphabet for columns

  // Vertical lines
  for (let x = 0; x <= MAP_SIZE; x += GRID_SIZE) {
    const isMajor = x % (GRID_SIZE * MAJOR_GRID_INTERVAL) === 0;
    gridLines.push(
      <div
        key={`v-${x}`}
        className={`absolute h-full w-px ${
          isMajor
            ? "bg-green-400 shadow-green-400 shadow-sm"
            : "bg-green-900 opacity-60"
        }`}
        style={{ left: `${x}px` }}
      />
    );
  }

  // Horizontal lines and labels (1, 2, 3, ...)
  for (let y = 0; y <= MAP_SIZE; y += GRID_SIZE) {
    const isMajor = y % (GRID_SIZE * MAJOR_GRID_INTERVAL) === 0;
    gridLines.push(
      <div
        key={`h-${y}`}
        className={`absolute h-px w-full ${
          isMajor
            ? "bg-green-400 shadow-green-400 shadow-sm"
            : "bg-green-900 opacity-60"
        }`}
        style={{ top: `${y}px` }}
      />
    );

    // Labels on the left (1, 2, 3, ...)
    if (y % (GRID_SIZE * MAJOR_GRID_INTERVAL) === 0) {
      gridLines.push(
        <div
          key={`label-${y}`}
          className="absolute font-bold text-green-400"
          style={{
            left: "0px",
            top: `${y}px`,
            transform: "translateY(-50%)",
          }}
        >
          {y / GRID_SIZE + 1}
        </div>
      );
    }
  }

  // Labels for columns (A, B, C, ...)
  for (let x = 0; x < MAP_SIZE; x += GRID_SIZE) {
    const colIndex = x / GRID_SIZE;
    if (colIndex % MAJOR_GRID_INTERVAL === 0) {
      gridLines.push(
        <div
          key={`col-label-${x}`}
          className="absolute font-bold text-green-400"
          style={{
            left: `${x}px`,
            top: "0px",
            transform: "translateX(-50%)",
          }}
        >
          {labels[colIndex % labels.length]}
        </div>
      );
    }
  }

  return (
    <div
      className={`h-screen w-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-white to-gray-100"
      } relative overflow-hidden`}
    >
      <div
        ref={mapContainerRef}
        className={`relative h-full w-full bg-gray-900 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
      >
        <div
          ref={mapRef}
          className="absolute bg-gray-900"
          style={{
            width: `${MAP_SIZE}px`,
            height: `${MAP_SIZE}px`,
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          {gridLines}

          {/* Robot Marker */}
          <div
            className="absolute z-50 h-80 w-80 bg-amber-50"
            style={{
              left: `${location.x}px`,
              top: `${location.y}px`,
              transform: `translate(-50%, -50%) rotate(${markerRotation}deg)`,
            }}
          >
            <div className="relative h-full w-full animate-pulse rounded-full border-2 border-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/50">
              <div className="-top-1 -translate-x-1/2 absolute left-1/2 h-0 w-0 transform border-r-2 border-r-transparent border-b-4 border-b-white border-l-2 border-l-transparent"></div>
            </div>
            {/* Popup for Marker */}
            <div
              className="absolute rounded bg-white p-2 text-black text-xs shadow-lg"
              style={{
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {popupMessage}
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      {/* <div className="absolute top-5 right-5 z-50 rounded-xl border border-white/20 bg-black/80 p-5 backdrop-blur-sm">
        <div className="flex flex-col gap-3">
          <Button
            onClick={zoomIn}
            className="hover:-translate-y-0.5 h-12 w-12 rounded-lg border-2 border-green-400 bg-gradient-to-b from-gray-700 to-gray-800 font-bold text-green-400 text-xl transition-all duration-300 hover:bg-gradient-to-b hover:from-green-400 hover:to-green-500 hover:text-black hover:shadow-green-400/50 hover:shadow-lg"
          >
            <Plus size={20} className="mx-auto" />
          </Button>
          <Button
            onClick={zoomOut}
            className="hover:-translate-y-0.5 h-12 w-12 rounded-lg border-2 border-green-400 bg-gradient-to-b from-gray-700 to-gray-800 font-bold text-green-400 text-xl transition-all duration-300 hover:bg-gradient-to-b hover:from-green-400 hover:to-green-500 hover:text-black hover:shadow-green-400/50 hover:shadow-lg"
          >
            <Minus size={20} className="mx-auto" />
          </Button>
          <Button
            onClick={resetView}
            className="hover:-translate-y-0.5 h-12 w-12 rounded-lg border-2 border-green-400 bg-gradient-to-b from-gray-700 to-gray-800 font-bold text-green-400 text-xl transition-all duration-300 hover:bg-gradient-to-b hover:from-green-400 hover:to-green-500 hover:text-black hover:shadow-green-400/50 hover:shadow-lg"
          >
            <Square size={20} className="mx-auto" />
          </Button>
        </div>
      </div> */}

      {/* Info Panel */}
      <div className="absolute bottom-5 left-5 z-50 min-w-48 rounded-lg border border-white/20 bg-black/80 p-4 backdrop-blur-sm">
        <div className="space-y-2 font-mono text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Zoom:</span>
            <span className="font-bold text-green-400">
              {Math.round(scale * 100)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">X:</span>
            <span className="font-bold text-green-400">
              {Math.round(-translateX / GRID_SIZE)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Y:</span>
            <span className="font-bold text-green-400">
              {Math.round(-translateY / GRID_SIZE)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span className="font-bold text-green-400">READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridMap;
