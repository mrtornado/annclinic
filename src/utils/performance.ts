// Performance monitoring utilities
export interface WebVitalsMetrics {
  CLS: number | null;
  FID: number | null;
  FCP: number | null;
  LCP: number | null;
  TTFB: number | null;
}

// Core Web Vitals thresholds
export const WEB_VITALS_THRESHOLDS = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FID: { good: 100, needsImprovement: 300 },
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
} as const;

// Performance observer for Core Web Vitals
export class WebVitalsObserver {
  private metrics: WebVitalsMetrics = {
    CLS: null,
    FID: null,
    FCP: null,
    LCP: null,
    TTFB: null,
  };

  private callbacks: Array<(metrics: WebVitalsMetrics) => void> = [];

  constructor() {
    if (typeof window !== "undefined") {
      this.initObservers();
    }
  }

  // Subscribe to metrics updates
  subscribe(callback: (metrics: WebVitalsMetrics) => void) {
    this.callbacks.push(callback);
    // Send current metrics immediately
    callback(this.metrics);
  }

  // Get current metrics
  getMetrics(): WebVitalsMetrics {
    return { ...this.metrics };
  }

  // Check if metric is within good threshold
  isGoodMetric(metric: keyof WebVitalsMetrics, value: number): boolean {
    const threshold = WEB_VITALS_THRESHOLDS[metric];
    return value <= threshold.good;
  }

  // Get metric status
  getMetricStatus(
    metric: keyof WebVitalsMetrics,
    value: number
  ): "good" | "needs-improvement" | "poor" {
    const threshold = WEB_VITALS_THRESHOLDS[metric];
    if (value <= threshold.good) return "good";
    if (value <= threshold.needsImprovement) return "needs-improvement";
    return "poor";
  }

  private initObservers() {
    // Initialize performance observers
    this.observeFCP();
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeTTFB();
  }

  private observeFCP() {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const fcpEntry = entries.find(
        (entry) => entry.name === "first-contentful-paint"
      );
      if (fcpEntry) {
        this.metrics.FCP = fcpEntry.startTime;
        this.notifyCallbacks();
      }
    });

    try {
      observer.observe({ entryTypes: ["paint"] });
    } catch (e) {
      console.warn("FCP observation not supported");
    }
  }

  private observeLCP() {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        this.metrics.LCP = lastEntry.startTime;
        this.notifyCallbacks();
      }
    });

    try {
      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      console.warn("LCP observation not supported");
    }
  }

  private observeFID() {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const firstEntry = entries[0] as any; // PerformanceEventTiming
      if (firstEntry && firstEntry.processingStart) {
        this.metrics.FID = firstEntry.processingStart - firstEntry.startTime;
        this.notifyCallbacks();
      }
    });

    try {
      observer.observe({ entryTypes: ["first-input"] });
    } catch (e) {
      console.warn("FID observation not supported");
    }
  }

  private observeCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.metrics.CLS = clsValue;
      this.notifyCallbacks();
    });

    try {
      observer.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      console.warn("CLS observation not supported");
    }
  }

  private observeTTFB() {
    // TTFB calculation
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.metrics.TTFB = navigation.responseStart - navigation.requestStart;
      this.notifyCallbacks();
    }
  }

  private notifyCallbacks() {
    this.callbacks.forEach((callback) => callback(this.metrics));
  }
}

// Image optimization utilities
export const imageOptimization = {
  // Generate responsive image srcSet
  generateSrcSet(
    src: string,
    widths: number[] = [320, 640, 768, 1024, 1280, 1536]
  ): string {
    const ext = src.split(".").pop();
    const baseName = src.replace(`.${ext}`, "");

    return widths
      .map((width) => `${baseName}-${width}w.${ext} ${width}w`)
      .join(", ");
  },

  // Generate optimized image URL
  getOptimizedUrl(
    src: string,
    options: {
      width?: number;
      height?: number;
      format?: "webp" | "avif" | "jpg" | "png";
      quality?: number;
    } = {}
  ): string {
    const { width, height, format, quality = 80 } = options;

    // For external URLs or data URLs, return as-is
    if (src.startsWith("http") || src.startsWith("data:")) {
      return src;
    }

    let optimizedSrc = src;

    // Add format conversion
    if (format) {
      const originalExt = src.split(".").pop();
      optimizedSrc = src.replace(`.${originalExt}`, `.${format}`);
    }

    // Add query parameters for dynamic optimization (if using a service)
    const params = new URLSearchParams();
    if (width) params.set("w", width.toString());
    if (height) params.set("h", height.toString());
    if (quality) params.set("q", quality.toString());

    if (params.toString()) {
      optimizedSrc += `?${params.toString()}`;
    }

    return optimizedSrc;
  },

  // Check if browser supports format
  supportsFormat(format: "webp" | "avif"): boolean {
    if (typeof window === "undefined") return false;

    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;

    try {
      return (
        canvas.toDataURL(`image/${format}`).indexOf(`image/${format}`) === 5
      );
    } catch {
      return false;
    }
  },
};

// Resource loading optimization
export const resourceLoader = {
  // Preload critical resources
  preloadResource(
    href: string,
    as: "style" | "script" | "image" | "font",
    crossOrigin?: boolean
  ) {
    if (typeof document === "undefined") return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;

    if (crossOrigin) {
      link.crossOrigin = "anonymous";
    }

    document.head.appendChild(link);
  },

  // DNS prefetch for external domains
  dnsPrefetch(domain: string) {
    if (typeof document === "undefined") return;

    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = domain;

    document.head.appendChild(link);
  },

  // Preconnect to external domains
  preconnect(domain: string, crossOrigin?: boolean) {
    if (typeof document === "undefined") return;

    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = domain;

    if (crossOrigin) {
      link.crossOrigin = "anonymous";
    }

    document.head.appendChild(link);
  },
};

// Bundle size analysis helper
export const bundleAnalyzer = {
  // Log bundle information in development
  logBundleInfo() {
    if (process.env.NODE_ENV === "development") {
      console.group("📦 Bundle Information");
      console.log("Environment:", "development");
      console.log("User agent:", navigator.userAgent);
      console.log(
        "Connection:",
        (navigator as any).connection?.effectiveType || "unknown"
      );
      console.groupEnd();
    }
  },

  // Measure script loading performance
  measureScriptPerformance(scriptName: string) {
    if (typeof performance === "undefined") return;

    const entries = performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[];
    const scriptEntry = entries.find((entry) =>
      entry.name.includes(scriptName)
    );

    if (scriptEntry) {
      console.log(`📊 ${scriptName} performance:`, {
        downloadTime: scriptEntry.responseEnd - scriptEntry.responseStart,
        totalTime: scriptEntry.duration,
        size: scriptEntry.transferSize,
      });
    }
  },
};

// Memory usage monitoring
export const memoryMonitor = {
  // Get current memory usage (Chrome only)
  getMemoryUsage() {
    if ("memory" in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
      };
    }
    return null;
  },

  // Log memory usage
  logMemoryUsage() {
    const usage = this.getMemoryUsage();
    if (usage) {
      console.log("🧠 Memory usage:", usage);
    }
  },
};

// Global performance instance
export const webVitals = new WebVitalsObserver();
