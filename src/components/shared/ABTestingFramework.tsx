import React, { useEffect, useState } from "react";

interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  component: React.ComponentType<any>;
}

interface ABTestingFrameworkProps {
  testName: string;
  variants: ABTestVariant[];
  defaultVariant?: string;
  props?: any;
}

export default function ABTestingFramework({
  testName,
  variants,
  defaultVariant,
  props = {},
}: ABTestingFrameworkProps) {
  const [selectedVariant, setSelectedVariant] = useState<ABTestVariant | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user already has a variant assigned
    const storageKey = `ab_test_${testName}`;
    const existingVariant = localStorage.getItem(storageKey);

    if (existingVariant) {
      const variant = variants.find((v) => v.id === existingVariant);
      if (variant) {
        setSelectedVariant(variant);
        setIsLoading(false);
        return;
      }
    }

    // Assign new variant based on weights
    const totalWeight = variants.reduce(
      (sum, variant) => sum + variant.weight,
      0
    );
    const random = Math.random() * totalWeight;

    let currentWeight = 0;
    let assignedVariant = variants[0]; // fallback

    for (const variant of variants) {
      currentWeight += variant.weight;
      if (random <= currentWeight) {
        assignedVariant = variant;
        break;
      }
    }

    // Store the assigned variant
    localStorage.setItem(storageKey, assignedVariant.id);
    setSelectedVariant(assignedVariant);

    // Track variant assignment
    if (typeof gtag !== "undefined") {
      gtag("event", "ab_test_assignment", {
        test_name: testName,
        variant_id: assignedVariant.id,
        variant_name: assignedVariant.name,
      });
    }

    setIsLoading(false);
  }, [testName, variants]);

  // Track conversion for the current variant
  const trackConversion = (conversionType: string, value?: number) => {
    if (!selectedVariant) return;

    if (typeof gtag !== "undefined") {
      gtag("event", "ab_test_conversion", {
        test_name: testName,
        variant_id: selectedVariant.id,
        variant_name: selectedVariant.name,
        conversion_type: conversionType,
        value: value || 0,
      });
    }
  };

  // Expose tracking function to child components
  const enhancedProps = {
    ...props,
    trackConversion,
    variantId: selectedVariant?.id,
    variantName: selectedVariant?.name,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-teal"></div>
      </div>
    );
  }

  if (!selectedVariant) {
    return <div>Error loading A/B test variant</div>;
  }

  const VariantComponent = selectedVariant.component;
  return <VariantComponent {...enhancedProps} />;
}

// Hook for tracking conversions in components
export function useABTestTracking(testName: string) {
  const trackConversion = (conversionType: string, value?: number) => {
    const storageKey = `ab_test_${testName}`;
    const variantId = localStorage.getItem(storageKey);

    if (variantId && typeof gtag !== "undefined") {
      gtag("event", "ab_test_conversion", {
        test_name: testName,
        variant_id: variantId,
        conversion_type: conversionType,
        value: value || 0,
      });
    }
  };

  return { trackConversion };
}

// Component for A/B testing different CTA buttons
interface ABTestCTAProps {
  testName: string;
  variants: {
    id: string;
    text: string;
    style: string;
    weight: number;
  }[];
  onClick: () => void;
  className?: string;
}

export function ABTestCTA({
  testName,
  variants,
  onClick,
  className = "",
}: ABTestCTAProps) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  useEffect(() => {
    const storageKey = `ab_test_cta_${testName}`;
    const existingVariant = localStorage.getItem(storageKey);

    if (existingVariant) {
      const variant = variants.find((v) => v.id === existingVariant);
      if (variant) {
        setSelectedVariant(variant);
        return;
      }
    }

    // Assign variant based on weights
    const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
    const random = Math.random() * totalWeight;

    let currentWeight = 0;
    let assignedVariant = variants[0];

    for (const variant of variants) {
      currentWeight += variant.weight;
      if (random <= currentWeight) {
        assignedVariant = variant;
        break;
      }
    }

    localStorage.setItem(storageKey, assignedVariant.id);
    setSelectedVariant(assignedVariant);

    // Track CTA variant assignment
    if (typeof gtag !== "undefined") {
      gtag("event", "ab_test_cta_assignment", {
        test_name: testName,
        variant_id: assignedVariant.id,
      });
    }
  }, [testName, variants]);

  const handleClick = () => {
    if (selectedVariant && typeof gtag !== "undefined") {
      gtag("event", "ab_test_cta_click", {
        test_name: testName,
        variant_id: selectedVariant.id,
      });
    }
    onClick();
  };

  if (!selectedVariant) {
    return (
      <button className={`${className} animate-pulse bg-gray-300`}>
        Loading...
      </button>
    );
  }

  return (
    <button
      className={`${className} ${selectedVariant.style}`}
      onClick={handleClick}
    >
      {selectedVariant.text}
    </button>
  );
}

// Component for A/B testing different headlines
interface ABTestHeadlineProps {
  testName: string;
  variants: {
    id: string;
    text: string;
    weight: number;
  }[];
  className?: string;
}

export function ABTestHeadline({
  testName,
  variants,
  className = "",
}: ABTestHeadlineProps) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  useEffect(() => {
    const storageKey = `ab_test_headline_${testName}`;
    const existingVariant = localStorage.getItem(storageKey);

    if (existingVariant) {
      const variant = variants.find((v) => v.id === existingVariant);
      if (variant) {
        setSelectedVariant(variant);
        return;
      }
    }

    // Assign variant
    const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
    const random = Math.random() * totalWeight;

    let currentWeight = 0;
    let assignedVariant = variants[0];

    for (const variant of variants) {
      currentWeight += variant.weight;
      if (random <= currentWeight) {
        assignedVariant = variant;
        break;
      }
    }

    localStorage.setItem(storageKey, assignedVariant.id);
    setSelectedVariant(assignedVariant);

    if (typeof gtag !== "undefined") {
      gtag("event", "ab_test_headline_assignment", {
        test_name: testName,
        variant_id: assignedVariant.id,
      });
    }
  }, [testName, variants]);

  if (!selectedVariant) {
    return <div className={`${className} animate-pulse bg-gray-300 h-8`}></div>;
  }

  return <h1 className={className}>{selectedVariant.text}</h1>;
}
