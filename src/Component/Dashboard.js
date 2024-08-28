import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper, Avatar, Divider, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../Context/AuthContext';
// Import Chart.js components and register them
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Background = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    padding: theme.spacing(4),
    background: '#f5f5f5',
}));



const ProfileCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    background: 'linear-gradient(to right, #0072ff, #00c6ff)',
    color: '#fff',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[4],
}));

const ChartCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[4],
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
}));

const Dashboard = () => {
    const [profile, setProfile] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { isAuthenticated, name,email,role, BranchCode,BranchName,RegionCode,RegionName,LastPasswordChangedDate,PasswordChangeDaysAllowed,UserName,OfficeType,UserLastLogin,UserLastLogOut,logout } = useAuth();

    const nameParts = String(name).split(' ');
    const firstName = nameParts[0] || '';  // First name or empty if not present
    const lastName = nameParts[1] || '';  
    useEffect(() => {
       
        const fetchProfile = async () => {
            try {
                const response = await axios.get('https://yourapi.com/user/profile'); // Replace with your API
                setProfile(response.data);
            } catch (err) {
                console.error('Failed to fetch profile data', err);
            }
        };

        const fetchPerformanceData = async () => {
            try {
                const response = await axios.get('https://yourapi.com/user/performance'); // Replace with your API
                const data = {
                    labels: response.data.labels,
                    datasets: [
                        {
                            label: 'Performance',
                            data: response.data.scores,
                            fill: false,
                            backgroundColor: '#0072ff',
                            borderColor: '#0072ff',
                            tension: 0.1,
                        },
                    ],
                };
                setChartData(data);
            } catch (err) {
                console.error('Failed to fetch performance data', err);
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchProfile(), fetchPerformanceData()]);
            setLoading(false);
        };

        fetchData();

        
    }, []);

    return (
        <Background>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <ProfileCard>
                        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"// Optional: to center in the entire viewport height
        >
                            <UserAvatar sx={{ cursor: 'pointer', bgcolor: '#fff', color: '#3f51b5' ,transition: '0.3s ease',
                              '&:hover': {
                                  backgroundColor: '#f5f5f5',
                                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                  transform: 'scale(1.1)'
                              }}}
                              
                            
                        >
                            
                            {String(firstName).charAt(0).toUpperCase()}
                            {String(lastName).charAt(0).toUpperCase()}
                            </UserAvatar>
                            </Box>
                            <Typography variant="h5">Name: {name}</Typography>
                            <Typography variant="body1">UserName: {UserName}</Typography>
                            <Typography variant="body1">Email: {email}</Typography>
                            <Typography variant="body1">Role: {role}</Typography>
                            <Typography variant="body1">BranchCode: {BranchCode}</Typography>
                            <Typography variant="body1">BranchName: {BranchName}</Typography>
                            <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.5)' }} />
                            <Typography variant="body1">RegionCode: {RegionCode}</Typography>
                            <Typography variant="body1">RegionName: {RegionName}</Typography>
                            <Typography variant="body1">LastPasswordChangedDate: {LastPasswordChangedDate}</Typography>
                            <Typography variant="body1">PasswordChangeDaysAllowed: {PasswordChangeDaysAllowed}</Typography>
                            <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.5)' }} />
                            <Typography variant="body1">OfficeType: {OfficeType}</Typography>
                            <Typography variant="body1">UserLastLogin: {UserLastLogin}</Typography>
                            <Typography variant="body1">UserLastLogOut: {UserLastLogOut}</Typography>
                        </ProfileCard>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <ChartCard>
                            <Typography variant="h6" gutterBottom>
                                Performance Overview
                            </Typography>
                            <Line data={chartData} />
                        </ChartCard>
                    </Grid>
                </Grid>
            )}
        </Background>
    );
};

export default Dashboard;
