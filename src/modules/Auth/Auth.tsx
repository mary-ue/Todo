import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container } from '../Container/Container'
import s from './Auth.module.scss';
import { UsersData, initialData } from '../../mosks';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState<UsersData | null>(null);
  const [username, setUsername] = useState<string>('');
  // const [noUser, setNoUser] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setNoUser(false);
    setUsername(e.target.value);
  };

  const handleLogin = () => {
    const userExists = usersData?.users.some((user) => user.username === username);

    if (userExists) {
      navigate(`/${username}`);
    } else {
      const newUserData: UsersData = {
        users: [...(usersData?.users || []), { username, tasks: [] }],
      };

      localStorage.setItem('userData', JSON.stringify(newUserData));
      setUsersData(newUserData);

      navigate(`/${username}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };  

  useEffect(() => {
    const retrievedDataString = localStorage.getItem('userData');
    if (retrievedDataString) {
      const retrievedData: UsersData = JSON.parse(retrievedDataString);
      setUsersData(retrievedData);
      console.log('get data from ls');
    } else {
      setUsersData(initialData);
      localStorage.setItem('userData', JSON.stringify(initialData));
      console.log('set data to ls');
    }
  }, []); 

  return (
    <Container>
      <div className={s.wrapper}>
        <h1>Todo App</h1>
        <p className="mt-3">Введите имя пользователя:</p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Имя пользователя"
            value={username}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary" onClick={handleLogin}>
            Войти
          </button>
        </div>
        {/* {noUser && (
          <div className={s.error}>
            <p>Пользователь с именем {username} не найден.</p>
            <p>Попробуйте еще раз.</p>
          </div>
        )} */}
      </div>
    </Container>
  )
}