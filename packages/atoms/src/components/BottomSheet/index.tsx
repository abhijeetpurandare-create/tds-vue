import React from 'react';
import { useTheme } from '../ThemeProvider';
import MobileSheetWrapper from '../MobileSheetWrapper';
import {
  buildHeaderStyles,
  buildHeaderLeftStyles,
  buildHeaderTitleBlockStyles,
  buildTitleStyles,
  buildSubtextStyles,
  buildIconWrapStyles,
  buildCloseButtonStyles,
  buildBodyStyles,
  buildIllustrationBoxStyles,
  buildBodyTextBlockStyles,
  buildBodyTitleStyles,
  buildBodyDescStyles,
  buildCheckboxRowStyles,
  buildFooterHorizontalStyles,
  buildFooterVerticalStyles,
  buildSlotStyles,
  buildSlotHeaderStyles,
  buildSlotHeaderSmallStyles,
} from './useBottomSheetStyles';
import type { BottomSheetThemeConfig, BuildBottomSheetStylesParams } from './useBottomSheetStyles';

export type BottomSheetType = 'standard' | 'slotMini' | 'slotDual' | 'slot' | (string & {});
export type BottomSheetCtaStyle = 'horizontal' | 'vertical' | (string & {});
export type IllustrationType = 'success' | 'download' | 'error' | 'warning' | 'caution';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose?: () => void;
  cancellable?: boolean;
  sheetType?: BottomSheetType;
  ctaStyle?: BottomSheetCtaStyle;
  showHeader?: boolean;
  title?: string;
  subtext?: string;
  headerIcon?: React.ReactNode;
  snackbar?: React.ReactNode;
  illustration?: React.ReactNode;
  illustrationType?: IllustrationType;
  bodyTitle?: string;
  bodyDescription?: string;
  checkboxContent?: React.ReactNode;
  footer?: React.ReactNode;
  slotContent?: React.ReactNode;
  slotHeader?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  crossButtonStyle?: React.CSSProperties;
}

const CloseIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
  </svg>
);

/* ── Built-in Figma Dialog Box Illustrations ── */

const ILLUSTRATION_CONFIGS: Record<IllustrationType, {
  bgPath: string; fgPath: string; badgeBg: string; badgeIcon: React.ReactNode;
}> = {
  success: {
    bgPath: 'M25.79 1.53L1.34 8.12C0.64 8.31 0.23 9.06 0.42 9.8L9.29 43.61C9.48 44.35 10.21 44.79 10.91 44.6L35.36 38.01C36.06 37.82 36.47 37.07 36.28 36.34L27.41 2.53C27.22 1.79 26.49 1.34 25.79 1.53Z',
    fgPath: 'M36.96 14.03C36.98 14.03 36.99 14.05 36.99 14.06L29.43 43.35C29.21 44.23 28.32 44.74 27.45 44.5L3.63 37.87C2.76 37.63 2.24 36.72 2.47 35.85L11.31 1.58C11.53 0.71 12.42 0.2 13.29 0.44L32.23 5.71C32.24 5.71 32.24 5.71 32.24 5.72L32.3 5.83L36.95 14.01C36.95 14.02 36.96 14.03 36.96 14.03Z',
    badgeBg: '#1BA86E',
    badgeIcon: <path d="M29.67 35.63L27.92 33.88L27.33 34.46L29.67 36.79L34.67 31.79L34.08 31.21L29.67 35.63Z" fill="#F2F2F2"/>,
  },
  download: {
    bgPath: 'M25.79 1.53L1.34 8.12C0.64 8.31 0.23 9.06 0.42 9.8L9.29 43.61C9.48 44.35 10.21 44.79 10.91 44.6L35.36 38.01C36.06 37.82 36.47 37.07 36.28 36.34L27.41 2.53C27.22 1.79 26.49 1.34 25.79 1.53Z',
    fgPath: 'M36.96 14.03C36.98 14.03 36.99 14.05 36.99 14.06L29.43 43.35C29.21 44.23 28.32 44.74 27.45 44.5L3.63 37.87C2.76 37.63 2.24 36.72 2.47 35.85L11.31 1.58C11.53 0.71 12.42 0.2 13.29 0.44L32.23 5.71C32.24 5.71 32.24 5.71 32.24 5.72L32.3 5.83L36.95 14.01C36.95 14.02 36.96 14.03 36.96 14.03Z',
    badgeBg: '#242938',
    badgeIcon: <path d="M31.5 30.17L31.5 34.5L30.5 34.5L30.5 30.17L29.09 31.58L28.38 30.88L31 28.25L33.62 30.88L32.91 31.58L31.5 30.17Z" fill="#F2F2F2" transform="rotate(180 31 31.375)"/>,
  },
  error: {
    bgPath: 'M25.79 1.53L1.34 8.12C0.64 8.31 0.23 9.06 0.42 9.8L9.29 43.61C9.48 44.35 10.21 44.79 10.91 44.6L35.36 38.01C36.06 37.82 36.47 37.07 36.28 36.34L27.41 2.53C27.22 1.79 26.49 1.34 25.79 1.53Z',
    fgPath: 'M36.96 14.03C36.98 14.03 36.99 14.05 36.99 14.06L29.43 43.35C29.21 44.23 28.32 44.74 27.45 44.5L3.63 37.87C2.76 37.63 2.24 36.72 2.47 35.85L11.31 1.58C11.53 0.71 12.42 0.2 13.29 0.44L32.23 5.71C32.24 5.71 32.24 5.71 32.24 5.72L32.3 5.83L36.95 14.01C36.95 14.02 36.96 14.03 36.96 14.03Z',
    badgeBg: '#DC143C',
    badgeIcon: <path d="M33.25 30.38L32.37 29.5L31 30.87L29.63 29.5L28.75 30.38L30.12 31.75L28.75 33.12L29.63 34L31 32.63L32.37 34L33.25 33.12L31.88 31.75L33.25 30.38Z" fill="#F2F2F2"/>,
  },
  warning: {
    bgPath: 'M25.79 1.53L1.34 8.12C0.64 8.31 0.23 9.06 0.42 9.8L9.29 43.61C9.48 44.35 10.21 44.79 10.91 44.6L35.36 38.01C36.06 37.82 36.47 37.07 36.28 36.34L27.41 2.53C27.22 1.79 26.49 1.34 25.79 1.53Z',
    fgPath: 'M36.96 14.03C36.98 14.03 36.99 14.05 36.99 14.06L29.43 43.35C29.21 44.23 28.32 44.74 27.45 44.5L3.63 37.87C2.76 37.63 2.24 36.72 2.47 35.85L11.31 1.58C11.53 0.71 12.42 0.2 13.29 0.44L32.23 5.71C32.24 5.71 32.24 5.71 32.24 5.72L32.3 5.83L36.95 14.01C36.95 14.02 36.96 14.03 36.96 14.03Z',
    badgeBg: '#E9B303',
    badgeIcon: <path d="M31 29.25C30.59 29.25 30.25 29.59 30.25 30V32C30.25 32.41 30.59 32.75 31 32.75C31.41 32.75 31.75 32.41 31.75 32V30C31.75 29.59 31.41 29.25 31 29.25ZM31 33.25C30.59 33.25 30.25 33.59 30.25 34C30.25 34.41 30.59 34.75 31 34.75C31.41 34.75 31.75 34.41 31.75 34C31.75 33.59 31.41 33.25 31 33.25Z" fill="#F2F2F2"/>,
  },
  caution: {
    bgPath: 'M25.79 1.53L1.34 8.12C0.64 8.31 0.23 9.06 0.42 9.8L9.29 43.61C9.48 44.35 10.21 44.79 10.91 44.6L35.36 38.01C36.06 37.82 36.47 37.07 36.28 36.34L27.41 2.53C27.22 1.79 26.49 1.34 25.79 1.53Z',
    fgPath: 'M36.96 14.03C36.98 14.03 36.99 14.05 36.99 14.06L29.43 43.35C29.21 44.23 28.32 44.74 27.45 44.5L3.63 37.87C2.76 37.63 2.24 36.72 2.47 35.85L11.31 1.58C11.53 0.71 12.42 0.2 13.29 0.44L32.23 5.71C32.24 5.71 32.24 5.71 32.24 5.72L32.3 5.83L36.95 14.01C36.95 14.02 36.96 14.03 36.96 14.03Z',
    badgeBg: '#E77337',
    badgeIcon: <path d="M31.38 29.88L31.38 32.25L30.63 32.25L30.63 29.88L31.38 29.88ZM30.63 33L31.38 33L31.38 33.75L30.63 33.75L30.63 33Z" fill="#F2F2F2"/>,
  },
};

export const DialogBoxIllustration: React.FC<{ type?: IllustrationType }> = ({ type = 'success' }) => {
  const cfg = ILLUSTRATION_CONFIGS[type] || ILLUSTRATION_CONFIGS.success;
  return (
    <svg width="39" height="45" viewBox="0 0 39 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={cfg.bgPath} fill="#DCDCDC" fillOpacity="0.5"/>
      <path d={cfg.fgPath} fill="white" stroke="#E6E6E6" strokeWidth="0.41" strokeMiterlimit="10"/>
      <path d="M29.56 18.41L14.41 14.09C14.05 13.98 13.69 14.19 13.59 14.55C13.5 14.91 13.71 15.29 14.07 15.39L29.22 19.71C29.58 19.81 29.94 19.6 30.04 19.25C30.13 18.89 29.92 18.51 29.56 18.41Z" fill="#D4D4D4"/>
      <path d="M21.85 12.53L15.32 10.67C14.96 10.57 14.59 10.78 14.5 11.14C14.4 11.5 14.61 11.87 14.97 11.97L21.51 13.84C21.87 13.94 22.23 13.73 22.33 13.37C22.42 13.01 22.21 12.64 21.85 12.53Z" fill="#D4D4D4"/>
      <path d="M25.94 20.88L13.55 17.34C13.19 17.24 12.83 17.45 12.73 17.81C12.64 18.17 12.85 18.54 13.21 18.64L25.6 22.18C25.96 22.28 26.32 22.07 26.42 21.71C26.51 21.35 26.3 20.98 25.94 20.88Z" fill="#D4D4D4"/>
      <path d="M20.07 27.78L11.46 25.32C11.1 25.22 10.73 25.43 10.64 25.79C10.54 26.15 10.75 26.52 11.11 26.62L19.73 29.08C20.09 29.18 20.45 28.97 20.55 28.61C20.64 28.26 20.43 27.88 20.07 27.78Z" fill="#D4D4D4"/>
      <path d="M15.79 22.88L12.36 21.9C12 21.8 11.64 22.01 11.54 22.37C11.45 22.73 11.66 23.1 12.02 23.21L15.44 24.18C15.8 24.28 16.17 24.08 16.26 23.72C16.36 23.36 16.14 22.98 15.79 22.88Z" fill="#D4D4D4"/>
      <path d="M17.55 30.56L10.6 28.58C10.24 28.47 9.87 28.68 9.78 29.04C9.68 29.4 9.9 29.78 10.25 29.88L17.21 31.86C17.56 31.96 17.93 31.75 18.03 31.39C18.12 31.04 17.91 30.66 17.55 30.56Z" fill="#D4D4D4"/>
      <path d="M36.54 14.2C36.69 14.48 36.5 14.81 36.19 14.81H32.55C30.87 14.81 29.67 13.14 30.2 11.54L31.84 6.54C31.91 6.31 32.22 6.27 32.35 6.48L36.54 14.2Z" fill="#3D445C" fillOpacity="0.12"/>
      <path d="M36.7 13.64C36.88 13.96 36.6 14.33 36.25 14.24L32.64 13.23C31.34 12.87 30.56 11.51 30.9 10.2L32.06 5.69C32.07 5.64 32.14 5.63 32.16 5.68L36.7 13.64Z" fill="#D9D8D8" stroke="#E6E6E6" strokeWidth="0.41" strokeMiterlimit="10"/>
      <circle cx="31" cy="34" r="8" fill={cfg.badgeBg}/>
      <circle cx="31" cy="34" r="7.44" stroke="white" strokeWidth="1.125"/>
      <g clipPath="url(#bs-clip)">{cfg.badgeIcon}</g>
      <defs><clipPath id="bs-clip"><rect width="9" height="9" fill="white" transform="translate(26.5 29.5)"/></clipPath></defs>
    </svg>
  );
};

/* ── Sub-components for compound pattern ── */

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
Header.displayName = 'BottomSheet.Header';

const Body: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
Body.displayName = 'BottomSheet.Body';

const Footer: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
Footer.displayName = 'BottomSheet.Footer';

const Slot: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
Slot.displayName = 'BottomSheet.Slot';

/* ── Main component ── */

const BottomSheetBase: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  cancellable = true,
  sheetType = 'standard',
  ctaStyle = 'horizontal',
  showHeader = true,
  title,
  subtext,
  headerIcon,
  snackbar,
  illustration,
  illustrationType,
  bodyTitle,
  bodyDescription,
  checkboxContent,
  footer,
  slotContent,
  slotHeader,
  children,
  className = '',
  style = {},
  crossButtonStyle = {},
}) => {
  const { theme } = useTheme();
  const config: BottomSheetThemeConfig = theme.components?.bottomSheet || {};
  const sp: BuildBottomSheetStylesParams = { config };

  const isSlotType = sheetType === 'slot' || sheetType === 'slotDual' || sheetType === 'slotMini';
  const hasSlotHeader = sheetType === 'slotDual' || sheetType === 'slot';

  /* Collect compound children */
  const compoundBody: React.ReactNode[] = [];
  const compoundFooter: React.ReactNode[] = [];
  const compoundSlot: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const t = (child.type as any)?.displayName;
    if (t === 'BottomSheet.Footer') compoundFooter.push(child.props.children);
    else if (t === 'BottomSheet.Slot') compoundSlot.push(child.props.children);
    else if (t === 'BottomSheet.Body') compoundBody.push(child.props.children);
    else compoundBody.push(child);
  });

  const resolvedFooter = footer || (compoundFooter.length > 0 ? compoundFooter : null);
  const resolvedSlot = slotContent || (compoundSlot.length > 0 ? compoundSlot : null);
  const resolvedBody = compoundBody.length > 0 ? compoundBody : null;

  return (
    <MobileSheetWrapper isOpen={isOpen} onClose={onClose} className={className} style={style}>
      {/* Header */}
      {showHeader && (
        <div className={buildHeaderStyles(sp)} data-testid="bottomsheet-header">
          <div className={buildHeaderLeftStyles(sp)}>
            {hasSlotHeader && slotHeader ? (
              <div className={sheetType === 'slotDual' ? buildSlotHeaderStyles(sp) : buildSlotHeaderSmallStyles()}>
                {slotHeader}
              </div>
            ) : headerIcon ? (
              <div className={buildIconWrapStyles(sp)}>{headerIcon}</div>
            ) : null}
            <div className={buildHeaderTitleBlockStyles()}>
              {title && <p className={buildTitleStyles(sp)}>{title}</p>}
              {subtext && <p className={buildSubtextStyles(sp)}>{subtext}</p>}
            </div>
          </div>
          {cancellable && (
            <button
              type="button"
              onClick={onClose}
              className={buildCloseButtonStyles()}
              style={crossButtonStyle}
              aria-label="Close bottom sheet"
              data-testid="bottomsheet-close"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      )}

      {/* Snackbar */}
      {snackbar && <div data-testid="bottomsheet-snackbar">{snackbar}</div>}

      {/* Body */}
      <div className={buildBodyStyles(sp)} data-testid="bottomsheet-body">
        {isSlotType && resolvedSlot ? (
          <>
            <div className={buildSlotStyles(sp)} data-testid="bottomsheet-slot">
              {resolvedSlot}
            </div>
            {(bodyTitle || bodyDescription) && (
              <div className={buildBodyTextBlockStyles(sp)}>
                {bodyTitle && <p className={buildBodyTitleStyles(sp)}>{bodyTitle}</p>}
                {bodyDescription && <p className={buildBodyDescStyles(sp)}>{bodyDescription}</p>}
              </div>
            )}
          </>
        ) : resolvedBody ? (
          resolvedBody
        ) : (
          <>
            {illustration && (
              <div className={buildIllustrationBoxStyles(sp)} data-testid="bottomsheet-illustration">
                {illustration}
              </div>
            )}
            {!illustration && illustrationType && (
              <div className={buildIllustrationBoxStyles(sp)} data-testid="bottomsheet-illustration">
                <DialogBoxIllustration type={illustrationType} />
              </div>
            )}
            {(bodyTitle || bodyDescription) && (
              <div className={buildBodyTextBlockStyles(sp)}>
                {bodyTitle && <p className={buildBodyTitleStyles(sp)}>{bodyTitle}</p>}
                {bodyDescription && <p className={buildBodyDescStyles(sp)}>{bodyDescription}</p>}
              </div>
            )}
          </>
        )}
        {checkboxContent && (
          <div className={buildCheckboxRowStyles(sp)} data-testid="bottomsheet-checkbox">
            {checkboxContent}
          </div>
        )}
      </div>

      {/* Footer */}
      {resolvedFooter && (
        <div
          className={ctaStyle === 'vertical' ? buildFooterVerticalStyles(sp) : buildFooterHorizontalStyles(sp)}
          data-testid="bottomsheet-footer"
        >
          {resolvedFooter}
        </div>
      )}
    </MobileSheetWrapper>
  );
};

BottomSheetBase.displayName = 'BottomSheet';

interface BottomSheetComponent extends React.FC<BottomSheetProps> {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
  Slot: typeof Slot;
}

const BottomSheet = Object.assign(BottomSheetBase, {
  Header, Body, Footer, Slot,
}) as BottomSheetComponent;

export default BottomSheet;
