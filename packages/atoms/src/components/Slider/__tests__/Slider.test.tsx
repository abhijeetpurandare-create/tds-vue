import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from '../index';

const tarmacConfig = {
  base: {
    trackRadius: '8px',
    knobRadius: '999px',
    trackBackgroundColor: '#ededed',
    transition: 'none',
    focusRingColor: 'rgba(0,0,0,0.4)',
    focusRingSpread: '2px',
  },
  variants: {
    black: { fillColor: '#000000', knobInnerColor: '#000000' },
    coal: { fillColor: '#46516c', knobInnerColor: '#46516c' },
    dlv_red: { fillColor: '#ed1b36', knobInnerColor: '#ed1b36' },
  },
  sizes: {
    sm: {
      trackHeight: '6px',
      knobOuterSize: '20px',
      knobInnerSize: '12px',
      knobPadding: '4px',
      containerPaddingX: '8px',
      containerPaddingY: '8px',
    },
    lg: {
      trackHeight: '8px',
      knobOuterSize: '24px',
      knobInnerSize: '16px',
      knobPadding: '4px',
      containerPaddingX: '8px',
      containerPaddingY: '12px',
    },
  },
  states: {
    knobDefault: { backgroundColor: '#f2f2f2', shadow: '0 0 6px 0 rgba(0,0,0,0.2)' },
    knobHover: { backgroundColor: '#ededed', shadow: '0 0 6px 0 rgba(0,0,0,0.2)' },
    knobFocused: { backgroundColor: '#f2f2f2', shadow: '0 0 0 2px rgba(0,0,0,0.4)' },
    knobDisabled: { backgroundColor: '#ffffff', shadow: 'none' },
  },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: { components: { slider: tarmacConfig } },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Slider — Rendering', () => {
  test('renders with default props', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  test('renders track element', () => {
    render(<Slider />);
    expect(screen.getByTestId('slider-track')).toBeInTheDocument();
  });

  test('renders fill element', () => {
    render(<Slider />);
    expect(screen.getByTestId('slider-fill')).toBeInTheDocument();
  });

  test('renders thumb element for single slider', () => {
    render(<Slider sliderType="single" />);
    expect(screen.getByTestId('slider-thumb')).toBeInTheDocument();
  });

  test('renders two thumbs for dual slider', () => {
    render(<Slider sliderType="dual" />);
    expect(screen.getByTestId('slider-thumb-min')).toBeInTheDocument();
    expect(screen.getByTestId('slider-thumb-max')).toBeInTheDocument();
  });

  test('applies className prop', () => {
    const { container } = render(<Slider className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

describe('Slider — Variants', () => {
  test.each(['black', 'coal', 'dlv_red'])('renders %s variant without error', (variant) => {
    render(<Slider variant={variant} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  test('renders unknown variant without error (open union)', () => {
    render(<Slider variant="custom_variant" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
});

describe('Slider — Sizes', () => {
  test('renders sm size', () => {
    render(<Slider size="sm" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  test('renders lg size', () => {
    render(<Slider size="lg" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
});

describe('Slider — Types', () => {
  test('single slider has one thumb', () => {
    render(<Slider sliderType="single" />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(1);
  });

  test('dual slider has two thumbs', () => {
    render(<Slider sliderType="dual" />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
  });
});

describe('Slider — All Combinations', () => {
  const variants = ['black', 'coal', 'dlv_red'];
  const sizes: Array<'sm' | 'lg'> = ['sm', 'lg'];
  const types: Array<'single' | 'dual'> = ['single', 'dual'];

  test('all variant × size × type combinations render without error', () => {
    variants.forEach((v) => {
      sizes.forEach((s) => {
        types.forEach((t) => {
          const { unmount } = render(
            <Slider variant={v} size={s} sliderType={t} value={t === 'dual' ? [30, 70] : 50} />,
          );
          expect(screen.getByTestId('slider-track')).toBeInTheDocument();
          unmount();
        });
      });
    });
  });
});

describe('Slider — Controlled Value', () => {
  test('single slider reflects controlled value', () => {
    render(<Slider value={75} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
  });

  test('dual slider reflects controlled values', () => {
    render(<Slider sliderType="dual" value={[20, 80]} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '20');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '80');
  });

  test('updates when controlled value changes', () => {
    const { rerender } = render(<Slider value={30} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30');
    rerender(<Slider value={60} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '60');
  });
});

describe('Slider — Uncontrolled Default Value', () => {
  test('single slider uses defaultValue', () => {
    render(<Slider defaultValue={40} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '40');
  });

  test('dual slider uses defaultValue', () => {
    render(<Slider sliderType="dual" defaultValue={[10, 90]} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '10');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '90');
  });
});

describe('Slider — Disabled State', () => {
  test('disabled slider has aria-disabled', () => {
    render(<Slider isDisabled />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
  });

  test('disabled slider thumb has tabIndex -1', () => {
    render(<Slider isDisabled />);
    expect(screen.getByRole('slider')).toHaveAttribute('tabindex', '-1');
  });

  test('disabled dual slider has both thumbs disabled', () => {
    render(<Slider sliderType="dual" isDisabled />);
    const sliders = screen.getAllByRole('slider');
    sliders.forEach((s) => {
      expect(s).toHaveAttribute('aria-disabled', 'true');
      expect(s).toHaveAttribute('tabindex', '-1');
    });
  });
});

describe('Slider — Accessibility', () => {
  test('single slider has correct ARIA attributes', () => {
    render(<Slider value={50} min={0} max={100} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  test('single slider uses aria-label', () => {
    render(<Slider aria-label="Volume" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-label', 'Volume');
  });

  test('dual slider uses aria-label-min and aria-label-max', () => {
    render(<Slider sliderType="dual" aria-label-min="Min price" aria-label-max="Max price" />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveAttribute('aria-label', 'Min price');
    expect(sliders[1]).toHaveAttribute('aria-label', 'Max price');
  });

  test('dual slider has default aria-labels', () => {
    render(<Slider sliderType="dual" />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveAttribute('aria-label', 'Minimum value');
    expect(sliders[1]).toHaveAttribute('aria-label', 'Maximum value');
  });

  test('single slider default aria-label is "Slider"', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-label', 'Slider');
  });

  test('thumb is focusable via tabIndex', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toHaveAttribute('tabindex', '0');
  });
});

describe('Slider — Keyboard Navigation', () => {
  test('ArrowRight increases value', () => {
    const onChange = jest.fn();
    render(<Slider value={50} step={1} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(51);
  });

  test('ArrowLeft decreases value', () => {
    const onChange = jest.fn();
    render(<Slider value={50} step={1} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(49);
  });

  test('ArrowUp increases value', () => {
    const onChange = jest.fn();
    render(<Slider value={50} step={5} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith(55);
  });

  test('ArrowDown decreases value', () => {
    const onChange = jest.fn();
    render(<Slider value={50} step={5} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith(45);
  });

  test('Home sets value to min', () => {
    const onChange = jest.fn();
    render(<Slider value={50} min={10} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith(10);
  });

  test('End sets value to max', () => {
    const onChange = jest.fn();
    render(<Slider value={50} max={200} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'End' });
    expect(onChange).toHaveBeenCalledWith(200);
  });

  test('value does not go below min', () => {
    const onChange = jest.fn();
    render(<Slider value={0} min={0} step={1} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(0);
  });

  test('value does not go above max', () => {
    const onChange = jest.fn();
    render(<Slider value={100} max={100} step={1} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(100);
  });

  test('keyboard does not fire onChange when disabled', () => {
    const onChange = jest.fn();
    render(<Slider value={50} isDisabled onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
    expect(onChange).not.toHaveBeenCalled();
  });

  test('dual slider min thumb keyboard navigation', () => {
    const onChange = jest.fn();
    render(<Slider sliderType="dual" value={[30, 70]} step={1} onChange={onChange} />);
    const sliders = screen.getAllByRole('slider');
    fireEvent.keyDown(sliders[0], { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith([31, 70]);
  });

  test('dual slider max thumb keyboard navigation', () => {
    const onChange = jest.fn();
    render(<Slider sliderType="dual" value={[30, 70]} step={1} onChange={onChange} />);
    const sliders = screen.getAllByRole('slider');
    fireEvent.keyDown(sliders[1], { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith([30, 69]);
  });

  test('dual slider min thumb cannot exceed max thumb', () => {
    const onChange = jest.fn();
    render(<Slider sliderType="dual" value={[50, 50]} step={1} onChange={onChange} />);
    const sliders = screen.getAllByRole('slider');
    fireEvent.keyDown(sliders[0], { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith([50, 50]);
  });

  test('dual slider max thumb cannot go below min thumb', () => {
    const onChange = jest.fn();
    render(<Slider sliderType="dual" value={[50, 50]} step={1} onChange={onChange} />);
    const sliders = screen.getAllByRole('slider');
    fireEvent.keyDown(sliders[1], { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith([50, 50]);
  });
});

describe('Slider — Min/Max/Step Props', () => {
  test('custom min and max', () => {
    render(<Slider min={10} max={50} value={30} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '50');
    expect(slider).toHaveAttribute('aria-valuenow', '30');
  });

  test('step increments correctly', () => {
    const onChange = jest.fn();
    render(<Slider value={50} step={10} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(60);
  });
});

describe('Slider — Focus/Blur Events', () => {
  test('focus event on thumb', () => {
    render(<Slider />);
    const thumb = screen.getByRole('slider');
    fireEvent.focus(thumb);
    // No error thrown — focus handler works
    expect(thumb).toBeInTheDocument();
  });

  test('blur event on thumb', () => {
    render(<Slider />);
    const thumb = screen.getByRole('slider');
    fireEvent.focus(thumb);
    fireEvent.blur(thumb);
    expect(thumb).toBeInTheDocument();
  });
});

describe('Slider — Mouse Events', () => {
  test('mouseEnter and mouseLeave on thumb', () => {
    render(<Slider />);
    const thumb = screen.getByRole('slider');
    fireEvent.mouseEnter(thumb);
    fireEvent.mouseLeave(thumb);
    expect(thumb).toBeInTheDocument();
  });
});
