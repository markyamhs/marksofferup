import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
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
    <Grid p={2} sx={{ width: '400px' }}>
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
