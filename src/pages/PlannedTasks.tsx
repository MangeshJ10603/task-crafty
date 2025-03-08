
import { useTasks } from '@/contexts/task-context';
import { TaskList } from '@/components/tasks/task-list';
import { TaskDetail } from '@/components/tasks/task-detail';

const PlannedTasks = () => {
  const { getPlannedTasks, selectedTask } = useTasks();
  const plannedTasks = getPlannedTasks();

  return (
    <div className="relative min-h-full">
      <TaskList
        title="Planned"
        tasks={plannedTasks}
        emptyMessage="No planned tasks"
      />
      {selectedTask && <TaskDetail />}
    </div>
  );
};

export default PlannedTasks;
