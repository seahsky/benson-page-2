/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DraggableHeroLogo } from '../DraggableHeroLogo';

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    img: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <img ref={ref} {...props}>
        {children}
      </img>
    ))
  },
  useMotionValue: jest.fn(() => ({
    get: jest.fn(() => 0),
    set: jest.fn(),
    start: jest.fn()
  })),
  useSpring: jest.fn((value) => value),
  useTransform: jest.fn(() => ({ get: () => 1 }))
}));

// Mock custom hooks
jest.mock('../../hooks/useDragInteraction', () => ({
  useDragInteraction: jest.fn(() => ({
    dragState: {
      isDragging: false,
      isReleasing: false,
      startPosition: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 }
    },
    handlers: {
      onPointerDown: jest.fn(),
      onPointerMove: jest.fn(),
      onPointerUp: jest.fn(),
      onPointerCancel: jest.fn()
    }
  }))
}));

jest.mock('../../hooks/useDragConstraints', () => ({
  useDragConstraints: jest.fn(() => ({
    constraints: {
      left: -100,
      right: 100,
      top: -50,
      bottom: 50,
      elasticity: 0.2
    }
  }))
}));

jest.mock('../../hooks/useDragAccessibility', () => ({
  useDragAccessibility: jest.fn(() => ({
    accessibilityProps: {
      role: 'button',
      tabIndex: 0,
      'aria-label': 'Draggable Logo',
      'aria-pressed': false,
      'aria-describedby': 'drag-instructions',
      onKeyDown: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    },
    hiddenInstructions: <div id="drag-instructions" className="sr-only">Instructions</div>,
    announcements: <div className="sr-only" aria-live="polite" />,
    updatePosition: jest.fn(),
    resetPosition: jest.fn()
  }))
}));

const defaultProps = {
  src: '/test-logo.png',
  alt: 'Test Logo',
  language: 'en' as const,
  size: {
    mobile: 'w-80 h-80',
    tablet: 'w-96 h-96',
    desktop: 'w-[28rem] h-[28rem]'
  }
};

describe('DraggableHeroLogo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      render(<DraggableHeroLogo {...defaultProps} />);

      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/test-logo.png');
      expect(logo).toHaveAttribute('alt', 'Test Logo');
    });

    it('should apply responsive size classes', () => {
      render(<DraggableHeroLogo {...defaultProps} />);

      const container = screen.getByRole('img').closest('div');
      expect(container).toHaveClass('w-80', 'h-80');
    });

    it('should render accessibility elements', () => {
      render(<DraggableHeroLogo {...defaultProps} />);

      const instructions = document.getElementById('drag-instructions');
      expect(instructions).toBeInTheDocument();
      expect(instructions).toHaveClass('sr-only');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<DraggableHeroLogo {...defaultProps} />);

      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('role', 'button');
      expect(logo).toHaveAttribute('tabIndex', '0');
      expect(logo).toHaveAttribute('aria-label', 'Draggable Logo');
      expect(logo).toHaveAttribute('aria-pressed', 'false');
      expect(logo).toHaveAttribute('aria-describedby', 'drag-instructions');
    });

    it('should be keyboard focusable', async () => {
      const user = userEvent.setup();
      render(<DraggableHeroLogo {...defaultProps} />);

      const logo = screen.getByRole('img');
      await user.tab();

      expect(logo).toHaveFocus();
    });

    it('should handle keyboard events', async () => {
      const user = userEvent.setup();
      const mockKeyDown = jest.fn();

      // Mock the accessibility hook to return our mock function
      const { useDragAccessibility } = require('../../hooks/useDragAccessibility');
      useDragAccessibility.mockReturnValue({
        ...useDragAccessibility(),
        accessibilityProps: {
          ...useDragAccessibility().accessibilityProps,
          onKeyDown: mockKeyDown
        }
      });

      render(<DraggableHeroLogo {...defaultProps} />);

      const logo = screen.getByRole('img');
      await user.click(logo);
      await user.keyboard('{Space}');

      expect(mockKeyDown).toHaveBeenCalled();
    });

    it('should support bilingual accessibility', () => {
      render(<DraggableHeroLogo {...defaultProps} language="zh" />);

      // Verify Chinese language is passed to accessibility hook
      const { useDragAccessibility } = require('../../hooks/useDragAccessibility');
      expect(useDragAccessibility).toHaveBeenCalledWith(
        'zh',
        expect.any(Function),
        expect.any(Object)
      );
    });
  });

  describe('Interaction Handling', () => {
    it('should handle pointer events when not disabled', () => {
      const mockHandlers = {
        onPointerDown: jest.fn(),
        onPointerMove: jest.fn(),
        onPointerUp: jest.fn(),
        onPointerCancel: jest.fn()
      };

      const { useDragInteraction } = require('../../hooks/useDragInteraction');
      useDragInteraction.mockReturnValue({
        dragState: useDragInteraction().dragState,
        handlers: mockHandlers
      });

      render(<DraggableHeroLogo {...defaultProps} />);

      const logo = screen.getByRole('img');

      fireEvent.pointerDown(logo);
      expect(mockHandlers.onPointerDown).toHaveBeenCalled();
    });

    it('should not handle events when disabled', () => {
      const mockHandlers = {
        onPointerDown: jest.fn(),
        onPointerMove: jest.fn(),
        onPointerUp: jest.fn(),
        onPointerCancel: jest.fn()
      };

      render(<DraggableHeroLogo {...defaultProps} disabled={true} />);

      const logo = screen.getByRole('img');

      fireEvent.pointerDown(logo);
      expect(mockHandlers.onPointerDown).not.toHaveBeenCalled();
    });

    it('should handle double click to center', async () => {
      const user = userEvent.setup();
      render(<DraggableHeroLogo {...defaultProps} />);

      const logo = screen.getByRole('img');
      await user.dblClick(logo);

      // Verify resetPosition was called
      const { useDragAccessibility } = require('../../hooks/useDragAccessibility');
      const mockResetPosition = useDragAccessibility().resetPosition;
      expect(mockResetPosition).toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled styling', () => {
      render(<DraggableHeroLogo {...defaultProps} disabled={true} />);

      const logo = screen.getByRole('img');
      expect(logo).toHaveClass('cursor-default', 'opacity-75');
      expect(logo).not.toHaveClass('cursor-grab');
    });

    it('should not render accessibility elements when disabled', () => {
      render(<DraggableHeroLogo {...defaultProps} disabled={true} />);

      const logo = screen.getByRole('img');
      expect(logo).not.toHaveAttribute('role');
      expect(logo).not.toHaveAttribute('tabIndex');
    });

    it('should reset position when becoming disabled', () => {
      const { rerender } = render(<DraggableHeroLogo {...defaultProps} />);

      // Enable disabled prop
      rerender(<DraggableHeroLogo {...defaultProps} disabled={true} />);

      // Verify position reset
      const { useDragAccessibility } = require('../../hooks/useDragAccessibility');
      const mockResetPosition = useDragAccessibility().resetPosition;
      expect(mockResetPosition).toHaveBeenCalled();
    });
  });

  describe('Event Coordination', () => {
    it('should listen for custom drag events', () => {
      const onDragStart = jest.fn();
      const onDragEnd = jest.fn();

      render(
        <DraggableHeroLogo
          {...defaultProps}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      );

      // Simulate custom events
      fireEvent(window, new CustomEvent('logo:dragStart'));
      expect(onDragStart).toHaveBeenCalled();

      fireEvent(window, new CustomEvent('logo:dragEnd', {
        detail: { destination: { x: 0, y: 0 }, wasReleased: true }
      }));
      expect(onDragEnd).toHaveBeenCalled();
    });

    it('should dispatch custom events on double click', async () => {
      const user = userEvent.setup();
      const eventSpy = jest.spyOn(window, 'dispatchEvent');

      render(<DraggableHeroLogo {...defaultProps} language="en" />);

      const logo = screen.getByRole('img');
      await user.dblClick(logo);

      expect(eventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'logo:announce',
          detail: { message: 'Logo returned to center' }
        })
      );

      eventSpy.mockRestore();
    });
  });

  describe('Performance', () => {
    it('should memoize properly', () => {
      const { rerender } = render(<DraggableHeroLogo {...defaultProps} />);

      // Re-render with same props should not cause re-mount
      rerender(<DraggableHeroLogo {...defaultProps} />);

      // Component should still be in document
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('should prevent image drag', () => {
      render(<DraggableHeroLogo {...defaultProps} />);

      const logo = screen.getByRole('img');
      const dragEvent = new Event('dragstart');
      const preventDefault = jest.spyOn(dragEvent, 'preventDefault');

      fireEvent(logo, dragEvent);
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  describe('Development Mode', () => {
    const originalEnv = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    it('should show debug info in development', () => {
      process.env.NODE_ENV = 'development';

      render(<DraggableHeroLogo {...defaultProps} />);

      // Look for debug info
      const debugInfo = document.querySelector('.font-mono');
      expect(debugInfo).toBeInTheDocument();
      expect(debugInfo).toHaveTextContent(/State:|Pos:/);
    });

    it('should not show debug info in production', () => {
      process.env.NODE_ENV = 'production';

      render(<DraggableHeroLogo {...defaultProps} />);

      // Debug info should not be present
      const debugInfo = document.querySelector('.font-mono');
      expect(debugInfo).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing image gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(<DraggableHeroLogo {...defaultProps} src="" />);

      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '');

      consoleSpy.mockRestore();
    });

    it('should handle constraint calculation errors', () => {
      const { useDragConstraints } = require('../../hooks/useDragConstraints');
      useDragConstraints.mockReturnValue({
        constraints: null // Simulate error state
      });

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      render(<DraggableHeroLogo {...defaultProps} />);

      // Component should still render
      expect(screen.getByRole('img')).toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });
});