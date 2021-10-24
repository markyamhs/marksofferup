import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Grid from '@mui/material/Grid';
import Loader from 'react-loader-spinner';

export default function Spinner({ display }) {
  return (
    <>
      {display ? (
        <Grid container alignItems="center" justifyContent="center">
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={40}
            width={40}
            timeout={999999}
          />
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}
