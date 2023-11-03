import React from 'react'
import { Link } from 'react-router-dom';
import s from './Main.module.scss';
import { Container } from 'react-bootstrap';

export const Main: React.FC = () => {
  return (
    <Container>
      <div className={s.wrapper}>
        <h1>Todo App</h1>
        <Link to="/auth" className="btn btn-primary me-3">Войти</Link>
      </div>
    </Container>
  )
}