import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Task, UsersData } from '../../mosks';
import { Form } from './Form/Form';
import { Table } from './Table/Table';

export const User: React.FC = () => {
  const { user } = useParams<{ user?: string }>();
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [tasksLength, setTasksLength] = useState<number>(userTasks.length);


  useEffect(() => {
    const retrieveUserData = () => {
      const retrievedDataString = localStorage.getItem('userData');
      if (retrievedDataString) {
        const retrievedData: UsersData = JSON.parse(retrievedDataString);
        const currentUser = retrievedData.users.find((userData) => userData.username === user);

        if (currentUser) {
          setUserTasks(currentUser.tasks);
          setTasksLength(currentUser.tasks.length);
        }
      }
    };

    retrieveUserData();
  }, [user]);

  const handleTaskAdded = (newTask: Task) => {
    setUserTasks((prevTasks) => [...prevTasks, newTask]);
    setTasksLength((prevLength) => prevLength + 1);
  };

  const handleTaskRemoved = () => {
    setUserTasks([]);
    setTasksLength(0);
  };

  return (
    <Container>
      <Form
        user={user ?? ''}
        onTaskAdded={handleTaskAdded}
        onTaskRemoved={handleTaskRemoved}
        tasksLength={tasksLength}
        />
      <Table userTasks={userTasks} />
    </Container>
  );
};
