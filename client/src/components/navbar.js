import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../appContext';
import SearchBar from './searchbar';
import NavbarMenu from './navbarMenu';
import SellIcon from '@mui/icons-material/Sell';
import CategoryIcon from '@mui/icons-material/Category';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Popover,
  IconButton,
  Typography,
  Toolbar,
  Box,
  AppBar,
} from '@mui/material';
import './navbar.scss';

export default function ButtonAppBar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const { categories } = useContext(AppContext);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const history = useHistory();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <NavbarMenu
            mobileMoreAnchorEl={mobileMoreAnchorEl}
            handleMobileMenuClose={handleMobileMenuClose}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginRight: '50px' }}
            onClick={() => {
              history.push('/');
            }}
            className="logo"
          >
            MarkET
          </Typography>
          <SearchBar />
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            {categories.map((cat, i) => (
              <Typography
                variant="body2"
                sx={{ p: 1 }}
                key={`nav-cat-${i}`}
                className="navLink"
                onClick={() => {
                  handleClose();
                  history.push(`/results?category=${cat}`);
                }}
              >
                {cat}
              </Typography>
            ))}
          </Popover>
          <IconButton
            size="large"
            edge="end"
            onClick={handleClick}
            color="inherit"
            className="navButton"
          >
            <CategoryIcon />
            <Typography sx={{}} variant="subtitle2">
              Category
            </Typography>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            onClick={() => {
              history.push('/sell');
            }}
            color="inherit"
            className="navButton"
          >
            <SellIcon />
            <Typography sx={{}} variant="subtitle2">
              Selling
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
