import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Mock data - in a real app, this would come from an API
const streakData = Array.from({ length: 180 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return {
    date: date.toISOString().split('T')[0],
    count: Math.floor(Math.random() * 5), // Random activity
  };
}).reverse();

const patternData = [
  { name: 'Two Pointers', solved: 12 },
  { name: 'Hash Map', solved: 10 },
  { name: 'Sliding Window', solved: 8 },
  { name: 'Binary Search', solved: 7 },
  { name: 'DP', solved: 5 },
  { name: 'Stack', solved: 4 },
  { name: 'Linked List', solved: 4 },
  { name: 'Graph', solved: 3 },
  { name: 'Trie', solved: 2 },
  { name: 'Heap', solved: 1 },
];

const difficultyData = [
  { name: 'Easy', value: 20 },
  { name: 'Medium', value: 55 },
  { name: 'Hard', value: 30 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042']; // Green, Yellow, Orange for Easy, Medium, Hard

const DashboardPage = () => {
  const [viewBy, setViewBy] = useState('Pattern');
  const [userName, setUserName] = useState('Snaha'); // Placeholder

  // In a real app, you would fetch user data
  // useEffect(() => {
  //   fetchUserData().then(data => setUserName(data.name));
  // }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Left Column (Wide) */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome Back, {userName}!
          </Typography>

          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Your Activity (Last 6 Months)</Typography>
            {/* Contribution "Streak" Graph placeholder */}
            <Box sx={{ height: 150, backgroundColor: '#222', borderRadius: 1, p: 1 }}>
              <Typography variant="body2" sx={{color: '#888'}}>GitHub-style streak graph coming soon!</Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Progress Breakdown</Typography>
              <FormControl size="small">
                <Select
                  value={viewBy}
                  onChange={(e) => setViewBy(e.target.value)}
                >
                  <MenuItem value="Pattern">View by: Pattern</MenuItem>
                  <MenuItem value="Difficulty">View by: Difficulty</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                {viewBy === 'Pattern' ? (
                  <BarChart data={patternData}>
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="solved" fill="#8884d8" />
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie data={difficultyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                      {difficultyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column (Narrow) */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Quick Stats</Typography>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="h2" component="div" sx={{ fontWeight: 'bold' }}>105</Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4 }}>Total Problems Solved</Typography>

              <Box>
                <Typography variant="h5" sx={{ color: COLORS[2] }}>30 Hard</Typography>
                <Typography variant="h5" sx={{ color: COLORS[1] }}>55 Medium</Typography>
                <Typography variant="h5" sx={{ color: COLORS[0] }}>20 Easy</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
