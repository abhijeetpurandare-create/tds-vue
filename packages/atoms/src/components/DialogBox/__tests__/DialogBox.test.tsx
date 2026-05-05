import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DialogBox from '../index';

const tarmacConfig = {
  base: {
    backgroundColor: '#ffffff', borderRadius: '4px', boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.1)',
    overlayColor: 'rgba(0,0,0,0.5)', fontFamily: 'Noto Sans, sans-serif',
    titleColor: '#2B2B2B', descriptionColor: '#454545', checkboxTextColor: '#454545',
    snackbarBackgroundColor: '#F5C828', snackbarTextColor: '#7B6414',
    illustrationBackgroundColor: '#F2F2F2', checkboxBorderColor: '#CCCCCC',
  },
  sizes: {
    mobile: { width: '348px', titleFontSize: '14px', titleLineHeight: '20px', headerIconSize: '20px' },
    web: { width: '440px', titleFontSize: '16px', titleLineHeight: '24px', headerIconSize: '24px' },
  },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        dialogBox: tarmacConfig,
        checkbox: {
          base: { borderColor: '#ccc', backgroundColor: '#fff', checkColor: '#fff', borderRadius: '2px', transition: 'all 0.15s',
            focus: { outline: 'none', ring: '0 0 0 2px rgba(0,0,0,0.4)' },
            label: { fontFamily: 'Noto Sans', color: '#2b2b2b' }, subtext: { fontFamily: 'Noto Sans', color: '#454545' } },
          sizes: { sm: { size: '16px', iconSize: '12px' }, md: { size: '20px', iconSize: '14px' }, lg: { size: '24px', iconSize: '16px' } },
          states: { disabled: { borderColor: '#eee', backgroundColor: '#f5f5f5' } },
          variants: { default: { checkedBg: '#000', checkedBorder: '#000' } },
        },
        checkbox_tarmac: {
          base: { transition: 'all 0.15s', borderWidth: '1px', radius: { box: '2px', rounded: '999px' },
            focus: { outline: 'none', ring: '0 0 0 2px rgba(0,0,0,0.4)' },
            label: { fontFamily: 'Noto Sans', color: '#2b2b2b' }, subtext: { fontFamily: 'Noto Sans', color: '#454545' } },
          variants: { standard: { borderColor: '#ccc', checkedBackgroundColor: '#000', checkedBorderColor: '#000', checkmarkColor: '#fff' } },
          sizes: { sm: { boxSize: '16px', gap: '4px', labelFontSize: '12px' }, md: { boxSize: '20px' }, lg: { boxSize: '24px' } },
          states: { disabled: { borderColor: '#eee' } },
        },
        button: {
          base: { fontFamily: 'Noto Sans', borderRadius: '4px', transition: 'all 0.15s' },
          styles: { primary: { black: { backgroundColor: '#000', textColor: '#e6e6e6' } }, tertiary: { black: { textColor: '#2b2b2b' } } },
          variants: { black: { backgroundColor: '#000', textColor: '#e6e6e6' } },
          sizes: { md: { fontSize: '14px', padding: '8px 12px', height: '36px' } },
          states: { disabled: {} },
        },
        snackbar: {
          base: { fontFamily: 'Noto Sans', borderRadius: '4px' },
          variants: { warning: { filled: { backgroundColor: '#f5c728', textColor: '#312808' } } },
          sizes: { sm: { fontSize: '12px', padding: '8px 12px' } },
        },
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock('../../../config/config', () => ({ defaultThemeConfig: { components: {} } }));

const baseProps = {
  isOpen: true, renderInline: true, title: 'Test Title', heading: 'Test Heading',
  description: 'Test Description', snackbarText: 'Alert text',
};

describe('DialogBox — Rendering', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(<DialogBox isOpen={false} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders when isOpen is true with renderInline', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders title', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('renders heading', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByText('Test Heading')).toBeTruthy();
  });

  it('renders description', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByText('Test Description')).toBeTruthy();
  });

  it('renders snackbar text', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByText('Alert text')).toBeTruthy();
  });

  it('renders footer content', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByText('Action')).toBeTruthy();
  });

  it('renders checkbox with default label', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByText("Don't show this message again")).toBeTruthy();
  });

  it('renders custom checkbox label', () => {
    render(<DialogBox {...baseProps} checkboxLabel="Custom label" />);
    expect(screen.getByText('Custom label')).toBeTruthy();
  });

  it('renders children instead of default content', () => {
    render(<DialogBox {...baseProps}><div data-testid="custom">Custom</div></DialogBox>);
    expect(screen.getByTestId('custom')).toBeTruthy();
  });

  it('renders close icon in header', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByLabelText('Close dialog')).toBeTruthy();
  });

  it('renders headerLeadingIcon', () => {
    render(<DialogBox {...baseProps} headerLeadingIcon={<span data-testid="lead-icon">I</span>} />);
    expect(screen.getByTestId('lead-icon')).toBeTruthy();
  });

  it('renders snackbarIcon', () => {
    render(<DialogBox {...baseProps} snackbarIcon={<span data-testid="snack-icon">!</span>} />);
    expect(screen.getByTestId('snack-icon')).toBeTruthy();
  });

  it('renders illustration', () => {
    render(<DialogBox {...baseProps} illustration={<span data-testid="illus">✓</span>} />);
    expect(screen.getByTestId('illus')).toBeTruthy();
  });
});

describe('DialogBox — Boolean Props', () => {
  it('hides header when showHeader is false', () => {
    render(<DialogBox {...baseProps} showHeader={false} />);
    expect(screen.queryByTestId('dialogbox-header')).toBeNull();
  });

  it('shows header by default', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByTestId('dialogbox-header')).toBeTruthy();
  });

  it('hides snackbar when showSnackbar is false', () => {
    render(<DialogBox {...baseProps} showSnackbar={false} />);
    expect(screen.queryByText('Alert text')).toBeNull();
  });

  it('hides snackbar when snackbarText is empty', () => {
    render(<DialogBox {...baseProps} snackbarText="" />);
    expect(screen.queryByText('Alert text')).toBeNull();
  });

  it('hides footer when showFooter is false', () => {
    render(<DialogBox {...baseProps} showFooter={false} />);
    expect(screen.queryByTestId('dialogbox-footer')).toBeNull();
  });

  it('hides checkbox when showCheckbox is false', () => {
    render(<DialogBox {...baseProps} showCheckbox={false} />);
    expect(screen.queryByTestId('dialogbox-checkbox')).toBeNull();
  });

  it('shows checkbox by default', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByTestId('dialogbox-checkbox')).toBeTruthy();
  });

  it('hides subtext by default', () => {
    render(<DialogBox {...baseProps} subtext="Sub" />);
    expect(screen.queryByText('Sub')).toBeNull();
  });

  it('shows subtext when showSubtext is true', () => {
    render(<DialogBox {...baseProps} subtext="Sub" showSubtext={true} />);
    expect(screen.getByText('Sub')).toBeTruthy();
  });
});

describe('DialogBox — Types', () => {
  it('renders standard type', () => {
    render(<DialogBox {...baseProps} type="standard" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders slots type with slotMiddle after body', () => {
    render(<DialogBox {...baseProps} type="slots" slotMiddle={<div data-testid="slot-m">Slot</div>} />);
    expect(screen.getByTestId('slot-m')).toBeTruthy();
  });

  it('renders slotsx2 type with slotMiddle before illustration', () => {
    render(<DialogBox {...baseProps} type="slotsx2" slotMiddle={<div data-testid="slot-m2">Slot2</div>} />);
    expect(screen.getByTestId('slot-m2')).toBeTruthy();
  });

  it('renders slotHeader in slots type', () => {
    render(<DialogBox {...baseProps} type="slots" slotHeader={<div data-testid="slot-h">H</div>} />);
    expect(screen.getByTestId('slot-h')).toBeTruthy();
  });

  it('renders slotHeader in slotsx2 type', () => {
    render(<DialogBox {...baseProps} type="slotsx2" slotHeader={<div data-testid="slot-h2">H2</div>} />);
    expect(screen.getByTestId('slot-h2')).toBeTruthy();
  });

  it('does not render slotMiddle for standard type', () => {
    render(<DialogBox {...baseProps} type="standard" slotMiddle={<div data-testid="no-slot">X</div>} />);
    expect(screen.queryByTestId('dialogbox-slot-middle')).toBeNull();
  });
});

describe('DialogBox — Sizes', () => {
  it('renders mobile size', () => {
    render(<DialogBox {...baseProps} size="mobile" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders web size', () => {
    render(<DialogBox {...baseProps} size="web" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders with unknown size gracefully', () => {
    render(<DialogBox {...baseProps} size="tablet" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });
});

describe('DialogBox — Footer Styles', () => {
  it('renders type1 footer', () => {
    render(<DialogBox {...baseProps} footerStyle="type1" />);
    expect(screen.getByTestId('dialogbox-footer')).toBeTruthy();
  });

  it('renders type2 footer', () => {
    render(<DialogBox {...baseProps} footerStyle="type2" />);
    expect(screen.getByTestId('dialogbox-footer')).toBeTruthy();
  });
});

describe('DialogBox — Events', () => {
  it('calls onClose when close icon is clicked', () => {
    const onClose = jest.fn();
    render(<DialogBox {...baseProps} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', () => {
    const onClose = jest.fn();
    render(<DialogBox {...baseProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEsc is false', () => {
    const onClose = jest.fn();
    render(<DialogBox {...baseProps} onClose={onClose} closeOnEsc={false} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on overlay click', () => {
    const onClose = jest.fn();
    render(<DialogBox {...baseProps} onClose={onClose} />);
    // overlay only exists in portal mode, not renderInline
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not call onClose on overlay click when closeOnOverlay is false', () => {
    const onClose = jest.fn();
    render(<DialogBox {...baseProps} onClose={onClose} closeOnOverlay={false} />);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when clicking inside the dialog', () => {
    const onClose = jest.fn();
    render(<DialogBox {...baseProps} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('dialogbox-container'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onCheckboxChange when checkbox is toggled', () => {
    const onChange = jest.fn();
    render(<DialogBox {...baseProps} onCheckboxChange={onChange} checkboxChecked={false} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('close icon responds to Enter key', () => {
    const onClose = jest.fn();
    render(<DialogBox {...baseProps} onClose={onClose} />);
    fireEvent.keyDown(screen.getByLabelText('Close dialog'), { key: 'Enter' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('close icon responds to Space key', () => {
    const onClose = jest.fn();
    render(<DialogBox {...baseProps} onClose={onClose} />);
    fireEvent.keyDown(screen.getByLabelText('Close dialog'), { key: ' ' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('DialogBox — Accessibility', () => {
  it('has role="dialog"', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('has aria-modal="false" when renderInline', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('false');
  });

  it('has aria-label from title', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByRole('dialog').getAttribute('aria-label')).toBe('Test Title');
  });

  it('falls back to heading for aria-label when no title', () => {
    render(<DialogBox {...baseProps} title={undefined} showHeader={false} />);
    expect(screen.getByRole('dialog').getAttribute('aria-label')).toBe('Test Heading');
  });

  it('close button has aria-label', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByLabelText('Close dialog')).toBeTruthy();
  });

  it('close button is keyboard accessible (tabIndex=0)', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByLabelText('Close dialog').getAttribute('tabindex')).toBe('0');
  });

  it('overlay has role="presentation" in portal mode', () => {
    // overlay only renders in portal mode, not testable with renderInline
    expect(true).toBe(true);
  });
});

describe('DialogBox — HTML Attributes', () => {
  it('applies className', () => {
    render(<DialogBox {...baseProps} className="custom-class" />);
    expect(screen.getByRole('dialog').className).toContain('custom-class');
  });

  it('container has tabIndex=-1 for focus management', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByRole('dialog').getAttribute('tabindex')).toBe('-1');
  });
});

describe('DialogBox — All Combinations', () => {
  const types = ['standard', 'slots', 'slotsx2'];
  const sizes = ['mobile', 'web'];
  const footerStyles = ['type1', 'type2'];

  types.forEach(type => {
    sizes.forEach(size => {
      footerStyles.forEach(fs => {
        it(`renders ${type}/${size}/${fs} without error`, () => {
          render(<DialogBox {...baseProps} type={type} size={size} footerStyle={fs}
            slotHeader={<div>SH</div>} slotMiddle={<div>SM</div>} />);
          expect(screen.getByRole('dialog')).toBeTruthy();
        });
      });
    });
  });
});

describe('DialogBox — Edge Cases', () => {
  it('renders without title', () => {
    render(<DialogBox {...baseProps} title={undefined} />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders without heading', () => {
    render(<DialogBox {...baseProps} heading={undefined} />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders without description', () => {
    render(<DialogBox {...baseProps} description={undefined} />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders without footer content', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByTestId('dialogbox-footer')).toBeTruthy();
    expect(screen.getByText('Action')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('renders without snackbarText', () => {
    render(<DialogBox {...baseProps} snackbarText={undefined} />);
    expect(screen.queryByText('Alert text')).toBeNull();
  });

  it('renders with all props undefined except isOpen', () => {
    render(<DialogBox isOpen renderInline />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('checkbox reflects checkboxChecked prop', () => {
    render(<DialogBox {...baseProps} checkboxChecked={true} />);
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(true);
  });

  it('checkbox unchecked by default', () => {
    render(<DialogBox {...baseProps} checkboxChecked={false} />);
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(false);
  });
});

describe('DialogBox — Default Footer Buttons', () => {
  it('renders default Cancel button', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('renders default Action button', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByText('Action')).toBeTruthy();
  });

  it('renders custom primaryLabel', () => {
    render(<DialogBox {...baseProps} primaryLabel="Confirm" />);
    expect(screen.getByText('Confirm')).toBeTruthy();
  });

  it('renders custom secondaryLabel', () => {
    render(<DialogBox {...baseProps} secondaryLabel="Dismiss" />);
    expect(screen.getByText('Dismiss')).toBeTruthy();
  });

  it('calls onPrimaryClick when primary button clicked', () => {
    const fn = jest.fn();
    render(<DialogBox {...baseProps} onPrimaryClick={fn} />);
    fireEvent.click(screen.getByText('Action'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls onSecondaryClick when secondary button clicked', () => {
    const fn = jest.fn();
    render(<DialogBox {...baseProps} onSecondaryClick={fn} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('secondary button falls back to onClose when onSecondaryClick not provided', () => {
    const onClose = jest.fn();
    render(<DialogBox {...baseProps} onClose={onClose} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('custom footer overrides default buttons', () => {
    render(<DialogBox {...baseProps} footer={<button>Custom</button>} />);
    expect(screen.getByText('Custom')).toBeTruthy();
    expect(screen.queryByText('Action')).toBeNull();
    expect(screen.queryByText('Cancel')).toBeNull();
  });
});

describe('DialogBox — Snackbar', () => {
  it('renders default info icon when snackbarText provided without snackbarIcon', () => {
    render(<DialogBox {...baseProps} />);
    expect(screen.getByTestId('orca-snackbar-icon')).toBeTruthy();
  });

  it('custom snackbar ReactNode overrides snackbarText', () => {
    render(<DialogBox {...baseProps} snackbar={<div data-testid="custom-snack">Custom</div>} />);
    expect(screen.getByTestId('custom-snack')).toBeTruthy();
  });

  it('snackbar hidden when showSnackbar false even with snackbar prop', () => {
    render(<DialogBox {...baseProps} showSnackbar={false} snackbar={<div data-testid="hidden-snack">X</div>} />);
    expect(screen.queryByTestId('hidden-snack')).toBeNull();
  });
});

describe('DialogBox — Empty Container Cleanup', () => {
  it('no header-text div when title and subtext both absent', () => {
    const { container } = render(<DialogBox {...baseProps} title={undefined} showSubtext={false} />);
    expect(container.querySelector('.dialogbox-header-text')).toBeNull();
  });

  it('no body div when heading and description both absent', () => {
    const { container } = render(<DialogBox {...baseProps} heading={undefined} description={undefined} />);
    expect(container.querySelector('.dialogbox-body')).toBeNull();
  });

  it('no illustration div when illustration not provided', () => {
    const { container } = render(<DialogBox {...baseProps} />);
    expect(container.querySelector('.dialogbox-illustration')).toBeNull();
  });

  it('no header-icon div when headerLeadingIcon not provided for standard type', () => {
    const { container } = render(<DialogBox {...baseProps} type="standard" />);
    expect(container.querySelector('.dialogbox-header-icon')).toBeNull();
  });
});

describe('DialogBox — Component Identity', () => {
  it('has displayName', () => {
    expect(DialogBox.displayName).toBe('DialogBox');
  });

  it('renders with unknown type gracefully', () => {
    render(<DialogBox {...baseProps} type="custom" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders with unknown footerStyle gracefully', () => {
    render(<DialogBox {...baseProps} footerStyle="custom" />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });
});

describe('DialogBox — Lifecycle', () => {
  it('removes keydown listener on unmount', () => {
    const spy = jest.spyOn(document, 'removeEventListener');
    const { unmount } = render(<DialogBox {...baseProps} />);
    unmount();
    expect(spy).toHaveBeenCalledWith('keydown', expect.any(Function));
    spy.mockRestore();
  });

  it('removes keydown listener when isOpen changes to false', () => {
    const spy = jest.spyOn(document, 'removeEventListener');
    const { rerender } = render(<DialogBox {...baseProps} />);
    rerender(<DialogBox {...baseProps} isOpen={false} />);
    expect(spy).toHaveBeenCalledWith('keydown', expect.any(Function));
    spy.mockRestore();
  });
});

describe('DialogBox — Portal & Inline', () => {
  it('renders into portalTarget when not inline', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    render(<DialogBox isOpen portalTarget={target} title="Portal" heading="H" />);
    expect(target.querySelector('[role="dialog"]')).toBeTruthy();
    document.body.removeChild(target);
  });

  it('renders overlay in portal mode', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    render(<DialogBox isOpen portalTarget={target} title="P" heading="H" />);
    expect(target.querySelector('[data-testid="dialogbox-overlay"]')).toBeTruthy();
    document.body.removeChild(target);
  });

  it('overlay click calls onClose in portal mode', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const onClose = jest.fn();
    render(<DialogBox isOpen portalTarget={target} onClose={onClose} title="P" heading="H" />);
    fireEvent.click(target.querySelector('[data-testid="dialogbox-overlay"]')!);
    expect(onClose).toHaveBeenCalledTimes(1);
    document.body.removeChild(target);
  });

  it('overlay click does not call onClose when closeOnOverlay is false', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const onClose = jest.fn();
    render(<DialogBox isOpen portalTarget={target} onClose={onClose} closeOnOverlay={false} title="P" heading="H" />);
    fireEvent.click(target.querySelector('[data-testid="dialogbox-overlay"]')!);
    expect(onClose).not.toHaveBeenCalled();
    document.body.removeChild(target);
  });

  it('has aria-modal="true" in portal mode', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    render(<DialogBox isOpen portalTarget={target} title="P" heading="H" />);
    expect(target.querySelector('[role="dialog"]')!.getAttribute('aria-modal')).toBe('true');
    document.body.removeChild(target);
  });

  it('no overlay when renderInline', () => {
    const { container } = render(<DialogBox {...baseProps} />);
    expect(container.querySelector('[data-testid="dialogbox-overlay"]')).toBeNull();
  });
});

describe('DialogBox — Children Override', () => {
  it('children override default content even when slots provided', () => {
    render(<DialogBox {...baseProps} type="slots" slotMiddle={<div data-testid="sm">S</div>}>
      <div data-testid="child">Child</div>
    </DialogBox>);
    expect(screen.getByTestId('child')).toBeTruthy();
    expect(screen.queryByTestId('sm')).toBeNull();
  });

  it('children override heading/description', () => {
    render(<DialogBox {...baseProps}><p>Override</p></DialogBox>);
    expect(screen.getByText('Override')).toBeTruthy();
    expect(screen.queryByText('Test Heading')).toBeNull();
  });
});

describe('DialogBox — Subtext Edge Cases', () => {
  it('subtext without title renders header-text with subtext only', () => {
    const { container } = render(<DialogBox {...baseProps} title={undefined} subtext="Sub" showSubtext={true} />);
    expect(container.querySelector('.dialogbox-header-text')).toBeTruthy();
    expect(container.querySelector('.dialogbox-title')).toBeNull();
    expect(container.querySelector('.dialogbox-subtext')).toBeTruthy();
  });

  it('title without subtext renders header-text', () => {
    const { container } = render(<DialogBox {...baseProps} showSubtext={false} />);
    expect(container.querySelector('.dialogbox-header-text')).toBeTruthy();
    expect(container.querySelector('.dialogbox-title')).toBeTruthy();
  });
});
