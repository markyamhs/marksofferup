import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import SearchBar from './searchbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SellIcon from '@mui/icons-material/Sell';
import IconButton from '@mui/material/IconButton';
import './navbar.scss';

export default function ButtonAppBar() {
  const history = useHistory();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              history.push('/');
            }}
            className="logo"
          >
            Mark's OfferUp
          </Typography>
          <SearchBar />
          <IconButton
            size="large"
            edge="end"
            onClick={() => {
              history.push('/sell');
            }}
            color="inherit"
          >
            <SellIcon />
            <span className="buttonText">Sell</span>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
