import React, { useContext } from 'react';
import { AppContext } from '../appContext';
import { Typography, Menu, MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NavbarMenu({
  mobileMoreAnchorEl,
  handleMobileMenuClose,
}) {
  const { categories } = useContext(AppContext);
  const history = useHistory();
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Typography
          variant="body2"
          sx={{ p: 1 }}
          className="navLink"
          onClick={() => {
            handleMobileMenuClose();
            history.push('/sell');
          }}
        >
          Sell your item
        </Typography>
      </MenuItem>
      {categories.map((cat, i) => (
        <MenuItem key={`nav-mobileMenuItem-cat-${i}`}>
          <Typography
            variant="body2"
            sx={{ p: 1 }}
            className="navLink"
            onClick={() => {
              handleMobileMenuClose();
              history.push(`/results?category=${cat}`);
            }}
          >
            {cat}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}

NavbarMenu.propTypes = {
  mobileMoreAnchorEl: PropTypes.object,
  handleMobileMenuClose: PropTypes.func.isRequired,
};
