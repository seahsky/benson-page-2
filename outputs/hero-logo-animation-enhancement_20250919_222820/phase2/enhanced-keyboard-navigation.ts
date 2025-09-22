/**
 * Enhanced Keyboard Navigation System
 * Comprehensive keyboard navigation with visual feedback and accessibility features
 */

export interface KeyboardConfig {
  enabled: boolean;
  moveDistance: number;
  fineMoveDistance: number;
  animationDuration: number;
  enableSpatialNavigation: boolean;
  enableKeyboardShortcuts: boolean;
  enableVisualFeedback: boolean;
  enableAudioFeedback: boolean;
  respectUserPreferences: boolean;
}

export interface KeyboardState {
  isActive: boolean;
  currentMode: 'navigation' | 'drag' | 'fine' | 'disabled';
  position: { x: number; y: number };
  lastKeyPressed: string;
  lastAction: string;
  keySequence: string[];
  actionHistory: string[];
}

export interface KeyBinding {
  key: string;
  modifiers?: ('ctrl' | 'alt' | 'shift' | 'meta')[];
  action: string;
  description: string;
  category: 'movement' | 'mode' | 'action' | 'accessibility';
}

export interface NavigationFeedback {
  visual: boolean;
  audio: boolean;
  haptic: boolean;
  announcement: string;
}

export class EnhancedKeyboardNavigation {
  private config: KeyboardConfig;
  private state: KeyboardState;
  private element: HTMLElement | null = null;
  private constraints: any = null;
  private activeListeners: Array<() => void> = [];
  private focusIndicator: HTMLElement | null = null;
  private gridOverlay: HTMLElement | null = null;

  // Key bindings for different actions
  private keyBindings: KeyBinding[] = [
    // Movement keys
    { key: 'ArrowUp', action: 'moveUp', description: 'Move up', category: 'movement' },
    { key: 'ArrowDown', action: 'moveDown', description: 'Move down', category: 'movement' },
    { key: 'ArrowLeft', action: 'moveLeft', description: 'Move left', category: 'movement' },
    { key: 'ArrowRight', action: 'moveRight', description: 'Move right', category: 'movement' },

    // Fine movement (with Shift)
    { key: 'ArrowUp', modifiers: ['shift'], action: 'fineMoveUp', description: 'Fine move up', category: 'movement' },
    { key: 'ArrowDown', modifiers: ['shift'], action: 'fineMoveDown', description: 'Fine move down', category: 'movement' },
    { key: 'ArrowLeft', modifiers: ['shift'], action: 'fineMoveLeft', description: 'Fine move left', category: 'movement' },
    { key: 'ArrowRight', modifiers: ['shift'], action: 'fineMoveRight', description: 'Fine move right', category: 'movement' },

    // Mode switches
    { key: ' ', action: 'toggleDragMode', description: 'Toggle drag mode', category: 'mode' },
    { key: 'Enter', action: 'activateDragMode', description: 'Activate drag mode', category: 'mode' },
    { key: 'Escape', action: 'exitDragMode', description: 'Exit drag mode', category: 'mode' },

    // Actions
    { key: 'Home', action: 'centerPosition', description: 'Return to center', category: 'action' },
    { key: 'End', action: 'moveToCorner', description: 'Move to corner', category: 'action' },
    { key: 'PageUp', action: 'increaseDistance', description: 'Increase move distance', category: 'action' },
    { key: 'PageDown', action: 'decreaseDistance', description: 'Decrease move distance', category: 'action' },

    // Accessibility shortcuts
    { key: 'h', action: 'showHelp', description: 'Show keyboard help', category: 'accessibility' },
    { key: 'g', action: 'toggleGrid', description: 'Toggle position grid', category: 'accessibility' },
    { key: 'a', action: 'announcePosition', description: 'Announce current position', category: 'accessibility' },
    { key: 'r', action: 'resetToDefault', description: 'Reset to default state', category: 'accessibility' },

    // Advanced shortcuts (with Ctrl)
    { key: '1', modifiers: ['ctrl'], action: 'setPresetPosition1', description: 'Move to preset position 1', category: 'action' },
    { key: '2', modifiers: ['ctrl'], action: 'setPresetPosition2', description: 'Move to preset position 2', category: 'action' },
    { key: '3', modifiers: ['ctrl'], action: 'setPresetPosition3', description: 'Move to preset position 3', category: 'action' },
    { key: '4', modifiers: ['ctrl'], action: 'setPresetPosition4', description: 'Move to preset position 4', category: 'action' }
  ];

  // Preset positions for quick navigation
  private presetPositions = {
    1: { x: -50, y: -50 }, // Top-left quadrant
    2: { x: 50, y: -50 },  // Top-right quadrant
    3: { x: -50, y: 50 },  // Bottom-left quadrant
    4: { x: 50, y: 50 }    // Bottom-right quadrant
  };

  constructor(config: Partial<KeyboardConfig> = {}) {
    this.config = {
      enabled: true,
      moveDistance: 20,
      fineMoveDistance: 5,
      animationDuration: 200,
      enableSpatialNavigation: true,
      enableKeyboardShortcuts: true,
      enableVisualFeedback: true,
      enableAudioFeedback: false,
      respectUserPreferences: true,
      ...config
    };

    this.state = {
      isActive: false,
      currentMode: 'navigation',
      position: { x: 0, y: 0 },
      lastKeyPressed: '',
      lastAction: '',
      keySequence: [],
      actionHistory: []
    };

    this.adaptToUserPreferences();
  }

  /**
   * Adapt to user accessibility preferences
   */
  private adaptToUserPreferences(): void {
    if (!this.config.respectUserPreferences) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.config.animationDuration = 100;
      this.config.enableVisualFeedback = false;
    }

    // Check for high contrast preference
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    if (prefersHighContrast) {
      this.config.enableVisualFeedback = true;
    }
  }

  /**
   * Initialize keyboard navigation for an element
   */
  initialize(element: HTMLElement, constraints: any): void {
    this.element = element;
    this.constraints = constraints;

    this.setupEventListeners();
    this.createFocusIndicator();
    this.updateElementAccessibility();

    if (this.config.enableVisualFeedback) {
      this.createVisualFeedbackElements();
    }
  }

  /**
   * Setup keyboard event listeners
   */
  private setupEventListeners(): void {
    if (!this.element) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!this.config.enabled || !this.state.isActive) return;

      const binding = this.findKeyBinding(event);
      if (binding) {
        event.preventDefault();
        this.executeAction(binding.action, event);
        this.updateState(event.key, binding.action);
        this.provideFeedback(binding);
      }
    };

    const handleFocus = () => {
      this.activate();
    };

    const handleBlur = () => {
      this.deactivate();
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    this.element.addEventListener('focus', handleFocus);
    this.element.addEventListener('blur', handleBlur);

    // Store cleanup functions
    this.activeListeners.push(
      () => document.removeEventListener('keydown', handleKeyDown),
      () => this.element?.removeEventListener('focus', handleFocus),
      () => this.element?.removeEventListener('blur', handleBlur)
    );
  }

  /**
   * Find key binding for event
   */
  private findKeyBinding(event: KeyboardEvent): KeyBinding | null {
    return this.keyBindings.find(binding => {
      if (binding.key !== event.key) return false;

      const modifiers = binding.modifiers || [];
      const hasCtrl = modifiers.includes('ctrl') === event.ctrlKey;
      const hasAlt = modifiers.includes('alt') === event.altKey;
      const hasShift = modifiers.includes('shift') === event.shiftKey;
      const hasMeta = modifiers.includes('meta') === event.metaKey;

      return hasCtrl && hasAlt && hasShift && hasMeta;
    });
  }

  /**
   * Execute keyboard action
   */
  private executeAction(action: string, event: KeyboardEvent): void {
    switch (action) {
      // Movement actions
      case 'moveUp':
        this.move(0, -this.config.moveDistance);
        break;
      case 'moveDown':
        this.move(0, this.config.moveDistance);
        break;
      case 'moveLeft':
        this.move(-this.config.moveDistance, 0);
        break;
      case 'moveRight':
        this.move(this.config.moveDistance, 0);
        break;

      // Fine movement actions
      case 'fineMoveUp':
        this.move(0, -this.config.fineMoveDistance);
        break;
      case 'fineMoveDown':
        this.move(0, this.config.fineMoveDistance);
        break;
      case 'fineMoveLeft':
        this.move(-this.config.fineMoveDistance, 0);
        break;
      case 'fineMoveRight':
        this.move(this.config.fineMoveDistance, 0);
        break;

      // Mode actions
      case 'toggleDragMode':
        this.toggleDragMode();
        break;
      case 'activateDragMode':
        this.setMode('drag');
        break;
      case 'exitDragMode':
        this.setMode('navigation');
        break;

      // Position actions
      case 'centerPosition':
        this.centerPosition();
        break;
      case 'moveToCorner':
        this.moveToCorner();
        break;

      // Distance adjustment
      case 'increaseDistance':
        this.adjustMoveDistance(5);
        break;
      case 'decreaseDistance':
        this.adjustMoveDistance(-5);
        break;

      // Accessibility actions
      case 'showHelp':
        this.showKeyboardHelp();
        break;
      case 'toggleGrid':
        this.togglePositionGrid();
        break;
      case 'announcePosition':
        this.announceCurrentPosition();
        break;
      case 'resetToDefault':
        this.resetToDefault();
        break;

      // Preset positions
      case 'setPresetPosition1':
      case 'setPresetPosition2':
      case 'setPresetPosition3':
      case 'setPresetPosition4':
        const presetNumber = parseInt(action.slice(-1)) as 1 | 2 | 3 | 4;
        this.moveToPreset(presetNumber);
        break;
    }
  }

  /**
   * Move element by offset
   */
  private move(deltaX: number, deltaY: number): void {
    if (!this.element) return;

    const newPosition = {
      x: this.state.position.x + deltaX,
      y: this.state.position.y + deltaY
    };

    // Apply constraints if available
    if (this.constraints) {
      newPosition.x = Math.max(this.constraints.left, Math.min(this.constraints.right, newPosition.x));
      newPosition.y = Math.max(this.constraints.top, Math.min(this.constraints.bottom, newPosition.y));
    }

    this.animateToPosition(newPosition);
    this.updateFocusIndicator(newPosition);
  }

  /**
   * Animate element to new position
   */
  private animateToPosition(position: { x: number; y: number }): void {
    if (!this.element) return;

    // Use CSS transition for smooth animation
    this.element.style.transition = `transform ${this.config.animationDuration}ms ease-out`;
    this.element.style.transform = `translate(${position.x}px, ${position.y}px)`;

    // Update state
    this.state.position = position;

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('logo:keyboardMove', {
      detail: { position, method: 'keyboard' }
    }));

    // Remove transition after animation
    setTimeout(() => {
      if (this.element) {
        this.element.style.transition = '';
      }
    }, this.config.animationDuration);
  }

  /**
   * Toggle drag mode
   */
  private toggleDragMode(): void {
    this.setMode(this.state.currentMode === 'drag' ? 'navigation' : 'drag');
  }

  /**
   * Set navigation mode
   */
  private setMode(mode: 'navigation' | 'drag' | 'fine' | 'disabled'): void {
    this.state.currentMode = mode;
    this.updateVisualState();
    this.announceMode();
  }

  /**
   * Center position
   */
  private centerPosition(): void {
    this.animateToPosition({ x: 0, y: 0 });
    this.announceAction('Logo centered');
  }

  /**
   * Move to corner (cycles through corners)
   */
  private moveToCorner(): void {
    if (!this.constraints) return;

    const corners = [
      { x: this.constraints.left, y: this.constraints.top },
      { x: this.constraints.right, y: this.constraints.top },
      { x: this.constraints.right, y: this.constraints.bottom },
      { x: this.constraints.left, y: this.constraints.bottom }
    ];

    // Find closest corner and move to next one
    let closestIndex = 0;
    let minDistance = Infinity;

    corners.forEach((corner, index) => {
      const distance = Math.sqrt(
        Math.pow(corner.x - this.state.position.x, 2) +
        Math.pow(corner.y - this.state.position.y, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    const nextCornerIndex = (closestIndex + 1) % corners.length;
    this.animateToPosition(corners[nextCornerIndex]);
    this.announceAction(`Moved to corner ${nextCornerIndex + 1}`);
  }

  /**
   * Move to preset position
   */
  private moveToPreset(presetNumber: 1 | 2 | 3 | 4): void {
    const position = this.presetPositions[presetNumber];
    this.animateToPosition(position);
    this.announceAction(`Moved to preset position ${presetNumber}`);
  }

  /**
   * Adjust move distance
   */
  private adjustMoveDistance(change: number): void {
    this.config.moveDistance = Math.max(5, Math.min(100, this.config.moveDistance + change));
    this.announceAction(`Move distance set to ${this.config.moveDistance} pixels`);
  }

  /**
   * Show keyboard help
   */
  private showKeyboardHelp(): void {
    const helpText = this.generateHelpText();
    this.announceAction('Keyboard help displayed');

    // Could show a modal or tooltip with help
    console.log('Keyboard Navigation Help:', helpText);
  }

  /**
   * Generate help text
   */
  private generateHelpText(): string {
    const categories = this.keyBindings.reduce((acc, binding) => {
      if (!acc[binding.category]) acc[binding.category] = [];
      const modifierText = binding.modifiers ? binding.modifiers.join(' + ') + ' + ' : '';
      acc[binding.category].push(`${modifierText}${binding.key}: ${binding.description}`);
      return acc;
    }, {} as Record<string, string[]>);

    return Object.entries(categories)
      .map(([category, bindings]) => `${category.toUpperCase()}:\n${bindings.join('\n')}`)
      .join('\n\n');
  }

  /**
   * Toggle position grid overlay
   */
  private togglePositionGrid(): void {
    if (this.gridOverlay) {
      this.removePositionGrid();
    } else {
      this.createPositionGrid();
    }
  }

  /**
   * Create position grid overlay
   */
  private createPositionGrid(): void {
    if (!this.element || this.gridOverlay) return;

    this.gridOverlay = document.createElement('div');
    this.gridOverlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background-image:
        radial-gradient(circle, rgba(59, 130, 246, 0.3) 2px, transparent 2px);
      background-size: 20px 20px;
      background-position: 10px 10px;
      border: 2px dashed rgba(59, 130, 246, 0.5);
      z-index: 1000;
    `;

    this.element.parentElement?.appendChild(this.gridOverlay);
    this.announceAction('Position grid enabled');
  }

  /**
   * Remove position grid overlay
   */
  private removePositionGrid(): void {
    if (this.gridOverlay) {
      this.gridOverlay.remove();
      this.gridOverlay = null;
      this.announceAction('Position grid disabled');
    }
  }

  /**
   * Announce current position
   */
  private announceCurrentPosition(): void {
    const x = Math.round(this.state.position.x);
    const y = Math.round(this.state.position.y);
    this.announceAction(`Current position: X ${x}, Y ${y}`);
  }

  /**
   * Reset to default state
   */
  private resetToDefault(): void {
    this.centerPosition();
    this.setMode('navigation');
    this.config.moveDistance = 20;
    this.announceAction('Reset to default state');
  }

  /**
   * Create focus indicator
   */
  private createFocusIndicator(): void {
    if (!this.element) return;

    this.focusIndicator = document.createElement('div');
    this.focusIndicator.style.cssText = `
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border: 2px solid rgba(59, 130, 246, 0.8);
      border-radius: 8px;
      opacity: 0;
      transition: opacity 200ms ease-out;
      pointer-events: none;
      z-index: 1001;
    `;

    this.element.parentElement?.appendChild(this.focusIndicator);
  }

  /**
   * Update focus indicator position
   */
  private updateFocusIndicator(position: { x: number; y: number }): void {
    if (!this.focusIndicator) return;

    this.focusIndicator.style.transform = `translate(${position.x}px, ${position.y}px)`;
  }

  /**
   * Create visual feedback elements
   */
  private createVisualFeedbackElements(): void {
    // Additional visual feedback elements could be created here
    // Such as direction indicators, distance markers, etc.
  }

  /**
   * Update element accessibility attributes
   */
  private updateElementAccessibility(): void {
    if (!this.element) return;

    this.element.setAttribute('role', 'slider');
    this.element.setAttribute('aria-orientation', 'undefined'); // 2D movement
    this.element.setAttribute('aria-valuemin', String(this.constraints?.left || -100));
    this.element.setAttribute('aria-valuemax', String(this.constraints?.right || 100));
    this.element.setAttribute('aria-valuenow', String(this.state.position.x));
    this.element.setAttribute('aria-label', 'Draggable logo - use arrow keys to move, space to toggle drag mode');
    this.element.setAttribute('tabindex', '0');
  }

  /**
   * Update state after key action
   */
  private updateState(key: string, action: string): void {
    this.state.lastKeyPressed = key;
    this.state.lastAction = action;
    this.state.keySequence.push(key);
    this.state.actionHistory.push(action);

    // Keep history limited
    if (this.state.keySequence.length > 10) {
      this.state.keySequence.shift();
    }
    if (this.state.actionHistory.length > 10) {
      this.state.actionHistory.shift();
    }

    // Update ARIA attributes
    if (this.element) {
      this.element.setAttribute('aria-valuenow', String(this.state.position.x));
      this.element.setAttribute('aria-valuetext',
        `X: ${Math.round(this.state.position.x)}, Y: ${Math.round(this.state.position.y)}`
      );
    }
  }

  /**
   * Update visual state based on mode
   */
  private updateVisualState(): void {
    if (!this.element || !this.focusIndicator) return;

    const modeColors = {
      navigation: 'rgba(59, 130, 246, 0.8)', // Blue
      drag: 'rgba(34, 197, 94, 0.8)',        // Green
      fine: 'rgba(245, 158, 11, 0.8)',       // Amber
      disabled: 'rgba(156, 163, 175, 0.5)'   // Gray
    };

    this.focusIndicator.style.borderColor = modeColors[this.state.currentMode];

    if (this.state.currentMode === 'drag') {
      this.focusIndicator.style.borderWidth = '3px';
      this.focusIndicator.style.borderStyle = 'solid';
    } else {
      this.focusIndicator.style.borderWidth = '2px';
      this.focusIndicator.style.borderStyle = 'dashed';
    }
  }

  /**
   * Provide feedback for action
   */
  private provideFeedback(binding: KeyBinding): void {
    if (this.config.enableVisualFeedback) {
      this.showVisualFeedback(binding);
    }

    if (this.config.enableAudioFeedback) {
      this.playAudioFeedback(binding);
    }
  }

  /**
   * Show visual feedback
   */
  private showVisualFeedback(binding: KeyBinding): void {
    // Could show temporary indicators, highlights, etc.
    if (this.focusIndicator) {
      this.focusIndicator.style.opacity = '1';
      this.focusIndicator.style.transform += ' scale(1.1)';

      setTimeout(() => {
        if (this.focusIndicator) {
          this.focusIndicator.style.transform = this.focusIndicator.style.transform.replace(' scale(1.1)', '');
        }
      }, 150);
    }
  }

  /**
   * Play audio feedback
   */
  private playAudioFeedback(binding: KeyBinding): void {
    // Audio feedback could be implemented here
    // Different tones for different action types
  }

  /**
   * Announce mode change
   */
  private announceMode(): void {
    const modeDescriptions = {
      navigation: 'Navigation mode active',
      drag: 'Drag mode active',
      fine: 'Fine movement mode active',
      disabled: 'Navigation disabled'
    };

    this.announceAction(modeDescriptions[this.state.currentMode]);
  }

  /**
   * Announce action to screen readers
   */
  private announceAction(message: string): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Activate keyboard navigation
   */
  activate(): void {
    this.state.isActive = true;
    if (this.focusIndicator) {
      this.focusIndicator.style.opacity = '1';
    }
    this.updateVisualState();
    this.announceAction('Keyboard navigation activated');
  }

  /**
   * Deactivate keyboard navigation
   */
  deactivate(): void {
    this.state.isActive = false;
    if (this.focusIndicator) {
      this.focusIndicator.style.opacity = '0';
    }
  }

  /**
   * Get current state
   */
  getState(): KeyboardState {
    return { ...this.state };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<KeyboardConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.adaptToUserPreferences();
  }

  /**
   * Get available key bindings
   */
  getKeyBindings(): KeyBinding[] {
    return [...this.keyBindings];
  }

  /**
   * Cleanup navigation system
   */
  cleanup(): void {
    this.activeListeners.forEach(cleanup => cleanup());
    this.activeListeners = [];

    if (this.focusIndicator) {
      this.focusIndicator.remove();
      this.focusIndicator = null;
    }

    if (this.gridOverlay) {
      this.gridOverlay.remove();
      this.gridOverlay = null;
    }

    this.state.isActive = false;
  }
}

export default EnhancedKeyboardNavigation;