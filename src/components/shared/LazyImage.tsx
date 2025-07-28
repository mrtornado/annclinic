import { useState, useRef, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
  srcSet?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzAwIDIwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSI5NCIgeT0iNjYiIHdpZHRoPSIxMTIiIGhlaWdodD0iNjgiIHZpZXdCb3g9IjAgMCAxMTIgNjgiIGZpbGw9Im5vbmUiPgo8cGF0aCBkPSJNNTYgNDJMMzcuMDkgMjNMNDIuMTggMTguOTFMNTYgMzIuNzNMNjkuODIgMTguOTFMNzQuOTEgMjNMNTYgNDJaIiBmaWxsPSIjOUNBM0FGIi8+CjwvcGF0aD4KPC9zdmc+Cjwvc3ZnPg==",
  loading = "lazy",
  sizes,
  srcSet,
  priority = false,
  onLoad,
  onError,
}: LazyImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  // Generate optimized src for different formats
  const getOptimizedSrc = (originalSrc: string, format?: "webp" | "avif") => {
    if (originalSrc.startsWith("data:") || originalSrc.startsWith("http")) {
      return originalSrc;
    }

    if (format) {
      const ext = originalSrc.split(".").pop();
      return originalSrc.replace(`.${ext}`, `.${format}`);
    }

    return originalSrc;
  };

  // Generate responsive srcSet
  const generateSrcSet = (baseSrc: string) => {
    if (srcSet) return srcSet;

    const widths = [320, 640, 768, 1024, 1280, 1536];
    const ext = baseSrc.split(".").pop();
    const baseName = baseSrc.replace(`.${ext}`, "");

    return widths
      .filter((w) => !width || w <= width * 2) // Only include reasonable sizes
      .map((w) => `${baseName}-${w}w.${ext} ${w}w`)
      .join(", ");
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {!imageLoaded && !imageError && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{
            filter: "blur(5px)",
            transform: "scale(1.1)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Main image with progressive enhancement */}
      {isInView && (
        <picture className="block w-full h-full">
          {/* Modern formats for supported browsers */}
          <source
            srcSet={generateSrcSet(getOptimizedSrc(src, "avif"))}
            sizes={sizes || "100vw"}
            type="image/avif"
          />
          <source
            srcSet={generateSrcSet(getOptimizedSrc(src, "webp"))}
            sizes={sizes || "100vw"}
            type="image/webp"
          />

          {/* Fallback image */}
          <img
            src={src}
            srcSet={generateSrcSet(src)}
            sizes={sizes || "100vw"}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={`
              w-full h-full object-cover transition-opacity duration-300
              ${imageLoaded ? "opacity-100" : "opacity-0"}
              ${imageError ? "opacity-50" : ""}
            `}
            style={{
              aspectRatio: width && height ? `${width}/${height}` : undefined,
            }}
          />
        </picture>
      )}

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-secondary text-muted">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Imaginea nu s-a putut încărca</div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {!imageLoaded && !imageError && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
