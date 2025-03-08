
import { useTasks } from '@/contexts/task-context';
import { TaskList } from '@/components/tasks/task-list';
import { TaskDetail } from '@/components/tasks/task-detail';

const ImportantTasks = () => {
  const { getImportantTasks, selectedTask } = useTasks();
  const importantTasks = getImportantTasks();

  return (
    <div className="relative min-h-full">
      <TaskList
        title="Important"
        tasks={importantTasks}
        emptyMessage="No important tasks"
      />
      {selectedTask && <TaskDetail />}
    </div>
  );
};

export default ImportantTasks;
