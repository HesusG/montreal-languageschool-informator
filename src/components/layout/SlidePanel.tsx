import type { ReactNode } from 'react';
import { Button } from '../ui/Button';

interface SlidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function SlidePanel({ open, onClose, title, children }: SlidePanelProps) {
  return (
    <div className={`slide-panel ${open ? 'slide-panel--open' : ''}`}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        borderBottom: 'var(--border-style)',
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700 }}>{title}</h2>
        <Button variant="ghost" onClick={onClose} style={{ fontSize: '20px', padding: '4px 8px' }}>✕</Button>
      </div>
      <div style={{ padding: '16px' }}>
        {children}
      </div>
    </div>
  );
}
