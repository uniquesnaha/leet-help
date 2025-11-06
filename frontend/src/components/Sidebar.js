import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Typography, Box } from '@mui/material';
import { Dashboard as DashboardIcon, Book as BookIcon, Add as AddIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const Sidebar = ({ isOpen }) => {
  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? drawerWidth : collapsedDrawerWidth }}
      transition={{ duration: 0.3 }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: '100%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: '#000000',
            borderRight: '1px solid #333333',
            overflowX: 'hidden', // Hide content when collapsed
          },
        }}
      >
        <Box sx={{ padding: '16px', textAlign: 'center' }}>
          <Typography variant="h5" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
            {isOpen ? 'Codex' : 'C'}
          </Typography>
        </Box>

        <Box sx={{ padding: '0 16px 16px' }}>
          {isOpen && (
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
          )}
        </Box>

        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon><DashboardIcon sx={{ color: 'white' }} /></ListItemIcon>
            {isOpen && <ListItemText primary="Dashboard" />}
          </ListItem>
          <ListItem button component={Link} to="/vault">
            <ListItemIcon><BookIcon sx={{ color: 'white' }} /></ListItemIcon>
            {isOpen && <ListItemText primary="My Codex" />}
          </ListItem>
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <List>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon><AccountCircleIcon sx={{ color: 'white' }} /></ListItemIcon>
            {isOpen && <ListItemText primary="Account" />}
          </ListItem>
        </List>
      </Drawer>
    </motion.div>
  );
};

export default Sidebar;
