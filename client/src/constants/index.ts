export const PRIORITY_CONFIG = {
  NO_PRIORITY: { label: 'No Priority', color: 'text-slate-500', dot: 'bg-slate-300' },
  URGENT: { label: 'Urgent', color: 'text-red-600', dot: 'bg-red-500' },
  HIGH: { label: 'High', color: 'text-orange-600', dot: 'bg-orange-500' },
  MEDIUM: { label: 'Medium', color: 'text-amber-600', dot: 'bg-amber-500' },
  LOW: { label: 'Low', color: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
} as const;

export const STATUS_CONFIG = {
  BACKLOG: { label: 'Backlog', color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' },
  TODO: { label: 'To Do', color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' },
  DOING: { label: 'Doing', color: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800' },
  COMPLETED: { label: 'Completed', color: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800' },
  ON_HOLD: { label: 'On Hold', color: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-800' },
} as const;

export const LABEL_COLORS: Record<string, string> = {
  Research: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
  Design: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Development: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  Testing: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  Deployment: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
};
