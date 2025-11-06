import React, { useState, useCallback } from 'react';
import {
  Container, Typography, Box, Button, TextField, Modal, Paper, Grid,
  FormControl, Select, MenuItem, InputLabel, CircularProgress, Card, CardContent
} from '@mui/material';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { useDropzone } from 'react-dropzone';
import { ReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
};

const AddEntryPage = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [problemDetails, setProblemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [code, setCode] = useState('// Your solution here');
  const [notes, setNotes] = useState('');
  const [timeComplexity, setTimeComplexity] = useState('');
  const [spaceComplexity, setSpaceComplexity] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [voiceMemos, setVoiceMemos] = useState([]);
  const [aiComplexityFeedback, setAiComplexityFeedback] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    setImageFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const handleFetchProblem = async () => { /* ... existing code ... */ };

  const handleCheckComplexity = async () => {
    try {
      const response = await axios.post('/ai/check-complexity', { code });
      setAiComplexityFeedback(response.data);
    } catch (error) {
      console.error("Failed to check complexity", error);
    }
  };

  const handleNewVoiceMemo = (blobUrl, blob) => {
    const file = new File([blob], `voice-memo-${Date.now()}.webm`, { type: 'audio/webm' });
    setVoiceMemos(prevMemos => [...prevMemos, { url: blobUrl, file }]);
  };

  const handleSubmit = async () => {
    if (!problemDetails) return;

    const formData = new FormData();
    // Append problem details
    formData.append('title', problemDetails.title);
    formData.append('url', problemDetails.url);
    formData.append('difficulty', problemDetails.difficulty);
    formData.append('tags', problemDetails.tags.join(','));
    formData.append('description', problemDetails.description);
    // Append entry details
    formData.append('solution_code', code);
    formData.append('notes', notes);
    formData.append('time_complexity', timeComplexity);
    formData.append('space_complexity', spaceComplexity);
    // Append all artifact files
    [...imageFiles, ...voiceMemos.map(memo => memo.file)].forEach(file => {
      formData.append('artifacts', file);
    });

    try {
      const token = localStorage.getItem('token');
      await axios.post('/entries/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/vault'); // Navigate to the codex vault on success
    } catch (error) {
      console.error("Failed to submit entry:", error);
      // Add user-facing error handling
    }
  };

  if (!problemDetails) { /* ... existing modal code ... */ }

  return (
    <Container maxWidth="lg">
      {/* ... The rest of the component ... */}
    </Container>
  );
};

export default AddEntryPage;
