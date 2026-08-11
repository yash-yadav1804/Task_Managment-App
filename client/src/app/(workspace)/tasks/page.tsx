'use client';

import TopBar from '../../components/layout/TopBar';

export default function TasksPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar 
        title="Tasks" 
        onMenuClick={() => {
          // This will be wired up via context or similar if we want the top bar to open the sidebar.
          // For now, in a real app, you might use a global state (Zustand/Context) to control the sidebar from the TopBar, 
          // or pass the toggle down. 
        }} 
      />
      <div className="p-6 flex-1 overflow-auto">
        <h1 className="text-2xl font-bold">Tasks Board</h1>
      </div>
    </div>
  );
}
