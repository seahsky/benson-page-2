import React, { useRef, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

export interface MinimalDraggableHeroLogoProps {
  src: string;
  alt: string;
  className?: string;
  language: 'en' | 'zh';
  size: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  onDragStart?: () => void;
  onDragEnd?: () => void;
  disabled?: boolean;
  debugMode?: boolean;
}

export const MinimalDraggableHeroLogo: React.FC<MinimalDraggableHeroLogoProps> = ({
  src,
  alt,
  className,
  language,
  size,
  onDragStart,
  onDragEnd,
  disabled = false,
  debugMode = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Minimal state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Simple drag state
  const dragState = useRef({
    isActive: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  });

  // Minimal constraints (hardcoded for simplicity)
  const constraints = {
    left: -50,
    right: 50,
    top: -30,
    bottom: 30
  };

  // Simple pointer down handler
  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    if (disabled || !imageRef.current) return;

    event.preventDefault();
    console.log('Drag started');

    setIsDragging(true);
    onDragStart?.();

    dragState.current = {
      isActive: true,
      startX: event.clientX - position.x,
      startY: event.clientY - position.y,
      currentX: position.x,
      currentY: position.y
    };

    // Set pointer capture
    imageRef.current.setPointerCapture(event.pointerId);
  }, [disabled, position, onDragStart]);

  // Simple pointer move handler
  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    if (!dragState.current.isActive) return;

    event.preventDefault();

    const newX = event.clientX - dragState.current.startX;
    const newY = event.clientY - dragState.current.startY;

    // Apply simple constraints
    const constrainedX = Math.max(constraints.left, Math.min(constraints.right, newX));
    const constrainedY = Math.max(constraints.top, Math.min(constraints.bottom, newY));

    dragState.current.currentX = constrainedX;
    dragState.current.currentY = constrainedY;

    setPosition({ x: constrainedX, y: constrainedY });
  }, []);

  // Simple pointer up handler
  const handlePointerUp = useCallback((event: React.PointerEvent) => {
    if (!dragState.current.isActive) return;

    event.preventDefault();
    console.log('Drag ended');

    setIsDragging(false);
    dragState.current.isActive = false;

    // Release pointer capture
    if (imageRef.current) {
      imageRef.current.releasePointerCapture(event.pointerId);
    }

    // Simple snap back to center
    setPosition({ x: 0, y: 0 });

    onDragEnd?.();
  }, [onDragEnd]);

  // Double click to reset
  const handleDoubleClick = useCallback(() => {
    if (disabled) return;
    console.log('Double click reset');
    setPosition({ x: 0, y: 0 });
  }, [disabled]);

  // Simple keyboard handler
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (disabled) return;

    const step = 10;
    let newX = position.x;
    let newY = position.y;

    switch (event.key) {
      case 'ArrowLeft':
        newX = Math.max(constraints.left, position.x - step);
        break;
      case 'ArrowRight':
        newX = Math.min(constraints.right, position.x + step);
        break;
      case 'ArrowUp':
        newY = Math.max(constraints.top, position.y - step);
        break;
      case 'ArrowDown':
        newY = Math.min(constraints.bottom, position.y + step);
        break;
      case 'Home':
        newX = 0;
        newY = 0;
        break;
      default:
        return;
    }

    event.preventDefault();
    setPosition({ x: newX, y: newY });
  }, [disabled, position]);

  const eventHandlers = disabled ? {} : {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onDoubleClick: handleDoubleClick,
    onKeyDown: handleKeyDown
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center",
        size.mobile,
        `md:${size.tablet}`,
        `lg:${size.desktop}`,
        className
      )}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-contain transition-transform duration-200",
          "drop-shadow-lg",
          !disabled && "cursor-grab active:cursor-grabbing",
          disabled && "cursor-default opacity-75"
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transformOrigin: 'center'
        }}
        // Event handlers
        {...eventHandlers}
        // Accessibility
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label={
          language === 'zh'
            ? "可拖拽的Logo，按方向鍵移動，Home鍵回到中心"
            : "Draggable Logo - Arrow keys to move, Home to center"
        }
        // Prevent native dragging
        onDragStart={(e) => e.preventDefault()}
        // Optimized loading
        loading="eager"
        decoding="sync"
      />

      {/* Simple debug info */}
      {debugMode && !disabled && (
        <div className="absolute -bottom-8 left-0 text-xs text-gray-500 font-mono">
          State: {isDragging ? 'dragging' : 'idle'} | Pos: ({Math.round(position.x)}, {Math.round(position.y)})
        </div>
      )}
    </div>
  );
};

export default React.memo(MinimalDraggableHeroLogo);