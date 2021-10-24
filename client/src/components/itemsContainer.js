import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from './itemCard';
import './itemsContainer.scss';

export default function ItemsContainer({ postArr }) {
  return (
    <div id="itemCardContainer">
      {postArr &&
        postArr.length > 0 &&
        postArr.map((post, index) => (
          <Grid item key={`postCard-${index}`}>
            <ItemCard post={post} />
          </Grid>
        ))}
    </div>
  );
}
