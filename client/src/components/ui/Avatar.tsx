import * as React from "react"
import { cn } from "../../lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ className, src, initials, size = 'md', ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-[var(--accent)] text-white items-center justify-center font-medium",
        {
          'h-6 w-6 text-xs': size === 'sm',
          'h-8 w-8 text-sm': size === 'md',
          'h-10 w-10 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {src ? (
        <img className="aspect-square h-full w-full object-cover" src={src} alt="Avatar" />
      ) : (
        <span>{initials?.substring(0, 2).toUpperCase() || 'U'}</span>
      )}
    </div>
  )
}
