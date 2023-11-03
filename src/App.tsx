import React from 'react';
import s from './App.module.scss';
import { Container } from './modules/Container/Container';

function App() {
  return (
    <div className={s.app}>
      <Container>
      <button type="submit" className="btn btn-primary me-3">
        Сохранить
      </button>
      </Container>
    </div>
  );
}

export default App;
