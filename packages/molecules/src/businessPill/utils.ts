// Consolidated status color mapping
export enum StatusMap {
  IN_TRANSIT = "in_transit",
  PICKUP_PENDING = "pickup_pending",
  PICK_UP_PENDING = "pick_up_pending",
  OUT_FOR_PICKUP = "out_for_pickup",
  PICKUP = "pickup",
  FINDING_DRIVERS = "finding_drivers",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  OUT_FOR_RETURN = "out_for_return",
  RETURNED = "returned",
  CANCELLED = "cancelled",
  PAYMENT_PENDING = "payment_pending",
  PENDING_ORDER = "pending_order",
  COD = "cod",
  CASH_ON_DELIVERY = "cash_on_delivery",
  ON_TIME = "on_time",
  LOST = "lost",
  DELAYED = "delayed",
  REPLACED = "replaced",
  DEFAULT = "default",
  MISSING="Missing"
}


// success: '#059669',
// 'success-background': colors.emerald[50],
// pending: '#d97706',
// 'pending-background': '#fffbeb',
// 'disabled-background': '#f0f0f0',
// 'intermediate-3': '#7c3aed',
// 'intermediate-3-background': '#f5f3ff',
// 'main-state-in-transit': '#5B80F7',
// 'main-state-in-transit-background': '#ECF0FF',
// 'intermediate-1-background': '#FFF7ED',
// failure: '#DC2626',
// 'intermediate-4-returns': '#DB2777',
// 'intermediate-4-returns-background': '#FDF2F8',
// 'intermediate-2': '#ECFEFF',

//variant?: "default" : #E5E7EB | "success":#D1FAE5 | "danger": #FEE2E2 | "warning": #FEE2E2 | "info" : #DBEAFE;

// Define the StatusStyle interface
export interface StatusStyle {
  color: string;
  backgroundColor: string;
}

// Updated STATUS_COLORS with both color and backgroundColor
export const STATUS_COLORS: Record<StatusMap, StatusStyle> = {
  [StatusMap.IN_TRANSIT]: { 
    color: "#d97706", 
    backgroundColor: "#fffbeb" 
  },
  [StatusMap.PICKUP_PENDING]: { 
    color: "#D97706", 
    backgroundColor: "#fff7ed" 
  },
  [StatusMap.PICK_UP_PENDING]: { 
    color: "#D97706", 
    backgroundColor: "#fff7ed" 
  },
  [StatusMap.OUT_FOR_PICKUP]: { 
    color: "#5B80F7", 
    backgroundColor: "#eff6ff" 
  },
  [StatusMap.PICKUP]: { 
    color: "#5B80F7", 
    backgroundColor: "#eff6ff" 
  },
  [StatusMap.FINDING_DRIVERS]: { 
    color: "#5B80F7", 
    backgroundColor: "#eff6ff" 
  },
  [StatusMap.OUT_FOR_DELIVERY]: { 
    color: "#0891B2", 
    backgroundColor: "#ecfeff" 
  },
  [StatusMap.DELIVERED]: { 
    color: "#059669", 
    backgroundColor: "#f0fdf4" 
  },
  [StatusMap.OUT_FOR_RETURN]: { 
    color: "#DB2777", 
    backgroundColor: "#fdf2f8" 
  },
  [StatusMap.RETURNED]: { 
    color: "#DB2777", 
    backgroundColor: "#fdf2f8" 
  },
  [StatusMap.CANCELLED]: { 
    color: "#DC2626", 
    backgroundColor: "#fef2f2" 
  },
  [StatusMap.PAYMENT_PENDING]: { 
    color: "#D97706", 
    backgroundColor: "#fff7ed" 
  },
  [StatusMap.PENDING_ORDER]: { 
    color: "#D97706", 
    backgroundColor: "#fff7ed" 
  },
  [StatusMap.COD]: { 
    color: "#DB2777", 
    backgroundColor: "#fdf2f8" 
  },
  [StatusMap.CASH_ON_DELIVERY]: { 
    color: "#DB2777", 
    backgroundColor: "#fdf2f8" 
  },
  [StatusMap.ON_TIME]: { 
    color: "#059669", 
    backgroundColor: "#f0fdf4" 
  },
  [StatusMap.LOST]: { 
    color: "#DC2626", 
    backgroundColor: "#fef2f2" 
  },
  [StatusMap.DELAYED]: { 
    color: "#D97706", 
    backgroundColor: "#fff7ed" 
  },
  [StatusMap.REPLACED]: { 
    color: "#5B80F7", 
    backgroundColor: "#eff6ff" 
  },
  [StatusMap.DEFAULT]: { 
    color: "#6B7280", 
    backgroundColor: "#f3f4f6" 
  },
  [StatusMap.MISSING]: { 
    color: "#DC2626", 
    backgroundColor: "#fef2f2" 
  }
};

// Helper function to get color by status (case-insensitive)
export function getStatusColor(status: string) {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, "_");
  
  // Find the matching status in our enum
  const matchedStatus = Object.values(StatusMap).find(s => 
    s === normalizedStatus || s.replace(/_/g, "").toLowerCase() === normalizedStatus.replace(/_/g, "").toLowerCase()
  );
  
  if (matchedStatus) {
    return STATUS_COLORS[matchedStatus as StatusMap];
  }
  
  return STATUS_COLORS[StatusMap.DEFAULT];
}

// Display name mapping for UI presentation
export const STATUS_DISPLAY_NAMES: Record<StatusMap, string> = {
  [StatusMap.IN_TRANSIT]: "In Transit",
  [StatusMap.PICKUP_PENDING]: "Pick Up Pending",
  [StatusMap.PICK_UP_PENDING]: "Pick Up Pending",
  [StatusMap.OUT_FOR_PICKUP]: "Out For Pickup",
  [StatusMap.PICKUP]: "Pickup",
  [StatusMap.FINDING_DRIVERS]: "Finding Drivers",
  [StatusMap.OUT_FOR_DELIVERY]: "Out for Delivery",
  [StatusMap.DELIVERED]: "Delivered",
  [StatusMap.OUT_FOR_RETURN]: "Out For Return",
  [StatusMap.RETURNED]: "Returned",
  [StatusMap.CANCELLED]: "Cancelled",
  [StatusMap.PAYMENT_PENDING]: "Payment Pending",
  [StatusMap.PENDING_ORDER]: "Pending Order",
  [StatusMap.COD]: "COD",
  [StatusMap.CASH_ON_DELIVERY]: "COD",
  [StatusMap.ON_TIME]: "On Time",
  [StatusMap.LOST]: "Lost",
  [StatusMap.DELAYED]: "Delayed",
  [StatusMap.REPLACED]: "Replaced",
  [StatusMap.DEFAULT]: "Default",
  [StatusMap.MISSING]: "Missing"
}



export const getPillConfig = (
  status: string
) => {
  if (!status) return null
  const standardStatus = status.toLowerCase().split(' ').join('_')
  const displayStatus = STATUS_DISPLAY_NAMES[standardStatus] || status
  return {text:displayStatus  , ...getStatusColor(status)}
  
};

