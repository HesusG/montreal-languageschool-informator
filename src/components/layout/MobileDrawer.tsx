import { useState, useRef, useEffect, type ReactNode } from 'react';

type DrawerState = 'collapsed' | 'half' | 'full';

interface MobileDrawerProps {
  children: ReactNode;
  onStateChange?: (state: DrawerState) => void;
}

export function MobileDrawer({ children, onStateChange }: MobileDrawerProps) {
  const [state, setState] = useState<DrawerState>('collapsed');
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  const heights: Record<DrawerState, string> = {
    collapsed: '48px',
    half: '45%',
    full: '85%',
  };

  function handleDragStart(e: React.TouchEvent | React.MouseEvent) {
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startY.current = y;
  }

  function handleDragEnd(e: React.TouchEvent | React.MouseEvent) {
    const y = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;
    currentY.current = y;
    const diff = startY.current - currentY.current;

    if (diff > 50) {
      setState((s) => s === 'collapsed' ? 'half' : 'full');
    } else if (diff < -50) {
      setState((s) => s === 'full' ? 'half' : 'collapsed');
    }
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: heights[state],
      backgroundColor: 'var(--color-bg)',
      borderTop: 'var(--border-style)',
      boxShadow: '0 -4px 0 var(--color-shadow)',
      zIndex: 1000,
      transition: 'height 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        style={{
          padding: '12px',
          display: 'flex',
          justifyContent: 'center',
          cursor: 'grab',
          flexShrink: 0,
        }}
      >
        <div style={{
          width: '40px',
          height: '4px',
          backgroundColor: 'var(--color-border)',
          borderRadius: '2px',
        }} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        {children}
      </div>
    </div>
  );
}
