
import { useParams } from 'react-router-dom';
import { useTasks } from '@/contexts/task-context';
import { TaskList } from '@/components/tasks/task-list';
import { TaskDetail } from '@/components/tasks/task-detail';

const ListTasks = () => {
  const { listId } = useParams<{ listId: string }>();
  const { tasks, lists, selectedTask } = useTasks();
  
  const list = lists.find(l => l.id === listId);
  const filteredTasks = tasks.filter(task => task.list === listId);

  return (
    <div className="relative min-h-full">
      <TaskList
        title={list?.name || 'List'}
        tasks={filteredTasks}
        emptyMessage="No tasks in this list"
      />
      {selectedTask && <TaskDetail />}
    </div>
  );
};

export default ListTasks;
