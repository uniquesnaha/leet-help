import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';
import Editor from '@monaco-editor/react';

const ViewEntryPage = () => {
    const { entryId } = useParams();
    const navigate = useNavigate();
    const [entry, setEntry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEntry = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                // NOTE: This endpoint does not yet exist on the backend.
                // It will need to be created to make this page fully functional.
                const response = await axios.get(`/entries/${entryId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setEntry(response.data);
            } catch (error) {
                console.error('Failed to fetch entry:', error);
                // Handle error (e.g., show a not found message)
            } finally {
                setIsLoading(false);
            }
        };
        fetchEntry();
    }, [entryId]);

    if (isLoading) {
        return <Container><Typography>Loading entry...</Typography></Container>;
    }

    if (!entry) {
        return <Container><Typography>Entry not found.</Typography></Container>;
    }

    const handleEdit = () => {
        navigate(`/entry/${entryId}/edit`); // Navigate to a future edit page
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <div>
                    <Typography variant="h4">{entry.problem.title}</Typography>
                    <Typography variant="body1" color="text.secondary">
                        {entry.problem.difficulty} | {entry.problem.tags.join(', ')}
                    </Typography>
                </div>
                <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>
                    Edit
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" sx={{ mt: 3 }}>My Solution</Typography>
                    <Editor
                      height="40vh"
                      language="javascript"
                      value={entry.solution_code}
                      theme="vs-dark"
                      options={{ readOnly: true }}
                    />

                    <Typography variant="h6" sx={{ mt: 3 }}>My Notes</Typography>
                    <Paper sx={{ p: 2 }} dangerouslySetInnerHTML={{ __html: entry.notes }} />

                    <Typography variant="h6" sx={{ mt: 3 }}>Artifacts</Typography>
                    {entry.artifacts.map(artifact => (
                        <Box key={artifact.id} sx={{ mb: 2 }}>
                            {artifact.artifact_type === 'image' ? (
                                <img src={`/${artifact.file_path}`} alt="Artifact" style={{ maxWidth: '100%' }} />
                            ) : (
                                <audio controls src={`/${artifact.file_path}`} />
                            )}
                        </Box>
                    ))}
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, position: 'sticky', top: 20 }}>
                        <Typography variant="h6">Complexity Analysis</Typography>
                        <Typography>Time: {entry.time_complexity}</Typography>
                        <Typography>Space: {entry.space_complexity}</Typography>

                        <Typography variant="h6" sx={{ mt: 2 }}>Problem Description</Typography>
                        <Box sx={{ maxHeight: 300, overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: entry.problem.description }} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewEntryPage;
