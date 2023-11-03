import { Task } from '../../../../mosks';

interface TaskRowProps {
  task: Task;
  onRemoveTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({
  task,
  onRemoveTask,
  onCompleteTask,
}) => {
  const taskClassName =
    task.status === 'выполнена' ? 'text-decoration-line-through' : '';

  return (
    <tr className="table-light">
      <td style={{ width: '100%' }}>{task.text}</td>
      <td style={{ width: '100px' }}>
        <span className={`d-inline-block w-100 ${taskClassName}`}>
          {task.status}
        </span>
      </td>
      <td className="d-flex" style={{ width: '250px', minHeight: '100%' }}>
        <button
          className="btn btn-danger flex-grow-1"
          style={{ marginRight: '0.5rem' }}
          onClick={() => {
            if (
              window.confirm(
                `Вы уверены, что хотите удалить задачу "${task.text}"?`
              )
            ) {
              onRemoveTask(task.id);
            }
          }}
        >
          Удалить
        </button>
        <button
          className="btn btn-success flex-grow-1"
          onClick={() => onCompleteTask(task.id)}
          disabled={task.status === 'выполнена'}
        >
          Завершить
        </button>
      </td>
    </tr>
  );
};
