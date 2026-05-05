import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar, { DefaultIcon } from '../index';
import { faChevronRight, faChevronLeft, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

describe('Sidebar', () => {
  const routes = [
    { name: 'Home', to: '/home', icon: <FontAwesomeIcon icon={faGear} /> },
    { name: 'Broken', to: '/broken', icon: 'not-a-real-icon' },
    { name: 'NoIcon', to: '/noicon' },
  ];

  it('renders bgImage as background', () => {
    render(
      <Sidebar
        routes={routes}
        bgImage="/assets/sidebar-bg.png"
        openByDefault
      />
    );
    const sidebar = screen.getByRole('navigation').parentElement?.parentElement;
    expect(sidebar).toHaveStyle('background-image: url(/assets/sidebar-bg.png)');
  });

  it('renders topIcon if provided', () => {
    render(
      <Sidebar
        routes={routes}
        topIcon={<FontAwesomeIcon icon={faGear} data-testid="top-icon" />}
        openByDefault
      />
    );
    expect(screen.getByTestId('top-icon')).toBeInTheDocument();
  });

  it('renders expand/collapse icons if provided', () => {
    render(
      <Sidebar
        routes={routes}
        expandIcon={<FontAwesomeIcon icon={faChevronRight} data-testid="expand-icon" />}
        collapseIcon={<FontAwesomeIcon icon={faChevronLeft} data-testid="collapse-icon" />}
        expandable
        openByDefault
      />
    );
    // Only one of expand/collapse is visible at a time, so check for at least one
    expect(screen.getByTestId('collapse-icon') || screen.getByTestId('expand-icon')).toBeTruthy();
  });

  it('renders DefaultIcon for invalid icon name', () => {
    render(
      <Sidebar
        routes={routes}
        openByDefault
      />
    );
    // Should render DefaultIcon for 'not-a-real-icon'
    expect(screen.getAllByTestId('orca-default-icon').length).toBeGreaterThan(0);
  });

  it('renders DefaultIcon for missing expand/collapse/top icons', () => {
    render(
      <Sidebar
        routes={routes}
        expandable
        openByDefault
      />
    );
    // Should render DefaultIcon for toggler and topIcon
    expect(screen.getAllByTestId('orca-default-icon').length).toBeGreaterThan(0);
  });

  it('renders icon fallback for both string and ReactNode', () => {
    render(
      <Sidebar
        routes={[
          { name: 'StringFallback', to: '/string', icon: 'not-a-real-icon' },
          { name: 'NodeFallback', to: '/node', icon: null },
        ]}
        openByDefault
      />
    );
    expect(screen.getAllByTestId('orca-default-icon').length).toBeGreaterThan(0);
  });

  it('hides all items if hidden is true', () => {
    render(
      <Sidebar
        routes={routes}
        hidden
        openByDefault
      />
    );
    // Should not find any route names
    expect(screen.queryByText('Home')).toBeNull();
    expect(screen.queryByText('Broken')).toBeNull();
    expect(screen.queryByText('NoIcon')).toBeNull();
  });
}); 