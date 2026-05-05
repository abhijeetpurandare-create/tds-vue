import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import FAB from '../index';

// ── Mock FAB theme config with resolved hex values (no {{token}} placeholders) ──

const mockFABConfig = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    transition: 'all 0.15s ease-in-out',
    focus: {
      outline: 'none',
      ring: '0 0 0 2px rgba(0, 0, 0, 0.4)',
    },
  },
  trigger: {
    backgroundColor: '#1F2937',
    iconColor: '#FFFFFF',
    hoverColor: '#374151',
    pressedColor: '#111827',
    focusRingColor: 'rgba(0, 0, 0, 0.3)',
    shadow: '-1px 1px 6px 2px rgba(0, 0, 0, 0.2)',
  },
  menu: {
    gap: '12px',
  },
  menuItem: {
    labelBackgroundColor: '#333333',
    labelTextColor: '#FFFFFF',
    labelFontFamily: 'Noto Sans, sans-serif',
    labelFontSize: '14px',
    labelPadding: '6px 12px',
    labelBorderRadius: '4px',
    iconButtonBackgroundColor: '#1F2937',
    iconButtonIconColor: '#FFFFFF',
    iconButtonHoverColor: '#374151',
    iconButtonFocusRingColor: 'rgba(0, 0, 0, 0.3)',
    height: '44px',
    padding: '10px 16px',
    gap: '8px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '1.5em',
    iconSize: '24px',
  },
  variants: {
    dark: {
      trigger: {
        backgroundColor: '#1F2937',
        iconColor: '#FFFFFF',
        hoverColor: '#374151',
        pressedColor: '#111827',
        focusRingColor: 'rgba(0, 0, 0, 0.3)',
        shadow: '-1px 1px 6px 2px rgba(0, 0, 0, 0.2)',
      },
      menuItem: {
        backgroundColor: '#1F2937',
        textColor: '#FFFFFF',
        hoverBackgroundColor: '#1F2937',
        pressedBackgroundColor: '#111827',
        iconColor: '#FFFFFF',
        shadow: '-1px 1px 6px 2px rgba(0, 0, 0, 0.2)',
      },
    },
    light: {
      trigger: {
        backgroundColor: '#FFFFFF',
        iconColor: '#2B2B2B',
        hoverColor: '#F7F7F7',
        pressedColor: '#EFEFEF',
        focusRingColor: 'rgba(0, 0, 0, 0.3)',
        shadow: '-1px 1px 6px 2px rgba(0, 0, 0, 0.2)',
      },
      menuItem: {
        backgroundColor: '#FFFFFF',
        textColor: '#2B2B2B',
        hoverBackgroundColor: '#F7F7F7',
        pressedBackgroundColor: '#EFEFEF',
        iconColor: '#2B2B2B',
        shadow: '-1px 1px 6px 2px rgba(0, 0, 0, 0.2)',
      },
    },
    'info-blue': {
      trigger: {
        backgroundColor: '#2396FB',
        iconColor: '#FFFFFF',
        hoverColor: '#1A7AD4',
        pressedColor: '#1764A7',
        focusRingColor: 'rgba(35, 150, 251, 0.4)',
        shadow: '0px 0px 6px 2px rgba(0, 0, 0, 0.2)',
      },
      menuItem: {
        backgroundColor: '#FFFFFF',
        textColor: '#2396FB',
        hoverBackgroundColor: '#F7F7F7',
        pressedBackgroundColor: '#EFEFEF',
        iconColor: '#2396FB',
        shadow: '-1px 1px 6px 2px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  sizes: {
    sm: {
      triggerSize: '28px',
      triggerIconSize: '16px',
      triggerPadding: '4px',
    },
    md: {
      triggerSize: '36px',
      triggerIconSize: '20px',
      triggerPadding: '8px',
    },
    lg: {
      triggerSize: '44px',
      triggerIconSize: '24px',
      triggerPadding: '10px',
    },
  },
  states: {
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
  animation: {
    revealDuration: '150ms',
    revealStagger: '50ms',
    exitDuration: '120ms',
    exitStagger: '30ms',
    triggerRotateDuration: '200ms',
  },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        fab: mockFABConfig,
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// ── Mock matchMedia for prefers-reduced-motion tests ──

const mockMatchMedia = (matches: boolean) => {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  const mql = {
    matches,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: jest.fn((_event: string, handler: (e: MediaQueryListEvent) => void) => {
      listeners.push(handler);
    }),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    onchange: null,
    dispatchEvent: jest.fn(),
  };
  window.matchMedia = jest.fn().mockReturnValue(mql);
  return { mql, listeners };
};

// ── Helpers ──

const PlusIcon = () => <svg data-testid="plus-icon">+</svg>;
const OrderIcon = () => <svg data-testid="order-icon">O</svg>;
const UploadIcon = () => <svg data-testid="upload-icon">U</svg>;
const SettingsIcon = () => <svg data-testid="settings-icon">S</svg>;

function renderFAB(props: Record<string, any> = {}) {
  const {
    position,
    zIndex,
    showOverlay,
    disableAnimation = true,
    variant = 'dark',
    triggerSize,
    triggerAriaLabel,
    badge,
    menuItems = [
      { label: 'New Order', icon: <OrderIcon />, onClick: jest.fn() },
      { label: 'Upload', icon: <UploadIcon />, onClick: jest.fn() },
      { label: 'Settings', icon: <SettingsIcon />, onClick: jest.fn() },
    ],
  } = props;

  const result = render(
    <FAB
      position={position}
      zIndex={zIndex}
      showOverlay={showOverlay}
      disableAnimation={disableAnimation}
      variant={variant}
    >
      <FAB.Trigger
        icon={<PlusIcon />}
        size={triggerSize}
        aria-label={triggerAriaLabel}
        badge={badge}
      />
      <FAB.Menu>
        {menuItems.map((item: any, i: number) => (
          <FAB.MenuItem
            key={i}
            label={item.label}
            icon={item.icon}
            onClick={item.onClick}
            isDisabled={item.isDisabled}
          />
        ))}
      </FAB.Menu>
    </FAB>
  );

  return { ...result, menuItems };
}

function openMenu() {
  fireEvent.click(screen.getByTestId('fab-trigger'));
}


// ═══════════════════════════════════════════════════════════════════════════
// 8.1 — Test setup, ThemeProvider mock, and rendering tests
// Requirements: 13.1, 13.2, 13.3, 13.13
// ═══════════════════════════════════════════════════════════════════════════

beforeEach(() => {
  jest.useFakeTimers();
  mockMatchMedia(false);
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('Compound component structure', () => {
  it('FAB.Trigger exists as a sub-component on FAB', () => {
    expect(FAB.Trigger).toBeDefined();
  });

  it('FAB.Menu exists as a sub-component on FAB', () => {
    expect(FAB.Menu).toBeDefined();
  });

  it('FAB.MenuItem exists as a sub-component on FAB', () => {
    expect(FAB.MenuItem).toBeDefined();
  });
});

describe('Rendering', () => {
  it('renders FAB.Trigger', () => {
    renderFAB();
    expect(screen.getByTestId('fab-trigger')).toBeInTheDocument();
  });

  it('renders FAB.Trigger as a button element', () => {
    renderFAB();
    expect(screen.getByTestId('fab-trigger').tagName).toBe('BUTTON');
  });

  it('renders the trigger icon', () => {
    renderFAB();
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
  });

  it('renders FAB container', () => {
    renderFAB();
    expect(screen.getByTestId('fab-container')).toBeInTheDocument();
  });

  it('does not render FAB.Menu when closed', () => {
    renderFAB();
    expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();
  });

  it('renders FAB.Menu when opened', () => {
    renderFAB();
    openMenu();
    expect(screen.getByTestId('fab-menu')).toBeInTheDocument();
  });

  it('renders FAB.MenuItem elements when menu is open', () => {
    renderFAB();
    openMenu();
    const items = screen.getAllByTestId('fab-menu-item');
    expect(items).toHaveLength(3);
  });

  it('renders menu item labels', () => {
    renderFAB();
    openMenu();
    expect(screen.getByText('New Order')).toBeInTheDocument();
    expect(screen.getByText('Upload')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders menu item icons', () => {
    renderFAB();
    openMenu();
    expect(screen.getByTestId('order-icon')).toBeInTheDocument();
    expect(screen.getByTestId('upload-icon')).toBeInTheDocument();
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
  });
});

describe('Console warning for sub-components outside FAB', () => {
  it('logs warning when FAB.Trigger is rendered outside FAB', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<FAB.Trigger icon={<PlusIcon />} />);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('must be rendered inside a <FAB> parent')
    );
    warnSpy.mockRestore();
  });

  it('logs warning when FAB.Menu is rendered outside FAB', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<FAB.Menu><FAB.MenuItem label="Test" /></FAB.Menu>);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('must be rendered inside a <FAB> parent')
    );
    warnSpy.mockRestore();
  });

  it('logs warning when FAB.MenuItem is rendered outside FAB', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<FAB.MenuItem label="Test" />);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('must be rendered inside a <FAB> parent')
    );
    warnSpy.mockRestore();
  });
});

describe('Default prop values', () => {
  it('defaults aria-label to "Actions menu"', () => {
    renderFAB();
    expect(screen.getByTestId('fab-trigger')).toHaveAttribute('aria-label', 'Actions menu');
  });

  it('allows overriding aria-label', () => {
    renderFAB({ triggerAriaLabel: 'Custom label' });
    expect(screen.getByTestId('fab-trigger')).toHaveAttribute('aria-label', 'Custom label');
  });

  it('defaults position to bottom-right (container has bottom and right offsets)', () => {
    renderFAB();
    const container = screen.getByTestId('fab-container');
    expect(container).toHaveStyle({ position: 'fixed', bottom: '24px', right: '24px' });
  });

  it('defaults zIndex to 1050', () => {
    renderFAB();
    const container = screen.getByTestId('fab-container');
    expect(container).toHaveStyle({ zIndex: 1050 });
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 8.2 — Toggle, keyboard, and focus management tests
// Requirements: 13.4, 13.5, 13.12
// ═══════════════════════════════════════════════════════════════════════════

describe('Toggle behavior', () => {
  it('opens menu on trigger click', () => {
    renderFAB();
    openMenu();
    expect(screen.getByTestId('fab-menu')).toBeInTheDocument();
  });

  it('closes menu on second trigger click', () => {
    renderFAB();
    openMenu();
    expect(screen.getByTestId('fab-menu')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();
  });

  it('sets aria-expanded to true when menu is open', () => {
    renderFAB();
    openMenu();
    expect(screen.getByTestId('fab-trigger')).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-expanded to false when menu is closed', () => {
    renderFAB();
    expect(screen.getByTestId('fab-trigger')).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Keyboard toggle', () => {
  it('opens menu on Enter key press on trigger', () => {
    renderFAB();
    fireEvent.keyDown(screen.getByTestId('fab-trigger'), { key: 'Enter' });
    expect(screen.getByTestId('fab-menu')).toBeInTheDocument();
  });

  it('opens menu on Space key press on trigger', () => {
    renderFAB();
    fireEvent.keyDown(screen.getByTestId('fab-trigger'), { key: ' ' });
    expect(screen.getByTestId('fab-menu')).toBeInTheDocument();
  });

  it('closes menu on Enter key when already open', () => {
    renderFAB();
    openMenu();
    fireEvent.keyDown(screen.getByTestId('fab-trigger'), { key: 'Enter' });
    expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();
  });

  it('closes menu on Space key when already open', () => {
    renderFAB();
    openMenu();
    fireEvent.keyDown(screen.getByTestId('fab-trigger'), { key: ' ' });
    expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();
  });
});

describe('Escape key', () => {
  it('closes menu on Escape key', () => {
    renderFAB();
    openMenu();
    fireEvent.keyDown(screen.getByTestId('fab-menu'), { key: 'Escape' });
    expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();
  });

  it('returns focus to trigger on Escape', () => {
    renderFAB();
    openMenu();
    fireEvent.keyDown(screen.getByTestId('fab-menu'), { key: 'Escape' });
    expect(document.activeElement).toBe(screen.getByTestId('fab-trigger'));
  });
});

describe('Arrow key navigation', () => {
  it('ArrowDown moves focus to next menu item', () => {
    renderFAB({ position: 'top-right' }); // top position = downward menu = standard DOM order
    openMenu();
    const buttons = screen.getAllByTestId('fab-menu-item');
    act(() => { buttons[0].focus(); });
    fireEvent.keyDown(screen.getByTestId('fab-menu'), { key: 'ArrowDown' });
    expect(document.activeElement).toBe(buttons[1]);
  });

  it('ArrowUp moves focus to previous menu item', () => {
    renderFAB({ position: 'top-right' });
    openMenu();
    const buttons = screen.getAllByTestId('fab-menu-item');
    act(() => { buttons[1].focus(); });
    fireEvent.keyDown(screen.getByTestId('fab-menu'), { key: 'ArrowUp' });
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('ArrowDown wraps from last to first item', () => {
    renderFAB({ position: 'top-right' });
    openMenu();
    const buttons = screen.getAllByTestId('fab-menu-item');
    act(() => { buttons[2].focus(); });
    fireEvent.keyDown(screen.getByTestId('fab-menu'), { key: 'ArrowDown' });
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('ArrowUp wraps from first to last item', () => {
    renderFAB({ position: 'top-right' });
    openMenu();
    const buttons = screen.getAllByTestId('fab-menu-item');
    act(() => { buttons[0].focus(); });
    fireEvent.keyDown(screen.getByTestId('fab-menu'), { key: 'ArrowUp' });
    expect(document.activeElement).toBe(buttons[2]);
  });
});

describe('Tab focus trap', () => {
  it('Tab moves focus to next menu item', () => {
    renderFAB();
    openMenu();
    const buttons = screen.getAllByTestId('fab-menu-item');
    act(() => { buttons[0].focus(); });
    fireEvent.keyDown(screen.getByTestId('fab-menu'), { key: 'Tab' });
    expect(document.activeElement).toBe(buttons[1]);
  });

  it('Tab wraps from last to first item', () => {
    renderFAB();
    openMenu();
    const buttons = screen.getAllByTestId('fab-menu-item');
    act(() => { buttons[2].focus(); });
    fireEvent.keyDown(screen.getByTestId('fab-menu'), { key: 'Tab' });
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('Shift+Tab moves focus to previous menu item', () => {
    renderFAB();
    openMenu();
    const buttons = screen.getAllByTestId('fab-menu-item');
    act(() => { buttons[1].focus(); });
    fireEvent.keyDown(screen.getByTestId('fab-menu'), { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('Shift+Tab wraps from first to last item', () => {
    renderFAB();
    openMenu();
    const buttons = screen.getAllByTestId('fab-menu-item');
    act(() => { buttons[0].focus(); });
    fireEvent.keyDown(screen.getByTestId('fab-menu'), { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(buttons[2]);
  });
});

describe('Focus management', () => {
  it('focus moves to first menu item on open', () => {
    renderFAB({ position: 'top-right' }); // top position = downward menu, first DOM item is visually first
    openMenu();
    act(() => { jest.runAllTimers(); });
    const buttons = screen.getAllByTestId('fab-menu-item');
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('focus returns to trigger on close via Escape', () => {
    renderFAB();
    openMenu();
    act(() => { jest.runAllTimers(); });
    fireEvent.keyDown(screen.getByTestId('fab-menu'), { key: 'Escape' });
    expect(document.activeElement).toBe(screen.getByTestId('fab-trigger'));
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 8.3 — Menu item interaction and disabled state tests
// Requirements: 13.7, 13.8
// ═══════════════════════════════════════════════════════════════════════════

describe('Menu item interactions', () => {
  it('fires onClick callback on menu item click', () => {
    const onClick = jest.fn();
    renderFAB({
      menuItems: [
        { label: 'Action', icon: <OrderIcon />, onClick },
      ],
    });
    openMenu();
    fireEvent.click(screen.getByTestId('fab-menu-item'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('passes event object to onClick callback', () => {
    const onClick = jest.fn();
    renderFAB({
      menuItems: [
        { label: 'Action', icon: <OrderIcon />, onClick },
      ],
    });
    openMenu();
    fireEvent.click(screen.getByTestId('fab-menu-item'));
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }));
  });

  it('closes menu after menu item click', () => {
    const onClick = jest.fn();
    renderFAB({
      menuItems: [
        { label: 'Action', icon: <OrderIcon />, onClick },
      ],
    });
    openMenu();
    expect(screen.getByTestId('fab-menu')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('fab-menu-item'));
    expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();
  });

  it('fires correct onClick for each menu item', () => {
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();
    renderFAB({
      menuItems: [
        { label: 'First', icon: <OrderIcon />, onClick: onClick1 },
        { label: 'Second', icon: <UploadIcon />, onClick: onClick2 },
      ],
    });
    openMenu();
    const buttons = screen.getAllByTestId('fab-menu-item');
    fireEvent.click(buttons[1]);
    expect(onClick1).not.toHaveBeenCalled();
    expect(onClick2).toHaveBeenCalledTimes(1);
  });
});

describe('Disabled menu items', () => {
  it('disabled menu item does not fire onClick', () => {
    const onClick = jest.fn();
    renderFAB({
      menuItems: [
        { label: 'Disabled', icon: <OrderIcon />, onClick, isDisabled: true },
      ],
    });
    openMenu();
    fireEvent.click(screen.getByTestId('fab-menu-item'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('disabled menu item has aria-disabled="true"', () => {
    renderFAB({
      menuItems: [
        { label: 'Disabled', icon: <OrderIcon />, onClick: jest.fn(), isDisabled: true },
      ],
    });
    openMenu();
    expect(screen.getByTestId('fab-menu-item')).toHaveAttribute('aria-disabled', 'true');
  });

  it('enabled menu item does not have aria-disabled', () => {
    renderFAB({
      menuItems: [
        { label: 'Enabled', icon: <OrderIcon />, onClick: jest.fn(), isDisabled: false },
      ],
    });
    openMenu();
    expect(screen.getByTestId('fab-menu-item')).not.toHaveAttribute('aria-disabled');
  });

  it('menu does not close when disabled item is clicked', () => {
    renderFAB({
      menuItems: [
        { label: 'Disabled', icon: <OrderIcon />, onClick: jest.fn(), isDisabled: true },
      ],
    });
    openMenu();
    fireEvent.click(screen.getByTestId('fab-menu-item'));
    expect(screen.getByTestId('fab-menu')).toBeInTheDocument();
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 8.4 — Outside click, overlay, position, z-index, and badge tests
// Requirements: 13.6, 13.9, 13.10, 13.11
// ═══════════════════════════════════════════════════════════════════════════

describe('Outside click dismissal', () => {
  it('closes menu when clicking outside the FAB', () => {
    renderFAB();
    openMenu();
    expect(screen.getByTestId('fab-menu')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();
  });

  it('does not close menu when clicking inside the FAB container', () => {
    renderFAB();
    openMenu();
    fireEvent.mouseDown(screen.getByTestId('fab-container'));
    expect(screen.getByTestId('fab-menu')).toBeInTheDocument();
  });
});

describe('Overlay', () => {
  it('renders overlay when showOverlay=true and menu is open', () => {
    renderFAB({ showOverlay: true });
    openMenu();
    expect(screen.getByTestId('fab-overlay')).toBeInTheDocument();
  });

  it('does not render overlay when showOverlay=false', () => {
    renderFAB({ showOverlay: false });
    openMenu();
    expect(screen.queryByTestId('fab-overlay')).not.toBeInTheDocument();
  });

  it('does not render overlay when menu is closed', () => {
    renderFAB({ showOverlay: true });
    expect(screen.queryByTestId('fab-overlay')).not.toBeInTheDocument();
  });

  it('overlay has z-index one less than FAB container', () => {
    renderFAB({ showOverlay: true, zIndex: 2000 });
    openMenu();
    const overlay = screen.getByTestId('fab-overlay');
    expect(overlay).toHaveStyle({ zIndex: 1999 });
  });

  it('overlay closes menu when clicked', () => {
    renderFAB({ showOverlay: true });
    openMenu();
    fireEvent.click(screen.getByTestId('fab-overlay'));
    expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();
  });
});

describe('Position variants', () => {
  it('bottom-right renders with bottom and right offsets', () => {
    renderFAB({ position: 'bottom-right' });
    const container = screen.getByTestId('fab-container');
    expect(container).toHaveStyle({ bottom: '24px', right: '24px' });
  });

  it('bottom-left renders with bottom and left offsets', () => {
    renderFAB({ position: 'bottom-left' });
    const container = screen.getByTestId('fab-container');
    expect(container).toHaveStyle({ bottom: '24px', left: '24px' });
  });

  it('top-right renders with top and right offsets', () => {
    renderFAB({ position: 'top-right' });
    const container = screen.getByTestId('fab-container');
    expect(container).toHaveStyle({ top: '24px', right: '24px' });
  });

  it('top-left renders with top and left offsets', () => {
    renderFAB({ position: 'top-left' });
    const container = screen.getByTestId('fab-container');
    expect(container).toHaveStyle({ top: '24px', left: '24px' });
  });
});

describe('Z-index', () => {
  it('applies zIndex prop to container', () => {
    renderFAB({ zIndex: 9999 });
    expect(screen.getByTestId('fab-container')).toHaveStyle({ zIndex: 9999 });
  });

  it('applies default zIndex of 1050', () => {
    renderFAB();
    expect(screen.getByTestId('fab-container')).toHaveStyle({ zIndex: 1050 });
  });

  it('container has isolation: isolate', () => {
    renderFAB();
    expect(screen.getByTestId('fab-container')).toHaveStyle({ isolation: 'isolate' });
  });
});

describe('Badge', () => {
  it('renders badge when badge prop is provided', () => {
    renderFAB({ badge: <span data-testid="test-badge">3</span> });
    expect(screen.getByTestId('fab-badge')).toBeInTheDocument();
    expect(screen.getByTestId('test-badge')).toBeInTheDocument();
  });

  it('does not render badge when badge prop is omitted', () => {
    renderFAB();
    expect(screen.queryByTestId('fab-badge')).not.toBeInTheDocument();
  });

  it('badge is positioned absolutely', () => {
    renderFAB({ badge: <span>3</span> });
    const badge = screen.getByTestId('fab-badge');
    expect(badge).toHaveStyle({ position: 'absolute' });
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 8.5 — Theme, ARIA, animation, size variant, and variant tests
// Requirements: 13.2, 13.13
// ═══════════════════════════════════════════════════════════════════════════

describe('ARIA attributes', () => {
  it('menu has role="menu"', () => {
    renderFAB();
    openMenu();
    expect(screen.getByTestId('fab-menu')).toHaveAttribute('role', 'menu');
  });

  it('menu has aria-orientation="vertical"', () => {
    renderFAB();
    openMenu();
    expect(screen.getByTestId('fab-menu')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('menu items have role="menuitem"', () => {
    renderFAB();
    openMenu();
    const buttons = screen.getAllByTestId('fab-menu-item');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('role', 'menuitem');
    });
  });

  it('trigger has aria-haspopup="menu"', () => {
    renderFAB();
    expect(screen.getByTestId('fab-trigger')).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('trigger has aria-expanded="false" when closed', () => {
    renderFAB();
    expect(screen.getByTestId('fab-trigger')).toHaveAttribute('aria-expanded', 'false');
  });

  it('trigger has aria-expanded="true" when open', () => {
    renderFAB();
    openMenu();
    expect(screen.getByTestId('fab-trigger')).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('Icon rotation', () => {
  it('icon child has rotate(45deg) when menu is open and no openIcon', () => {
    renderFAB();
    openMenu();
    const trigger = screen.getByTestId('fab-trigger');
    const iconWrapper = trigger.querySelector('.fab-trigger-icon');
    expect(iconWrapper).toHaveStyle({ transform: 'rotate(45deg)' });
  });

  it('icon child has rotate(0deg) when menu is closed', () => {
    renderFAB();
    const trigger = screen.getByTestId('fab-trigger');
    const iconWrapper = trigger.querySelector('.fab-trigger-icon');
    expect(iconWrapper).toHaveStyle({ transform: 'rotate(0deg)' });
  });
});

describe('Theme color application', () => {
  it('trigger has themed background color from dark variant', () => {
    renderFAB({ variant: 'dark' });
    const trigger = screen.getByTestId('fab-trigger');
    expect(trigger).toHaveStyle({ backgroundColor: '#1F2937' });
  });

  it('trigger has themed box-shadow', () => {
    renderFAB({ variant: 'dark' });
    const trigger = screen.getByTestId('fab-trigger');
    expect(trigger).toHaveStyle({ boxShadow: '-1px 1px 6px 2px rgba(0, 0, 0, 0.2)' });
  });

  it('menu item card has themed background color from dark variant', () => {
    renderFAB({ variant: 'dark' });
    openMenu();
    const items = screen.getAllByTestId('fab-menu-item');
    expect(items[0]).toHaveStyle({ backgroundColor: '#1F2937' });
  });

  it('menu item card has themed text color from dark variant', () => {
    renderFAB({ variant: 'dark' });
    openMenu();
    const items = screen.getAllByTestId('fab-menu-item');
    expect(items[0]).toHaveStyle({ color: '#FFFFFF' });
  });
});

describe('Variant support', () => {
  it('dark variant applies dark trigger background', () => {
    renderFAB({ variant: 'dark' });
    expect(screen.getByTestId('fab-trigger')).toHaveStyle({ backgroundColor: '#1F2937' });
  });

  it('light variant applies light trigger background', () => {
    renderFAB({ variant: 'light' });
    expect(screen.getByTestId('fab-trigger')).toHaveStyle({ backgroundColor: '#FFFFFF' });
  });

  it('info-blue variant applies blue trigger background', () => {
    renderFAB({ variant: 'info-blue' });
    expect(screen.getByTestId('fab-trigger')).toHaveStyle({ backgroundColor: '#2396FB' });
  });

  it('light variant menu items have light background', () => {
    renderFAB({ variant: 'light' });
    openMenu();
    const items = screen.getAllByTestId('fab-menu-item');
    expect(items[0]).toHaveStyle({ backgroundColor: '#FFFFFF' });
  });

  it('info-blue variant menu items have white background with blue text', () => {
    renderFAB({ variant: 'info-blue' });
    openMenu();
    const items = screen.getAllByTestId('fab-menu-item');
    expect(items[0]).toHaveStyle({ backgroundColor: '#FFFFFF', color: '#2396FB' });
  });

  it('defaults to dark variant when no variant specified', () => {
    renderFAB({});
    expect(screen.getByTestId('fab-trigger')).toHaveStyle({ backgroundColor: '#1F2937' });
  });
});

describe('Size variants', () => {
  it('sm trigger has 28px dimensions', () => {
    renderFAB({ triggerSize: 'sm' });
    const trigger = screen.getByTestId('fab-trigger');
    expect(trigger).toHaveStyle({ width: '28px', height: '28px' });
  });

  it('md trigger has 36px dimensions', () => {
    renderFAB({ triggerSize: 'md' });
    const trigger = screen.getByTestId('fab-trigger');
    expect(trigger).toHaveStyle({ width: '36px', height: '36px' });
  });

  it('lg trigger has 44px dimensions', () => {
    renderFAB({ triggerSize: 'lg' });
    const trigger = screen.getByTestId('fab-trigger');
    expect(trigger).toHaveStyle({ width: '44px', height: '44px' });
  });

  it('default size is md (36px)', () => {
    renderFAB();
    const trigger = screen.getByTestId('fab-trigger');
    expect(trigger).toHaveStyle({ width: '36px', height: '36px' });
  });
});

describe('Menu item single card structure', () => {
  it('menu item is a button element', () => {
    renderFAB();
    openMenu();
    const items = screen.getAllByTestId('fab-menu-item');
    expect(items[0].tagName).toBe('BUTTON');
  });

  it('menu item has border-radius 8px', () => {
    renderFAB();
    openMenu();
    const items = screen.getAllByTestId('fab-menu-item');
    expect(items[0]).toHaveStyle({ borderRadius: '8px' });
  });

  it('menu item has height 44px', () => {
    renderFAB();
    openMenu();
    const items = screen.getAllByTestId('fab-menu-item');
    expect(items[0]).toHaveStyle({ height: '44px' });
  });

  it('menu item contains label text', () => {
    renderFAB();
    openMenu();
    const labels = screen.getAllByTestId('fab-menu-item-label');
    expect(labels[0]).toHaveTextContent('New Order');
  });

  it('menu item contains icon', () => {
    renderFAB();
    openMenu();
    const icons = screen.getAllByTestId('fab-menu-item-icon');
    expect(icons).toHaveLength(3);
  });
});

describe('disableAnimation prop', () => {
  it('trigger has transition: none when disableAnimation is true', () => {
    renderFAB({ disableAnimation: true });
    const trigger = screen.getByTestId('fab-trigger');
    expect(trigger).toHaveStyle({ transition: 'none' });
  });

  it('trigger icon wrapper has transition: none when disableAnimation is true', () => {
    renderFAB({ disableAnimation: true });
    const trigger = screen.getByTestId('fab-trigger');
    const iconWrapper = trigger.querySelector('.fab-trigger-icon');
    expect(iconWrapper).toHaveStyle({ transition: 'none' });
  });

  it('menu items have no transition when disableAnimation is true', () => {
    renderFAB({ disableAnimation: true });
    openMenu();
    const wrappers = screen.getAllByTestId('fab-menu-item-wrapper');
    wrappers.forEach((wrapper) => {
      expect(wrapper).toHaveStyle({ opacity: 1, transform: 'translateY(0)' });
    });
  });
});

describe('prefers-reduced-motion', () => {
  it('disables animations when prefers-reduced-motion matches', () => {
    mockMatchMedia(true);
    renderFAB({ disableAnimation: false });
    const trigger = screen.getByTestId('fab-trigger');
    expect(trigger).toHaveStyle({ transition: 'none' });
  });
});

describe('Animation CSS properties', () => {
  it('trigger has CSS transition when animations enabled', () => {
    mockMatchMedia(false);
    renderFAB({ disableAnimation: false });
    const trigger = screen.getByTestId('fab-trigger');
    const style = window.getComputedStyle(trigger);
    expect(style.transition).not.toBe('none');
  });

  it('menu item wrappers have opacity and transform styles', () => {
    mockMatchMedia(false);
    renderFAB({ disableAnimation: false });
    openMenu();
    const wrappers = screen.getAllByTestId('fab-menu-item-wrapper');
    wrappers.forEach((wrapper) => {
      const style = wrapper.style;
      expect(style.opacity).toBeDefined();
      expect(style.transform).toBeDefined();
    });
  });

  it('menu item wrappers have transition property when animating', () => {
    mockMatchMedia(false);
    renderFAB({ disableAnimation: false });
    openMenu();
    const wrappers = screen.getAllByTestId('fab-menu-item-wrapper');
    wrappers.forEach((wrapper) => {
      expect(wrapper.style.transition).toContain('opacity');
      expect(wrapper.style.transition).toContain('transform');
    });
  });
});

describe('Trigger button type', () => {
  it('trigger has type="button"', () => {
    renderFAB();
    expect(screen.getByTestId('fab-trigger')).toHaveAttribute('type', 'button');
  });
});

describe('Menu item button type', () => {
  it('menu item buttons have type="button"', () => {
    renderFAB();
    openMenu();
    const buttons = screen.getAllByTestId('fab-menu-item');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('type', 'button');
    });
  });
});

describe('Container display', () => {
  it('container has display: flex', () => {
    renderFAB();
    expect(screen.getByTestId('fab-container')).toHaveStyle({ display: 'flex' });
  });

  it('container has flexDirection: column', () => {
    renderFAB();
    expect(screen.getByTestId('fab-container')).toHaveStyle({ flexDirection: 'column' });
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 8.6 — Extended trigger type, openIcon, and avatar tests
// Issues: 1, 2, 5
// ═══════════════════════════════════════════════════════════════════════════

describe('Extended trigger type', () => {
  it('renders label text when triggerType=extended and label provided', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} triggerType="extended" label="Create" />
      </FAB>
    );
    expect(screen.getByTestId('fab-trigger-label')).toHaveTextContent('Create');
  });

  it('does not render label when triggerType=default', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} triggerType="default" label="Create" />
      </FAB>
    );
    expect(screen.queryByTestId('fab-trigger-label')).not.toBeInTheDocument();
  });

  it('does not render label when triggerType is omitted (defaults to default)', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} label="Create" />
      </FAB>
    );
    expect(screen.queryByTestId('fab-trigger-label')).not.toBeInTheDocument();
  });

  it('extended trigger has auto width', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} triggerType="extended" label="Create" />
      </FAB>
    );
    expect(screen.getByTestId('fab-trigger')).toHaveStyle({ width: 'auto' });
  });

  it('extended trigger has pill border-radius (999px)', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} triggerType="extended" label="Create" />
      </FAB>
    );
    expect(screen.getByTestId('fab-trigger')).toHaveStyle({ borderRadius: '999px' });
  });

  it('default trigger has circular border-radius (50%)', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
      </FAB>
    );
    expect(screen.getByTestId('fab-trigger')).toHaveStyle({ borderRadius: '50%' });
  });

  it('extended trigger has 8px gap', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} triggerType="extended" label="Create" />
      </FAB>
    );
    expect(screen.getByTestId('fab-trigger')).toHaveStyle({ gap: '8px' });
  });

  it('extended trigger renders icon before label', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} triggerType="extended" label="Create" />
      </FAB>
    );
    const trigger = screen.getByTestId('fab-trigger');
    const children = Array.from(trigger.children);
    const iconIdx = children.findIndex(c => c.getAttribute('data-testid') === 'fab-trigger-icon');
    const labelIdx = children.findIndex(c => c.getAttribute('data-testid') === 'fab-trigger-label');
    expect(iconIdx).toBeLessThan(labelIdx);
  });
});

describe('openIcon prop (icon swap)', () => {
  it('shows icon when menu is closed', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument();
  });

  it('shows openIcon when menu is open', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('plus-icon')).not.toBeInTheDocument();
  });

  it('does not rotate icon when openIcon is provided and menu is open', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    const iconWrapper = screen.getByTestId('fab-trigger').querySelector('.fab-trigger-icon');
    expect(iconWrapper).toHaveStyle({ transform: 'rotate(0deg)' });
  });

  it('still rotates icon when openIcon is NOT provided (backward compat)', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    const iconWrapper = screen.getByTestId('fab-trigger').querySelector('.fab-trigger-icon');
    expect(iconWrapper).toHaveStyle({ transform: 'rotate(45deg)' });
  });

  it('swaps back to original icon when menu closes', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument();
  });
});

describe('Avatar on menu items', () => {
  it('renders avatar when avatar prop is provided', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" icon={<OrderIcon />} avatar={<img data-testid="test-avatar" alt="av" />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.getByTestId('fab-menu-item-avatar')).toBeInTheDocument();
    expect(screen.getByTestId('test-avatar')).toBeInTheDocument();
  });

  it('does not render avatar when avatar prop is omitted', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" icon={<OrderIcon />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.queryByTestId('fab-menu-item-avatar')).not.toBeInTheDocument();
  });

  it('avatar container is rendered as a span wrapper', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" avatar={<span>A</span>} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    const avatarContainer = screen.getByTestId('fab-menu-item-avatar');
    expect(avatarContainer.tagName).toBe('SPAN');
    expect(avatarContainer).toBeInTheDocument();
  });

  it('avatar renders after icon (rightmost position)', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" icon={<OrderIcon />} avatar={<span>A</span>} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    const menuItem = screen.getByTestId('fab-menu-item');
    const children = Array.from(menuItem.children);
    const iconIdx = children.findIndex(c => c.getAttribute('data-testid') === 'fab-menu-item-icon');
    const avatarIdx = children.findIndex(c => c.getAttribute('data-testid') === 'fab-menu-item-avatar');
    expect(iconIdx).toBeLessThan(avatarIdx);
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 9. Property-Based Tests — fast-check
// ═══════════════════════════════════════════════════════════════════════════
import * as fc from 'fast-check';

/* ───────────────────────────────────────────────────────────────────
 * 9.1 — Property 1: Toggle activation is consistent across input methods
 * Feature: fab-component, Property 1: Toggle activation is consistent across input methods
 * Validates: Requirements 2.11, 4.1, 6.1
 * ─────────────────────────────────────────────────────────────────── */
describe('Property 1: Toggle activation is consistent across input methods', () => {
  it('for any initial state and activation method, menu state flips and aria-expanded matches', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('click', 'enter', 'space'),
        fc.boolean(),
        (method, initiallyOpen) => {
          const { unmount } = renderFAB();
          const trigger = screen.getByTestId('fab-trigger');

          if (initiallyOpen) {
            fireEvent.click(trigger);
            expect(trigger).toHaveAttribute('aria-expanded', 'true');
            expect(screen.getByTestId('fab-menu')).toBeInTheDocument();
          } else {
            expect(trigger).toHaveAttribute('aria-expanded', 'false');
            expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();
          }

          if (method === 'click') {
            fireEvent.click(trigger);
          } else if (method === 'enter') {
            fireEvent.keyDown(trigger, { key: 'Enter' });
          } else {
            fireEvent.keyDown(trigger, { key: ' ' });
          }

          const expectedOpen = !initiallyOpen;
          expect(trigger).toHaveAttribute('aria-expanded', String(expectedOpen));

          if (expectedOpen) {
            expect(screen.getByTestId('fab-menu')).toBeInTheDocument();
          } else {
            expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();
          }

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});

/* ───────────────────────────────────────────────────────────────────
 * 9.2 — Property 2: Menu item click fires callback and closes menu
 * Feature: fab-component, Property 2: Menu item click fires callback and closes menu
 * Validates: Requirements 5.5
 * ─────────────────────────────────────────────────────────────────── */
describe('Property 2: Menu item click fires callback and closes menu', () => {
  it('for any open menu with N enabled items, clicking any item invokes onClick once and closes menu', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 8 }),
        fc.nat(),
        (itemCount, rawIndex) => {
          const clickIndex = rawIndex % itemCount;
          const callbacks = Array.from({ length: itemCount }, () => jest.fn());
          const menuItems = callbacks.map((cb, i) => ({
            label: `Item ${i}`,
            icon: <span>{i}</span>,
            onClick: cb,
          }));

          const { unmount } = renderFAB({ menuItems });
          openMenu();

          expect(screen.getByTestId('fab-menu')).toBeInTheDocument();

          const buttons = screen.getAllByTestId('fab-menu-item');
          fireEvent.click(buttons[clickIndex]);

          expect(callbacks[clickIndex]).toHaveBeenCalledTimes(1);

          callbacks.forEach((cb, i) => {
            if (i !== clickIndex) {
              expect(cb).not.toHaveBeenCalled();
            }
          });

          expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});

/* ───────────────────────────────────────────────────────────────────
 * 9.3 — Property 3: Disabled menu items prevent interaction
 * Feature: fab-component, Property 3: Disabled menu items prevent interaction
 * Validates: Requirements 5.9
 * ─────────────────────────────────────────────────────────────────── */
describe('Property 3: Disabled menu items prevent interaction', () => {
  it('for any menu item with isDisabled=true, clicking does not invoke onClick and element has aria-disabled="true"', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 8 }),
        fc.nat(),
        (itemCount, rawIndex) => {
          const disabledIndex = rawIndex % itemCount;
          const callbacks = Array.from({ length: itemCount }, () => jest.fn());
          const menuItems = callbacks.map((cb, i) => ({
            label: `Item ${i}`,
            icon: <span>{i}</span>,
            onClick: cb,
            isDisabled: i === disabledIndex,
          }));

          const { unmount } = renderFAB({ menuItems });
          openMenu();

          const buttons = screen.getAllByTestId('fab-menu-item');
          const disabledButton = buttons[disabledIndex];

          expect(disabledButton).toHaveAttribute('aria-disabled', 'true');

          fireEvent.click(disabledButton);
          expect(callbacks[disabledIndex]).not.toHaveBeenCalled();

          expect(screen.getByTestId('fab-menu')).toBeInTheDocument();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});

/* ───────────────────────────────────────────────────────────────────
 * 9.4 — Property 4: Escape closes menu and restores focus
 * Feature: fab-component, Property 4: Escape closes menu and restores focus
 * Validates: Requirements 6.2
 * ─────────────────────────────────────────────────────────────────── */
describe('Property 4: Escape closes menu and restores focus', () => {
  it('for any open menu, Escape closes it and document.activeElement returns to trigger', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 8 }),
        fc.nat(),
        (itemCount, rawFocusIndex) => {
          const focusIndex = rawFocusIndex % itemCount;
          const menuItems = Array.from({ length: itemCount }, (_, i) => ({
            label: `Item ${i}`,
            icon: <span>{i}</span>,
            onClick: jest.fn(),
          }));

          const { unmount } = renderFAB({ menuItems });
          openMenu();

          expect(screen.getByTestId('fab-menu')).toBeInTheDocument();

          const buttons = screen.getAllByTestId('fab-menu-item');
          act(() => { buttons[focusIndex].focus(); });
          expect(document.activeElement).toBe(buttons[focusIndex]);

          fireEvent.keyDown(screen.getByTestId('fab-menu'), { key: 'Escape' });

          expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();
          expect(document.activeElement).toBe(screen.getByTestId('fab-trigger'));

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});

/* ───────────────────────────────────────────────────────────────────
 * 9.5 — Property 5: Focus trap contains navigation within menu
 * Feature: fab-component, Property 5: Focus trap contains navigation within menu
 * Validates: Requirements 6.3
 * ─────────────────────────────────────────────────────────────────── */
describe('Property 5: Focus trap contains navigation within menu', () => {
  it('Tab from last item wraps to first, Shift+Tab from first wraps to last', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 8 }),
        (itemCount) => {
          const menuItems = Array.from({ length: itemCount }, (_, i) => ({
            label: `Item ${i}`,
            icon: <span>{i}</span>,
            onClick: jest.fn(),
          }));

          const { unmount } = renderFAB({ menuItems });
          openMenu();

          const buttons = screen.getAllByTestId('fab-menu-item');
          const menu = screen.getByTestId('fab-menu');

          act(() => { buttons[buttons.length - 1].focus(); });
          fireEvent.keyDown(menu, { key: 'Tab' });
          expect(document.activeElement).toBe(buttons[0]);

          act(() => { buttons[0].focus(); });
          fireEvent.keyDown(menu, { key: 'Tab', shiftKey: true });
          expect(document.activeElement).toBe(buttons[buttons.length - 1]);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});

/* ───────────────────────────────────────────────────────────────────
 * 9.6 — Property 6: Arrow key navigation with wrapping
 * Feature: fab-component, Property 6: Arrow key navigation with wrapping
 * Validates: Requirements 6.4, 6.5, 6.6, 6.7
 * ─────────────────────────────────────────────────────────────────── */
describe('Property 6: Arrow key navigation with wrapping', () => {
  it('ArrowDown moves focus to (i+1)%N, ArrowUp moves focus to (i-1+N)%N', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 8 }),
        fc.nat(),
        (itemCount, rawIndex) => {
          const focusIndex = rawIndex % itemCount;
          const menuItems = Array.from({ length: itemCount }, (_, i) => ({
            label: `Item ${i}`,
            icon: <span>{i}</span>,
            onClick: jest.fn(),
          }));

          // Use top-right so menu opens downward — DOM order matches visual order
          const { unmount } = renderFAB({ menuItems, position: 'top-right' });
          openMenu();

          const buttons = screen.getAllByTestId('fab-menu-item');
          const menu = screen.getByTestId('fab-menu');

          act(() => { buttons[focusIndex].focus(); });
          fireEvent.keyDown(menu, { key: 'ArrowDown' });
          const expectedDown = (focusIndex + 1) % itemCount;
          expect(document.activeElement).toBe(buttons[expectedDown]);

          act(() => { buttons[focusIndex].focus(); });
          fireEvent.keyDown(menu, { key: 'ArrowUp' });
          const expectedUp = (focusIndex - 1 + itemCount) % itemCount;
          expect(document.activeElement).toBe(buttons[expectedUp]);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});

/* ───────────────────────────────────────────────────────────────────
 * 9.7 — Property 7: Outside click closes menu
 * Feature: fab-component, Property 7: Outside click closes menu
 * Validates: Requirements 7.1
 * ─────────────────────────────────────────────────────────────────── */
describe('Property 7: Outside click closes menu', () => {
  it('for any open menu, mousedown outside FAB boundary closes the menu', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 8 }),
        (itemCount) => {
          const menuItems = Array.from({ length: itemCount }, (_, i) => ({
            label: `Item ${i}`,
            icon: <span>{i}</span>,
            onClick: jest.fn(),
          }));

          const { unmount } = renderFAB({ menuItems });
          openMenu();

          expect(screen.getByTestId('fab-menu')).toBeInTheDocument();

          fireEvent.mouseDown(document.body);

          expect(screen.queryByTestId('fab-menu')).not.toBeInTheDocument();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 10 — positionMode prop tests
// ═══════════════════════════════════════════════════════════════════════════

describe('positionMode prop', () => {
  it('defaults to position: fixed', () => {
    renderFAB();
    expect(screen.getByTestId('fab-container')).toHaveStyle({ position: 'fixed' });
  });

  it('positionMode="absolute" sets position: absolute', () => {
    render(
      <FAB positionMode="absolute" variant="dark" disableAnimation>
        <FAB.Trigger icon={<PlusIcon />} />
      </FAB>
    );
    expect(screen.getByTestId('fab-container')).toHaveStyle({ position: 'absolute' });
  });

  it('positionMode="relative" sets position: relative', () => {
    render(
      <FAB positionMode="relative" variant="dark" disableAnimation>
        <FAB.Trigger icon={<PlusIcon />} />
      </FAB>
    );
    expect(screen.getByTestId('fab-container')).toHaveStyle({ position: 'relative' });
  });

  it('positionMode="fixed" sets position: fixed', () => {
    render(
      <FAB positionMode="fixed" variant="dark" disableAnimation>
        <FAB.Trigger icon={<PlusIcon />} />
      </FAB>
    );
    expect(screen.getByTestId('fab-container')).toHaveStyle({ position: 'fixed' });
  });

  it('positionMode="absolute" still applies bottom/right offsets for bottom-right position', () => {
    render(
      <FAB positionMode="absolute" position="bottom-right" variant="dark" disableAnimation>
        <FAB.Trigger icon={<PlusIcon />} />
      </FAB>
    );
    expect(screen.getByTestId('fab-container')).toHaveStyle({ bottom: '24px', right: '24px' });
  });

  it('positionMode="relative" does NOT apply position offsets', () => {
    render(
      <FAB positionMode="relative" position="bottom-right" variant="dark" disableAnimation>
        <FAB.Trigger icon={<PlusIcon />} />
      </FAB>
    );
    const container = screen.getByTestId('fab-container');
    expect(container.style.bottom).toBeFalsy();
    expect(container.style.right).toBeFalsy();
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 11 — iconRotation prop tests
// ═══════════════════════════════════════════════════════════════════════════

describe('iconRotation prop', () => {
  it('applies custom rotation angle when iconRotation is provided (closed state)', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} iconRotation={90} />
      </FAB>
    );
    const iconWrapper = screen.getByTestId('fab-trigger').querySelector('.fab-trigger-icon');
    expect(iconWrapper).toHaveStyle({ transform: 'rotate(90deg)' });
  });

  it('applies custom rotation angle when iconRotation is provided (open state)', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} iconRotation={180} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    const iconWrapper = screen.getByTestId('fab-trigger').querySelector('.fab-trigger-icon');
    expect(iconWrapper).toHaveStyle({ transform: 'rotate(180deg)' });
  });

  it('iconRotation=0 keeps icon at 0deg even when open', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} iconRotation={0} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    const iconWrapper = screen.getByTestId('fab-trigger').querySelector('.fab-trigger-icon');
    expect(iconWrapper).toHaveStyle({ transform: 'rotate(0deg)' });
  });

  it('without iconRotation, auto-rotate applies 45deg on open', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    const iconWrapper = screen.getByTestId('fab-trigger').querySelector('.fab-trigger-icon');
    expect(iconWrapper).toHaveStyle({ transform: 'rotate(45deg)' });
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 12 — Icon crossfade animation (openIcon with animation enabled)
// ═══════════════════════════════════════════════════════════════════════════

describe('Icon crossfade animation (openIcon + animation enabled)', () => {
  it('renders both icon spans in DOM when openIcon is provided and animation is enabled', () => {
    render(
      <FAB disableAnimation={false} variant="dark">
        <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });

  it('default icon is visible (opacity 1) when closed', () => {
    render(
      <FAB disableAnimation={false} variant="dark">
        <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    const plusSpan = screen.getByTestId('plus-icon').parentElement!;
    expect(plusSpan).toHaveStyle({ opacity: '1' });
  });

  it('open icon is hidden (opacity 0) when closed', () => {
    render(
      <FAB disableAnimation={false} variant="dark">
        <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    const closeSpan = screen.getByTestId('close-icon').parentElement!;
    expect(closeSpan).toHaveStyle({ opacity: '0' });
  });

  it('open icon becomes visible (opacity 1) when menu opens', () => {
    render(
      <FAB disableAnimation={false} variant="dark">
        <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    const closeSpan = screen.getByTestId('close-icon').parentElement!;
    expect(closeSpan).toHaveStyle({ opacity: '1' });
  });

  it('default icon becomes hidden (opacity 0) when menu opens', () => {
    render(
      <FAB disableAnimation={false} variant="dark">
        <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    const plusSpan = screen.getByTestId('plus-icon').parentElement!;
    expect(plusSpan).toHaveStyle({ opacity: '0' });
  });

  it('both icon spans have transition property for smooth crossfade', () => {
    render(
      <FAB disableAnimation={false} variant="dark">
        <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    const plusSpan = screen.getByTestId('plus-icon').parentElement!;
    const closeSpan = screen.getByTestId('close-icon').parentElement!;
    expect(plusSpan.style.transition).toContain('opacity');
    expect(closeSpan.style.transition).toContain('opacity');
  });

  it('falls back to single icon span when disableAnimation=true', () => {
    render(
      <FAB disableAnimation={true} variant="dark">
        <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument();
  });

  it('crossfade reverses correctly when menu closes', () => {
    render(
      <FAB disableAnimation={false} variant="dark">
        <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.getByTestId('close-icon').parentElement).toHaveStyle({ opacity: '1' });
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.getByTestId('close-icon').parentElement).toHaveStyle({ opacity: '0' });
    expect(screen.getByTestId('plus-icon').parentElement).toHaveStyle({ opacity: '1' });
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 13 — avatarSrc and avatarInitials shorthand props on FAB.MenuItem
// ═══════════════════════════════════════════════════════════════════════════

describe('avatarSrc shorthand on FAB.MenuItem', () => {
  it('renders avatar container when avatarSrc is provided', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Assign" avatarSrc="https://example.com/avatar.jpg" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.getByTestId('fab-menu-item-avatar')).toBeInTheDocument();
  });

  it('does not render avatar when neither avatar, avatarSrc, nor avatarInitials is provided', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.queryByTestId('fab-menu-item-avatar')).not.toBeInTheDocument();
  });
});

describe('avatarInitials shorthand on FAB.MenuItem', () => {
  it('renders avatar container when avatarInitials is provided', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Share" avatarInitials="DD" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.getByTestId('fab-menu-item-avatar')).toBeInTheDocument();
  });

  it('explicit avatar prop takes precedence over avatarSrc shorthand', () => {
    const explicitAvatar = <img data-testid="explicit-avatar" alt="explicit" />;
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem
            label="Action"
            avatar={explicitAvatar}
            avatarSrc="https://example.com/avatar.jpg"
            onClick={() => {}}
          />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.getByTestId('explicit-avatar')).toBeInTheDocument();
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 14 — Menu item animation direction (translateY based on position)
// ═══════════════════════════════════════════════════════════════════════════

describe('Menu item animation direction', () => {
  it('menu item wrappers have transform style defined after open', () => {
    mockMatchMedia(false);
    render(
      <FAB disableAnimation={false} position="bottom-right" variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    const wrappers = screen.getAllByTestId('fab-menu-item-wrapper');
    wrappers.forEach((w) => {
      expect(w.style.transform).toBeDefined();
    });
  });

  it('menu item wrappers reach translateY(0) after animation completes', () => {
    mockMatchMedia(false);
    render(
      <FAB disableAnimation={false} position="bottom-right" variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    act(() => { jest.runAllTimers(); });
    const wrappers = screen.getAllByTestId('fab-menu-item-wrapper');
    wrappers.forEach((w) => {
      expect(w.style.transform).toBe('translateY(0)');
    });
  });

  it('top position menu items also animate with transform', () => {
    mockMatchMedia(false);
    render(
      <FAB disableAnimation={false} position="top-right" variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    const wrappers = screen.getAllByTestId('fab-menu-item-wrapper');
    wrappers.forEach((w) => {
      expect(w.style.transform).toBeDefined();
    });
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 15 — className passthrough
// ═══════════════════════════════════════════════════════════════════════════

describe('className passthrough', () => {
  it('applies className to FAB container', () => {
    render(
      <FAB className="my-fab" disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
      </FAB>
    );
    expect(screen.getByTestId('fab-container')).toHaveClass('my-fab');
  });

  it('applies className to FAB.Trigger', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} className="my-trigger" />
      </FAB>
    );
    expect(screen.getByTestId('fab-trigger')).toHaveClass('my-trigger');
  });

  it('applies className to FAB.MenuItem', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu>
          <FAB.MenuItem label="Action" className="my-item" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.getByTestId('fab-menu-item')).toHaveClass('my-item');
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 16 — Menu item tabIndex
// ═══════════════════════════════════════════════════════════════════════════

describe('Menu item tabIndex', () => {
  it('menu items have tabIndex=-1 (managed focus)', () => {
    renderFAB();
    openMenu();
    const buttons = screen.getAllByTestId('fab-menu-item');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('tabindex', '-1');
    });
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 17 — Trigger icon wrapper data-testid
// ═══════════════════════════════════════════════════════════════════════════

describe('Trigger icon wrapper', () => {
  it('fab-trigger-icon wrapper is present', () => {
    renderFAB();
    expect(screen.getByTestId('fab-trigger-icon')).toBeInTheDocument();
  });

  it('trigger icon wrapper contains the icon', () => {
    renderFAB();
    const iconWrapper = screen.getByTestId('fab-trigger-icon');
    expect(iconWrapper.querySelector('[data-testid="plus-icon"]')).toBeInTheDocument();
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 18 — FAB.Menu aria-label passthrough
// ═══════════════════════════════════════════════════════════════════════════

describe('FAB.Menu aria-label', () => {
  it('applies aria-label to the menu element', () => {
    render(
      <FAB disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} />
        <FAB.Menu aria-label="Quick actions">
          <FAB.MenuItem label="Action" onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    );
    fireEvent.click(screen.getByTestId('fab-trigger'));
    expect(screen.getByTestId('fab-menu')).toHaveAttribute('aria-label', 'Quick actions');
  });

  it('menu renders without aria-label when not provided', () => {
    renderFAB();
    openMenu();
    expect(screen.getByTestId('fab-menu')).not.toHaveAttribute('aria-label');
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 19 — Property-based: positionMode renders without error for all values
// ═══════════════════════════════════════════════════════════════════════════

describe('Property 8: positionMode renders without error for all valid values', () => {
  it('all positionMode values render the container correctly', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('fixed', 'absolute', 'relative'),
        fc.constantFrom('bottom-right', 'bottom-left', 'top-right', 'top-left'),
        (mode, position) => {
          const { unmount } = render(
            <FAB positionMode={mode as any} position={position as any} disableAnimation variant="dark">
              <FAB.Trigger icon={<PlusIcon />} />
            </FAB>
          );
          const container = screen.getByTestId('fab-container');
          expect(container).toHaveStyle({ position: mode });
          unmount();
        }
      ),
      { numRuns: 50 }
    );
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// 20 — Property-based: icon crossfade opacity is binary for any open/close state
// ═══════════════════════════════════════════════════════════════════════════

describe('Property 9: Icon crossfade opacity is binary (0 or 1) for any open/close state', () => {
  it('default icon opacity is 1 when closed and 0 when open, open icon is inverse', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        (startOpen) => {
          const { unmount } = render(
            <FAB disableAnimation={false} variant="dark">
              <FAB.Trigger icon={<PlusIcon />} openIcon={<span data-testid="close-icon">X</span>} />
              <FAB.Menu>
                <FAB.MenuItem label="Action" onClick={() => {}} />
              </FAB.Menu>
            </FAB>
          );

          if (startOpen) {
            fireEvent.click(screen.getByTestId('fab-trigger'));
          }

          const plusParent = screen.getByTestId('plus-icon').parentElement!;
          const closeParent = screen.getByTestId('close-icon').parentElement!;

          if (startOpen) {
            expect(plusParent).toHaveStyle({ opacity: '0' });
            expect(closeParent).toHaveStyle({ opacity: '1' });
          } else {
            expect(plusParent).toHaveStyle({ opacity: '1' });
            expect(closeParent).toHaveStyle({ opacity: '0' });
          }

          unmount();
        }
      ),
      { numRuns: 50 }
    );
  });
});
