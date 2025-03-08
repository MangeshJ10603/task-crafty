
import { useTasks } from '@/contexts/task-context';
import { TaskList } from '@/components/tasks/task-list';
import { TaskDetail } from '@/components/tasks/task-detail';

const AssignedTasks = () => {
  const { tasks, selectedTask } = useTasks();
  
  // For now, we don't have assignment functionality,
  // so we'll just show a placeholder
  const assignedTasks = [];

  return (
    <div className="relative min-h-full">
      <TaskList
        title="Assigned to me"
        tasks={assignedTasks}
        emptyMessage="No tasks assigned to you"
      />
      {selectedTask && <TaskDetail />}
    </div>
  );
};

export default AssignedTasks;
