import React from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types'; 
import moment from 'moment';

export default function ItemInfo({ post }) {
  const {
    title,
    price,
    createdAt,
    locatedCity,
    locatedState,
    condition,
    category,
    sellerName,
    sellerEmail,
    description,
  } = post;
  return (
    <Grid p={2} >
      <Typography gutterBottom variant="h4" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
        ${price && price.toLocaleString()}
      </Typography>
      <Typography gutterBottom variant="subtitle2">
        Posted on {createdAt && moment(createdAt).fromNow()} in {locatedCity},{' '}
        {locatedState}
      </Typography>
      <Typography gutterBottom variant="subtitle2">
        Condition: {condition}
      </Typography>
      <Typography gutterBottom variant="subtitle2">
        {category}
      </Typography>
      <hr />
      <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
        Seller info
      </Typography>
      <Typography gutterBottom variant="subtitle2">
        Name: {sellerName}
      </Typography>
      <Typography gutterBottom variant="subtitle2">
        Email: {sellerEmail}
      </Typography>
      <hr />
      <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
        Description
      </Typography>
      <Typography gutterBottom variant="body2">
        {description}
      </Typography>
    </Grid>
  );
}

ItemInfo.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    locatedCity: PropTypes.string.isRequired,
    locatedState: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    sellerName: PropTypes.string.isRequired,
    sellerEmail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })
}