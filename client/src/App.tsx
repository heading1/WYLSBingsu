// module
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import { LoginPage } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
