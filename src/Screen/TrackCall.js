import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import DataTable from  '../Component/DataTable'

const TrackCall = () => {
    const [calls, setCalls] = useState(null);
    const [loading, setLoading] = useState(true);
    const { UserName } = useAuth();
    useEffect(() => {
        const fetchCallData = async () => {
            const username = 'RGICalldesk';
            const password = 'UkdJQ2FsbGRlc2s6dGhpc0Bwcml2YXRlcmdpYXBpQGNhbGxkZXNr';
            const authHeader = 'Basic ' + btoa(`${username}:${password}`);

            try {
                const response = await axios.get(
                    'https://calldeskuat.reliancegeneral.co.in:8081/api/OpenMyTickets?userid='+UserName,

                    {
                        headers: {
                            'Authorization': authHeader,
                        },
                    }
                );
                setCalls(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch call data', err);
                setLoading(false);
            }
        };

        fetchCallData();
    }, []);


    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Track Calls
            </Typography>
            <Paper elevation={4} sx={{  maxWidth: 1420, backgroundColor: '#ffffff', borderRadius: 3 ,overflowY:'hidden' }} >
            <Box>
            <DataTable  data={calls} />
            </Box>
            </Paper>
        </Box>
    );
};

export default TrackCall;
