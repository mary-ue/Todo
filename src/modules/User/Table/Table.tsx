import React from 'react'
import { Task } from '../../../mosks';
import { TaskRow } from './TaskRow/TaskRow';

interface TableProps {
  userTasks: Task[];
}

export const Table: React.FC<TableProps> = ({ userTasks }) => {
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
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  )
}