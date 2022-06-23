// module
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import { LoginPage, RegisterPage } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
