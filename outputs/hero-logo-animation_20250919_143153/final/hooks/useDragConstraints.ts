import { useState, useEffect, RefObject } from 'react';
import { DragConstraints } from './useDragInteraction';

// Get responsive constraints based on screen width
const getResponsiveConstraints = (screenWidth: number): Omit<DragConstraints, 'elasticity'> => {
  if (screenWidth < 640) { // Mobile
    return {
      left: -30,
      right: 30,
      top: -20,
      bottom: 20
    };
  } else if (screenWidth < 1024) { // Tablet
    return {
      left: -60,
      right: 60,
      top: -30,
      bottom: 30
    };
  } else { // Desktop
    return {
      left: -100,
      right: 100,
      top: -50,
      bottom: 50
    };
  }
};

// Calculate constraints based on container size
const calculateContainerConstraints = (
  container: HTMLElement,
  constraintFactor: number = 0.15
): Omit<DragConstraints, 'elasticity'> => {
  const rect = container.getBoundingClientRect();

  // Calculate maximum drag distance as percentage of container size
  const maxDragX = rect.width * constraintFactor;
  const maxDragY = rect.height * (constraintFactor * 0.67); // Slightly less vertical movement

  return {
    left: -maxDragX,
    right: maxDragX,
    top: -maxDragY,
    bottom: maxDragY
  };
};

export const useDragConstraints = (
  containerRef: RefObject<HTMLElement>,
  options: {
    elasticity?: number;
    constraintFactor?: number;
    useResponsiveConstraints?: boolean;
  } = {}
) => {
  const {
    elasticity = 0.2,
    constraintFactor = 0.15,
    useResponsiveConstraints = true
  } = options;

  const [constraints, setConstraints] = useState<DragConstraints>({
    left: -50,
    right: 50,
    top: -25,
    bottom: 25,
    elasticity
  });

  useEffect(() => {
    const updateConstraints = () => {
      let newConstraints: Omit<DragConstraints, 'elasticity'>;

      if (useResponsiveConstraints) {
        // Use responsive breakpoint-based constraints
        newConstraints = getResponsiveConstraints(window.innerWidth);
      } else if (containerRef.current) {
        // Calculate constraints based on actual container size
        newConstraints = calculateContainerConstraints(
          containerRef.current,
          constraintFactor
        );
      } else {
        // Fallback to default desktop constraints
        newConstraints = getResponsiveConstraints(1024);
      }

      setConstraints(prev => ({
        ...newConstraints,
        elasticity: prev.elasticity
      }));
    };

    // Initial calculation
    updateConstraints();

    // Update on window resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      // Debounce resize events for performance
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateConstraints, 150);
    };

    window.addEventListener('resize', handleResize);

    // Update when container element changes (e.g., ref becomes available)
    const observer = new MutationObserver(() => {
      if (containerRef.current) {
        updateConstraints();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        attributes: true,
        attributeFilter: ['style', 'class'] // Watch for style/class changes that might affect size
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      observer.disconnect();
    };
  }, [containerRef, elasticity, constraintFactor, useResponsiveConstraints]);

  // Method to update elasticity dynamically
  const updateElasticity = (newElasticity: number) => {
    setConstraints(prev => ({
      ...prev,
      elasticity: Math.max(0, Math.min(1, newElasticity)) // Clamp between 0 and 1
    }));
  };

  // Method to temporarily expand constraints (e.g., for special interactions)
  const expandConstraints = (factor: number = 1.5, duration: number = 2000) => {
    setConstraints(prev => ({
      left: prev.left * factor,
      right: prev.right * factor,
      top: prev.top * factor,
      bottom: prev.bottom * factor,
      elasticity: prev.elasticity
    }));

    // Reset after duration
    setTimeout(() => {
      const newConstraints = useResponsiveConstraints
        ? getResponsiveConstraints(window.innerWidth)
        : containerRef.current
        ? calculateContainerConstraints(containerRef.current, constraintFactor)
        : getResponsiveConstraints(1024);

      setConstraints(prev => ({
        ...newConstraints,
        elasticity: prev.elasticity
      }));
    }, duration);
  };

  // Method to get constraint info for debugging/development
  const getConstraintInfo = () => ({
    area: (constraints.right - constraints.left) * (constraints.bottom - constraints.top),
    aspectRatio: (constraints.right - constraints.left) / (constraints.bottom - constraints.top),
    centerPoint: {
      x: (constraints.left + constraints.right) / 2,
      y: (constraints.top + constraints.bottom) / 2
    },
    maxDistance: Math.sqrt(
      Math.pow(constraints.right - constraints.left, 2) +
      Math.pow(constraints.bottom - constraints.top, 2)
    ) / 2
  });

  return {
    constraints,
    updateElasticity,
    expandConstraints,
    getConstraintInfo
  };
};