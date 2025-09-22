/**
 * Enhanced Accessibility Integration for anime.js Logo Component
 * Specialist A Enhancement: Full WCAG 2.1 AA compliance
 */

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { animate } from 'animejs';
import { coreAnimations, accessibilityAnimations } from './enhanced-animations-bundle-optimized';

interface EnhancedAccessibleLogoProps {
  src: string;
  alt: string;
  className?: string;
  language: 'en' | 'zh';
  onMove?: (position: {x: number, y: number}) => void;
  onActivate?: () => void;
}

export const EnhancedAccessibleLogo: React.FC<EnhancedAccessibleLogoProps> = ({
  src,
  alt,
  className = '',
  language,
  onMove,
  onActivate
}) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const [announcements, setAnnouncements] = useState<string[]>([]);

  // Localized strings for accessibility
  const strings = {
    en: {
      instructions: `Interactive logo. Use arrow keys to move the logo around the screen. Press Enter to celebrate, Space to reset position. Current position: ${Math.round(position.x)}, ${Math.round(position.y)}`,
      moved: (x: number, y: number) => `Logo moved to position ${Math.round(x)}, ${Math.round(y)}`,
      activated: 'Logo activated with celebration animation',
      reset: 'Logo position reset to center',
      label: `${alt} - Interactive draggable logo`
    },
    zh: {
      instructions: `互動式標誌。使用方向鍵移動標誌。按 Enter 鍵慶祝，空格鍵重置位置。目前位置：${Math.round(position.x)}, ${Math.round(position.y)}`,
      moved: (x: number, y: number) => `標誌移動到位置 ${Math.round(x)}, ${Math.round(y)}`,
      activated: '標誌已啟動慶祝動畫',
      reset: '標誌位置已重置至中心',
      label: `${alt} - 互動式可拖拽標誌`
    }
  };

  const currentStrings = strings[language];

  // Enhanced keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!logoRef.current) return;

    const moveDistance = event.shiftKey ? 20 : 10; // Larger movement with Shift
    const movements: Record<string, {x: number, y: number}> = {
      ArrowUp: { x: 0, y: -moveDistance },
      ArrowDown: { x: 0, y: moveDistance },
      ArrowLeft: { x: -moveDistance, y: 0 },
      ArrowRight: { x: moveDistance, y: 0 }
    };

    if (movements[event.key]) {
      event.preventDefault();
      const newPosition = {
        x: position.x + movements[event.key].x,
        y: position.y + movements[event.key].y
      };

      // Constrain to viewport bounds
      const bounds = containerRef.current?.getBoundingClientRect();
      if (bounds) {
        newPosition.x = Math.max(-bounds.width/4, Math.min(bounds.width/4, newPosition.x));
        newPosition.y = Math.max(-bounds.height/4, Math.min(bounds.height/4, newPosition.y));
      }

      setPosition(newPosition);
      onMove?.(newPosition);

      // Animate to new position with anime.js
      animate(logoRef.current, {
        translateX: newPosition.x,
        translateY: newPosition.y,
        duration: 200,
        easing: 'easeOutQuart'
      });

      // Announce movement to screen readers
      const announcement = currentStrings.moved(newPosition.x, newPosition.y);
      setAnnouncements(prev => [...prev.slice(-2), announcement]);

    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      if (event.key === 'Enter') {
        // Celebration animation
        onActivate?.();
        setAnnouncements(prev => [...prev.slice(-2), currentStrings.activated]);

        // Load and play celebration animation
        import('./enhanced-animations-bundle-optimized').then(({ createAdvancedAnimations }) => {
          createAdvancedAnimations().celebration().then(createCelebration => {
            createCelebration(logoRef.current!, { intensity: 'strong' });
          });
        });

      } else if (event.key === ' ') {
        // Reset position
        const resetPos = { x: 0, y: 0 };
        setPosition(resetPos);
        onMove?.(resetPos);

        coreAnimations.snapBack(logoRef.current!, resetPos);
        setAnnouncements(prev => [...prev.slice(-2), currentStrings.reset]);
      }
    }
  }, [position, onMove, onActivate, currentStrings]);

  // Enhanced focus management
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (logoRef.current) {
      accessibilityAnimations.createFocusAnimation(
        logoRef.current,
        currentStrings.label
      )?.play();
    }
  }, [currentStrings.label]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // Initialize entrance animation with reduced motion support
  useEffect(() => {
    if (logoRef.current) {
      coreAnimations.entrance(logoRef.current);
    }
  }, []);

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      import('./enhanced-animations-bundle-optimized').then(({ performanceUtils }) => {
        performanceUtils.cleanup(logoRef.current?.id);
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      role="application"
      aria-label={currentStrings.label}
    >
      {/* Main interactive logo */}
      <img
        ref={logoRef}
        src={src}
        alt={alt}
        className={`
          w-full h-full object-contain transition-all duration-300
          ${isFocused ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
          focus:outline-none cursor-pointer
        `}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transformOrigin: 'center'
        }}
        // Enhanced accessibility attributes
        role="button"
        aria-label={currentStrings.label}
        aria-describedby="logo-instructions logo-announcements"
        tabIndex={0}
        // Event handlers
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={() => {
          if (logoRef.current && containerRef.current) {
            coreAnimations.hover(logoRef.current, containerRef.current);
          }
        }}
        // Prevent native drag
        onDragStart={(e) => e.preventDefault()}
        loading="eager"
        decoding="async"
      />

      {/* Hidden instructions for screen readers */}
      <div
        id="logo-instructions"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {currentStrings.instructions}
      </div>

      {/* Live region for announcements */}
      <div
        id="logo-announcements"
        className="sr-only"
        aria-live="polite"
        aria-atomic="false"
      >
        {announcements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>

      {/* Visual focus indicator for keyboard users */}
      {isFocused && (
        <div
          className="absolute inset-0 rounded-lg border-2 border-blue-500 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Keyboard hints (only visible when focused) */}
      {isFocused && (
        <div
          className="absolute -bottom-16 left-0 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded"
          aria-hidden="true"
        >
          {language === 'zh' ? '方向鍵：移動 | Enter：慶祝 | 空格：重置' : '↑↓←→: Move | Enter: Celebrate | Space: Reset'}
        </div>
      )}

      {/* Development accessibility indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute -top-8 left-0 text-xs text-green-600 font-mono">
          ♿ WCAG 2.1 AA | Pos: ({Math.round(position.x)}, {Math.round(position.y)})
        </div>
      )}
    </div>
  );
};

export default EnhancedAccessibleLogo;