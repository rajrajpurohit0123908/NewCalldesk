import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Popover, Avatar, Box, IconButton, Paper } from '@mui/material';
import { NavLink  } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../img/logo.png';

const Header = () => {
    const { isAuthenticated, name,email,role, BranchCode,BranchName,RegionCode,RegionName,LastPasswordChangedDate,PasswordChangeDaysAllowed,UserName,OfficeType,UserLastLogin,UserLastLogOut,logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const nameParts = String(name).split(' ');
    const firstName = nameParts[0] || '';  // First name or empty if not present
    const lastName = nameParts[1] || '';   // Last name or empty if not present
    // Extract profile data from the userProfile array
   
    return (
      <AppBar position="static" sx={{  background: 'linear-gradient(to right, #00c6ff, #0072ff)' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={logo}
                        alt="MyApp Logo"
                        style={{ width: 300, height: 30, marginRight: 50 }}
                    />
                </Box>
                
                {isAuthenticated ? (
                    <>
                     <Box sx={{ display: 'flex', flexGrow: 5 }}>
                    <Button color="inherit" component={NavLink} to="/dashboard"  sx={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    '&.active': {
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid #fff',
                                    },
                                }}>Calldesk</Button>
                    <Button color="inherit" component={NavLink} to="/admin" sx={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    ml: 2,
                                    '&.active': {
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid #fff',
                                    },
                                }}>Admin</Button>
                     </Box>
                        <Avatar
                            sx={{ cursor: 'pointer', bgcolor: '#fff', color: '#3f51b5' ,transition: '0.3s ease',
                              '&:hover': {
                                  backgroundColor: '#f5f5f5',
                                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                  transform: 'scale(1.1)'
                              }}}
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                        >
                            {String(firstName).charAt(0).toUpperCase()}
                            {String(lastName).charAt(0).toUpperCase()}
                        </Avatar>
                        <Popover
                            sx={{ pointerEvents: 'none' }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            onClose={handlePopoverClose}
                            
                            disableRestoreFocus
                        >
                            <Paper sx={{ padding: 4 }}>
                            
                        <Typography variant="h5">{name}</Typography>
                        <Box mt={2}>
                            <Typography variant="body1">Name: {UserName}</Typography>
                            <Typography variant="body1">Email: {email}</Typography>
                            <Typography variant="body1">BranchName:{BranchName}</Typography>
                            <Typography variant="body1">Last Login:{UserLastLogin}</Typography>
                            <Typography variant="body1">Region:{RegionName}</Typography>
                            {/* Add more profile details here */}
                        </Box>
                    </Paper>
                           
                        </Popover>
                        <Typography  sx={{
                        flexGrow: 0,
                        marginLeft:1,
                        color: '#fff',
                        letterSpacing: '0.1em',
                        
                        
                    }}>{name}</Typography>
                       <IconButton
                                color="inherit"
                                onClick={logout}
                                sx={{
                                    transition: '0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                        transform: 'scale(1.1)'
                                    }
                                }}
                            >
                                <LogoutIcon />
                            </IconButton>

                    </>
                ) : (
                    <>
                        <Button color="inherit" component={NavLink} to="/login">Login</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
