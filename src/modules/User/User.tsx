import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
import { Task, UsersData } from '../../mosks';
import { Form } from './Form/Form';
import { Table } from './Table/Table';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

export const User: React.FC = () => {
  // const { user } = useParams<{ user?: string }>();
  const navigate = useNavigate();
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [tasksLength, setTasksLength] = useState<number>(userTasks.length);
  const { currentUser: user } = useUser();

  const handleTaskAdded = (newTask: Task) => {
    setUserTasks((prevTasks) => [...prevTasks, newTask]);
    setTasksLength((prevLength) => prevLength + 1);
  };

  const handleTaskRemoved = () => {
    setUserTasks([]);
    setTasksLength(0);
  };

  const handleRemoveTask = (taskId: string) => {
    if (userTasks.length > 0) {
      const updatedTasks = userTasks.filter((task) => task.id !== taskId);
      setUserTasks(updatedTasks);
      setTasksLength(updatedTasks.length);

      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData: UsersData = JSON.parse(userDataString);
        const currentUser = userData.users.find(
          (userData) => userData.username === user
        );

        if (currentUser) {
          currentUser.tasks = updatedTasks;
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      }
    }
  };

  const handleCompleteTask = (taskId: string) => {
    if (userTasks.length > 0) {
      const updatedTasks: Task[] = userTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'выполнена' } : task
      );

      setUserTasks(updatedTasks);

      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData: UsersData = JSON.parse(userDataString);
        const currentUser = userData.users.find(
          (userData) => userData.username === user
        );

        if (currentUser) {
          currentUser.tasks = updatedTasks;
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      }
    }
  };

  useEffect(() => {
    const retrieveUserData = () => {
      const retrievedDataString = localStorage.getItem('userData');
      if (!user) navigate('/auth');
      if (retrievedDataString) {
        const retrievedData: UsersData = JSON.parse(retrievedDataString);
        const currentUser = retrievedData.users.find(
          (userData) => userData.username === user
        );

        if (currentUser) {
          setUserTasks(currentUser.tasks);
          setTasksLength(currentUser.tasks.length);
        }
      }
    };

    retrieveUserData();
  }, [user, navigate]);

  return (
    <Container>
      <Form
        user={user ?? ''}
        onTaskAdded={handleTaskAdded}
        onTaskRemoved={handleTaskRemoved}
        tasksLength={tasksLength}
      />
      {
        tasksLength ? (
          <Table
          userTasks={userTasks}
          onRemoveTask={handleRemoveTask}
          onCompleteTask={handleCompleteTask}
        />
        ) : (
          <p>Список задач пока пуст.</p>
        )
      }
    </Container>
  );
};
