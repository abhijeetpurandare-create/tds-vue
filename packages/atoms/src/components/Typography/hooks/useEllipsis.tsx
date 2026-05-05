import { useState, useRef, useEffect, ReactNode, useMemo } from 'react';

interface EllipsisConfig {
  rows?: number;
  expandable?: boolean;
  suffix?: string;
  symbol?: ReactNode | ((expanded: boolean) => ReactNode);
  onEllipsis?: (ellipsis: boolean) => void;
  onExpand?: () => void;
}

interface UseEllipsisResult {
  isEllipsis: boolean;
  contentRef: React.RefObject<HTMLElement>;
  ellipsisContent: ReactNode;
  expanded: boolean;
  toggleExpand: () => void;
}

const useEllipsis = (
  children: ReactNode,
  ellipsis: boolean | EllipsisConfig = false
): UseEllipsisResult => {
  const [isEllipsis, setIsEllipsis] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLElement>(null);
  const ellipsisConfig = typeof ellipsis === 'object' ? ellipsis : {};

  // Get children text content for ellipsis calculation
  const getTextContent = (): string => {
    if (typeof children === 'string') {
      return children;
    }
    
    if (contentRef.current) {
      return contentRef.current.textContent || '';
    }
    
    return '';
  };

  // Handle ellipsis calculation
  useEffect(() => {
    if (!ellipsis || !contentRef.current) {
      setIsEllipsis(false);
      return;
    }

    // For simple ellipsis (boolean), we rely on CSS text-overflow
    if (typeof ellipsis === 'boolean') {
      setIsEllipsis(true);
      return;
    }

    // For multi-line ellipsis or advanced options
    const element = contentRef.current;
    const rows = ellipsisConfig.rows || 1;
    
    // For multi-line ellipsis, we'll rely on -webkit-line-clamp
    if (rows > 1) {
      setIsEllipsis(true);
      
      // Check if text actually overflows
      if (ellipsisConfig.onEllipsis) {
        const originalHeight = element.offsetHeight;
        const lineHeight = parseInt(getComputedStyle(element).lineHeight, 10) || 20;
        const maxHeight = lineHeight * rows;
        
        const hasEllipsis = originalHeight > maxHeight;
        setIsEllipsis(hasEllipsis);
        ellipsisConfig.onEllipsis(hasEllipsis);
      }
      
      return;
    }
    
    // For single line with custom options
    const originalText = getTextContent();
    const containerWidth = element.offsetWidth;
    
    // Create a temporary element to measure text width
    const measureElement = document.createElement('span');
    measureElement.style.visibility = 'hidden';
    measureElement.style.position = 'absolute';
    measureElement.style.fontSize = getComputedStyle(element).fontSize;
    measureElement.style.fontFamily = getComputedStyle(element).fontFamily;
    measureElement.style.fontWeight = getComputedStyle(element).fontWeight;
    measureElement.style.letterSpacing = getComputedStyle(element).letterSpacing;
    measureElement.textContent = originalText;
    
    document.body.appendChild(measureElement);
    const textWidth = measureElement.offsetWidth;
    document.body.removeChild(measureElement);
    
    const shouldEllipsis = textWidth > containerWidth;
    setIsEllipsis(shouldEllipsis);
    
    if (ellipsisConfig.onEllipsis) {
      ellipsisConfig.onEllipsis(shouldEllipsis);
    }
  }, [children, ellipsis, ellipsisConfig]);

  // Toggle expand/collapse
  const toggleExpand = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    
    if (ellipsisConfig.onExpand) {
      ellipsisConfig.onExpand();
    }
  };

  // Prepare content with expandable controls if needed
  const ellipsisContent = useMemo(() => {
    if (!isEllipsis || typeof ellipsis !== 'object') {
      return children;
    }

    // If not expandable, just show ellipsis with suffix
    if (!ellipsisConfig.expandable) {
      return ellipsisConfig.suffix 
        ? <>{children}{ellipsisConfig.suffix}</>
        : children;
    }

    // If expandable, show expand/collapse control
    if (expanded) {
      const collapseSymbol = typeof ellipsisConfig.symbol === 'function' 
        ? (ellipsisConfig.symbol as (expanded: boolean) => ReactNode)(true)
        : ellipsisConfig.symbol || ' Collapse';
        
      return (
        <>
          {children}
          <a 
            onClick={toggleExpand}
            style={{ marginLeft: 8, cursor: 'pointer' }}
          >
            {collapseSymbol}
          </a>
        </>
      );
    } else {
      const expandSymbol = typeof ellipsisConfig.symbol === 'function'
        ? (ellipsisConfig.symbol as (expanded: boolean) => ReactNode)(false)
        : ellipsisConfig.symbol || ' Expand';
        
      return (
        <>
          {children}
          <a 
            onClick={toggleExpand}
            style={{ marginLeft: 8, cursor: 'pointer' }}
          >
            {expandSymbol}
          </a>
        </>
      );
    }
  }, [children, isEllipsis, ellipsis, ellipsisConfig, expanded, toggleExpand]);

  return {
    isEllipsis,
    contentRef,
    ellipsisContent,
    expanded,
    toggleExpand,
  };
};

export default useEllipsis; 