import { useState, useCallback, useRef, KeyboardEvent } from 'react';

export interface AccessibilityState {
  isFocused: boolean;
  isDragModeActive: boolean;
  currentPosition: { x: number; y: number };
}

export interface AccessibilityHandlers {
  onKeyDown: (event: KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSpacePress: () => void;
}

export interface AccessibilityProps {
  role: string;
  tabIndex: number;
  'aria-label': string;
  'aria-pressed': boolean;
  'aria-describedby': string;
  onKeyDown: (event: KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const KEYBOARD_MOVE_STEP = {
  fine: 5,    // Normal arrow key movement
  coarse: 20, // Shift + arrow key movement
  home: { x: 0, y: 0 } // Home key - return to center
};

export const useDragAccessibility = (
  language: 'en' | 'zh',
  onPositionChange: (position: { x: number; y: number }) => void,
  constraints: { left: number; right: number; top: number; bottom: number }
) => {
  const [accessibilityState, setAccessibilityState] = useState<AccessibilityState>({
    isFocused: false,
    isDragModeActive: false,
    currentPosition: { x: 0, y: 0 }
  });

  const announceRef = useRef<HTMLDivElement>(null);
  const instructionsId = 'drag-logo-instructions';

  // Announce messages to screen readers
  const announceToScreenReader = useCallback((message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  }, []);

  // Get localized strings
  const strings = {
    en: {
      ariaLabel: "Draggable Logo - Press Space to enter drag mode, arrow keys to move, Home to center, Escape to exit",
      instructions: "This is an interactive logo. Press Space to enter drag mode, use arrow keys to move the logo, press Home to return to center, press Escape to exit drag mode.",
      dragModeEntered: "Drag mode activated. Use arrow keys to move the logo.",
      dragModeExited: "Drag mode deactivated.",
      logoFocused: "Logo focused, press Space to start dragging",
      logoMoved: (x: number, y: number) => `Logo moved to position ${Math.round(x)}, ${Math.round(y)}`,
      logoReturned: "Logo returned to center position",
      constraintHit: "Movement limited by boundary"
    },
    zh: {
      ariaLabel: "可拖拽的Logo - 按空格鍵進入拖拽模式，方向鍵移動，Home鍵回到中心，Escape鍵退出",
      instructions: "這是一個可互動的Logo。按空格鍵進入拖拽模式，使用方向鍵移動Logo，按Home鍵回到中心位置，按Escape鍵退出拖拽模式。",
      dragModeEntered: "拖拽模式已啟動，使用方向鍵移動Logo。",
      dragModeExited: "拖拽模式已關閉。",
      logoFocused: "Logo已聚焦，按空格鍵開始拖拽",
      logoMoved: (x: number, y: number) => `Logo已移動到位置 ${Math.round(x)}, ${Math.round(y)}`,
      logoReturned: "Logo已回到中心位置",
      constraintHit: "移動受到邊界限制"
    }
  };

  const currentStrings = strings[language];

  // Handle focus
  const handleFocus = useCallback(() => {
    setAccessibilityState(prev => ({ ...prev, isFocused: true }));
    announceToScreenReader(currentStrings.logoFocused);
  }, [announceToScreenReader, currentStrings.logoFocused]);

  // Handle blur
  const handleBlur = useCallback(() => {
    setAccessibilityState(prev => ({
      ...prev,
      isFocused: false,
      isDragModeActive: false
    }));
  }, []);

  // Move logo by delta with constraint checking
  const moveByDelta = useCallback((deltaX: number, deltaY: number) => {
    setAccessibilityState(prev => {
      const newX = Math.max(constraints.left, Math.min(constraints.right, prev.currentPosition.x + deltaX));
      const newY = Math.max(constraints.top, Math.min(constraints.bottom, prev.currentPosition.y + deltaY));

      const newPosition = { x: newX, y: newY };

      // Check if movement was constrained
      const wasConstrained =
        (prev.currentPosition.x + deltaX !== newX) ||
        (prev.currentPosition.y + deltaY !== newY);

      if (wasConstrained) {
        announceToScreenReader(currentStrings.constraintHit);
      } else {
        announceToScreenReader(currentStrings.logoMoved(newX, newY));
      }

      // Notify parent component of position change
      onPositionChange(newPosition);

      return {
        ...prev,
        currentPosition: newPosition
      };
    });
  }, [constraints, currentStrings, onPositionChange, announceToScreenReader]);

  // Return to center position
  const returnToCenter = useCallback(() => {
    setAccessibilityState(prev => ({
      ...prev,
      currentPosition: KEYBOARD_MOVE_STEP.home
    }));

    onPositionChange(KEYBOARD_MOVE_STEP.home);
    announceToScreenReader(currentStrings.logoReturned);
  }, [onPositionChange, announceToScreenReader, currentStrings.logoReturned]);

  // Toggle drag mode
  const toggleDragMode = useCallback(() => {
    setAccessibilityState(prev => {
      const newDragMode = !prev.isDragModeActive;

      if (newDragMode) {
        announceToScreenReader(currentStrings.dragModeEntered);
      } else {
        announceToScreenReader(currentStrings.dragModeExited);
      }

      return {
        ...prev,
        isDragModeActive: newDragMode
      };
    });
  }, [announceToScreenReader, currentStrings.dragModeEntered, currentStrings.dragModeExited]);

  // Handle keyboard events
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!accessibilityState.isFocused) return;

    // Always handle Space and Escape regardless of drag mode
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      toggleDragMode();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      if (accessibilityState.isDragModeActive) {
        toggleDragMode();
      }
      return;
    }

    // Only handle movement keys in drag mode
    if (!accessibilityState.isDragModeActive) return;

    const step = event.shiftKey ? KEYBOARD_MOVE_STEP.coarse : KEYBOARD_MOVE_STEP.fine;
    let deltaX = 0;
    let deltaY = 0;

    switch (event.key) {
      case 'ArrowLeft':
        deltaX = -step;
        break;
      case 'ArrowRight':
        deltaX = step;
        break;
      case 'ArrowUp':
        deltaY = -step;
        break;
      case 'ArrowDown':
        deltaY = step;
        break;
      case 'Home':
        event.preventDefault();
        returnToCenter();
        return;
      default:
        return; // Don't prevent default for unhandled keys
    }

    event.preventDefault();
    moveByDelta(deltaX, deltaY);
  }, [
    accessibilityState.isFocused,
    accessibilityState.isDragModeActive,
    toggleDragMode,
    moveByDelta,
    returnToCenter
  ]);

  // Update current position from external changes (e.g., mouse drag)
  const updatePosition = useCallback((newPosition: { x: number; y: number }) => {
    setAccessibilityState(prev => ({
      ...prev,
      currentPosition: newPosition
    }));
  }, []);

  // Reset to center position
  const resetPosition = useCallback(() => {
    setAccessibilityState(prev => ({
      ...prev,
      currentPosition: KEYBOARD_MOVE_STEP.home,
      isDragModeActive: false
    }));
    onPositionChange(KEYBOARD_MOVE_STEP.home);
  }, [onPositionChange]);

  // Accessibility props for the draggable element
  const accessibilityProps: AccessibilityProps = {
    role: "button",
    tabIndex: 0,
    'aria-label': currentStrings.ariaLabel,
    'aria-pressed': accessibilityState.isDragModeActive,
    'aria-describedby': instructionsId,
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    onBlur: handleBlur
  };

  // Hidden instructions element properties for screen readers
  const hiddenInstructionsProps = {
    id: instructionsId,
    className: "sr-only",
    children: currentStrings.instructions
  };

  // Screen reader announcements element properties
  const announcementsProps = {
    ref: announceRef,
    className: "sr-only",
    "aria-live": "polite" as const,
    "aria-atomic": true
  };

  // Expose handlers for manual control
  const handlers: AccessibilityHandlers = {
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onSpacePress: toggleDragMode
  };

  return {
    accessibilityState,
    accessibilityProps,
    hiddenInstructionsProps,
    announcementsProps,
    handlers,
    updatePosition,
    resetPosition,
    moveByDelta,
    returnToCenter,
    toggleDragMode
  };
};