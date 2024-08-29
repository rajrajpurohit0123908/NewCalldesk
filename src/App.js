import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Component/Header';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import { AuthProvider, useAuth } from './Context/AuthContext';
import { Box, CssBaseline } from '@mui/material';
import SideMenu from './Component/SideMenu';
import Register from './Screen/Register';
import TrackCall from './Screen/TrackCall';
import ListFetcher from './Screen/ListFetcher';
import DetailsScreen from './Screen/DetailsScreen';
const App = () => {
    const { isAuthenticated, name,email,role, logout } = useAuth();
    return (
       
            <Router>
                 <CssBaseline />
                 <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh'  }}>
                <Header />
               
                <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden',backgroundColor: '#f6f6f6' }}>
                {isAuthenticated && <SideMenu />}
                <Box component="main" sx={{ flexGrow: 1, p: 3 , backgroundColor: '#f6f6f6'}}>
                <Routes>
                <Route path="/login" element={<Login />} />
                {isAuthenticated ? (
                    <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/trackcall" element={<TrackCall />} />
                    <Route path="/admin" element={<ListFetcher />} />
                    <Route path="/ticketdetails/:ticketnumber" element={<DetailsScreen />} />
                    </>): (
                             <Route path="/" element={<Navigate to="/login" />} />
                        )}
 </Routes>
                </Box>
            </Box>
               </Box> 
            </Router>
        
    );
};

// Private Route Component
const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
