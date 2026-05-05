import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toast, { toast, ToastManager } from '../index';
import ThemeProvider from '../../ThemeProvider';

// Mock createPortal to make it work in tests
jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: (node: React.ReactNode) => node,
  };
});

describe('Toast Component', () => {
  beforeEach(() => {
    // Clean up the DOM before each test
    document.body.innerHTML = '';
    
    // Add root div for toast manager
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);
    
    // Reset any timers
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Clear all toasts after each test
    toast.removeAll();
    jest.useRealTimers();
  });

  // Test direct component usage
  test('renders Toast component with title and message', () => {
    render(
      <ThemeProvider>
        <Toast title="Test Title" message="Test Message" />
      </ThemeProvider>
    );

    expect(screen.getByTestId('orca-toast-title')).toHaveTextContent('Test Title');
    expect(screen.getByTestId('orca-toast-message')).toHaveTextContent('Test Message');
  });

  test('renders Toast with correct variant styling', () => {
    render(
      <ThemeProvider>
        <Toast variant="success" message="Success Message" />
      </ThemeProvider>
    );

    // Check that success icon is rendered
    const iconElement = screen.getByTestId('orca-toast-icon');
    expect(iconElement).toBeInTheDocument();
  });

  test('closes Toast when close button is clicked', async () => {
    const onCloseMock = jest.fn();
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <Toast message="Test Message" closable={true} onClose={onCloseMock} />
      </ThemeProvider>
    );

    // Click the close button
    const closeButton = screen.getByTestId('orca-toast-close');
    await user.click(closeButton);

    // Wait for animation to complete
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(onCloseMock).toHaveBeenCalled();
  });

  test('auto-closes after duration', () => {
    const onCloseMock = jest.fn();
    const duration = 1000;

    render(
      <ThemeProvider>
        <Toast message="Test Message" duration={duration} onClose={onCloseMock} />
      </ThemeProvider>
    );

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(duration + 300); // duration + animation time
    });

    expect(onCloseMock).toHaveBeenCalled();
  });

  test('pauses auto-close when hovered', () => {
    const onCloseMock = jest.fn();
    const duration = 1000;

    render(
      <ThemeProvider>
        <Toast message="Test Message" duration={duration} onClose={onCloseMock} pauseOnHover={true} />
      </ThemeProvider>
    );

    // Simulate mouse enter
    const toastElement = screen.getByTestId('orca-toast');
    act(() => {
      toastElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    });

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(duration + 300);
    });

    // onClose should not be called while hovering
    expect(onCloseMock).not.toHaveBeenCalled();

    // Simulate mouse leave
    act(() => {
      toastElement.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    });

    // Fast-forward time again
    act(() => {
      jest.advanceTimersByTime(duration + 300);
    });

    // Now onClose should be called
    expect(onCloseMock).toHaveBeenCalled();
  });

  // Test programmatic toast API
  describe('Programmatic Toast API', () => {
    // Setup ToastManager for programmatic tests
    beforeEach(() => {
      render(<ToastManager />);
    });

    test('shows success toast programmatically', async () => {
      act(() => {
        toast.success('Success Message');
      });

      await waitFor(() => {
        expect(screen.getByText('Success Message')).toBeInTheDocument();
      });
    });

    test('shows error toast programmatically', async () => {
      act(() => {
        toast.error('Error Message');
      });

      await waitFor(() => {
        expect(screen.getByText('Error Message')).toBeInTheDocument();
      });
    });

    test('shows warning toast programmatically', async () => {
      act(() => {
        toast.warning('Warning Message');
      });

      await waitFor(() => {
        expect(screen.getByText('Warning Message')).toBeInTheDocument();
      });
    });

    test('shows info toast programmatically', async () => {
      act(() => {
        toast.info('Info Message');
      });

      await waitFor(() => {
        expect(screen.getByText('Info Message')).toBeInTheDocument();
      });
    });

    test('shows custom toast programmatically', async () => {
      act(() => {
        toast.show({
          title: 'Custom Title',
          message: 'Custom Message',
          variant: 'default',
          position: 'top-right'
        });
      });

      await waitFor(() => {
        expect(screen.getByText('Custom Title')).toBeInTheDocument();
        expect(screen.getByText('Custom Message')).toBeInTheDocument();
      });
    });

    test('removes toast programmatically', async () => {
      let toastId: string;

      act(() => {
        toastId = toast.info('Info Message');
      });

      await waitFor(() => {
        expect(screen.getByText('Info Message')).toBeInTheDocument();
      });

      act(() => {
        toast.remove(toastId);
      });

      // Wait for animation to complete
      act(() => {
        jest.advanceTimersByTime(300);
      });

      await waitFor(() => {
        expect(screen.queryByText('Info Message')).not.toBeInTheDocument();
      });
    });

    test('removes all toasts programmatically', async () => {
      act(() => {
        toast.success('Success Message');
        toast.error('Error Message');
        toast.warning('Warning Message');
      });

      await waitFor(() => {
        expect(screen.getByText('Success Message')).toBeInTheDocument();
        expect(screen.getByText('Error Message')).toBeInTheDocument();
        expect(screen.getByText('Warning Message')).toBeInTheDocument();
      });

      act(() => {
        toast.removeAll();
      });

      // Wait for animation to complete
      act(() => {
        jest.advanceTimersByTime(300);
      });

      await waitFor(() => {
        expect(screen.queryByText('Success Message')).not.toBeInTheDocument();
        expect(screen.queryByText('Error Message')).not.toBeInTheDocument();
        expect(screen.queryByText('Warning Message')).not.toBeInTheDocument();
      });
    });
  });
});
