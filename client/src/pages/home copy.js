import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import { Grid, Box, Typography } from '@mui/material';
import ItemContainer from '../components/itemsContainer';

export default function Home() {
  //TODO1: class component
  //TODO2: lazy laoding
  const [postArr, setPostArr] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:8080/api');
      const posts = res.data;
      setPostArr(posts);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Grid container justifyContent="center" p={3}>
        <Typography gutterBottom variant="h5" color="#1976d2">
          <Box sx={{ fontWeight: 'bold', m: 1 }}>
            The simpler way to buy and sell locally!
          </Box>
        </Typography>
      </Grid>
      <Spinner display={!(postArr && postArr.length > 0)} />
      <ItemContainer postArr={postArr} />
    </div>
  );
}
