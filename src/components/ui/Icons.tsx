// components/ui/Icons.tsx
import * as React from 'react';

interface GoogleMaterialIconProps {
  name: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

// Common Google Material Icons used in the registration form
const iconMap: Record<string, string> = {
  // Form icons
  'edit_document': '📝',
  'person': '👤',
  'badge': '🪪',
  'mail': '✉️',
  'numbers': '🔢',
  'school': '🏫',
  'calendar_month': '📅',
  'event': '📅',
  'location_on': '📍',
  'schedule': '⏰',
  'price_change': '💰',
  'verified': '✅',
  'groups': '👥',
  'menu_book': '📚',
  'emoji_food_beverage': '☕',
  'question_answer': '💬',
  'call': '📞',
  'how_to_reg': '📝',
  
  // Status icons
  'check_circle': '✅',
  'error': '❌',
  'close': '✕',
  'calendar_today': '📅',
};

export function GoogleMaterialIcon({ 
  name, 
  size = 24, 
  className = '', 
  onClick 
}: GoogleMaterialIconProps) {
  const icon = iconMap[name] || '❓';
  
  return (
    <span 
      className={`material-icons ${className}`}
      style={{ 
        fontSize: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
      {icon}
    </span>
  );
}

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export function LoadingSpinner({ size = 20, color = '#4285f4' }: LoadingSpinnerProps) {
  return (
    <div 
      className="loading-spinner"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: `2px solid ${color}20`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
  );
}

// Alternatively, if you prefer using actual Google Material Icons via CSS:
// Add this to your global CSS:
// @import url('https://fonts.googleapis.com/icon?family=Material+Icons');