import React from 'react';
import { Task } from '../../../mosks';
import { TaskRow } from './TaskRow/TaskRow';

interface TableProps {
  userTasks: Task[];
  onRemoveTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export const Table: React.FC<TableProps> = ({
  userTasks,
  onRemoveTask,
  onCompleteTask,
}) => {
  console.log(userTasks);

  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>Задача</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          {userTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onRemoveTask={onRemoveTask}
              onCompleteTask={onCompleteTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
