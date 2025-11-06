import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home_page/HomePage';
import SignUp from './pages/login/SignUp';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 