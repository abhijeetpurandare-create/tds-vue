import { useState, useCallback, ReactNode } from 'react';

interface CopyConfig {
  text?: string | (() => string | Promise<string>);
  onCopy?: () => void;
  icon?: ReactNode;
  tooltips?: [ReactNode, ReactNode];
}

interface UseCopyResult {
  copyIcon: ReactNode | null;
  copied: boolean;
  handleCopy: () => Promise<void>;
}

const useCopy = (
  children: ReactNode,
  copyable: boolean | CopyConfig = false
): UseCopyResult => {
  const [copied, setCopied] = useState(false);
  
  // Extract copy configuration
  const copyConfig = typeof copyable === 'object' ? copyable : {};
  
  // Handle the copy action
  const handleCopy = useCallback(async () => {
    if (!copyable) return;
    
    try {
      // Get text to copy - either from config, function, or children
      let textToCopy: string;
      
      if (copyConfig.text) {
        if (typeof copyConfig.text === 'function') {
          const result = copyConfig.text();
          textToCopy = result instanceof Promise ? await result : result;
        } else {
          textToCopy = copyConfig.text;
        }
      } else if (typeof children === 'string') {
        textToCopy = children;
      } else {
        // This is a simplification - in a real component you'd use a ref
        const reactElement = children as any;
        
        if (reactElement && reactElement.props && reactElement.props.children) {
          if (typeof reactElement.props.children === 'string') {
            textToCopy = reactElement.props.children;
          } else {
            textToCopy = JSON.stringify(reactElement.props.children);
          }
        } else {
          textToCopy = JSON.stringify(children);
        }
      }
      
      // Use the Clipboard API to copy text
      await navigator.clipboard.writeText(textToCopy);
      
      // Update state and trigger callback
      setCopied(true);
      if (copyConfig.onCopy) {
        copyConfig.onCopy();
      }
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }, [children, copyable, copyConfig]);
  
  // Render copy icon if copyable is enabled
  const copyIcon = !copyable ? null : (
    <span
      onClick={handleCopy}
      style={{
        marginLeft: '8px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
      }}
      title={copied ? 'Copied!' : 'Copy'}
    >
      {copyConfig.icon || (
        <svg
          viewBox="64 64 896 896"
          width="1em"
          height="1em"
          fill="currentColor"
          style={{ fontSize: '14px' }}
        >
          {copied ? (
            // Checkmark icon
            <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8c12.7 17.7 39 17.7 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
          ) : (
            // Copy icon
            <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z" />
          )}
        </svg>
      )}
      {copyConfig.tooltips && (
        <span style={{ marginLeft: '4px' }}>
          {copied ? copyConfig.tooltips[1] : copyConfig.tooltips[0]}
        </span>
      )}
    </span>
  );
  
  return {
    copyIcon,
    copied,
    handleCopy,
  };
};

export default useCopy; 