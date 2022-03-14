//import Signup from './components/Signup';
import { Container } from 'react-bootstrap';
import { theme } from './components/styles/theme';
import { ThemeProvider } from 'styled-components';
import { Global } from './components/styles/Global.styled';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';

import WorkoutPage from './components/dashboard/WorkoutPage';
import RegisterForm from './components/auth/RegisterForm';
import { useUserState } from './contexts/UserContext';

function App() {
  const { user } = useUserState();
  console.log(user);
  return (
    <ThemeProvider theme={theme}>
      <Global />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={!user ? <RegisterForm /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='dashboard'
            element={!user ? <Navigate to='/' /> : <Dashboard />}
          />
          <Route path='dashboard/workout/:id' element={<WorkoutPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
