import React from 'react';
import { Container } from '@mui/material';

interface ContainerProps {
    children: React.ReactNode;
}

const StyledContainer = ({ children }: ContainerProps) => {
    return (
        <Container
            maxWidth="sm"
            fixed
            sx={{
                width:"100%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
            }}
        >
            {children}
        </Container>
    );
}

export default StyledContainer