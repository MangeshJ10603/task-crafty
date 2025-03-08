
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTasks } from '@/contexts/task-context';
import { TaskList } from '@/components/tasks/task-list';
import { TaskDetail } from '@/components/tasks/task-detail';

const SearchTasks = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { tasks, selectedTask } = useTasks();
  const [searchResults, setSearchResults] = useState(tasks);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filteredTasks = tasks.filter(task => 
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.notes?.toLowerCase().includes(query.toLowerCase()) ||
      task.steps?.some(step => step.title.toLowerCase().includes(query.toLowerCase()))
    );
    
    setSearchResults(filteredTasks);
  }, [query, tasks]);

  return (
    <div className="relative min-h-full">
      <TaskList
        title={`Search: ${query}`}
        tasks={searchResults}
        emptyMessage={query ? "No tasks match your search" : "Enter a search term"}
      />
      {selectedTask && <TaskDetail />}
    </div>
  );
};

export default SearchTasks;
