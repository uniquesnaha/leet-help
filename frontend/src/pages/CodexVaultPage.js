import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Container, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

function CodexVaultPage() {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/entries/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            search,
            difficulty,
            tags,
          },
        });
        setEntries(response.data);
      } catch (error) {
        console.error('Failed to fetch entries:', error);
      }
    };

    fetchEntries();
  }, [search, difficulty, tags]);

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 8 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          Codex Vault
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={difficulty}
              label="Difficulty"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Tags"
            variant="outlined"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </Box>
        {entries.map((entry) => (
          <Card key={entry.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{entry.title}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {entry.difficulty} | Tags: {entry.tags.join(', ')}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default CodexVaultPage;
