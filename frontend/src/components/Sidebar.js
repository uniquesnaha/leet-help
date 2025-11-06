import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Typography, Box } from '@mui/material';
import { Dashboard as DashboardIcon, Book as BookIcon, Add as AddIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#000000',
          borderRight: '1px solid #333333',
        },
      }}
    >
      <Box sx={{ padding: '16px', textAlign: 'center' }}>
        <Typography variant="h5" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
          Codex
        </Typography>
      </Box>

      <Box sx={{ padding: '0 16px 16px' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth
          component={Link}
          to="/add-entry"
        >
          Add New Entry
        </Button>
      </Box>

      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><DashboardIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/vault">
          <ListItemIcon><BookIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="My Codex" />
        </ListItem>
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <List>
        <ListItem button>
          <ListItemIcon><AccountCircleIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
