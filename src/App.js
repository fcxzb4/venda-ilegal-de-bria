import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/home_page/HomePage';
import SignUp from './pages/login/SignUp';

function App() {
  return (
    <AuthProvider >
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<SignUp />} />
        <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>}
           />
           <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App; 