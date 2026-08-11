'use client';

import TopBar from '../../components/layout/TopBar';

export default function TasksPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar title="Tasks" />
      <div className="p-6 flex-1 overflow-auto">
        <h1 className="text-2xl font-bold">Tasks Board</h1>
      </div>
    </div>
  );
}
