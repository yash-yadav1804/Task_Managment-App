import * as React from "react"
import { cn } from "../../lib/utils"
import { STATUS_CONFIG } from "../../constants"
import { Badge } from "./Badge"

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: keyof typeof STATUS_CONFIG;
}

export function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.BACKLOG;

  return (
    <Badge
      className={cn("whitespace-nowrap px-2 py-0.5 border font-medium", config.color, className)}
      {...props}
    >
      {config.label}
    </Badge>
  )
}
