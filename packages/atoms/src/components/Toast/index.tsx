import React, { useState, useEffect, forwardRef, ReactNode } from 'react'
import { css } from '@emotion/css'
import { createPortal } from 'react-dom'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck,
  faCircleXmark,
  faCircleExclamation,
  faCircleInfo,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

// Toast position types
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top'
  | 'bottom'

// Toast variant types
export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default'

// Toast size types
export type ToastSize = 'sm' | 'md' | 'lg'

// Toast props interface
export interface ToastProps {
  // Content
  title?: ReactNode
  message: ReactNode

  // Appearance
  variant?: ToastVariant
  size?: ToastSize
  icon?: ReactNode

  // Behavior
  duration?: number
  closable?: boolean
  pauseOnHover?: boolean

  // Position
  position?: ToastPosition

  // Events
  onClose?: () => void

  // Styling
  className?: string
  style?: React.CSSProperties
  classNames?: {
    container?: string
    content?: string
    icon?: string
    textContainer?: string
    title?: string
    message?: string
    closeButton?: string
  }
}

/**
 * Toast Component
 *
 * A notification component that displays brief messages to users.
 * Can be used directly or via the programmatic API.
 */
const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      title,
      message,
      variant = 'default',
      size = 'md',
      icon,
      duration = 3000,
      closable = true,
      pauseOnHover = true,
      position = 'top',
      onClose,
      className = '',
      style,
      classNames = {},
    },
    ref
  ) => {
    // Get theme configuration
    const { theme } = useTheme()
    const toastConfig =
      theme.components?.toast || defaultThemeConfig.components?.toast

    // Component state
    const [isVisible, setIsVisible] = useState(true)
    const [isPaused, setIsPaused] = useState(false)

    // Auto-close timer
    useEffect(() => {
      if (!isVisible || isPaused || duration === 0) return

      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }, [duration, isVisible, isPaused])

    // Handle close
    const handleClose = () => {
      setIsVisible(false)
      setTimeout(() => {
        onClose?.()
      }, 300) // Animation duration
    }

    // Default icons based on variant
    const getDefaultIcon = () => {
      switch (variant) {
        case 'success':
          return <FontAwesomeIcon icon={faCircleCheck} />
        case 'error':
          return <FontAwesomeIcon icon={faCircleXmark} />
        case 'warning':
          return <FontAwesomeIcon icon={faCircleExclamation} />
        case 'info':
          return <FontAwesomeIcon icon={faCircleInfo} />
        default:
          return null
      }
    }

    // Get theme configuration for the current variant and size
    const variantConfig = toastConfig?.variants?.[variant] || {}
    const sizeConfig = toastConfig?.sizes?.[size] || {}

    // Base styles
    const baseStyles = css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: sizeConfig.maxWidth || '380px',
      padding: sizeConfig.padding || '12px',
      borderRadius: toastConfig?.base?.radius || '8px',
      boxShadow:
        toastConfig?.base?.shadow || '0px 8px 28px -8px rgba(61,72,107,0.2)',
      opacity: isVisible ? 1 : 0,
      transform: `translateY(${isVisible ? '0' : '-20px'})`,
      transition: 'all 0.3s ease-in-out',
      backgroundColor: variantConfig.backgroundColor || '#ffffff',
      color: variantConfig.textColor || '#3D445C',
      border: variantConfig.borderColor
        ? `1px solid ${variantConfig.borderColor}`
        : 'none',
      fontFamily: toastConfig?.base?.fontFamily || 'IBM Plex Sans, sans-serif',
      fontSize: sizeConfig.fontSize || '14px',
      fontWeight: toastConfig?.base?.fontWeight || '500',
      lineHeight: toastConfig?.base?.lineHeight || '1.4',
      ...style,
    })

    // Content styles
    const contentStyles = css({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexGrow: 1,
    })

    // Icon styles
    const iconStyles = css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: variantConfig.iconColor || variantConfig.textColor || '#3D445C',
      fontSize: sizeConfig.iconSize || '20px',
      flexShrink: 0,
    })

    // Text container styles
    const textContainerStyles = css({
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      flexGrow: 1,
    })

    // Title styles
    const titleStyles = css({
      fontWeight: '600',
      fontSize: sizeConfig.titleSize || '14px',
      lineHeight: '1.4',
      margin: 0,
    })

    // Message styles
    const messageStyles = css({
      fontSize: sizeConfig.messageSize || '12px',
      lineHeight: '1.4',
      margin: 0,
    })

    // Close button styles
    const closeButtonStyles = css({
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      color: variantConfig.iconColor || variantConfig.textColor || '#3D445C',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '8px',
      flexShrink: 0,
      opacity: 0.7,
      transition: 'opacity 0.2s ease',
      '&:hover': {
        opacity: 1,
      },
    })

    // Render component
    return (
      <div
        ref={ref}
        className={`${baseStyles} ${className}`}
        onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
        onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
        data-testid='orca-toast'
      >
        <div className={`${contentStyles} ${classNames.content || ''}`}>
          {(icon !== undefined || getDefaultIcon()) && (
            <div
              className={`${iconStyles} ${classNames.icon || ''}`}
              data-testid='orca-toast-icon'
            >
              {icon !== undefined ? icon : getDefaultIcon()}
            </div>
          )}
          <div className={textContainerStyles}>
            {title && (
              <div
                className={`${titleStyles} ${classNames.title || ''}`}
                data-testid='orca-toast-title'
              >
                {title}
              </div>
            )}
            <div
              className={`${messageStyles} ${classNames.message || ''}`}
              data-testid='orca-toast-message'
            >
              {message}
            </div>
          </div>
        </div>

        {closable && (
          <button
            type='button'
            className={`${closeButtonStyles} ${classNames.closeButton || ''}`}
            onClick={handleClose}
            aria-label='Close'
            data-testid='orca-toast-close'
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>
    )
  }
)

// Programmatic toast manager
type ToastItem = ToastProps & { id: string }

interface ToastContainerProps {
  position: ToastPosition
  toasts: ToastItem[]
  onRemove: (id: string) => void
}

/**
 * ToastContainer Component
 *
 * Container for managing multiple toasts at a specific position.
 */
const ToastContainer: React.FC<ToastContainerProps> = ({
  position,
  toasts,
  onRemove,
}) => {
  // Position styles
  const containerStyles = css({
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxWidth: '100%',
    zIndex: 9999,
    padding: '16px',
    pointerEvents: 'none',

    // Position-specific styles
    ...(position === 'top-right' && {
      top: 0,
      right: 0,
      alignItems: 'flex-end',
    }),
    ...(position === 'top-left' && {
      top: 0,
      left: 0,
      alignItems: 'flex-start',
    }),
    ...(position === 'bottom-right' && {
      bottom: 0,
      right: 0,
      alignItems: 'flex-end',
    }),
    ...(position === 'bottom-left' && {
      bottom: 0,
      left: 0,
      alignItems: 'flex-start',
    }),
    ...(position === 'top' && {
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      alignItems: 'center',
    }),
    ...(position === 'bottom' && {
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      alignItems: 'center',
    }),
  })

  // Toast wrapper styles (to enable pointer events)
  const toastWrapperStyles = css({
    pointerEvents: 'auto',
    width: '100%',
  })

  // Render component
  return (
    <div
      className={containerStyles}
      data-testid={`orca-toast-container-${position}`}
    >
      {toasts.map((toast) => (
        <div key={toast.id} className={toastWrapperStyles}>
          <Toast {...toast} onClose={() => onRemove(toast.id)} />
        </div>
      ))}
    </div>
  )
}

// Toast container registry
const containers: Record<ToastPosition, HTMLDivElement | null> = {
  'top-right': null,
  'top-left': null,
  'bottom-right': null,
  'bottom-left': null,
  top: null,
  bottom: null,
}

/**
 * Get or create a container element for a specific position
 */
const getContainer = (position: ToastPosition): HTMLDivElement => {
  if (!containers[position]) {
    const container = document.createElement('div')
    container.id = `orca-toast-container-${position}`
    document.body.appendChild(container)
    containers[position] = container
  }
  return containers[position]!
}

// Toast store
let toasts: Record<ToastPosition, ToastItem[]> = {
  'top-right': [],
  'top-left': [],
  'bottom-right': [],
  'bottom-left': [],
  top: [],
  bottom: [],
}

// Subscribers for state changes
let subscribers: Array<() => void> = []

/**
 * Subscribe to toast state changes
 */
const subscribe = (callback: () => void) => {
  subscribers.push(callback)
  return () => {
    subscribers = subscribers.filter((cb) => cb !== callback)
  }
}

/**
 * Notify subscribers of state changes
 */
const notify = () => {
  subscribers.forEach((callback) => callback())
}

/**
 * Add a toast to the store
 */
const addToast = (props: ToastProps): string => {
  const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const position = props.position || 'top'

  toasts[position] = [...toasts[position], { ...props, id }]

  notify()
  return id
}

/**
 * Remove a toast from the store
 */
const removeToast = (id: string) => {
  Object.keys(toasts).forEach((pos) => {
    const position = pos as ToastPosition
    toasts[position] = toasts[position].filter((toast) => toast.id !== id)
  })

  notify()
}

/**
 * Remove all toasts from the store
 */
const removeAllToasts = () => {
  Object.keys(toasts).forEach((pos) => {
    const position = pos as ToastPosition
    toasts[position] = []
  })

  notify()
}

/**
 * ToastManager Component
 *
 * Manages the rendering of toasts at different positions.
 */
export const ToastManager: React.FC = () => {
  const [state, setState] = useState(toasts)

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setState({ ...toasts })
    })

    return unsubscribe
  }, [])

  return (
    <>
      {(Object.entries(state) as [ToastPosition, ToastItem[]][]).map(
        ([position, positionToasts]) => {
          if (positionToasts.length === 0) return null

          return createPortal(
            <ToastContainer
              key={position}
              position={position as ToastPosition}
              toasts={positionToasts}
              onRemove={removeToast}
            />,
            getContainer(position as ToastPosition)
          )
        }
      )}
    </>
  )
}

/**
 * Programmatic toast API
 */
export const toast = {
  /**
   * Show a toast with custom configuration
   */
  show: (props: ToastProps) => {
    return addToast(props)
  },

  /**
   * Show a success toast
   */
  success: (
    message: ReactNode,
    props: Omit<ToastProps, 'message' | 'variant'> = {}
  ) => {
    return toast.show({ message, variant: 'success', ...props })
  },

  /**
   * Show an error toast
   */
  error: (
    message: ReactNode,
    props: Omit<ToastProps, 'message' | 'variant'> = {}
  ) => {
    console.error(`Toast error: ${message}`)
    return toast.show({ message, variant: 'error', ...props })
  },

  /**
   * Show a warning toast
   */
  warning: (
    message: ReactNode,
    props: Omit<ToastProps, 'message' | 'variant'> = {}
  ) => {
    return toast.show({ message, variant: 'warning', ...props })
  },

  /**
   * Show an info toast
   */
  info: (
    message: ReactNode,
    props: Omit<ToastProps, 'message' | 'variant'> = {}
  ) => {
    return toast.show({ message, variant: 'info', ...props })
  },

  /**
   * Remove a specific toast
   */
  remove: (id: string) => {
    removeToast(id)
  },

  /**
   * Remove all toasts
   */
  removeAll: () => {
    removeAllToasts()
  },
}

// Export the Toast component as default
export default Toast
