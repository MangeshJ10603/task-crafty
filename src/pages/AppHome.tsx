
import { useTasks } from '@/contexts/task-context';
import { TaskList } from '@/components/tasks/task-list';
import { TaskDetail } from '@/components/tasks/task-detail';

const AppHome = () => {
  const { tasks, selectedTask } = useTasks();

  return (
    <div className="relative min-h-full">
      <TaskList title="All Tasks" tasks={tasks} />
      {selectedTask && <TaskDetail />}
    </div>
  );
};

export default AppHome;
