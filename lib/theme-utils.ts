// Theme utility functions and constants for the Task Manager app

export const TECH_THEME = {
  colors: {
    bg: '#1A1A1A',
    'bg-secondary': '#2A2A2A',
    'bg-tertiary': '#333333',
    accent: '#4CC9F0',
    highlight: '#A29BFE',
    'text-primary': '#FFFFFF',
    'text-secondary': 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.15)',
    'border-light': 'rgba(255, 255, 255, 0.08)',
    glow: {
      cyan: 'rgba(76, 201, 240, 0.3)',
      violet: 'rgba(162, 155, 254, 0.5)',
    },
    status: {
      success: '#00D4AA',
      warning: '#FFB800',
      error: '#FF6B6B',
      info: '#4CC9F0',
    },
  },
  glassmorphism: {
    card: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.15)',
      blur: 'blur(20px)',
      shadow: '0 0 20px rgba(76, 201, 240, 0.3)',
    },
    panel: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.15)',
      blur: 'blur(20px)',
      shadow: '0 0 20px rgba(76, 201, 240, 0.3)',
    },
    button: {
      background: '#4CC9F0',
      text: '#FFFFFF',
      hoverGlow: 'rgba(162, 155, 254, 0.5)',
    },
  },
} as const;

export const getGlassmorphismStyles = (type: 'card' | 'panel' | 'button') => {
  switch (type) {
    case 'card':
    case 'panel':
      const base = TECH_THEME.glassmorphism[type];
      return {
        background: base.background,
        backdropFilter: base.blur,
        WebkitBackdropFilter: base.blur,
        border: `1px solid ${base.border}`,
        borderRadius: type === 'card' ? '20px' : '18px',
        boxShadow: type === 'card' 
          ? `0 4px 30px rgba(0, 0, 0, 0.3), ${base.shadow}`
          : `0 8px 32px rgba(0, 0, 0, 0.3), ${base.shadow}`,
        position: 'relative' as const,
        overflow: 'hidden',
      };
    case 'button':
      const buttonBase = TECH_THEME.glassmorphism.button;
      return {
        background: buttonBase.background,
        color: buttonBase.text,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${TECH_THEME.colors.accent}`,
        borderRadius: '16px',
        boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3), 0 0 15px ${TECH_THEME.colors.glow.cyan}`,
        transition: 'all 0.3s ease',
        position: 'relative' as const,
        overflow: 'hidden',
        fontWeight: 600,
        letterSpacing: '0.025em',
      };
    default:
      return {};
  }
};

export const getHoverStyles = (type: 'glow' | 'glow-violet' | 'scale') => {
  switch (type) {
    case 'glow':
      return {
        boxShadow: `0 0 25px ${TECH_THEME.colors.glow.cyan}`,
        transition: 'box-shadow 0.3s ease',
      };
    case 'glow-violet':
      return {
        boxShadow: `0 0 25px ${TECH_THEME.colors.glow.violet}`,
        transition: 'box-shadow 0.3s ease',
      };
    case 'scale':
      return {
        transform: 'translateY(-2px)',
        transition: 'transform 0.3s ease',
      };
    default:
      return {};
  }
};

export const getTextStyles = (
  type: 'primary' | 'secondary' | 'accent' | 'highlight'
) => {
  const colors = {
    primary: TECH_THEME.colors['text-primary'],
    secondary: TECH_THEME.colors['text-secondary'],
    accent: TECH_THEME.colors.accent,
    highlight: TECH_THEME.colors.highlight,
  };

  return {
    color: colors[type],
  };
};

export const getBackgroundStyles = (
  type: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'highlight'
) => {
  const colors = {
    primary: TECH_THEME.colors.bg,
    secondary: TECH_THEME.colors['bg-secondary'],
    tertiary: TECH_THEME.colors['bg-tertiary'],
    accent: TECH_THEME.colors.accent,
    highlight: TECH_THEME.colors.highlight,
  };

  return {
    backgroundColor: colors[type],
  };
};

export const getBorderStyles = (type: 'primary' | 'accent' | 'highlight') => {
  const colors = {
    primary: TECH_THEME.colors.border,
    accent: TECH_THEME.colors.accent,
    highlight: TECH_THEME.colors.highlight,
  };

  return {
    borderColor: colors[type],
  };
};

// CSS-in-JS helper for dynamic theme application
export const createThemeStyles = (component: string, variant?: string) => {
  const baseStyles = {
    card: getGlassmorphismStyles('card'),
    panel: getGlassmorphismStyles('panel'),
    button: getGlassmorphismStyles('button'),
  };

  if (variant === 'secondary' && component === 'button') {
    return {
      ...baseStyles.button,
      background: 'transparent',
      color: TECH_THEME.colors.accent,
      borderColor: TECH_THEME.colors.accent,
    };
  }

  return baseStyles[component as keyof typeof baseStyles] || {};
};

// Animation utilities
export const ANIMATIONS = {
  fadeIn: {
    animation: 'fadeIn 0.5s ease-in-out',
  },
  slideUp: {
    animation: 'slideUp 0.4s ease-out',
  },
  float: {
    animation: 'float 6s ease-in-out infinite',
  },
} as const;

// Status color utilities
export const getStatusColor = (
  status: 'success' | 'warning' | 'error' | 'info'
) => {
  return TECH_THEME.colors.status[status];
};

// Focus ring utility
export const getFocusRing = () => ({
  outline: `2px solid ${TECH_THEME.colors.accent}`,
  outlineOffset: '2px',
  boxShadow: `0 0 0 4px rgba(76, 201, 240, 0.1)`,
});

// Scrollbar styling
export const getScrollbarStyles = () => ({
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: TECH_THEME.colors['bg-secondary'],
  },
  '&::-webkit-scrollbar-thumb': {
    background: TECH_THEME.colors.accent,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: TECH_THEME.colors.highlight,
  },
});
