import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from './itemCard';
import PropTypes from 'prop-types';

export default function ItemsContainer({ postArr }) {
  return (
    <Grid container spacing={2}>
      {postArr &&
        postArr.map((post, index) => (
          <Grid
            item
            key={`postCard-${index}`}
            xs={12}
            md={6}
            lg={3}
            xl={2}
            container
            justifyContent="center"
          >
            <ItemCard post={post} />
          </Grid>
        ))}
    </Grid>
  );
}

ItemsContainer.propTypes = {
  postArr: PropTypes.array.isRequired,
};
