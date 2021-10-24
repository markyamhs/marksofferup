import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

import './itemCard.scss';

export default function ItemCard({ post }) {
  const { title, price, thumbnail, locatedCity, locatedState, _id } = post;
  const history = useHistory();
  const handleClick = (e) => {
    history.push(`/details/${_id}`);
  };
  return (
    <Card className="itemCard" onClick={handleClick}>
      <div
        style={{ backgroundImage: 'url(' + thumbnail + ')' }}
        className="itemThumbnail"
      ></div>
      <CardContent>
        <Typography
          gutterBottom
          noWrap
          variant="body1"
          component="div"
          className="itemTitle"
        >
          {title}
        </Typography>
        <Typography gutterBottom noWrap variant="body2" component="div">
          ${price.toLocaleString()}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
          {`${locatedCity}, ${locatedState}`}
        </Typography>
      </CardContent>
    </Card>
  );
}
