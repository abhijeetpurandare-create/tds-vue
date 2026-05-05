import React, { forwardRef } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import useEllipsis from './hooks/useEllipsis';
import useCopy from './hooks/useCopy';

// Typography component variant types
export type TypographyType = 'default' | 'secondary' | 'success' | 'warning' | 'danger';

// Base props for all Typography components
export interface TypographyBaseProps {
  type?: TypographyType;
  strong?: boolean;
  italic?: boolean;
  underline?: boolean;
  delete?: boolean;
  code?: boolean;
  mark?: boolean;
  disabled?: boolean;
  ellipsis?: boolean | {
    rows?: number;
    expandable?: boolean;
    suffix?: string;
    symbol?: React.ReactNode;
    onEllipsis?: (ellipsis: boolean) => void;
    onExpand?: () => void;
  };
  copyable?: boolean | {
    text?: string;
    onCopy?: () => void;
    icon?: React.ReactNode;
    tooltips?: [React.ReactNode, React.ReactNode];
  };
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Text Component Props
export interface TextProps extends TypographyBaseProps, Omit<React.HTMLAttributes<HTMLSpanElement>, 'type'> {}

// Paragraph Component Props
export interface ParagraphProps extends TypographyBaseProps, Omit<React.HTMLAttributes<HTMLParagraphElement>, 'type'> {}

// Title Component Props
export interface TitleProps extends Omit<TypographyBaseProps, 'copyable'>, 
  Omit<React.HTMLAttributes<HTMLHeadingElement>, 'type'> {
  level?: 1 | 2 | 3 | 4 | 5;
}

// Helper function to apply text decorations
const applyTextDecorations = (props: TypographyBaseProps, children: React.ReactNode): React.ReactNode => {
  let content = children;

  if (props.strong) {
    content = <strong>{content}</strong>;
  }
  
  if (props.italic) {
    content = <i>{content}</i>;
  }
  
  if (props.underline) {
    content = <u>{content}</u>;
  }
  
  if (props.delete) {
    content = <del>{content}</del>;
  }
  
  if (props.code) {
    content = <code>{content}</code>;
  }
  
  if (props.mark) {
    content = <mark>{content}</mark>;
  }
  
  return content;
};

// Text Component
export const Text = forwardRef<HTMLSpanElement, TextProps>(({
  type = 'default',
  className = '',
  ellipsis = false,
  copyable = false,
  disabled = false,
  style,
  children,
  ...restProps
}, ref) => {
  // Get theme configuration
  const { theme } = useTheme();
  const typographyConfig = theme.components?.typography || defaultThemeConfig.components?.typography;
  
  // Handle ellipsis
  const { isEllipsis, ellipsisContent, contentRef } = useEllipsis(children, ellipsis);
  
  // Handle copy
  const { copyIcon } = useCopy(children, copyable);
  
  const textStyles = css({
    // Base styles
    fontFamily: typographyConfig?.base?.fontFamily || 'inherit',
    fontSize: typographyConfig?.text?.fontSize || 'inherit',
    lineHeight: typographyConfig?.text?.lineHeight || 'inherit',
    fontWeight: typographyConfig?.text?.fontWeight || 'inherit',
    letterSpacing: typographyConfig?.text?.letterSpacing || 'inherit',
    
    // Type-specific styles
    color: disabled ? 
      typographyConfig?.states?.disabled?.color || '#bfbfbf' : 
      typographyConfig?.variants?.[type]?.color || (
        type === 'secondary' ? '#666' :
        type === 'success' ? '#52c41a' :
        type === 'warning' ? '#faad14' :
        type === 'danger' ? '#ff4d4f' : '#000'
      ),
    
    // Disabled state
    cursor: disabled ? 'not-allowed' : 'inherit',
    
    // Ellipsis styles
    ...(typeof ellipsis === 'boolean' && ellipsis ? {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      display: 'inline-block',
      maxWidth: '100%',
    } : {}),
    
    // Responsive styles
    '@media (max-width: 576px)': {
      fontSize: typographyConfig?.text?.responsive?.xs?.fontSize,
      lineHeight: typographyConfig?.text?.responsive?.xs?.lineHeight,
    },
    '@media (min-width: 576px) and (max-width: 768px)': {
      fontSize: typographyConfig?.text?.responsive?.sm?.fontSize,
      lineHeight: typographyConfig?.text?.responsive?.sm?.lineHeight,
    },
    '@media (min-width: 768px) and (max-width: 992px)': {
      fontSize: typographyConfig?.text?.responsive?.md?.fontSize,
      lineHeight: typographyConfig?.text?.responsive?.md?.lineHeight,
    },
    '@media (min-width: 992px) and (max-width: 1200px)': {
      fontSize: typographyConfig?.text?.responsive?.lg?.fontSize,
      lineHeight: typographyConfig?.text?.responsive?.lg?.lineHeight,
    },
    '@media (min-width: 1200px)': {
      fontSize: typographyConfig?.text?.responsive?.xl?.fontSize,
      lineHeight: typographyConfig?.text?.responsive?.xl?.lineHeight,
    },
  });
  
  const decoratedChildren = applyTextDecorations(
    { type, disabled, ...restProps }, 
    isEllipsis ? ellipsisContent : children
  );
  
  return (
    <span 
      ref={(node) => {
        // Handle both the ref we receive and our internal ref
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        
        // @ts-ignore - This is fine since we're handling a HTMLElement
        contentRef.current = node;
      }}
      className={`${textStyles} ${className}`}
      style={style}
      {...restProps}
    >
      {decoratedChildren}
      {copyable && copyIcon}
    </span>
  );
});

Text.displayName = 'Typography.Text';

// Title Component
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(({
  level = 1,
  type = 'default',
  className = '',
  ellipsis = false,
  disabled = false,
  style,
  children,
  ...restProps
}, ref) => {
  // Get theme configuration
  const { theme } = useTheme();
  const typographyConfig = theme.components?.typography || defaultThemeConfig.components?.typography;
  
  // Handle ellipsis
  const { isEllipsis, ellipsisContent, contentRef } = useEllipsis(children, ellipsis);
  
  const titleStyles = css({
    // Base styles
    fontFamily: typographyConfig?.base?.fontFamily || 'inherit',
    lineHeight: typographyConfig?.title?.lineHeight || 1.35,
    fontWeight: typographyConfig?.title?.fontWeight || 600,
    letterSpacing: typographyConfig?.title?.letterSpacing || 'inherit',
    margin: '0 0 0.5em',
    
    // Level-specific styles
    fontSize: typographyConfig?.title?.levels?.[level]?.fontSize || 
      (level === 1 ? '2rem' :
      level === 2 ? '1.5rem' :
      level === 3 ? '1.17rem' :
      level === 4 ? '1rem' : 
      '0.83rem'),
    
    // Type-specific styles
    color: disabled ? 
      typographyConfig?.states?.disabled?.color || '#bfbfbf' : 
      typographyConfig?.variants?.[type]?.color || (
        type === 'secondary' ? '#666' :
        type === 'success' ? '#52c41a' :
        type === 'warning' ? '#faad14' :
        type === 'danger' ? '#ff4d4f' : '#000'
      ),
    
    // Disabled state
    cursor: disabled ? 'not-allowed' : 'inherit',
    
    // Ellipsis styles
    ...(typeof ellipsis === 'boolean' && ellipsis ? {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    } : {}),
    
    // Responsive styles
    '@media (max-width: 576px)': {
      fontSize: typographyConfig?.title?.responsive?.xs?.[level]?.fontSize,
      lineHeight: typographyConfig?.title?.responsive?.xs?.[level]?.lineHeight,
    },
    '@media (min-width: 576px) and (max-width: 768px)': {
      fontSize: typographyConfig?.title?.responsive?.sm?.[level]?.fontSize,
      lineHeight: typographyConfig?.title?.responsive?.sm?.[level]?.lineHeight,
    },
    '@media (min-width: 768px) and (max-width: 992px)': {
      fontSize: typographyConfig?.title?.responsive?.md?.[level]?.fontSize,
      lineHeight: typographyConfig?.title?.responsive?.md?.[level]?.lineHeight,
    },
    '@media (min-width: 992px) and (max-width: 1200px)': {
      fontSize: typographyConfig?.title?.responsive?.lg?.[level]?.fontSize,
      lineHeight: typographyConfig?.title?.responsive?.lg?.[level]?.lineHeight,
    },
    '@media (min-width: 1200px)': {
      fontSize: typographyConfig?.title?.responsive?.xl?.[level]?.fontSize,
      lineHeight: typographyConfig?.title?.responsive?.xl?.[level]?.lineHeight,
    },
  });
  
  const headingLevel = level as 1 | 2 | 3 | 4 | 5;
  const HeadingTag = `h${headingLevel}`;
  
  const decoratedChildren = applyTextDecorations(
    { type, disabled, ...restProps }, 
    isEllipsis ? ellipsisContent : children
  );
  
  const props = {
    ref: (node: HTMLHeadingElement | null) => {
      // Handle both the ref we receive and our internal ref
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      
      // @ts-ignore - This is fine since we're handling a HTMLElement
      contentRef.current = node;
    },
    className: `${titleStyles} ${className}`,
    style,
    ...restProps
  };
  
  // Use createElement instead of JSX for dynamic element tag
  return React.createElement(HeadingTag, props, decoratedChildren);
});

Title.displayName = 'Typography.Title';

// Paragraph Component
export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({
  type = 'default',
  className = '',
  ellipsis = false,
  copyable = false,
  disabled = false,
  style,
  children,
  ...restProps
}, ref) => {
  // Get theme configuration
  const { theme } = useTheme();
  const typographyConfig = theme.components?.typography || defaultThemeConfig.components?.typography;
  
  // Handle ellipsis
  const { isEllipsis, ellipsisContent, contentRef } = useEllipsis(children, ellipsis);
  
  // Handle copy
  const { copyIcon } = useCopy(children, copyable);
  
  const paragraphStyles = css({
    // Base styles
    fontFamily: typographyConfig?.base?.fontFamily || 'inherit',
    fontSize: typographyConfig?.paragraph?.fontSize || 'inherit',
    lineHeight: typographyConfig?.paragraph?.lineHeight || 1.5,
    fontWeight: typographyConfig?.paragraph?.fontWeight || 'normal',
    letterSpacing: typographyConfig?.paragraph?.letterSpacing || 'inherit',
    margin: '0 0 1em',
    
    // Type-specific styles
    color: disabled ? 
      typographyConfig?.states?.disabled?.color || '#bfbfbf' : 
      typographyConfig?.variants?.[type]?.color || (
        type === 'secondary' ? '#666' :
        type === 'success' ? '#52c41a' :
        type === 'warning' ? '#faad14' :
        type === 'danger' ? '#ff4d4f' : '#000'
      ),
    
    // Disabled state
    cursor: disabled ? 'not-allowed' : 'inherit',
    
    // Ellipsis styles
    ...(typeof ellipsis === 'boolean' && ellipsis ? {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    } : {}),
    
    // Multi-line ellipsis (for objects with rows)
    ...(typeof ellipsis === 'object' && ellipsis.rows && ellipsis.rows > 1 ? {
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: ellipsis.rows,
    } : {}),
    
    // Responsive styles
    '@media (max-width: 576px)': {
      fontSize: typographyConfig?.paragraph?.responsive?.xs?.fontSize,
      lineHeight: typographyConfig?.paragraph?.responsive?.xs?.lineHeight,
    },
    '@media (min-width: 576px) and (max-width: 768px)': {
      fontSize: typographyConfig?.paragraph?.responsive?.sm?.fontSize,
      lineHeight: typographyConfig?.paragraph?.responsive?.sm?.lineHeight,
    },
    '@media (min-width: 768px) and (max-width: 992px)': {
      fontSize: typographyConfig?.paragraph?.responsive?.md?.fontSize,
      lineHeight: typographyConfig?.paragraph?.responsive?.md?.lineHeight,
    },
    '@media (min-width: 992px) and (max-width: 1200px)': {
      fontSize: typographyConfig?.paragraph?.responsive?.lg?.fontSize,
      lineHeight: typographyConfig?.paragraph?.responsive?.lg?.lineHeight,
    },
    '@media (min-width: 1200px)': {
      fontSize: typographyConfig?.paragraph?.responsive?.xl?.fontSize,
      lineHeight: typographyConfig?.paragraph?.responsive?.xl?.lineHeight,
    },
  });
  
  const decoratedChildren = applyTextDecorations(
    { type, disabled, ...restProps }, 
    isEllipsis ? ellipsisContent : children
  );
  
  return (
    <p 
      ref={(node) => {
        // Handle both the ref we receive and our internal ref
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        
        // @ts-ignore - This is fine since we're handling a HTMLElement
        contentRef.current = node;
      }}
      className={`${paragraphStyles} ${className}`}
      style={style}
      {...restProps}
    >
      {decoratedChildren}
      {copyable && copyIcon}
    </p>
  );
});

Paragraph.displayName = 'Typography.Paragraph';

// Main Typography component
interface TypographyComponent extends React.FC<React.HTMLAttributes<HTMLDivElement>> {
  Text: typeof Text;
  Title: typeof Title;
  Paragraph: typeof Paragraph;
}

const TypographyBase: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => {
  // Get theme configuration
  const { theme } = useTheme();
  const typographyConfig = theme.components?.typography || defaultThemeConfig.components?.typography;
  
  const typographyStyles = css({
    color: typographyConfig?.base?.color || 'inherit',
    fontSize: typographyConfig?.base?.fontSize || 'inherit',
    lineHeight: typographyConfig?.base?.lineHeight || 'inherit',
    '& h1, & h2, & h3, & h4, & h5': {
      margin: typographyConfig?.base?.headingMargin || '1em 0 0.5em',
      fontWeight: typographyConfig?.base?.headingFontWeight || 600,
      color: typographyConfig?.base?.headingColor || 'inherit',
    },
    '& p': {
      margin: typographyConfig?.base?.paragraphMargin || '0 0 1em',
    },
  });
  
  return <div className={`${typographyStyles} ${className}`} {...props} />;
};

// Create the composite component safely
const Typography = Object.assign(TypographyBase, {
  Text,
  Title,
  Paragraph,
}) as unknown as TypographyComponent;

export default Typography; 