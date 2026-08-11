import React, { useMemo } from 'react';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragStartEvent, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Task } from '../../services/tasks.service';
import { STATUS_CONFIG } from '../../constants';
import { TaskBoardColumn } from './TaskBoardColumn';
import { TaskBoardCard } from './TaskBoardCard';
import { useTasks } from '../../hooks/useTasks';

export function TaskBoard({ tasks, onTaskClick }: { tasks: Task[], onTaskClick?: (taskId: string) => void }) {
  const { updateTask } = useTasks();
  const [activeId, setActiveId] = React.useState<string | null>(null);
  
  // Local state for optimistic UI updates during drag
  const [localTasks, setLocalTasks] = React.useState<Task[]>(tasks);
  
  // Sync local tasks when props change (except when dragging)
  React.useEffect(() => {
    if (!activeId) {
      setLocalTasks(tasks);
    }
  }, [tasks, activeId]);

  const columns = useMemo(() => Object.keys(STATUS_CONFIG), []);
  
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    
    const activeId = active.id;
    const overId = over.id;
    
    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    const isOverColumn = over.data.current?.type === 'Column';

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setLocalTasks(prev => {
        const activeIndex = prev.findIndex(t => t.id === activeId);
        const overIndex = prev.findIndex(t => t.id === overId);
        
        if (prev[activeIndex].status !== prev[overIndex].status) {
          const newTasks = [...prev];
          newTasks[activeIndex].status = prev[overIndex].status;
          return arrayMove(newTasks, activeIndex, overIndex);
        }
        return arrayMove(prev, activeIndex, overIndex);
      });
    }

    if (isActiveTask && isOverColumn) {
      setLocalTasks(prev => {
        const activeIndex = prev.findIndex(t => t.id === activeId);
        const newTasks = [...prev];
        newTasks[activeIndex].status = overId as any;
        return arrayMove(newTasks, activeIndex, activeIndex); // Just change status
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const task = localTasks.find(t => t.id === activeId);
    
    if (task) {
      const originalTask = tasks.find(t => t.id === activeId);
      if (originalTask && originalTask.status !== task.status) {
        // Optimistically updated local state, now sync with server
        try {
          await updateTask({ id: task.id, data: { status: task.status } });
        } catch (error) {
          console.error("Failed to update task status via drag and drop", error);
          // Revert on failure (the useEffect will sync back to server state)
        }
      }
    }
  };

  const activeTask = useMemo(() => localTasks.find(t => t.id === activeId), [activeId, localTasks]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 h-full overflow-x-auto pb-4">
        {columns.map(status => (
          <TaskBoardColumn 
            key={status} 
            status={status} 
            tasks={localTasks.filter(t => t.status === status)}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
      
      <DragOverlay>
        {activeTask ? (
          <div className="opacity-80 rotate-2 scale-105 transition-transform cursor-grabbing">
            <TaskBoardCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
