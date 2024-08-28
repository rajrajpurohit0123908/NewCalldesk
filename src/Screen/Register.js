import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, MenuItem, CircularProgress, Typography, Container, InputLabel, FormControl, Select, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Home, Info, ContactMail } from '@mui/icons-material';
import { useAuth } from '../Context/AuthContext';

const Background = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
}));

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[10],
    maxWidth: 800,
    width: '100%',
    margin: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    fontSize: '1.1rem',
    fontWeight: 'bold',
}));

const Register = () => {
    const [dropdownData1, setDropdownData1] = useState([]);
    const [dropdownData2, setDropdownData2] = useState([]);
    const [dropdownData3, setDropdownData3] = useState([]);
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [selectedOption3, setSelectedOption3] = useState('');
    const [applicationid, setApplicationId] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const { isAuthenticated, name, email, role, BranchCode, BranchName, RegionCode, RegionName, LastPasswordChangedDate, PasswordChangeDaysAllowed, UserName, OfficeType, UserLastLogin, UserLastLogOut, logout,LocationTypeID } = useAuth();

    const handleDropdownChange = (event) => {
        setSelectedOption1(event.target.value);
        fetchDropdownData2(event.target.value);
    };

    const handleDropdownChange1 = (event) => {
        setSelectedOption2(event.target.value);
        fetchDropdownData3(event.target.value,applicationid);
        console.error("issuerequest---"+event.target.key);
        console.error("applicationid---"+applicationid);
    };

    const fetchDropdownData2 = async (e) => {
        try {
            console.error("e---"+e);
            setApplicationId(e);
            const username = 'RGICalldesk';
            const password = 'UkdJQ2FsbGRlc2s6dGhpc0Bwcml2YXRlcmdpYXBpQGNhbGxkZXNr';
            const authHeader = 'Basic ' + btoa(`${username}:${password}`);

            const response = await axios.get(`https://calldeskuat.reliancegeneral.co.in:8081/api/Category?applicationid=` + e ,{
                headers: {
                    'Authorization': authHeader,
                },
            });
            
            setDropdownData2(response.data);
            console.error(response.data);
        } catch (err) {
            console.error('Failed to fetch dropdown data 2', err);
        }
    };

    const fetchDropdownData3 = async (e1,e2) => {
        try {
            console.error("e1---"+e1);
            console.error("e2---"+e2);
          
            const username = 'RGICalldesk';
            const password = 'UkdJQ2FsbGRlc2s6dGhpc0Bwcml2YXRlcmdpYXBpQGNhbGxkZXNr';
            const authHeader = 'Basic ' + btoa(`${username}:${password}`);

            const response = await axios.get(`https://calldeskuat.reliancegeneral.co.in:8443/api/SubCategory?applicationid=`+e2+`&categoryid=`+e1+`&LocationTypeID=`+LocationTypeID,{
                headers: {
                    'Authorization': authHeader,
                },
            });
            
            setDropdownData3(response.data);
            console.error(response.data);
        } catch (err) {
            console.error('Failed to fetch dropdown data 3', err);
        }
    };

    useEffect(() => {

        const fetchDropdownData1 = async () => {

            try {
                const username = 'RGICalldesk';
            const password = 'UkdJQ2FsbGRlc2s6dGhpc0Bwcml2YXRlcmdpYXBpQGNhbGxkZXNr';
            const authHeader = 'Basic ' + btoa(`${username}:${password}`);

            const response = await axios.get(`https://calldeskuat.reliancegeneral.co.in:8081/api/Application?LoggedBranchCode=` + BranchCode ,{
                headers: {
                    'Authorization': authHeader,
                },
            });
            setDropdownData1(response.data);
            } catch (err) {
                console.error('Failed to fetch dropdown data 1', err);
            }
        };

        

        

        fetchDropdownData1();
        fetchDropdownData2();
        fetchDropdownData3();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError('');

        const formData = {
            option1: selectedOption1,
            option2: selectedOption2,
            option3: selectedOption3,
        };

        try {
            await axios.post('https://yourapi.com/register', formData); // Replace with your API
            setSuccess(true);
        } catch (err) {
            setError('Failed to submit the form');
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'home':
                return <Home />;
            case 'info':
                return <Info />;
            case 'contact':
                return <ContactMail />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{  backgroundColor: '#f6f6f6', maxHeight: '85vh', justifyContent: 'flex-start', alignItems: 'flex-start', overflowY:'scroll' }}>
        <Paper elevation={4} sx={{ width: '100%', maxWidth: 1500, backgroundColor: '#ffffff', borderRadius: 3 ,marginTop:2}}>
         <Box component="form" onSubmit={handleSubmit} sx={{  md:4,padding:2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="dropdown1-label">ApplicationType</InputLabel>
                                <Select
                                    labelId="dropdown1-label"
                                    value={selectedOption1}
                                    onChange={(e) => handleDropdownChange(e)}
                                    label="ApplicationType"
                                >
                                    {dropdownData1.map((option) => (
                                        
                                        <MenuItem key={option.ApplicationId} value={option.ApplicationId}>
                                          {option.ApplicationName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="dropdown2-label">IssueRequestType</InputLabel>
                                <Select
                                    labelId="dropdown2-label"
                                    value={selectedOption2}
                                    onChange={(e) => handleDropdownChange1(e)}
                                    label="IssueRequestType"
                                >
                                    {dropdownData2.map((option) => (
                                       option.map((option) => (
                                        <MenuItem key={option.IssueRequestType_PK} value={option.IssueRequestType_PK}>
                                        {option.IssueRequestType}
                                    </MenuItem>
                                    ))))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="dropdown3-label">Select Option 3</InputLabel>
                                <Select
                                    labelId="dropdown3-label"
                                    value={selectedOption3}
                                    onChange={(e) => setSelectedOption3(e.target.value)}
                                    label="Select Option 3"
                                >
                                    {dropdownData3.map((option) => (
                                       option.map((option) => (
                                        <MenuItem key={option.IssueRequestSubType_PK} value={option.IssueRequestSubType_PK}>
                                        {option.IssueRequestSubType}
                                    </MenuItem>
                                    ))))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <StyledButton type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </StyledButton>

                    {success && <Typography color="success.main" sx={{ mt: 2, textAlign: 'center' }}>Registration successful!</Typography>}
                    {error && <Typography color="error.main" sx={{ mt: 2, textAlign: 'center' }}>{error}</Typography>}
                </Box>
            </Paper>
        </Box>
    );
};

export default Register;
