/* eslint-disable */
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection() {
  return (
    <Link component={RouterLink} to={'/admin/analytics'} aria-label="theme-logo" underline="none" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
      <Logo />
    </Link>
  );
}
