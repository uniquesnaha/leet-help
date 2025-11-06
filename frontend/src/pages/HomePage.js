import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

// Mock data for the charts
const difficultyData = [
  { name: 'Easy', value: 40 },
  { name: 'Medium', value: 35 },
  { name: 'Hard', value: 25 },
];

const tagsData = [
  { name: 'Arrays', value: 30 },
  { name: 'Strings', value: 25 },
  { name: 'Hash Table', value: 20 },
  { name: 'Dynamic Programming', value: 15 },
  { name: 'Graphs', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                backgroundColor: '#1e1e1e',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Difficulty Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                backgroundColor: '#1e1e1e',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Top Tags
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tagsData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Add more widgets here */}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default HomePage;
