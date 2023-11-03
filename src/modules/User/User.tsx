import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Task, UsersData } from '../../mosks';
import { Form } from './Form/Form';
import { Table } from './Table/Table';

export const User: React.FC = () => {
  const { user } = useParams<{ user?: string }>();
  const [userTasks, setUserTasks] = useState<Task[]>([]);

  useEffect(() => {
    const retrieveUserData = () => {
      const retrievedDataString = localStorage.getItem('userData');
      if (retrievedDataString) {
        const retrievedData: UsersData = JSON.parse(retrievedDataString);
        const currentUser = retrievedData.users.find((userData) => userData.username === user);

        if (currentUser) {
          setUserTasks(currentUser.tasks);
        }
      }
    };

    retrieveUserData();
  }, [user]);

  const handleTaskAdded = (newTask: Task) => {
    setUserTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <Container>
      <Form user={user ?? ''} onTaskAdded={handleTaskAdded} />
      <Table userTasks={userTasks} />
    </Container>
  );
};
