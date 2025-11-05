import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import AIDialog from '../components/AIDialog';

function AddEntryPage() {
  const [url, setUrl] = useState('');
  const [problemDetails, setProblemDetails] = useState(null);
  const [solutionCode, setSolutionCode] = useState('');
  const [notes, setNotes] = useState('');
  const [timeComplexity, setTimeComplexity] = useState('');
  const [spaceComplexity, setSpaceComplexity] = useState('');
  const [image, setImage] = useState(null);
  const [voiceMemo, setVoiceMemo] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');

  const handleScrape = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/entries/scrape', { url });
      setProblemDetails(response.data);
    } catch (error) {
      console.error('Scraping failed:', error);
    }
  };

  const handleExplainCode = async () => {
    try {
      const response = await axios.post('http://localhost:8000/ai/explain', {
        code: solutionCode,
        problem_description: problemDetails.description,
      });
      setDialogTitle('Code Explanation');
      setDialogContent(response.data.explanation);
      setDialogOpen(true);
    } catch (error) {
      console.error('Code explanation failed:', error);
    }
  };

  const handleCheckComplexity = async () => {
    try {
      const response = await axios.post('http://localhost:8000/ai/check-complexity', {
        code: solutionCode,
      });
      setDialogTitle('Complexity Check');
      setDialogContent(response.data.feedback);
      setDialogOpen(true);
    } catch (error) {
      console.error('Complexity check failed:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', problemDetails.title);
    formData.append('url', problemDetails.url);
    formData.append('difficulty', problemDetails.difficulty);
    formData.append('tags', problemDetails.tags.join(','));
    formData.append('description', problemDetails.description);
    formData.append('solution_code', solutionCode);
    formData.append('notes', notes);
    formData.append('time_complexity', timeComplexity);
    formData.append('space_complexity', spaceComplexity);
    if (image) formData.append('image', image);
    if (voiceMemo) formData.append('voice_memo', voiceMemo);

    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8000/entries/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      // Handle successful submission (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 8 }}>
        <Typography component="h1" variant="h5">
          Add New LeetCode Entry
        </Typography>
        <Box component="form" onSubmit={handleScrape} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="url"
            label="LeetCode Problem URL"
            name="url"
            autoFocus
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Scrape Problem
          </Button>
        </Box>
        {problemDetails && (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Typography variant="h6">{problemDetails.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {problemDetails.difficulty} | Tags: {problemDetails.tags.join(', ')}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: problemDetails.description }} />

            <TextField
              margin="normal"
              required
              fullWidth
              id="solutionCode"
              label="Solution Code"
              name="solutionCode"
              multiline
              rows={10}
              value={solutionCode}
              onChange={(e) => setSolutionCode(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={handleExplainCode}
            >
              Explain My Code
            </Button>
            <TextField
              margin="normal"
              required
              fullWidth
              id="notes"
              label="Notes"
              name="notes"
              multiline
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="time-complexity-label">Time Complexity</InputLabel>
              <Select
                labelId="time-complexity-label"
                id="timeComplexity"
                value={timeComplexity}
                label="Time Complexity"
                onChange={(e) => setTimeComplexity(e.target.value)}
              >
                <MenuItem value="O(1)">O(1)</MenuItem>
                <MenuItem value="O(log n)">O(log n)</MenuItem>
                <MenuItem value="O(n)">O(n)</MenuItem>
                <MenuItem value="O(n log n)">O(n log n)</MenuItem>
                <MenuItem value="O(n^2)">O(n^2)</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="space-complexity-label">Space Complexity</InputLabel>
              <Select
                labelId="space-complexity-label"
                id="spaceComplexity"
                value={spaceComplexity}
                label="Space Complexity"
                onChange={(e) => setSpaceComplexity(e.target.value)}
              >
                <MenuItem value="O(1)">O(1)</MenuItem>
                <MenuItem value="O(log n)">O(log n)</MenuItem>
                <MenuItem value="O(n)">O(n)</MenuItem>
                <MenuItem value="O(n log n)">O(n log n)</MenuItem>
                <MenuItem value="O(n^2)">O(n^2)</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={handleCheckComplexity}
            >
              Check My Complexity
            </Button>

            <Button variant="contained" component="label" sx={{ mt: 2, ml: 2 }}>
              Upload Image
              <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
            </Button>
            <Button variant="contained" component="label" sx={{ mt: 2, ml: 2 }}>
              Upload Voice Memo
              <input type="file" hidden onChange={(e) => setVoiceMemo(e.target.files[0])} />
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Entry
            </Button>
          </Box>
        )}
      </Box>
      <AIDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={dialogTitle}
        content={dialogContent}
      />
    </Container>
  );
}

export default AddEntryPage;
