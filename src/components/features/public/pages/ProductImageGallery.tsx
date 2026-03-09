"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ZOOM_FACTOR = 1.5;
const LENS_SIZE = 120;
const ZOOM_PANEL_SIZE = 420;
const ARROW_ZONE = 56;

interface ImageItem {
  image_url: string;
  is_thumbnail: boolean;
  sort_order: number;
}

interface ProductImageGalleryProps {
  images: ImageItem[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: Readonly<ProductImageGalleryProps>) {
  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const zoomPanelRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    if (zoomPanelRef.current && sorted[selectedIdx]) {
      zoomPanelRef.current.style.backgroundImage = `url(${sorted[selectedIdx].image_url})`;
    }
  }, [selectedIdx, sorted]);

  const hideZoom = useCallback(() => {
    if (lensRef.current) lensRef.current.style.visibility = "hidden";
    if (zoomPanelRef.current) zoomPanelRef.current.style.visibility = "hidden";
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || !lensRef.current || !zoomPanelRef.current) return;

      const cursorX = e.clientX - rect.left;

      if (cursorX < ARROW_ZONE || cursorX > rect.width - ARROW_ZONE) {
        hideZoom();
        return;
      }

      zoomPanelRef.current.style.top = `${rect.top}px`;
      zoomPanelRef.current.style.left = `${rect.right + 12}px`;
      zoomPanelRef.current.style.visibility = "visible";

      const x = Math.max(
        LENS_SIZE / 2,
        Math.min(cursorX, rect.width - LENS_SIZE / 2),
      );

      const y = Math.max(
        LENS_SIZE / 2,
        Math.min(e.clientY - rect.top, rect.height - LENS_SIZE / 2),
      );

      lensRef.current.style.left = `${x - LENS_SIZE / 2}px`;
      lensRef.current.style.top = `${y - LENS_SIZE / 2}px`;
      lensRef.current.style.visibility = "visible";

      const bgX = ((x - LENS_SIZE / 2) / (rect.width - LENS_SIZE)) * 100;
      const bgY = ((y - LENS_SIZE / 2) / (rect.height - LENS_SIZE)) * 100;

      zoomPanelRef.current.style.backgroundPosition = `${bgX}% ${bgY}%`;
    },
    [hideZoom],
  );

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedIdx((i) => (i - 1 + sorted.length) % sorted.length);
    },
    [sorted.length],
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedIdx((i) => (i + 1) % sorted.length);
    },
    [sorted.length],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartXRef.current === null) return;

      const diff = touchStartXRef.current - e.changedTouches[0].clientX;

      if (Math.abs(diff) > 50) {
        setSelectedIdx((i) =>
          diff > 0
            ? (i + 1) % sorted.length
            : (i - 1 + sorted.length) % sorted.length,
        );
      }

      touchStartXRef.current = null;
    },
    [sorted.length],
  );

  if (sorted.length === 0) {
    return (
      <div
        className="rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200"
        style={{ aspectRatio: "1/1" }}
      >
        <span className="text-gray-300 text-sm">Chưa có ảnh</span>
      </div>
    );
  }

  const currentImage = sorted[selectedIdx].image_url;

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <section
        ref={containerRef}
        aria-label={`Gallery hình ảnh sản phẩm ${productName}`}
        className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 group select-none"
        style={{ aspectRatio: "1/1", cursor: "zoom-in" }}
        onMouseLeave={hideZoom}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={currentImage}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
          priority
          draggable={false}
        />

        <div
          ref={lensRef}
          className="absolute pointer-events-none z-10 border-2 border-blue-400/70 bg-blue-300/10 rounded-sm"
          style={{
            width: LENS_SIZE,
            height: LENS_SIZE,
            visibility: "hidden",
          }}
        />

        {sorted.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center z-20 transition-all hover:bg-white hover:scale-110 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
              aria-label="Ảnh trước"
            >
              <ChevronLeft size={18} className="text-gray-700" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center z-20 transition-all hover:bg-white hover:scale-110 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
              aria-label="Ảnh sau"
            >
              <ChevronRight size={18} className="text-gray-700" />
            </button>
          </>
        )}

        {sorted.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {sorted.map((_, i) => (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                onClick={() => setSelectedIdx(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === selectedIdx ? "20px" : "6px",
                  backgroundColor:
                    i === selectedIdx ? "#1565C0" : "rgba(255,255,255,0.75)",
                }}
                aria-label={`Ảnh ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {sorted.map((img, i) => (
            <button
              key={img.image_url}
              onClick={() => setSelectedIdx(i)}
              className="relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 hover:border-blue-400"
              style={{
                borderColor: selectedIdx === i ? "#1565C0" : "#E5E7EB",
              }}
            >
              <Image
                src={img.image_url}
                alt={`${productName} ảnh ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom panel */}
      <div
        ref={zoomPanelRef}
        className="fixed rounded-2xl border border-gray-200 shadow-2xl overflow-hidden z-50 hidden lg:block"
        style={{
          width: ZOOM_PANEL_SIZE,
          height: ZOOM_PANEL_SIZE,
          backgroundImage: `url(${currentImage})`,
          backgroundSize: `${ZOOM_FACTOR * 100}%`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0% 0%",
          visibility: "hidden",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
