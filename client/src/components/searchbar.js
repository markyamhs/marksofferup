import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

export default function SearchBar() {
  const history = useHistory();
  const [searchStr, SetSearchString] = useState('');
  const handleChange = (e) => {
    SetSearchString(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  const handleSubmit = async (e) => {
    if (searchStr.length === 0) {
      alert('Your search field is empty.');
      return;
    }
    const searchStrCopy = searchStr;
    SetSearchString('')
    history.push(`/results?title=${searchStrCopy}`);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    backgroundColor: '#869fdb',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 2),
      paddingRight: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <Search>
      <StyledInputBase
        placeholder="Search by item name…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchStr}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus={true}
      />
      <SearchIconWrapper onClick={handleSubmit}>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
}
