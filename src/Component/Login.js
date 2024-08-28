import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        const auth = 'Basic ' + btoa('RGICalldesk' + ':' + 'UkdJQ2FsbGRlc2s6dGhpc0Bwcml2YXRlcmdpYXBpQGNhbGxkZXNr');

        try {
            const response = await axios.get('https://calldeskuat.reliancegeneral.co.in:8081/api/login?strUserName='+username+'&strPassword='+password, {
                headers: {
                    'Authorization': auth
                }
            });

            console.error("response--"+response.data.IsSuccess);

            if (response.data.IsSuccess === true) {
              const userProfile = response.data.Output; 
            const name =  userProfile.map(item => item.EmployeeName);
            const email =  userProfile.map(item => item.LoweredEmail);
            const role =  userProfile.map(item => item.EmployeeDesignation);
            const BranchCode = userProfile.map(item => item.BranchCode);
            const BranchName = userProfile.map(item => item.BranchName);
            const RegionCode = userProfile.map(item => item.RegionCode);
            const RegionName = userProfile.map(item => item.RegionName);
            const LastPasswordChangedDate = userProfile.map(item => item.LastPasswordChangedDate);
            const PasswordChangeDaysAllowed= userProfile.map(item => item.PasswordChangeDaysAllowed);
            const UserName = userProfile.map(item => item.UserName);
            const OfficeType = userProfile.map(item => item.OfficeType);
            const UserLastLogin = userProfile.map(item => item.UserLastLogin);
            const UserLastLogOut = userProfile.map(item => item.UserLastLogOut);
            const LocationTypeID = userProfile.map(item => item.LocationTypeID);
           
              
              // Assuming this contains user profile data
              login(name,email,role,BranchCode,BranchName,RegionCode,RegionName,LastPasswordChangedDate,PasswordChangeDaysAllowed,UserName,OfficeType,UserLastLogin,UserLastLogOut,LocationTypeID
              );
                navigate('/dashboard');
            } else {
                setError(response.data.Message);
            }
        } catch (err) {
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundSize: 'cover',
        }}>
            <Card sx={{ maxWidth: 400, margin: 'auto', padding: 4, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ marginBottom: 3 }}>
                        Please login to your account
                    </Typography>

                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <Typography color="error" variant="body2" align="center">
                            {error}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Login'}
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
