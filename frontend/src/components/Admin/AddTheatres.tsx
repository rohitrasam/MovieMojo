import React, { useState } from "react";
import axios from 'axios';
import { TextField, Button, Container, Grid, Card, CardContent, Typography, Alert, Breadcrumbs, Link } from '@mui/material';
// import AdminBar from "./AdminBar";
import { Link as RouterLink } from "react-router-dom";

const AddTheatres: React.FC = () => {
    const [tName, setTname] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/theatre/add_theatre", {  
                name: tName,
                address: address,
                city: {name:city},  
            });

            if (response.data.success) {
                setSuccess("Theatre has been added!");
                setTname('');
                setCity('');
                setAddress('');  
            } else {
                setError("Something went wrong");
            }
        } catch (err) {
            setError("Please try again");
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
                        <Typography color="textPrimary">Add Theatre</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" component="h2" align="center">
                                Add Theatre
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Theatre Name"
                                            fullWidth
                                            value={tName}
                                            onChange={(e) => setTname(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Address"
                                            fullWidth
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="City"
                                            fullWidth
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} container justifyContent="center">
                                        <Button type="submit" variant="contained" color="primary">
                                            Add Theatre
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                            {success && <Alert severity="success">{success}</Alert>}
                            {error && <Alert severity="error">{error}</Alert>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddTheatres;
