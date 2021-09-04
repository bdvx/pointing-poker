import './Header.scss';
import logo from '../../logo.png';
import { FC } from 'react';
import { Box } from '@material-ui/core';

declare module '@material-ui/core/Box' {
  interface BoxProps {
    src?: string;
    alt?: string
  }
}

export const Header: FC = () => {
  return (
    <header className="header">
      <Box 
        className="header__top-bar"
        bgcolor={'primary.main'}
      >
        <Box 
          className="header__wrap header__top-bar-wrap"
          maxWidth={'theme.sizes.wrapper'}
          mx={'auto'}
        >
          <Box
            component="img"
            className="header__logo"
            src={logo}
            alt="logo"
            sx={{
              left: {
                'phone-sm': '20px',
                lap: '65px'
              }
            }}
          />
        </Box> 
      </Box>
      <Box 
        className="header__bot-bar"
        bgcolor={'secondary.main'}
      />
    </header>
  );
};