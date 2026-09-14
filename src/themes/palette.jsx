// material-ui
import { createTheme } from '@mui/material/styles';

// assets
import defaultColor from 'assets/scss/_themes-vars.module.scss';

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

export default function Palette(mode = 'light', presetColor) {
  let colors;
  switch (presetColor) {
    case 'default':
    default:
      colors = defaultColor;
  }

  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      common: {
        black: colors.darkPaper,
        white: '#ffffff'
      },
      primary: {
        light: colors.primaryLight,
        main: colors.primaryMain,
        dark: colors.primaryDark,
        200: colors.primary200,
        800: colors.primary800
      },
      secondary: {
        light: colors.secondaryLight,
        main: colors.secondaryMain,
        dark: colors.secondaryDark,
        200: colors.secondary200,
        800: colors.secondary800
      },
      error: {
        light: colors.errorLight,
        main: colors.errorMain,
        dark: colors.errorDark
      },
      orange: {
        light: colors.orangeLight,
        main: colors.orangeMain,
        dark: colors.orangeDark
      },
      warning: {
        light: colors.warningLight,
        main: colors.warningMain,
        dark: colors.warningDark,
        contrastText: colors.grey700
      },
      success: {
        light: colors.successLight,
        200: colors.success200,
        main: colors.successMain,
        dark: colors.successDark
      },
      grey: {
        50: colors.grey50,
        100: isDark ? '#1E293B' : colors.grey100,
        500: colors.grey500,
        600: colors.grey600,
        700: colors.grey700,
        900: colors.grey900
      },
      dark: {
        light: colors.darkTextPrimary,
        main: colors.darkLevel1,
        dark: colors.darkLevel2,
        800: colors.darkBackground,
        900: colors.darkPaper
      },
      text: {
        primary: isDark ? '#F8FAFC' : '#0F172A',
        secondary: isDark ? '#94A3B8' : '#64748B',
        dark: isDark ? '#FFFFFF' : '#0F172A',
        hint: colors.grey100
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.12)' : '#E2E8F0',
      background: {
        paper: isDark ? '#1E293B' : '#FFFFFF',
        default: isDark ? '#0B1329' : '#F8FAFC'
      }
    }
  });
}
