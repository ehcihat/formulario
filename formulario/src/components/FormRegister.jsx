import React, { useState } from 'react';
import { FormControl, 
    FormLabel, FormControlLabel, 
    Radio, RadioGroup, Select, MenuItem, 
    Divider, Rating, Checkbox, ButtonGroup,
     Dialog, DialogActions, DialogContent, 
     DialogContentText, DialogTitle, 
     TextField, Box, Paper, Grid2, Button, Typography,  } from '@mui/material';

function FormRegister() {
    const [data, setData] = useState({ name: '', surname: '', age: '', gender: '', language: '', acceptedTerms: false });
    const [value, setValue] = useState(0); 
    const [openDialog, setOpenDialog] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setOpenDialog(true); 
        } else {
            alert('Por favor, completa todos los campos requeridos, acepta los términos y condiciones y asigna una puntuación.');
        }
    };

    const handleConfirmSubmit = () => {
        alert(`Nombre: ${data.name}\nApellidos: ${data.surname}\nEdad: ${data.age}\nGénero: ${data.gender}\nLenguaje: ${data.language}\nPuntuación: ${value}`);
        setOpenDialog(false);
        resetForm(); 
    };

    const handleCloseDialog = (event, reason) => {
        if (reason && reason === "backdropClick") {
            return; 
        }
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            acceptedTerms: e.target.checked,
        }));
    };

    const isFormValid = () => {
        return (
            data.name &&
            data.surname &&
            data.age &&
            data.gender &&
            data.language &&
            data.acceptedTerms &&
            value > 0
        );
    };

    const resetForm = () => {
        setData({ name: '', surname: '', age: '', gender: '', language: '', acceptedTerms: false });
        setValue(0);
    };

    return (
        <Box
            sx={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Paper elevation={10} square={false} sx={{ textAlign: 'center', padding: 3, width: '100vw', height: '50%' }}>
                <Typography variant='h6' color='secondary' fontStyle={'italic'} sx={{ mt: 2, mb: 2 }}>Formulario</Typography>
                <Box component='form' onSubmit={handleSubmit} >
                    <Grid2 container spacing={1} >
                        <Grid2 size={{ xs: 5, sm: 5, md: 5, lg: 5 }}>
                            <TextField
                                required
                                label='Nombre'
                                variant='outlined'
                                name='name'
                                fullWidth
                                value={data.name}
                                onChange={handleChange}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 5, sm: 5, md: 5, lg: 5 }}>
                            <TextField
                                required
                                label='Apellidos'
                                variant='outlined'
                                name='surname'
                                fullWidth
                                value={data.surname}
                                onChange={handleChange}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 2, sm: 2, md: 2, lg: 2 }}>
                            <TextField
                                type='number'
                                required
                                label='Edad'
                                variant='outlined'
                                name='age'
                                fullWidth
                                value={data.age}
                                onChange={handleChange}
                            />
                        </Grid2>

                        <Grid2 size={{ xs: "column", sm: 6, md: 6, lg: 6 }}>
                            <FormControl fullWidth >
                                <FormLabel id="gender-label" required>Género</FormLabel>
                                <RadioGroup
                                    aria-labelledby="gender-label"
                                    name="gender"
                                    value={data.gender}
                                    onChange={handleChange}
                                    sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}
                                    row
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Femenino" />
                                    <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                                    <FormControlLabel value="other" control={<Radio />} label="Otro" />
                                </RadioGroup>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                            <FormControl fullWidth required>
                                <FormLabel>Lenguaje de Programación</FormLabel>
                                <Select
                                    name="language"
                                    displayEmpty
                                    value={data.language}
                                    onChange={handleChange}

                                >
                                    <MenuItem value="" disabled>
                                        Lenguaje de programación favorito
                                    </MenuItem>
                                    <MenuItem value="javascript" >JavaScript</MenuItem>
                                    <MenuItem value="python">Python</MenuItem>
                                    <MenuItem value="java">Java</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid2>
                    </Grid2>
                    <Grid2 padding={2}>
                        <Divider />
                    </Grid2>
                    <Grid2 container spacing={4}>
                        <Typography>Puntúa esta encuesta</Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </Grid2>
                    <Grid2 container>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={data.acceptedTerms}
                                    onChange={handleCheckboxChange}
                                />
                            }
                            label="He leído los términos y condiciones"
                        />
                    </Grid2>
                    <Grid2 container spacing={2} justifyContent={'center'}>
                        <ButtonGroup variant="contained" aria-label="Basic button group" fullWidth>
                            <Button type="submit" color='primary' variant='contained' fullWidth disabled={!isFormValid()}>Enviar</Button>
                            <Button type="button" color='warning' variant='outlined' fullWidth onClick={resetForm}>Limpiar</Button>
                        </ButtonGroup>
                    </Grid2>
                </Box>

        
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Confirmar Envío</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Estás seguro de que deseas enviar los datos?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            No
                        </Button>
                        <Button onClick={handleConfirmSubmit} color="primary">
                            Sí
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Box>
    );
}

export default FormRegister;
