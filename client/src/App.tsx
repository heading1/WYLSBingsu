// module
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import {
  MainPage,
  LoginPage,
  RegisterPage,
  ErrorPage,
  WritePage,
} from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path=":userid/write" element={<WritePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
