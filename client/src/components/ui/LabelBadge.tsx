import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

interface LabelBadgeProps {
  label: { id: string; name: string; color: string };
  onRemove?: () => void;
  className?: string;
}

export function LabelBadge({ label, onRemove, className }: LabelBadgeProps) {
  // We expect label.color to be something like "bg-blue-500"
  // For the badge, we might want it slightly transparent, but Tailwind bg-* colors are solid.
  // We can just use the provided class directly with white text.
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium text-white shadow-sm",
        label.color,
        className
      )}
      title={label.name}
    >
      <span className="truncate max-w-[120px]">{label.name}</span>
      {onRemove && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:bg-black/20 rounded-full p-0.5 transition-colors -mr-1"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
