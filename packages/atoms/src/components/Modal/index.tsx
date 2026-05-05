import React, {useState, useEffect, FC, ReactNode} from "react";
import {css} from "@emotion/css";
import ReactDOM from "react-dom";
import {useTheme} from "../ThemeProvider";
import {defaultThemeConfig} from "../../config/config";
import Spinner from "../Spinner";

export type ModalSize = "sm" | "md" | "lg";
export type ModalVariant = "default" | "info" | "success" | "warning" | "error";

export interface ModalProps {
  // Control props
  isOpen?: boolean;
  onClose?: () => void;
  onOk?: () => void;

  // Content props
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode | null;

  // Style props
  variant?: ModalVariant;
  size?: ModalSize;
  width?: number | string;
  centered?: boolean;
  closable?: boolean;
  closeIcon?: ReactNode;
  maskClosable?: boolean;

  // Loading state
  loading?: boolean;
  okButtonProps?: {
    loading?: boolean;
    disabled?: boolean;
    text?: string;
  };
  cancelButtonProps?: {
    disabled?: boolean;
    text?: string;
  };

  // Custom style props
  className?: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;

  // Animation props
  animation?: {
    duration?: number;
    timingFunction?: string;
  };

  // Z-index
  zIndex?: number;
}

export interface ModalSectionProps {
  children: ReactNode;
  style?: Record<string, string>;
}

export interface ResponsiveModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  title?: string;
  footer?: ReactNode | null;
  centered?: boolean;
  modalStyle?: React.CSSProperties;
  bottomsheetStyle?: React.CSSProperties;
  modalCrossButtonStyle?: React.CSSProperties;
  bottomsheetCrossButtonStyle?: React.CSSProperties;
  closable?: boolean;
  loading?: boolean;
}

export interface ResponsiveModal extends FC<ResponsiveModalProps> {
  header: FC<ModalSectionProps>;
  body: FC<ModalSectionProps>;
  footer: FC<ModalSectionProps>;
}

export interface BottomSheetProps
  extends Omit<ModalProps, "variant" | "size" | "width" | "centered"> {
  crossButtonStyle?: React.CSSProperties;
}

const LoadingSpinner = () => <Spinner size="sm" variant="default" />;

const CloseIcon = () => {
  const iconStyles = css({
    height: "1.25rem",
    width: "1.25rem",
  });

  return (
    <svg
      className={iconStyles}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  onClose,
  onOk,
  title,
  children,
  footer,
  variant = "default",
  size = "md",
  width,
  centered = false,
  closable = true,
  closeIcon,
  maskClosable = true,
  loading = false,
  okButtonProps = {},
  cancelButtonProps = {},
  className = "",
  style,
  bodyStyle,
  maskStyle,
  headerStyle,
  footerStyle,
  animation = {
    duration: 300,
    timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  zIndex = 1000,
}): JSX.Element | null => {
  const {theme} = useTheme();
  const modalConfig =
    theme.components?.modal || defaultThemeConfig.components.modal;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle click outside
  const handleMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && maskClosable && !loading) {
      onClose?.();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && closable && !loading) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, closable, loading, onClose]);

  // STYLING WITH EMOTION

  // 1. Container styles
  const containerStyles = css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: centered ? "center" : "flex-start",
    paddingTop: centered ? 0 : "4rem",
    zIndex: zIndex,
  });

  // 2. Mask/backdrop styles
  const maskBaseStyles = css({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    ...(maskStyle || {}),
  });

  // 3. Get variant configuration
  const variantConfig = modalConfig.variants[variant] || {};

  // 4. Modal content styles
  const modalStyles = css({
    position: "relative",
    width: width
      ? width
      : size === "sm"
      ? "400px"
      : size === "md"
      ? "560px"
      : "720px",
    padding: size === "sm" ? "1rem" : size === "md" ? "1.5rem" : "2rem",
    backgroundColor:
      variantConfig.backgroundColor?.replace("bg-", "") || "#FFFFFF",
    color: variantConfig.textColor?.replace("text-", "") || "#1E1A1A",
    borderRadius: "0.5rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transform: isOpen ? "scale(1)" : "scale(0.95)",
    opacity: isOpen ? 1 : 0,
    transition: `all ${animation.duration}ms ${animation.timingFunction}`,
    maxHeight: "90vh",
    overflowY: "auto",
    ...(style || {}),
  });

  // 5. Header styles
  const headerStyles = css({
    borderBottom: `1px solid ${
      variantConfig.borderColor?.replace("border-", "") || "#E5E7EB"
    }`,
    paddingBottom: "1rem",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ...((headerStyle as Record<string, unknown>) || {}),
  });

  // 6. Body styles
  const bodyStyles = css({
    marginBottom: footer === null ? 0 : "1rem",
    ...((bodyStyle as Record<string, unknown>) || {}),
  });

  // 7. Footer styles
  const footerStyles = css({
    borderTop:
      footer === null
        ? "none"
        : `1px solid ${
            variantConfig.borderColor?.replace("border-", "") || "#E5E7EB"
          }`,
    paddingTop: footer === null ? 0 : "1rem",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.75rem",
    ...((footerStyle as Record<string, unknown>) || {}),
  });

  // 8. Close button styles
  const closeButtonStyles = css({
    position: "absolute",
    top: "0.75rem",
    right: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "9999px",
    background: "transparent",
    cursor: "pointer",
    transition: "background-color 200ms",
    border: "none",
    padding: "0.5rem",
    "&:hover": {
      backgroundColor: "#F3F4F6",
    },
    "&:focus": {
      outline: "none",
    },
  });

  // 9. Button styles
  const buttonBaseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    fontWeight: 500,
    cursor: loading ? "not-allowed" : "pointer",
    transition: "all 150ms",
    border: "none",
    fontSize: "0.875rem",
  };

  const cancelButtonStyles = css({
    ...buttonBaseStyles,
    backgroundColor: "#F3F4F6",
    color: "#374151",
    "&:hover": {
      backgroundColor: "#E5E7EB",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  });

  const okButtonStyles = css({
    ...buttonBaseStyles,
    backgroundColor: "#3B82F6",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#2563EB",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  });

  const svgStyles = css({
    width: "1.25rem",
    height: "1.25rem",
  });

  if (!mounted) {
    return null;
  }

  // Default footer if not provided
  const renderFooter = () => {
    if (footer === null) {
      return null;
    }

    if (footer !== undefined) {
      return <div className={footerStyles}>{footer}</div>;
    }

    return (
      <div className={footerStyles}>
        <button
          onClick={onClose}
          disabled={cancelButtonProps.disabled || loading}
          className={cancelButtonStyles}
        >
          {cancelButtonProps.text || "Cancel"}
        </button>
        <button
          onClick={onOk}
          disabled={okButtonProps.disabled || loading}
          className={okButtonStyles}
        >
          {okButtonProps.loading || loading ? (
            <>
              <LoadingSpinner />{" "}
              <span style={{marginLeft: "0.5rem"}}>
                {okButtonProps.text || "OK"}
              </span>
            </>
          ) : (
            okButtonProps.text || "OK"
          )}
        </button>
      </div>
    );
  };

  const modalContent = (
    <div className={`${containerStyles} ${className}`}>
      <div className={maskBaseStyles} onClick={handleMaskClick} />
      <div className={modalStyles}>
        {closable && (
          <button
            type="button"
            className={closeButtonStyles}
            onClick={onClose}
            disabled={loading}
          >
            {closeIcon || <CloseIcon />}
          </button>
        )}
        {title && (
          <div className={headerStyles}>
            <h3>{title}</h3>
          </div>
        )}
        <div className={bodyStyles}>{children}</div>
        {renderFooter()}
      </div>
    </div>
  );

  return isOpen ? ReactDOM.createPortal(modalContent, document.body) : null;
};

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen = false,
  onClose,
  children,
  footer,
  closable = true,
  style,
  crossButtonStyle,
  loading = false,
  className = "",
  bodyStyle,
  headerStyle,
  footerStyle,
  maskStyle,
  animation = {
    duration: 300,
    timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  zIndex = 1000,
}): JSX.Element | null => {
  const {theme} = useTheme();
  const modalConfig =
    theme.components?.modal || defaultThemeConfig.components.modal;
  const [mounted, setMounted] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle touch events for dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    if (diff > 0) setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (dragOffset > 100) {
      onClose?.();
    }
    setDragOffset(0);
  };

  // STYLING WITH EMOTION

  // 1. Container styles
  const containerStyles = css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    zIndex: zIndex,
  });

  // 2. Mask/backdrop styles
  const maskStyles = css({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    transition: `opacity ${animation.duration}ms ${animation.timingFunction}`,
    opacity: isOpen ? 1 : 0,
    ...(maskStyle || {}),
  });

  // 3. BottomSheet content styles
  const bottomSheetStyles = css({
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: "0.75rem",
    borderTopRightRadius: "0.75rem",
    boxShadow: "0 -10px 25px -5px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxHeight: "90%",
    overflowY: "auto",
    padding: "1rem",
    transition: `transform ${animation.duration}ms ${animation.timingFunction}`,
    transform: `translateY(${isOpen ? dragOffset : "100%"})`,
    ...(style || {}),
  });

  // 4. Drag handle styles
  const dragHandleStyles = css({
    width: "40px",
    height: "4px",
    backgroundColor: "#CBD5E0",
    borderRadius: "2px",
    margin: "0 auto 16px",
  });

  // 5. Close button styles
  const closeButtonStyles = css({
    position: "absolute",
    top: "12px",
    right: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.75rem",
    height: "1.75rem",
    background: "transparent",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#F3F4F6",
    },
    ...(crossButtonStyle || {}),
  });

  // 6. Content styles
  const contentStyles = css({
    marginBottom: footer === null ? 0 : "1rem",
    ...(bodyStyle || {}),
  });

  // 7. Footer styles
  const bottomSheetFooterStyles = css({
    borderTop: footer === null ? "none" : "1px solid #e5e7eb",
    paddingTop: footer === null ? 0 : "0.75rem",
    marginTop: footer === null ? 0 : "1rem",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
    ...((footerStyle as Record<string, unknown>) || {}),
  });

  // Render footer for BottomSheet
  const renderBottomSheetFooter = () => {
    if (footer === null) {
      return null;
    }

    if (footer !== undefined) {
      return <div className={bottomSheetFooterStyles}>{footer}</div>;
    }

    // Default footer - BottomSheet doesn't have default buttons like Modal
    return null;
  };

  if (!mounted) return null;

  const bottomSheetElement = (
    <div
      className={`${containerStyles} ${className}`}
      style={{zIndex}}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className={maskStyles} onClick={onClose} />

      {/* BottomSheet */}
      <div
        className={bottomSheetStyles}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle */}
        <div className={dragHandleStyles} />

        {/* Close button */}
        {closable && (
          <button
            type="button"
            onClick={onClose}
            className={closeButtonStyles}
            disabled={loading}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        )}

        {/* Content */}
        <div className={contentStyles}>{children}</div>
        
        {/* Footer */}
        {renderBottomSheetFooter()}
      </div>
    </div>
  );

  return isOpen
    ? ReactDOM.createPortal(bottomSheetElement, document.body)
    : null;
};

// Section components for ResponsiveModal
const Header: FC<ModalSectionProps> = ({children, style = {}}) => {
  const headerStyles = css({
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "0.75rem",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ...style,
  });

  return <div className={headerStyles}>{children}</div>;
};

const Body: FC<ModalSectionProps> = ({children, style = {}}) => {
  const bodyStyles = css({
    width: "100%",
    ...style,
  });

  return <div className={bodyStyles}>{children}</div>;
};

const Footer: FC<ModalSectionProps> = ({children, style = {}}) => {
  const footerStyles = css({
    borderTop: "1px solid #e5e7eb",
    paddingTop: "0.75rem",
    marginTop: "1rem",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
    ...style,
  });

  return <div className={footerStyles}>{children}</div>;
};

// Responsive Modal implementation
const ResponsiveModalBase: FC<ResponsiveModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  footer,
  centered = false,
  modalStyle,
  bottomsheetStyle,
  modalCrossButtonStyle,
  bottomsheetCrossButtonStyle,
  closable = true,
  loading = false,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      closable={closable}
      loading={loading}
      style={bottomsheetStyle}
      crossButtonStyle={bottomsheetCrossButtonStyle}
      footer={footer}
    >
      {children}
    </BottomSheet>
  ) : (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      centered={centered}
      closable={closable}
      loading={loading}
      style={modalStyle}
      headerStyle={modalCrossButtonStyle ? {position: "relative"} : {}}
    >
      {children}
    </Modal>
  );
};

const ResponsiveModalComponent = Object.assign(ResponsiveModalBase, {
  header: Header,
  body: Body,
  footer: Footer,
}) as ResponsiveModal;

export default ResponsiveModalComponent;
