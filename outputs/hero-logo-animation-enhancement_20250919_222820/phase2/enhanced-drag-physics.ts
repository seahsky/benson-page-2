/**
 * Enhanced Drag Physics Engine
 * Advanced physics calculations for realistic drag interactions
 */

export interface PhysicsConfig {
  friction: number;
  elasticity: number;
  springConstant: number;
  damping: number;
  momentumScale: number;
  minVelocity: number;
  maxVelocity: number;
  angularDamping: number;
  restitution: number; // Bounciness factor
}

export interface PhysicsState {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  acceleration: { x: number; y: number };
  angularVelocity: number;
  rotation: number;
  energy: number;
  mass: number;
}

export interface CollisionResult {
  hasCollision: boolean;
  normal: { x: number; y: number };
  penetration: number;
  point: { x: number; y: number };
}

export class EnhancedPhysicsEngine {
  private config: PhysicsConfig;
  private state: PhysicsState;
  private lastTime: number = 0;
  private energyHistory: number[] = [];

  constructor(config: Partial<PhysicsConfig> = {}) {
    this.config = {
      friction: 0.92,
      elasticity: 0.35,
      springConstant: 0.15,
      damping: 0.88,
      momentumScale: 0.2,
      minVelocity: 30,
      maxVelocity: 2000,
      angularDamping: 0.95,
      restitution: 0.7,
      ...config
    };

    this.state = {
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      angularVelocity: 0,
      rotation: 0,
      energy: 0,
      mass: 1
    };
  }

  /**
   * Enhanced momentum calculation with realistic physics
   */
  calculateEnhancedMomentum(
    currentPos: { x: number; y: number },
    velocity: { x: number; y: number },
    deltaTime: number,
    bounds?: { left: number; right: number; top: number; bottom: number }
  ): {
    destination: { x: number; y: number };
    bounceSequence: Array<{ x: number; y: number; energy: number }>;
    totalTime: number;
    finalEnergy: number;
  } {
    // Clamp velocity to prevent unrealistic speeds
    const clampedVelocity = {
      x: Math.max(-this.config.maxVelocity, Math.min(this.config.maxVelocity, velocity.x)),
      y: Math.max(-this.config.maxVelocity, Math.min(this.config.maxVelocity, velocity.y))
    };

    let pos = { ...currentPos };
    let vel = { ...clampedVelocity };
    const bounceSequence: Array<{ x: number; y: number; energy: number }> = [];
    let totalTime = 0;
    let timeStep = 16; // 60fps simulation

    // Simulate momentum over time with multiple bounces
    while (this.getSpeed(vel) > this.config.minVelocity && totalTime < 2000) {
      // Apply friction each frame
      vel.x *= this.config.friction;
      vel.y *= this.config.friction;

      // Calculate next position
      const nextPos = {
        x: pos.x + vel.x * this.config.momentumScale * (timeStep / 1000),
        y: pos.y + vel.y * this.config.momentumScale * (timeStep / 1000)
      };

      if (bounds) {
        const collision = this.detectCollision(nextPos, bounds);
        if (collision.hasCollision) {
          // Calculate reflection
          const reflection = this.calculateReflection(vel, collision.normal);
          vel.x = reflection.x * this.config.restitution;
          vel.y = reflection.y * this.config.restitution;

          // Apply position correction to prevent penetration
          pos.x = nextPos.x - collision.normal.x * collision.penetration;
          pos.y = nextPos.y - collision.normal.y * collision.penetration;

          // Record bounce point
          const energy = this.calculateKineticEnergy(vel);
          bounceSequence.push({ x: pos.x, y: pos.y, energy });
        } else {
          pos = nextPos;
        }
      } else {
        pos = nextPos;
      }

      totalTime += timeStep;
    }

    const finalEnergy = this.calculateKineticEnergy(vel);
    return {
      destination: pos,
      bounceSequence,
      totalTime,
      finalEnergy
    };
  }

  /**
   * Advanced collision detection with precise normal calculation
   */
  private detectCollision(
    pos: { x: number; y: number },
    bounds: { left: number; right: number; top: number; bottom: number }
  ): CollisionResult {
    let hasCollision = false;
    let normal = { x: 0, y: 0 };
    let penetration = 0;
    let point = { ...pos };

    // Check boundary collisions
    if (pos.x < bounds.left) {
      hasCollision = true;
      normal = { x: 1, y: 0 };
      penetration = bounds.left - pos.x;
      point.x = bounds.left;
    } else if (pos.x > bounds.right) {
      hasCollision = true;
      normal = { x: -1, y: 0 };
      penetration = pos.x - bounds.right;
      point.x = bounds.right;
    }

    if (pos.y < bounds.top) {
      hasCollision = true;
      normal = { x: 0, y: 1 };
      penetration = Math.max(penetration, bounds.top - pos.y);
      point.y = bounds.top;
    } else if (pos.y > bounds.bottom) {
      hasCollision = true;
      normal = { x: 0, y: -1 };
      penetration = Math.max(penetration, pos.y - bounds.bottom);
      point.y = bounds.bottom;
    }

    return { hasCollision, normal, penetration, point };
  }

  /**
   * Calculate reflection vector based on surface normal
   */
  private calculateReflection(
    velocity: { x: number; y: number },
    normal: { x: number; y: number }
  ): { x: number; y: number } {
    const dot = velocity.x * normal.x + velocity.y * normal.y;
    return {
      x: velocity.x - 2 * dot * normal.x,
      y: velocity.y - 2 * dot * normal.y
    };
  }

  /**
   * Enhanced spring force calculation with non-linear response
   */
  calculateEnhancedSpringForce(
    position: { x: number; y: number },
    bounds: { left: number; right: number; top: number; bottom: number }
  ): { x: number; y: number } {
    let forceX = 0;
    let forceY = 0;

    // X-axis spring forces
    if (position.x < bounds.left) {
      const distance = bounds.left - position.x;
      forceX = Math.pow(distance, 1.2) * this.config.springConstant;
    } else if (position.x > bounds.right) {
      const distance = position.x - bounds.right;
      forceX = -Math.pow(distance, 1.2) * this.config.springConstant;
    }

    // Y-axis spring forces
    if (position.y < bounds.top) {
      const distance = bounds.top - position.y;
      forceY = Math.pow(distance, 1.2) * this.config.springConstant;
    } else if (position.y > bounds.bottom) {
      const distance = position.y - bounds.bottom;
      forceY = -Math.pow(distance, 1.2) * this.config.springConstant;
    }

    return { x: forceX, y: forceY };
  }

  /**
   * Calculate kinetic energy for visual effects
   */
  private calculateKineticEnergy(velocity: { x: number; y: number }): number {
    const speed = this.getSpeed(velocity);
    return 0.5 * this.state.mass * Math.pow(speed, 2) / 1000; // Normalized
  }

  /**
   * Get magnitude of velocity vector
   */
  private getSpeed(velocity: { x: number; y: number }): number {
    return Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  }

  /**
   * Advanced damping with energy conservation
   */
  applyAdvancedDamping(
    velocity: { x: number; y: number },
    energy: number,
    surface: 'air' | 'elastic' | 'viscous' = 'air'
  ): { x: number; y: number } {
    let dampingFactor = this.config.damping;

    // Adjust damping based on surface type
    switch (surface) {
      case 'elastic':
        dampingFactor = Math.max(0.95, dampingFactor + 0.05);
        break;
      case 'viscous':
        dampingFactor = Math.min(0.80, dampingFactor - 0.1);
        break;
      case 'air':
      default:
        // Apply energy-dependent damping
        dampingFactor = this.config.damping * (1 - energy * 0.1);
        break;
    }

    return {
      x: velocity.x * dampingFactor,
      y: velocity.y * dampingFactor
    };
  }

  /**
   * Update physics state with enhanced calculations
   */
  updatePhysicsState(
    position: { x: number; y: number },
    velocity: { x: number; y: number },
    deltaTime: number
  ): PhysicsState {
    const now = performance.now();
    const dt = deltaTime / 1000; // Convert to seconds

    // Calculate acceleration
    const acceleration = {
      x: (velocity.x - this.state.velocity.x) / dt,
      y: (velocity.y - this.state.velocity.y) / dt
    };

    // Calculate energy
    const energy = this.calculateKineticEnergy(velocity);
    this.energyHistory.push(energy);
    if (this.energyHistory.length > 10) {
      this.energyHistory.shift();
    }

    // Update angular velocity based on linear motion changes
    const angularChange = (velocity.x - this.state.velocity.x) * 0.01;
    const angularVelocity = this.state.angularVelocity + angularChange;

    // Update rotation
    const rotation = this.state.rotation + angularVelocity * dt;

    this.state = {
      position,
      velocity,
      acceleration,
      angularVelocity: angularVelocity * this.config.angularDamping,
      rotation: rotation % 360,
      energy,
      mass: this.state.mass
    };

    this.lastTime = now;
    return { ...this.state };
  }

  /**
   * Get current physics state
   */
  getState(): PhysicsState {
    return { ...this.state };
  }

  /**
   * Reset physics state
   */
  reset(): void {
    this.state = {
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      angularVelocity: 0,
      rotation: 0,
      energy: 0,
      mass: 1
    };
    this.energyHistory = [];
  }

  /**
   * Get energy trend for predictive effects
   */
  getEnergyTrend(): 'increasing' | 'decreasing' | 'stable' {
    if (this.energyHistory.length < 3) return 'stable';

    const recent = this.energyHistory.slice(-3);
    const trend = recent[2] - recent[0];

    if (Math.abs(trend) < 0.01) return 'stable';
    return trend > 0 ? 'increasing' : 'decreasing';
  }

  /**
   * Calculate optimal animation duration based on physics
   */
  calculateOptimalAnimationDuration(
    startPos: { x: number; y: number },
    endPos: { x: number; y: number },
    energy: number
  ): number {
    const distance = Math.sqrt(
      Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2)
    );

    // Base duration on distance and energy
    const baseDuration = Math.min(800, Math.max(200, distance * 2));
    const energyMultiplier = Math.max(0.5, Math.min(2, 1 + energy));

    return baseDuration * energyMultiplier;
  }
}

/**
 * Enhanced gesture recognition with physics integration
 */
export class EnhancedGestureRecognizer {
  private touchHistory: Map<number, Array<{ x: number; y: number; time: number }>> = new Map();
  private gestureThresholds = {
    pinchMinDistance: 50,
    pinchSensitivity: 0.05,
    rotationThreshold: 5, // degrees
    swipeMinDistance: 100,
    swipeMaxTime: 500,
    tapMaxTime: 200,
    tapMaxDistance: 10
  };

  /**
   * Enhanced pinch gesture detection with physics
   */
  detectEnhancedPinch(touches: TouchList): {
    isActive: boolean;
    scale: number;
    center: { x: number; y: number };
    velocity: number;
    energy: number;
  } {
    if (touches.length !== 2) {
      return { isActive: false, scale: 1, center: { x: 0, y: 0 }, velocity: 0, energy: 0 };
    }

    const touch1 = touches[0];
    const touch2 = touches[1];
    const currentDistance = Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );

    const center = {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2
    };

    // Track touch history for velocity calculation
    const now = performance.now();
    let history1 = this.touchHistory.get(touch1.identifier) || [];
    let history2 = this.touchHistory.get(touch2.identifier) || [];

    history1.push({ x: touch1.clientX, y: touch1.clientY, time: now });
    history2.push({ x: touch2.clientX, y: touch2.clientY, time: now });

    // Keep only recent history
    history1 = history1.filter(h => now - h.time < 200);
    history2 = history2.filter(h => now - h.time < 200);

    this.touchHistory.set(touch1.identifier, history1);
    this.touchHistory.set(touch2.identifier, history2);

    if (history1.length < 2 || history2.length < 2) {
      return { isActive: false, scale: 1, center, velocity: 0, energy: 0 };
    }

    // Calculate previous distance for scale and velocity
    const prevTouch1 = history1[history1.length - 2];
    const prevTouch2 = history2[history2.length - 2];
    const prevDistance = Math.sqrt(
      Math.pow(prevTouch2.x - prevTouch1.x, 2) +
      Math.pow(prevTouch2.y - prevTouch1.y, 2)
    );

    const scale = currentDistance / Math.max(prevDistance, 1);
    const isActive = Math.abs(scale - 1) > this.gestureThresholds.pinchSensitivity;

    // Calculate velocity and energy
    const velocity = Math.abs(currentDistance - prevDistance) / (now - prevTouch1.time);
    const energy = Math.min(1, velocity / 100); // Normalize energy

    return { isActive, scale, center, velocity, energy };
  }

  /**
   * Enhanced rotation gesture detection
   */
  detectEnhancedRotation(touches: TouchList): {
    isActive: boolean;
    rotation: number;
    center: { x: number; y: number };
    velocity: number;
    energy: number;
  } {
    if (touches.length !== 2) {
      return { isActive: false, rotation: 0, center: { x: 0, y: 0 }, velocity: 0, energy: 0 };
    }

    const touch1 = touches[0];
    const touch2 = touches[1];

    const center = {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2
    };

    const currentAngle = Math.atan2(
      touch2.clientY - touch1.clientY,
      touch2.clientX - touch1.clientX
    ) * (180 / Math.PI);

    const now = performance.now();
    let history1 = this.touchHistory.get(touch1.identifier) || [];
    let history2 = this.touchHistory.get(touch2.identifier) || [];

    if (history1.length < 2 || history2.length < 2) {
      return { isActive: false, rotation: 0, center, velocity: 0, energy: 0 };
    }

    const prevTouch1 = history1[history1.length - 2];
    const prevTouch2 = history2[history2.length - 2];
    const prevAngle = Math.atan2(
      prevTouch2.y - prevTouch1.y,
      prevTouch2.x - prevTouch1.x
    ) * (180 / Math.PI);

    let rotation = currentAngle - prevAngle;

    // Handle angle wrapping
    if (rotation > 180) rotation -= 360;
    if (rotation < -180) rotation += 360;

    const isActive = Math.abs(rotation) > this.gestureThresholds.rotationThreshold;

    // Calculate angular velocity and energy
    const deltaTime = now - prevTouch1.time;
    const velocity = Math.abs(rotation) / Math.max(deltaTime, 1);
    const energy = Math.min(1, velocity / 10); // Normalize energy

    return { isActive, rotation, center, velocity, energy };
  }

  /**
   * Clean up old touch history
   */
  cleanup(): void {
    this.touchHistory.clear();
  }
}

export default EnhancedPhysicsEngine;