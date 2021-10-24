import React, { Component } from 'react';
import ItemCard from '../components/itemCard';
import axios from 'axios';
import Spinner from '../components/spinner';
import { Grid, Box, Typography } from '@mui/material';

class Home extends Component {
  constructor(props) {
    super(props);
    this.lastPostCallback = this.lastPostCallback.bind(this);
    //An intersectionObserver to detect last post element
    this.observer = React.createRef();
    this.state = {
      page: 1,
      hasMore: false,
      loading: true,
      postArr: [],
    };
  }
  async componentDidMount() {
    try {
      const searchParams = {
        params: {
          page: this.state.page,
          limit: 10,
        },
      };
      const res = await axios.get(
        'http://localhost:8080/api/get',
        searchParams
      );
      this.setState({
        postArr: res.data,
        loading: false,
        hasMore: Boolean(res.data.length > 0),
      });
    } catch (e) {
      console.log(e);
    }
  }
  async componentDidUpdate(prevProps, prepState) {
    if (this.state.page !== prepState.page && this.state.hasMore) {
      try {
        this.setState({
          loading: true,
        });
        const searchParams = {
          params: {
            page: this.state.page,
            limit: 10,
          },
        };
        const res = await axios.get(
          'http://localhost:8080/api/get',
          searchParams
        );
        this.setState({
          postArr: [...this.state.postArr, ...res.data],
          loading: false,
          hasMore: Boolean(res.data.length > 0),
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  //similar to useCallback in functional component
  lastPostCallback(node) {
    if (this.state.loading) {
      return;
    }
    if (this.observer.current) {
      this.observer.current.disconnect();
    }
    this.observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && this.state.hasMore) {
        this.setState({ page: this.state.page + 1 });
      }
    });
    if (node) {
      this.observer.current.observe(node);
    }
  }

  render() {
    return (
      <div>
        <Grid container justifyContent="center" p={3}>
          <Typography gutterBottom variant="h5" color="#1976d2">
            <Box sx={{ fontWeight: 'bold', m: 1 }}>
              The simpler way to buy and sell locally!
            </Box>
          </Typography>
        </Grid>
        <div id="itemCardContainer">
          {this.state.postArr.map((post, index) => {
            if (index !== this.state.postArr.length - 1) {
              return (
                <Grid item key={`postCard-${index}`}>
                  <ItemCard post={post} />
                </Grid>
              );
            } else {
              //this is the last post. Attach a callback on it to detect scrolling/intersecting event
              return (
                <Grid ref={this.lastPostCallback} item key={`postCard-${index}`}>
                  <ItemCard post={post} />
                </Grid>
              );
            }
          })}
        </div>
        <Spinner display={this.state.loading} />
      </div>
    );
  }
}

export default Home;
