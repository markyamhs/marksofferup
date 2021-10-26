import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../appContext';
import SearchBar from './searchbar';
import SellIcon from '@mui/icons-material/Sell';
import CategoryIcon from '@mui/icons-material/Category';
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
                onClick={
                  ()=>{
                    handleClose()
                    history.push(`/results?category=${cat}`);
                  }
                }
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
