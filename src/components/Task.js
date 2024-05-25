import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';
import EmptyFieldAlert from './EmtyFieldAlert'
import SuccessAlert from './SuccessAlert'

export default function Task() {
    const paperStyle = {
        padding: '30px 20px',
        margin: '30px auto',
        width: 600,
    };
    const [taskTitle, setTaskTitle]=React.useState('');
    const [taskDescription, setTaskDescription]=React.useState('');
    const [error, setError]=React.useState('');
    const [success, setSuccess]=React.useState('');

    const handleClick = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (taskTitle.trim() === '') {
            setError('Название');
        } else if (taskDescription.trim() === '') {
            setError('Описание')
        } else {
            try{
                const task = {title: taskTitle, description: taskDescription};
                console.log(task);
                fetch("http://localhost:8080/task", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                });
                setSuccess('Задание успешно добавлено');
                setTaskTitle('');
                setTaskDescription('');
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color: "primary"}}>Добавить задание</h1>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& > :not(style)': { mb: 2 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="task-title" label="Название" variant="outlined" fullWidth
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)} 
                    />
                    <TextField id="task-description" label="Описание" variant="outlined" fullWidth 
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    />
                    {success && <SuccessAlert/>}
                    {error && <EmptyFieldAlert field={error} />}
                    
                    <Button variant="contained" color="primary" id="task-save" onClick={handleClick}>Сохранить</Button>
                </Box>
            </Paper>
        </Container>
    );
}