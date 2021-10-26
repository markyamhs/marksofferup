import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../components/spinner';
import ImageSlide from '../components/imageSlide';
import ItemInfo from '../components/itemInfo';
import { Breadcrumbs, Typography, Button, Grid } from '@mui/material';
import api from '../util/api';

class Details extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      loading: true,
      details: {},
    };
  }
  goBack() {
    this.props.history.goBack();
  }
  async componentDidMount() {
    try {
      const res = await api.get(`/details/${this.props.match.params.id}`);
      this.setState({ details: res.data }, () => {
        this.setState({ loading: false });
      });
    } catch (e) {
      console.log(e);
      this.props.history.push({ pathname: '/' });
    }
  }
  render() {
    return (
      <div>
        <Spinner display={this.state.loading} />
        {!this.state.loading && (
          <>
            <Breadcrumbs>
              <Link to="/">Home</Link>
              <Link to={`/results?category=${this.state.details.category}`}>
                {this.state.details.category}
              </Link>
              <Typography>{this.state.details.title}</Typography>
            </Breadcrumbs>
            <Grid container justifyContent="center">
              <Grid item md={12} lg={9}>
                <ImageSlide imageUrls={this.state.details.images} />
              </Grid>
              <Grid item md={12} lg={3}>
                <ItemInfo post={this.state.details} />
              </Grid>
            </Grid>
            <Button onClick={this.goBack} variant="contained">
              Back to previous page
            </Button>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(Details);
