import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Rating from '../index';

const tarmacConfig = {
  filledColor: '#f5c828',
  emptyColor: '#0000000d',
  hoverColor: '#e0b420',
  sizes: {
    lg: { starSize: '20' },
    md: { starSize: '16' },
    sm: { starSize: '14' },
  },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: { components: { rating: tarmacConfig } },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Rating — Tarmac TDS', () => {
  /* ─── Rendering ─── */
  it('renders 5 stars by default', () => {
    render(<Rating />);
    const stars = screen.getAllByTestId(/^rating-star-/);
    expect(stars).toHaveLength(5);
  });

  it('renders custom maxStars', () => {
    render(<Rating maxStars={3} />);
    const stars = screen.getAllByTestId(/^rating-star-/);
    expect(stars).toHaveLength(3);
  });

  it('renders with data-testid', () => {
    render(<Rating data-testid="my-rating" />);
    expect(screen.getByTestId('my-rating')).toBeInTheDocument();
  });

  it('renders with className', () => {
    render(<Rating className="custom" data-testid="r" />);
    expect(screen.getByTestId('r').className).toContain('custom');
  });

  it('renders role=img', () => {
    render(<Rating data-testid="r" />);
    expect(screen.getByTestId('r')).toHaveAttribute('role', 'img');
  });

  it('renders aria-label with value', () => {
    render(<Rating value={3.5} data-testid="r" />);
    expect(screen.getByTestId('r')).toHaveAttribute('aria-label', 'Rating: 3.5 out of 5');
  });

  it('renders aria-label with custom maxStars', () => {
    render(<Rating value={2} maxStars={10} data-testid="r" />);
    expect(screen.getByTestId('r')).toHaveAttribute('aria-label', 'Rating: 2 out of 10');
  });

  /* ─── All Sizes ─── */
  it('renders lg size', () => {
    render(<Rating size="lg" data-testid="r" />);
    expect(screen.getByTestId('r')).toBeInTheDocument();
  });

  it('renders md size', () => {
    render(<Rating size="md" data-testid="r" />);
    expect(screen.getByTestId('r')).toBeInTheDocument();
  });

  it('renders sm size', () => {
    render(<Rating size="sm" data-testid="r" />);
    expect(screen.getByTestId('r')).toBeInTheDocument();
  });

  /* ─── Star fill logic ─── */
  it('renders 0 filled stars for value=0', () => {
    const { container } = render(<Rating value={0} />);
    const svgs = container.querySelectorAll('svg');
    svgs.forEach((svg) => {
      const paths = svg.querySelectorAll('path');
      // Only 1 path = empty star (no filled overlay)
      expect(paths.length).toBe(1);
    });
  });

  it('renders 5 filled stars for value=5', () => {
    const { container } = render(<Rating value={5} />);
    const svgs = container.querySelectorAll('svg');
    svgs.forEach((svg) => {
      const paths = svg.querySelectorAll('path');
      // 2 paths = empty bg + filled overlay
      expect(paths.length).toBe(2);
    });
  });

  it('renders correct stars for value=3', () => {
    const { container } = render(<Rating value={3} />);
    const svgs = container.querySelectorAll('svg');
    // First 3 should be full (2 paths each), last 2 empty (1 path each)
    expect(svgs[0].querySelectorAll('path').length).toBe(2);
    expect(svgs[1].querySelectorAll('path').length).toBe(2);
    expect(svgs[2].querySelectorAll('path').length).toBe(2);
    expect(svgs[3].querySelectorAll('path').length).toBe(1);
    expect(svgs[4].querySelectorAll('path').length).toBe(1);
  });

  it('renders half star for value=2.5', () => {
    const { container } = render(<Rating value={2.5} />);
    const svgs = container.querySelectorAll('svg');
    // Stars 0,1 = full (2 paths), star 2 = half (2 paths + clipPath), stars 3,4 = empty (1 path)
    expect(svgs[0].querySelectorAll('path').length).toBe(2);
    expect(svgs[1].querySelectorAll('path').length).toBe(2);
    // Half star has a clipPath defs
    expect(svgs[2].querySelector('clipPath')).not.toBeNull();
    expect(svgs[2].querySelectorAll('path').length).toBe(2);
    expect(svgs[3].querySelectorAll('path').length).toBe(1);
    expect(svgs[4].querySelectorAll('path').length).toBe(1);
  });

  it('renders half star for value=0.5', () => {
    const { container } = render(<Rating value={0.5} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs[0].querySelector('clipPath')).not.toBeNull();
    expect(svgs[1].querySelectorAll('path').length).toBe(1);
  });

  it('renders half star for value=4.5', () => {
    const { container } = render(<Rating value={4.5} />);
    const svgs = container.querySelectorAll('svg');
    // Stars 0-3 full, star 4 half
    for (let i = 0; i < 4; i++) {
      expect(svgs[i].querySelectorAll('path').length).toBe(2);
      expect(svgs[i].querySelector('clipPath')).toBeNull();
    }
    expect(svgs[4].querySelector('clipPath')).not.toBeNull();
  });

  it('renders correct stars for value=1.5', () => {
    const { container } = render(<Rating value={1.5} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs[0].querySelectorAll('path').length).toBe(2); // full
    expect(svgs[1].querySelector('clipPath')).not.toBeNull(); // half
    expect(svgs[2].querySelectorAll('path').length).toBe(1); // empty
  });

  it('renders correct stars for value=3.5', () => {
    const { container } = render(<Rating value={3.5} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs[0].querySelectorAll('path').length).toBe(2);
    expect(svgs[1].querySelectorAll('path').length).toBe(2);
    expect(svgs[2].querySelectorAll('path').length).toBe(2);
    expect(svgs[3].querySelector('clipPath')).not.toBeNull();
    expect(svgs[4].querySelectorAll('path').length).toBe(1);
  });

  /* ─── All rate values render without error ─── */
  it('renders all rate values (0 to 5 in 0.5 steps) without error', () => {
    const rates = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    rates.forEach((rate) => {
      const { unmount } = render(<Rating value={rate} data-testid="r" />);
      expect(screen.getByTestId('r')).toBeInTheDocument();
      unmount();
    });
  });

  /* ─── All size × rate combos ─── */
  it('renders all size × rate combinations without error', () => {
    const sizes = ['lg', 'md', 'sm'];
    const rates = [0, 0.5, 1, 2.5, 5];
    sizes.forEach((sz) => {
      rates.forEach((rate) => {
        const { unmount } = render(<Rating size={sz} value={rate} data-testid="r" />);
        expect(screen.getByTestId('r')).toBeInTheDocument();
        unmount();
      });
    });
  });

  /* ─── Interactive mode ─── */
  it('calls onChange when clicked in interactive mode', () => {
    const onChange = jest.fn();
    render(<Rating value={2} readOnly={false} onChange={onChange} allowHalf={false} />);
    fireEvent.click(screen.getByTestId('rating-star-3'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('does not call onChange in readOnly mode', () => {
    const onChange = jest.fn();
    render(<Rating value={2} readOnly onChange={onChange} />);
    fireEvent.click(screen.getByTestId('rating-star-3'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when no onChange provided', () => {
    // Should not throw
    render(<Rating value={2} readOnly={false} />);
    fireEvent.click(screen.getByTestId('rating-star-3'));
  });

  /* ─── Default props ─── */
  it('defaults value to 0', () => {
    render(<Rating data-testid="r" />);
    expect(screen.getByTestId('r')).toHaveAttribute('aria-label', 'Rating: 0 out of 5');
  });

  it('defaults maxStars to 5', () => {
    render(<Rating />);
    expect(screen.getAllByTestId(/^rating-star-/)).toHaveLength(5);
  });

  it('defaults size to lg', () => {
    render(<Rating data-testid="r" />);
    expect(screen.getByTestId('r')).toBeInTheDocument();
  });

  it('defaults readOnly to true', () => {
    const onChange = jest.fn();
    render(<Rating value={2} onChange={onChange} />);
    fireEvent.click(screen.getByTestId('rating-star-0'));
    expect(onChange).not.toHaveBeenCalled();
  });

  /* ─── Edge cases ─── */
  it('clamps display for value > maxStars', () => {
    const { container } = render(<Rating value={7} maxStars={5} />);
    const svgs = container.querySelectorAll('svg');
    // All 5 should be full
    svgs.forEach((svg) => {
      expect(svg.querySelectorAll('path').length).toBe(2);
    });
  });

  it('handles value < 0 gracefully', () => {
    const { container } = render(<Rating value={-1} />);
    const svgs = container.querySelectorAll('svg');
    // All should be empty
    svgs.forEach((svg) => {
      expect(svg.querySelectorAll('path').length).toBe(1);
    });
  });

  it('handles maxStars=1', () => {
    render(<Rating maxStars={1} value={0.5} />);
    expect(screen.getAllByTestId(/^rating-star-/)).toHaveLength(1);
  });

  it('handles unknown size gracefully', () => {
    render(<Rating size="xxl" data-testid="r" />);
    expect(screen.getByTestId('r')).toBeInTheDocument();
  });

  it('renders maxStars=10', () => {
    render(<Rating maxStars={10} />);
    expect(screen.getAllByTestId(/^rating-star-/)).toHaveLength(10);
  });

  /* ─── SVG structure ─── */
  it('each star SVG has role=presentation', () => {
    render(<Rating value={3} />);
    const stars = screen.getAllByTestId(/^rating-star-/);
    stars.forEach((star) => {
      expect(star).toHaveAttribute('role', 'presentation');
    });
  });

  it('star SVGs have correct viewBox', () => {
    render(<Rating value={1} />);
    const star = screen.getByTestId('rating-star-0');
    expect(star).toHaveAttribute('viewBox', '0 0 24 24');
  });

  /* ─── Hover preview ─── */
  it('shows hover preview on mouseMove in interactive mode', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Rating value={1} readOnly={false} onChange={onChange} allowHalf={false} />
    );
    const star3 = screen.getByTestId('rating-star-3');
    // Simulate hovering over star index 3 (right half → value 4)
    fireEvent.mouseMove(star3, { clientX: 100 });
    // After hover, stars 0-3 should be filled (2 paths each)
    const svgs = container.querySelectorAll('svg');
    expect(svgs[0].querySelectorAll('path').length).toBe(2);
    expect(svgs[1].querySelectorAll('path').length).toBe(2);
    expect(svgs[2].querySelectorAll('path').length).toBe(2);
    expect(svgs[3].querySelectorAll('path').length).toBe(2);
    expect(svgs[4].querySelectorAll('path').length).toBe(1);
  });

  it('clears hover preview on mouseLeave', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Rating value={1} readOnly={false} onChange={onChange} data-testid="r" />
    );
    const star3 = screen.getByTestId('rating-star-3');
    fireEvent.mouseMove(star3, { clientX: 100 });
    // Now leave the container
    fireEvent.mouseLeave(screen.getByTestId('r'));
    // Should revert to value=1 (only star 0 filled)
    const svgs = container.querySelectorAll('svg');
    expect(svgs[0].querySelectorAll('path').length).toBe(2);
    expect(svgs[1].querySelectorAll('path').length).toBe(1);
  });

  it('does not show hover preview in readOnly mode', () => {
    const { container } = render(<Rating value={1} readOnly />);
    const star3 = screen.getByTestId('rating-star-3');
    fireEvent.mouseMove(star3, { clientX: 100 });
    // Should stay at value=1
    const svgs = container.querySelectorAll('svg');
    expect(svgs[0].querySelectorAll('path').length).toBe(2);
    expect(svgs[1].querySelectorAll('path').length).toBe(1);
  });

  it('shows half-star hover preview when allowHalf is true', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Rating value={0} readOnly={false} onChange={onChange} allowHalf />
    );
    const star2 = screen.getByTestId('rating-star-2');
    // Simulate hovering on left half (clientX near left edge)
    const rect = { left: 0, width: 20, top: 0, height: 20 };
    Object.defineProperty(star2, 'getBoundingClientRect', { value: () => rect });
    fireEvent.mouseMove(star2, { clientX: 5 }); // left half
    // Stars 0,1 should be full, star 2 should be half
    const svgs = container.querySelectorAll('svg');
    expect(svgs[0].querySelectorAll('path').length).toBe(2);
    expect(svgs[1].querySelectorAll('path').length).toBe(2);
    expect(svgs[2].querySelector('clipPath')).not.toBeNull();
    expect(svgs[3].querySelectorAll('path').length).toBe(1);
  });

  it('aria-label reflects committed value not hover value', () => {
    const onChange = jest.fn();
    render(
      <Rating value={2} readOnly={false} onChange={onChange} data-testid="r" />
    );
    const star4 = screen.getByTestId('rating-star-4');
    fireEvent.mouseMove(star4, { clientX: 100 });
    // aria-label should still show the committed value
    expect(screen.getByTestId('r')).toHaveAttribute('aria-label', 'Rating: 2 out of 5');
  });
});
