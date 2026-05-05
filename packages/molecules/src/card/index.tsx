// src/card/index.tsx

import React, { ReactNode, useState } from "react";
import { Button } from "@delhivery/tarmac";

interface CardProps {
  /** Main title of the card */
  title?: string;
  /** Secondary text below the title */
  subtitle?: string;
  /** Main content area */
  children?: ReactNode;
  /** Optional footer content */
  footer?: ReactNode;
  /** Custom className for additional styling */
  className?: string;
  /** Optional header actions (like buttons or icons) */
  headerActions?: ReactNode;
  /** Whether to show a border */
  bordered?: boolean;
  /** Whether to add shadow */
  elevation?: boolean;
  /** Optional padding override */
  padding?: string;
}

export const Card: React.FC<CardProps> = ({
  title = "Card Title",
  subtitle,
  children,
  footer,
  className = "",
  headerActions,
  bordered = true,
  elevation = true,
  padding = "p-4",
}) => {
  const [expanded, setExpanded] = useState(true);

  // Base card styles
  const cardClasses = [
    "bg-white rounded-lg",
    bordered ? "border border-gray-200" : "",
    elevation ? "shadow-md" : "",
    className,
  ].join(" ").trim();

  return (<>
   <div className={cardClasses}>
      {/* Card Header (if title or subtitle exists) */}
      {(title || subtitle || headerActions) && (
        <div className={`${padding} border-b border-gray-200 flex justify-between items-center`}>
          <div>
            {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="ml-4">
            {headerActions || (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Collapse" : "Expand"}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Card Content */}
      {expanded && <div className={padding}>
        {children || (
          <div className="space-y-4">
            <p>This is a sample card content. You can replace this with your own content.</p>
            <Button 
              variant="primary"
              onClick={() => alert("Button clicked!")}
            >
              Click Me
            </Button>
          </div>
        )}
      </div>}

      {/* Card Footer */}
      {footer && expanded && (
        <div className={`${padding} border-t border-gray-200 mt-2`}>
          {footer}
        </div>
      )}
    </div></>
  );
};

export default Card;