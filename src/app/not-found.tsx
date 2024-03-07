import React from 'react';
import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import StyledContainer from '@/_components/common/Container';

export default function NotFound() {
  return (
    <StyledContainer>
      <Typography variant="h1">
        404
      </Typography>
      <Typography variant="h6">
        The page you’re looking for doesn’t exist.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" component="a">
          Back Home
        </Button>
      </Link>
    </StyledContainer>
  );
}
