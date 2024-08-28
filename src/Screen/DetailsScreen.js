import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Box, CircularProgress, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextareaAutosize, TextField, Toolbar, Typography } from '@mui/material';
import { useAuth } from '../Context/AuthContext';
import { AccountCircle, AccountCircleOutlined, Attribution, Badge, Bento, CameraFront, Menu, MenuOutlined } from '@mui/icons-material';

const DetailsScreen = () => {
    const { ticketnumber } = useParams(); // Extract the id from the URL
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [approveruploadFile, setapprooverUploadFile] = useState(null);
    const [SecondapproveruploadFile, setSecondapprooverUploadFile] = useState(null);
    const [resolverfile, setResolverFile] = useState(null);

    const { isAuthenticated, name, email, role, BranchCode, BranchName, RegionCode, RegionName, LastPasswordChangedDate, PasswordChangeDaysAllowed, UserName, OfficeType, UserLastLogin, UserLastLogOut, logout } = useAuth();


    useEffect(() => {
        // Fetch data based on the id
        const fetchData = async () => {
            try {
                const username = 'RGICalldesk';
                const password = 'UkdJQ2FsbGRlc2s6dGhpc0Bwcml2YXRlcmdpYXBpQGNhbGxkZXNr';
                const authHeader = 'Basic ' + btoa(`${username}:${password}`);

                const response = await axios.get(`https://calldeskuat.reliancegeneral.co.in:8081/api/TicketDetails?TicketNumber=` + ticketnumber + `&LoggedUserName=` + UserName + `&OfficeType=` + OfficeType + `&BranchCode=` + BranchCode, {
                    headers: {
                        'Authorization': authHeader,
                    },
                });


                setData(response.data);


                const Files_by_User = response.data.map(item => item.Files_by_User.map(item => item.UploadedFile));
                const approverfile = response.data.map(item => item.Files_by_Approver1.map(item => item.FilebyApprover1));
                const secondapproverfile = response.data.map(item => item.Files_by_Approver2.map(item => item.FilebyApprover2));
                const resolverfile1 = response.data.map(item => item.Files_by_AppSupport.Table.map(item => item.FileforUser));
                console.error("resolverfile1"+resolverfile1);
                setUploadFile(Files_by_User);
                setapprooverUploadFile(approverfile);
                setSecondapprooverUploadFile(secondapproverfile);
                setResolverFile(resolverfile1);
               
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, [ticketnumber]); // Re-run the effect if the id changes


    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <Box sx={{  backgroundColor: '#f6f6f6', maxHeight: '85vh', justifyContent: 'flex-start', alignItems: 'flex-start', overflowY:'scroll' }}>
           <Paper elevation={4} sx={{ width: '100%', maxWidth: 1500, backgroundColor: '#ffffff', borderRadius: 3 ,marginTop:2}}>
           <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, background: 'linear-gradient(to right, #00c6ff, #0072ff)' }}>
           <Menu sx={{  marginLeft:1 , color: '#fff' }} />
                        <Typography padding={1} variant="h7" sx={{ fontWeight: 'bold', color: '#fff' }}>              
                            Call Details
                        </Typography>
                    </Box>
                 <Box sx={{ padding:2, display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto'}}>
                {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"TicketNumberPK"}
                                variant="outlined"
                                value={index.TicketNumberPK || ' '}
                               
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight:'bold',
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"ApplicationType"}
                                variant="outlined"
                                value={index.ApplicationType || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"IssueRequestType"}
                                variant="outlined"
                                value={index.IssueRequestType || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                        
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                             {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"IssueRequestSubType"}
                                variant="outlined"
                                value={index.IssueRequestSubType || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                </Box>
                <Box sx={{ padding:2,display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto'}}>
                {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"CallStatus"}
                                variant="outlined"
                                value={index.CallStatus || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                      
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"CallDate"}
                                variant="outlined"
                                value={index.CallDate || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"TicketValue"}
                                variant="outlined"
                                value={index.TicketValue || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"Policy/Claim/Proposal/CoverNote No."}
                                variant="outlined"
                                value={index.strChannel || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                </Box>
            </Paper>
            <Paper elevation={4} sx={{marginTop:2, width: '100%', maxWidth: 1500, backgroundColor: '#ffffff', borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, background: 'linear-gradient(to right, #00c6ff, #0072ff)' }}>
           <AccountCircle sx={{  marginLeft:1 , color: '#fff' }} />
                        <Typography padding={1} variant="h7" sx={{ fontWeight: 'bold', color: '#fff' }}>              
                        User Details
                        </Typography>
                    </Box> <Box sx={{padding:2, display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto'}}>
                {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"CallLoggedUser"}
                                variant="outlined"
                                value={index.CallLoggedUser || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                      
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"CallLoggedLocation"}
                                variant="outlined"
                                value={index.CallLoggedLocation || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',

                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"CallLoggedBy"}
                                variant="outlined"
                                value={index.CallLoggedBy || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                        
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                             {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"UserContactNo"}
                                variant="outlined"
                                value={index.UserContactNo || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                </Box>
                <Box sx={{ padding:2,display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto'}}>
                {data.map((index) => (
                           <TextField
                           label={"UserRemark"}
                           variant="outlined"
                           multiline
                           
                           rows={4}
                           value={index.UserRemark || ' '}
                           InputProps={{
                               readOnly: true,
                               style: {
                                   fontWeight: 'bold',
                                   marginTop:5,
                                        fontSize:'14px'
                               },
                           }}
                           sx={{
                            width:'100%',
                            '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                            '& .MuiOutlinedInput-root': {
                                marginTop:1,
                                '& fieldset': {
                                    borderColor: '#15ABFFFF', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: '#15ABFFFF', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#15ABFFFF', // Border color when focused
                                },
                            },
                        
                        }}
                       />
                             ))}
                        {data.map((index) => (
                           
                           <TextField
                           label={"Files byUser"}
                           variant="outlined"
                           multiline
                           
                           rows={4}
                           value={uploadFile || ' '}
                           InputProps={{
                               readOnly: true,
                               style: {
                                   fontWeight: 'bold',
                                   marginTop:5,
                                        fontSize:'14px',
                                        color:'blue'
                               },
                           }}
                           sx={{
                            width:'100%',
                            '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                            '& .MuiOutlinedInput-root': {
                                marginTop:1,
                                '& fieldset': {
                                    borderColor: '#15ABFFFF', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: '#15ABFFFF', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#15ABFFFF', // Border color when focused
                                },
                            },
                        
                        }}
                           
                       />
                       
                             ))}
                            
                                       </Box>
            </Paper>
            <Paper elevation={4} sx={{marginTop:2, width: '100%', maxWidth: 1500, backgroundColor: '#ffffff', borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, background: 'linear-gradient(to right, #00c6ff, #0072ff)' }}>
           <Badge sx={{  marginLeft:1 , color: '#fff' }} />
                    <Typography padding={1} variant="h7" sx={{ fontWeight: 'bold', color: '#fff' }}>              
                        Approver Details
                        </Typography>
                    </Box> <Box sx={{padding:2, display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto'}}>
                {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"ApproverName"}
                                variant="outlined"
                                value={index.ApproverName || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                        
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}  />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"ApproverDesignation"}
                                variant="outlined"
                                value={index.ApproverDesignation || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',

                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"ApproverEMail"}
                                variant="outlined"
                                value={index.ApproverEMail || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                             {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"ApproverContact"}
                                variant="outlined"
                                value={index.FirstApprovercontact || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                        
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                </Box>
                <Box sx={{ padding:2, display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto',marginTop:1}}>
                {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"ApproverStatus"}
                                variant="outlined"
                                value={index.ApproverStatus || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                        
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"ApproverExpectedCloseDate"}
                                variant="outlined"
                                value={index.ApproverexpectedCloseDate || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"ApproverClosedDate"}
                                variant="outlined"
                                value={index.ApproverClosedDate || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                             
                </Box>
                <Box sx={{ padding:2,display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto',marginTop:1}}>
                {data.map((index) => (
                           <TextField
                           label={"ApproverRemark"}
                           variant="outlined"
                           multiline
                           
                           rows={4}
                           value={index.FirstApproverRemark || ' '}
                           InputProps={{
                               readOnly: true,
                               style: {
                                   fontWeight: 'bold',
                                   marginTop:5,
                                        fontSize:'14px'
                               },
                           }}
                           sx={{
                            width:'100%',
                            '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                            '& .MuiOutlinedInput-root': {
                                marginTop:1,
                                '& fieldset': {
                                    borderColor: '#15ABFFFF', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: '#15ABFFFF', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#15ABFFFF', // Border color when focused
                                },
                            },
                        
                        }}
                       />
                             ))}
                        {data.map((index) => (
                           
                           <TextField
                           label={"File Uploaded by Approver"}
                           variant="outlined"
                           multiline
                           
                           rows={4}
                           value={approveruploadFile || ' '}
                           InputProps={{
                               readOnly: true,
                               style: {
                                   fontWeight: 'bold',
                                   marginTop:5,
                                        fontSize:'14px',
                                        color:'blue'
                               },
                           }}
                           sx={{
                            width:'100%',
                            '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                            '& .MuiOutlinedInput-root': {
                                marginTop:1,
                                '& fieldset': {
                                    borderColor: '#15ABFFFF', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: '#15ABFFFF', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#15ABFFFF', // Border color when focused
                                },
                            },
                        
                        }}
                           
                       />
                       
                             ))}
                            
                                       </Box>
                             
            </Paper>
            
            <Paper elevation={4} sx={{ marginTop:2, width: '100%', maxWidth: 1500, backgroundColor: '#ffffff', borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, background: 'linear-gradient(to right, #00c6ff, #0072ff)' }}>
           <Bento sx={{  marginLeft:1 , color: '#fff' }} />
                    <Typography padding={1} variant="h7" sx={{ fontWeight: 'bold', color: '#fff' }}>              
                        Second Approver Details
                        </Typography>
                    </Box> <Box sx={{ padding:2, display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto'}}>
                {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"SecondApproverName"}
                                variant="outlined"
                                value={index.SecondApproverName || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"SecondApproverDesignation"}
                                variant="outlined"
                                value={index.SecondApproverDesignation || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"SecondApproverEMail"}
                                variant="outlined"
                                value={index.SecondApproverEMail || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                             {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"SecondApprovercontact"}
                                variant="outlined"
                                value={index.SecondApprovercontact || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                </Box>
                
                <Box sx={{ padding:2, display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto',marginTop:1}}>
                {data.map((index) => (
                           <TextField
                           label={"SecondApproverRemark"}
                           variant="outlined"
                           multiline
                           
                           rows={4}
                           value={index.SecondApproverRemark || ' '}
                           InputProps={{
                               readOnly: true,
                               style: {
                                   fontWeight: 'bold',
                                   marginTop:5,
                                        fontSize:'14px'
                               },
                           }}
                           sx={{
                            width:'100%',
                            '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                            '& .MuiOutlinedInput-root': {
                                marginTop:1,
                                '& fieldset': {
                                    borderColor: '#15ABFFFF', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: '#15ABFFFF', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#15ABFFFF', // Border color when focused
                                },
                            },
                        
                        }}
                       />
                             ))}
                        {data.map((index) => (
                           
                           <TextField
                           label={"File Uploaded by SecondApprover"}
                           variant="outlined"
                           multiline
                           
                           rows={4}
                           value={SecondapproveruploadFile || ' '}
                           InputProps={{
                               readOnly: true,
                               style: {
                                   fontWeight: 'bold',
                                   marginTop:5,
                                        fontSize:'14px',
                                        color:'blue'
                               },
                           }}
                           sx={{
                            width:'100%',
                            '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                            '& .MuiOutlinedInput-root': {
                                marginTop:1,
                                '& fieldset': {
                                    borderColor: '#15ABFFFF', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: '#15ABFFFF', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#15ABFFFF', // Border color when focused
                                },
                            },
                        
                        }}
                           
                       />
                       
                             ))}
                            
                                       </Box>
                             
            </Paper>

            <Paper elevation={4} sx={{marginTop:2, width: '100%', maxWidth: 1500, backgroundColor: '#ffffff', borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, background: 'linear-gradient(to right, #00c6ff, #0072ff)' }}>
           <CameraFront sx={{  marginLeft:1 , color: '#fff' }} />
                    <Typography padding={1} variant="h7" sx={{ fontWeight: 'bold', color: '#fff' }}>              
                         AppSupportStatus Details
                        </Typography>
                    </Box> <Box sx={{ padding:2, display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto'}}>
                {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"AppSupportStatus"}
                                variant="outlined"
                                value={index.AppSupportStatus || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                        
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"AppSupportExpectedCloseDate"}
                                variant="outlined"
                                value={index.AppSupportExpectedCloseDate || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',

                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"ClosureCategory"}
                                variant="outlined"
                                value={index.closurecategory || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                      
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                             {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"AppSupportCloseDate"}
                                variant="outlined"
                                value={index.AppSupportCloseDate || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                     
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                </Box>
                <Box sx={{ padding:2, display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto',marginTop:1}}>
                {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"AppSupportPerformer"}
                                variant="outlined"
                                value={index.performer || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                      
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"AppSupportPerformerContact"}
                                variant="outlined"
                                value={index.PerformerContact || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                     
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"Userconfirmation"}
                                variant="outlined"
                                value={index.Userconfirmation || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                </Box>
                <Box sx={{ padding:2, display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto', marginTop:1}}>
                {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"Managerid"}
                                variant="outlined"
                                value={index.ManagerSapid || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                        
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"ManagerName"}
                                variant="outlined"
                                value={index.ManagerName || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                      
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                            {data.map((index) => (
                             <TextField
                                fullWidth
                                label={"ManagerEmail"}
                                variant="outlined"
                                value={index.ManagerEmail || ' '}
                                
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 'bold',
                                       
                                        marginTop:5,
                                        fontSize:'14px'
                                    },
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                                    '& .MuiOutlinedInput-root': {
                                        marginTop:1,
                                        '& fieldset': {
                                            borderColor: '#15ABFFFF', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#15ABFFFF', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#15ABFFFF', // Border color when focused
                                        },
                                    },
                                
                                }}
                            />   ))}
                             
                </Box>
                
                
                <Box sx={{ padding:2, display: 'flex', flexDirection: 'row', gap: 2 ,overflowX: 'auto',marginTop:1}}>
                {data.map((index) => (
                           <TextField
                           label={"AppsupportGroup"}
                           variant="outlined"
                           multiline
                           
                           rows={4}
                           value={index.TicketProGroup || ' '}
                           InputProps={{
                               readOnly: true,
                               style: {
                                   fontWeight: 'bold',
                                   marginTop:5,
                                        fontSize:'14px'
                               },
                           }}
                           sx={{
                            width:'100%',
                            '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                            '& .MuiOutlinedInput-root': {
                                marginTop:1,
                                '& fieldset': {
                                    borderColor: '#15ABFFFF', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: '#15ABFFFF', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#15ABFFFF', // Border color when focused
                                },
                            },
                        
                        }}
                       />
                             ))}
                             {data.map((index) => (
                           <TextField
                           label={"AppSupportRemark"}
                           variant="outlined"
                           multiline
                           
                           rows={4}
                           value={index.AppSupportRemark || ' '}
                           InputProps={{
                               readOnly: true,
                               style: {
                                   fontWeight: 'bold',
                                   marginTop:5,
                                        fontSize:'14px'
                               },
                           }}
                           sx={{
                            width:'100%',
                            '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                            '& .MuiOutlinedInput-root': {
                                marginTop:1,
                                '& fieldset': {
                                    borderColor: '#15ABFFFF', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: '#15ABFFFF', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#15ABFFFF', // Border color when focused
                                },
                            },
                        
                        }}
                       />
                             ))}
                
                        {data.map((index) => (
                           
                           <TextField
                           label={"File Uploaded by Appsupport"}
                           variant="outlined"
                           multiline
                           
                           rows={4}
                           value={resolverfile || ' '}
                           InputProps={{
                               readOnly: true,
                               style: {
                                   fontWeight: 'bold',
                                   marginTop:5,
                                        fontSize:'14px',
                                        color:'blue'
                               },
                           }}
                           sx={{
                            width:'100%',
                            '& .MuiInputLabel-root': { color: '#15ABFFFF',marginTop:1 },
                            '& .MuiOutlinedInput-root': {
                                marginTop:1,
                                '& fieldset': {
                                    borderColor: '#15ABFFFF', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: '#15ABFFFF', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#15ABFFFF', // Border color when focused
                                },
                            },
                        
                        }}
                           
                       />
                       
                             ))}
                            
                                       </Box>
                             
            </Paper>

        </Box>
    );
};

export default DetailsScreen;
