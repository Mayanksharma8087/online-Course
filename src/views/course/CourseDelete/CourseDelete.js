import React from 'react';
import { Typography, Button, Box } from '@mui/material';

function CourseDelete({ setDeletePop, confirmHandler }) {
    return (
        <Box sx={{bgcolor:'white',width:'300px',margin:'30px auto',p:5}}>
            <Typography>Are Your Delete the course</Typography>
            <Box>
            <Button onClick={confirmHandler}>Confirm</Button>
            <Button onClick={() => setDeletePop(false)}>Cancel</Button>
            </Box>
        </Box>
    );
}

export default CourseDelete;
