import { Container } from '@mui/material';

import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <Container maxWidth='md' sx={{ marginTop: 5 }}>
      <Outlet />
    </Container>
  );
}

export default Layout;
