import React, { useState, useEffect } from 'react';
import s from './Form.module.scss';
import { saveTaskToLocalStorage } from '../../../utils/setTaskToLocalStorage';
import { Task } from '../../../mosks';

interface FormProps {
  user: string;
  onTaskAdded: (newTask: Task) => void;
}

export const Form: React.FC<FormProps> = ({ user, onTaskAdded }) => {
  const [taskText, setTaskText] = useState<string>('');
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    setButtonDisabled(!taskText.trim());
  }, [taskText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const newTask: Task = {
      id: Math.random().toString(16).substring(2, 10) + Date.now(),
      text: taskText,
      status: 'в\u00A0процессе',
    };

    saveTaskToLocalStorage(newTask, user);

    onTaskAdded(newTask);

    setTaskText('');
  };

  const handleReset = () => {
    setTaskText('');
  };

  return (
    <div className={s.wrapper}>
      <h1>Todo App</h1>
      <form className="d-flex align-items-center mb-3" onSubmit={handleSubmit}>
        <label className="form-group me-3 mb-0">
          <input
            type="text"
            className="form-control"
            placeholder="ввести задачу"
            value={taskText}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit" className="btn btn-primary me-3" disabled={isButtonDisabled}>
          Сохранить
        </button>

        <button type="button" className="btn btn-warning" onClick={handleReset}>
          Очистить
        </button>
      </form>
    </div>
  );
};
