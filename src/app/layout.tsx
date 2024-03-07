import React from 'react';
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';

import 'react-toastify/dist/ReactToastify.css';

const AppBarComponent = dynamic(() => import('@/_components/Layout/AppBar'))

export const metadata = {
  title: 'Book storage',
  description: 'Book storage app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ToastContainer />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarComponent />
            <Box
              component="main"
              sx={{
                bgcolor: 'background.default',
                mt: ['0px', '0px', '64px'],
                p: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {children}
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
