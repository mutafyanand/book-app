import Link from 'next/link';
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavBarRoutes } from '@/utils/constants';

const AppBarComponent = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'background.paper', justifyContent: 'space-between' }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <DashboardIcon sx={{ color: '#444', mr: 2, transform: 'translateY(-2px)' }} />
                    <Typography variant="h6" color="text.primary">
                        Book Collection
                    </Typography>
                    {NavBarRoutes.map(({ text, href, icon: Icon }) => (
                        <Link key={href} href={href} passHref>
                            <Button
                                startIcon={<Icon />}
                                sx={{ color: '#444', textTransform: 'none' }}
                            >
                                {text}
                            </Button>
                        </Link>
                    ))}
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default AppBarComponent