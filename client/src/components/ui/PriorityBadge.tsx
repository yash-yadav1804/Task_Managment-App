import * as React from "react"
import { cn } from "../../lib/utils"
import { PRIORITY_CONFIG } from "../../constants"

export interface PriorityBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  priority: keyof typeof PRIORITY_CONFIG;
}

export function PriorityBadge({ className, priority, ...props }: PriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.NO_PRIORITY;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded text-xs font-medium",
        config.color,
        className
      )}
      {...props}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} aria-hidden="true" />
      {config.label}
    </div>
  )
}
