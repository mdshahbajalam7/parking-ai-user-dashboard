/* eslint-disable*/
// material-ui

import { styled } from '@mui/material/styles';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#0B1329' : (theme.palette.grey[100] || '#F4F6F8'),
  minHeight: '100vh'
}));

export default AuthWrapper1;
