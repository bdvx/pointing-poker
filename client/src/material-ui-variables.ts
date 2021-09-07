import { createTheme } from '@material-ui/core';

declare module '@material-ui/core/styles' {
  interface Theme {
    sizes: {
      wrapper: React.CSSProperties['width'];
    };
    gutters: {
      'desktop-wrapper-gutter': React.CSSProperties['width'];
      'mobile-wrapper-gutter': React.CSSProperties['width'];
    }
  }
  interface ThemeOptions {
    sizes?: {
      wrapper?: React.CSSProperties['width'];
    };
    gutters?: {
      'desktop-wrapper-gutter'?: React.CSSProperties['width'];
      'mobile-wrapper-gutter'?: React.CSSProperties['width'];
    }
  }
}

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    'phone-sm': true;
    'phone-md': true;
    'phone-lg': true;
    'phone-xl': true;
    phone: true;
    tablet: true;
    lap: true;
    desk: true;
    widescreen: true;
    fullhd: true;
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      'phone-sm': 320,
      'phone-md': 375,
      'phone-lg': 425,
      'phone-xl': 480,
      phone: 640,
      tablet: 768,
      lap: 1024,
      desk: 1200,
      widescreen: 1440,
      fullhd: 1920
    },
  },
  sizes: {
    wrapper: 1440,
  },
  gutters: {
    'desktop-wrapper-gutter': 20,
    'mobile-wrapper-gutter': 10
  },
  palette: {
    primary: {
      main: '#2B3A67'
    },
    secondary: {
      main: '#66999B'
    }
  }
});

export const bp = theme.breakpoints;