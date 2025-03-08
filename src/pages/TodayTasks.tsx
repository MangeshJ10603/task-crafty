
import { useTasks } from '@/contexts/task-context';
import { TaskList } from '@/components/tasks/task-list';
import { TaskDetail } from '@/components/tasks/task-detail';

const TodayTasks = () => {
  const { getTodayTasks, selectedTask } = useTasks();
  const todayTasks = getTodayTasks();

  return (
    <div className="relative min-h-full">
      <TaskList
        title="Today"
        tasks={todayTasks}
        emptyMessage="No tasks scheduled for today"
      />
      {selectedTask && <TaskDetail />}
    </div>
  );
};

export default TodayTasks;
