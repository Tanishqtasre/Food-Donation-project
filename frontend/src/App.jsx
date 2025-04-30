import React from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DonateFood from './pages/DonateFood';
import MyDonations from './pages/MyDonations';
import AdminDashboard from './pages/Admin/Dashboard';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import VolunteerRoute from './components/VolunteerRoute';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import VolunteerForm from './pages/Volunteer/VolunteerForm';
import VolunteerDashboard from './pages/Volunteer/Dashboard';

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/donate-food"
              element={
                <PrivateRoute>
                  <DonateFood />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-donations"
              element={
                <PrivateRoute>
                  <MyDonations />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="" element={<Navigate to="dashboard" />} />
                  </Routes>
                </AdminRoute>
              }
            />
            <Route
              path="/volunteer/*"
              element={
                <VolunteerRoute>
                  <Routes>
                    <Route path="register" element={<VolunteerForm />} />
                    <Route path="dashboard" element={<VolunteerDashboard />} />
                    <Route path="" element={<Navigate to="register" />} />
                  </Routes>
                </VolunteerRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
