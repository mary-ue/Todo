import { Task } from '../../../../mosks';

interface TaskRowProps {
  task: Task;
  onRemoveTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task, onRemoveTask, onCompleteTask }) => {
  const taskClassName =
    task.status === 'выполнена' ? 'text-decoration-line-through' : '';

  return (
    <tr className="table-light">
      <td className="flex-grow-1">{task.text}</td>
      <td className="w-20 status-column">
        <span className={`d-inline-block w-100 ${taskClassName}`}>
          {task.status}
        </span>
      </td>
      <td className="w-30 actions-column d-flex align-items-center">
        <button
          className="btn btn-danger flex-grow-1"
          style={{ marginRight: '0.5rem' }}
          onClick={() => {
            if (window.confirm(`Вы уверены, что хотите удалить задачу "${task.text}"?`)) {
              onRemoveTask(task.id)
            }
          }} 
        >
          Удалить
        </button>
        <button
          className="btn btn-success flex-grow-1"
          onClick={() => onCompleteTask(task.id)}
        >
          Завершить
        </button>
      </td>
    </tr>
  );
};
