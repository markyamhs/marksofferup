import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../components/spinner';
import ImageSlide from '../components/imageSlide';
import ItemInfo from '../components/itemInfo';
import { Breadcrumbs, Typography, Button } from '@mui/material';
import api from '../api';
import './details.scss';

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
      const res = await api.get(
        `/details/${this.props.match.params.id}`
      );
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
              <Typography>{this.state.details.category}</Typography>
              <Typography>{this.state.details.title}</Typography>
            </Breadcrumbs>
            <div className="detailContainer">
              <ImageSlide imageUrls={this.state.details.images} />
              <ItemInfo post={this.state.details} />
            </div>
            <Button onClick={this.goBack} variant='contained'>Back to previous page</Button>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(Details);
