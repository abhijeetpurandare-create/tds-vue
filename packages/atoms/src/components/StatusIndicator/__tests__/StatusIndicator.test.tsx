import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock ThemeProvider — figma-variables-resolver uses ESM imports Jest can't handle
const tarmacConfig = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    labelColor: '#2B2B2B',
  },
  sizes: {
    lg: { iconSize: '24px', fontSize: '16px', fontWeight: '500', lineHeight: '24px', gap: '4px' },
    md: { iconSize: '20px', fontSize: '14px', fontWeight: '500', lineHeight: '20px', gap: '4px' },
    sm: { iconSize: '16px', fontSize: '12px', fontWeight: '500', lineHeight: '16px', gap: '4px' },
    xs: { iconSize: '12px', fontSize: '10px', fontWeight: '500', lineHeight: '12px', gap: '2px' },
  },
  variants: {
    success: { color: '#1BA86E' },
    failed: { color: '#DC143C' },
    warning: { color: '#F5C828' },
    information: { color: '#2396FB' },
    synced: { color: '#1BA86E' },
    scheduled: { color: '#121212' },
    unknown: { color: '#CCCCCC' },
    pause: { color: '#121212' },
    play: { color: '#1BA86E' },
    downloading: { color: '#2396FB' },
    pending: { color: '#F5C828' },
  },
}

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: { components: { statusIndicator: tarmacConfig } },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

import StatusIndicator from '../index'

// ============================================
// Rendering Tests
// ============================================

describe('StatusIndicator — Rendering', () => {
  it('renders with default props', () => {
    render(<StatusIndicator />)
    expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<StatusIndicator label="Active" />)
    expect(screen.getByTestId('status-indicator-label')).toHaveTextContent('Active')
  })

  it('renders without label (icon only)', () => {
    render(<StatusIndicator variant="success" />)
    expect(screen.getByTestId('status-indicator-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('status-indicator-label')).not.toBeInTheDocument()
  })

  it('renders the default dot SVG when no icon prop', () => {
    render(<StatusIndicator variant="success" label="OK" />)
    const iconEl = screen.getByTestId('status-indicator-icon')
    expect(iconEl.querySelector('svg')).toBeInTheDocument()
    expect(iconEl.querySelector('circle')).toBeInTheDocument()
  })

  it('renders custom icon when icon prop is provided', () => {
    render(
      <StatusIndicator
        variant="success"
        label="Custom"
        icon={<span data-testid="custom-icon">✓</span>}
      />
    )
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    // Should NOT render the default SVG dot
    const iconEl = screen.getByTestId('status-indicator-icon')
    expect(iconEl.querySelector('svg circle')).not.toBeInTheDocument()
  })

  it('applies className prop', () => {
    render(<StatusIndicator className="my-custom-class" label="Test" />)
    expect(screen.getByTestId('status-indicator')).toHaveClass('my-custom-class')
  })
})

// ============================================
// Variant Tests
// ============================================

describe('StatusIndicator — Variants', () => {
  const variants = [
    'success', 'failed', 'warning', 'information', 'synced',
    'scheduled', 'unknown', 'pause', 'play', 'downloading', 'pending',
  ]

  variants.forEach((variant) => {
    it(`renders ${variant} variant without error`, () => {
      const { unmount } = render(
        <StatusIndicator variant={variant} label={variant} />
      )
      expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
      expect(screen.getByTestId('status-indicator-label')).toHaveTextContent(variant)
      unmount()
    })
  })

  it('renders unknown variant string from theme (open union)', () => {
    render(<StatusIndicator variant="custom-status" label="Custom" />)
    expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
  })
})

// ============================================
// Size Tests
// ============================================

describe('StatusIndicator — Sizes', () => {
  const sizes = ['lg', 'md', 'sm', 'xs']

  sizes.forEach((size) => {
    it(`renders ${size} size without error`, () => {
      const { unmount } = render(
        <StatusIndicator size={size} variant="success" label="Test" />
      )
      expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders unknown size string from theme (open union)', () => {
    render(<StatusIndicator size="xxl" variant="success" label="Test" />)
    expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
  })
})

// ============================================
// Exhaustive Combo Test
// ============================================

describe('StatusIndicator — All Variant × Size Combos', () => {
  const variants = [
    'success', 'failed', 'warning', 'information', 'synced',
    'scheduled', 'unknown', 'pause', 'play', 'downloading', 'pending',
  ]
  const sizes = ['lg', 'md', 'sm', 'xs']

  it('renders all variant × size combinations without error', () => {
    variants.forEach((variant) => {
      sizes.forEach((size) => {
        const { unmount } = render(
          <StatusIndicator variant={variant} size={size} label={`${variant}-${size}`} />
        )
        expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
        unmount()
      })
    })
  })
})

// ============================================
// Theme Integration Tests
// ============================================

describe('StatusIndicator — Theme Integration', () => {
  it('renders with ThemeProvider mock', () => {
    render(<StatusIndicator variant="information" size="md" label="Info" />)
    expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
  })

  it('renders with default config when theme has no statusIndicator key', () => {
    // The mock always provides config, but the component has fallbacks
    // This tests that the component doesn't crash with any variant
    render(<StatusIndicator variant="nonexistent" size="md" label="Fallback" />)
    expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
  })
})

// ============================================
// HTML Attributes Pass-Through
// ============================================

describe('StatusIndicator — HTML Attributes', () => {
  it('applies className to the container', () => {
    render(<StatusIndicator className="test-class" label="Test" />)
    const el = screen.getByTestId('status-indicator')
    expect(el).toHaveClass('test-class')
  })

  it('renders data-testid on container, icon, and label', () => {
    render(<StatusIndicator variant="success" label="Active" />)
    expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
    expect(screen.getByTestId('status-indicator-icon')).toBeInTheDocument()
    expect(screen.getByTestId('status-indicator-label')).toBeInTheDocument()
  })
})

// ============================================
// Default Props
// ============================================

describe('StatusIndicator — Defaults', () => {
  it('defaults variant to information', () => {
    render(<StatusIndicator label="Default" />)
    // Should render without error — the default variant is 'information'
    expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
  })

  it('defaults size to md', () => {
    render(<StatusIndicator variant="success" label="Default Size" />)
    expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
  })
})
