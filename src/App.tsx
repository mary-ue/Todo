import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './modules/Main/Main';
import { Auth } from './modules/Auth/Auth';
import { User } from './modules/User/User';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="auth" element={<Auth />} />
        <Route path="/:user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
