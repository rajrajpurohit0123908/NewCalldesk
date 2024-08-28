import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Divider, colors } from '@mui/material';
import { ExpandLess, ExpandMore, Dashboard,ConfirmationNumber, Settings, AccountCircle, Build, AddToQueue, AddCircle, AddCircleOutline, ManageAccountsOutlined, ManageSearchOutlined, CloudDownloadOutlined, EscalatorOutlined, ModelTrainingOutlined, SwapHorizOutlined, QuestionAnswerOutlined, AllInboxOutlined, InputOutlined, Diversity2Outlined, AccountCircleOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';


const SideMenu = () => {
    const [openSettings, setOpenSettings] = useState(false);
    const [openinbox, setopenInbox] = useState(false);
    const [path, setpath] = useState('NA');
    const handleSettingsClick = () => {
        setOpenSettings(!openSettings);
    };
    const handleinboxSetting = () => {
      setopenInbox(!openinbox);
  };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
              
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#fffff',
                    color: '#565D6DFF',
                    marginTop:8.4
                },
            }}
        >
            <List>
                <ListItem button component={NavLink} to="/dashboard" sx={{
                                '&.active': {
                             
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                  
                        }}>
                    <ListItemIcon sx={{ color: '#565D6DFF', }}>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />

                <ListItem button onClick={handleSettingsClick} sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                   
                        }}>
                    <ListItemIcon sx={{ color: '#565D6DFF', }}>
                        <AddToQueue />
                    </ListItemIcon>
                    <ListItemText primary="Calldesk" />
                    {openSettings ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSettings} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={NavLink} to="/register" sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                  
                                    pl: 4
                        }}>
                            <ListItemIcon sx={{ color: '#565D6DFF' }}>
                                <AddCircleOutline />
                            </ListItemIcon>
                            <ListItemText primary="RegisterCall" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/trackcall" sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                  
                                    pl: 4
                        }}>
                            <ListItemIcon sx={{ color: '#565D6DFF' }}>
                                <ManageSearchOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Track Call" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/userconfirmation" sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                  
                                    pl: 4
                        }}>
                            <ListItemIcon sx={{ color: '#565D6DFF' }}>
                                <ManageAccountsOutlined />
                            </ListItemIcon>
                            <ListItemText primary="User Confirmation" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/downloadfile" sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                  
                                    pl: 4
                        }}>
                            <ListItemIcon sx={{ color: '#565D6DFF' }}>
                                <CloudDownloadOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Download File" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/escalationmatirx" sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                  
                                    pl: 4
                        }}>
                            <ListItemIcon sx={{ color: '#565D6DFF' }}>
                                <EscalatorOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Escalation Matrix" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/tranningmodule" sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                  
                                    pl: 4
                        }}>
                            <ListItemIcon sx={{ color: '#565D6DFF' }}>
                                <ModelTrainingOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Tranning Module" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/swapbranch" sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                  
                                    pl: 4
                        }}>
                            <ListItemIcon sx={{ color: '#565D6DFF' }}>
                                <SwapHorizOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Swap Branch" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/feedback" sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                  
                                    pl: 4
                        }}>
                            <ListItemIcon sx={{ color: '#565D6DFF' }}>
                                <QuestionAnswerOutlined />
                            </ListItemIcon>
                            <ListItemText primary="FeedBack" />
                        </ListItem>
                    </List>
                </Collapse>
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
                <ListItem button onClick={handleinboxSetting} sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                   
                        }}>
                    <ListItemIcon sx={{ color: '#565D6DFF', }}>
                        <AllInboxOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {openinbox ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openinbox} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={NavLink} to="/myinbox" sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                  
                                    pl: 4
                        }}>
                            <ListItemIcon sx={{ color: '#565D6DFF' }}>
                                <InputOutlined />
                            </ListItemIcon>
                            <ListItemText primary="My Inbox" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/teaminbox" sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                  
                                    pl: 4
                        }}>
                            <ListItemIcon sx={{ color: '#565D6DFF' }}>
                                <Diversity2Outlined />
                            </ListItemIcon>
                            <ListItemText primary="Team Inbox" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/approverinbox" sx={{
                                '&.active': {
                                  backgroundColor: '#15ABFFFF',
                                  color: '#fff',
                                  position: 'relative', 
                                  fontWeight: '700'
                                    },
                                  
                                    pl: 4
                        }}>
                            <ListItemIcon sx={{ color: '#565D6DFF' }}>
                                <AccountCircleOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Approver Inbox" />
                        </ListItem>
                    </List>
                </Collapse>
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
                
            </List>
        </Drawer>
    );
};

export default SideMenu;
