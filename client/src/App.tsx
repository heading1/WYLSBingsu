// module
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import { MainPage } from './pages';
import { LoginPage } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
