import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import Spinner from '../components/spinner';
import { AppContext } from '../appContext';
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@mui/material';
import ItemContainer from '../components/itemsContainer';
import './results.scss';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Results() {
  const history = useHistory();
  const query = useQuery();
  const { categories, conditions } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [postArr, setPostArr] = useState([]);
  const [priceFilter, setPriceFilter] = useState(['', '']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedConditions, setSelectedConditions] = useState([]);
  useEffect(() => {
    setTitle(query.get('title'));
    if (query.has('minPrice') || query.has('maxPrice')) {
      const newPriceFilter = [...priceFilter];
      newPriceFilter[0] = query.get('minPrice');
      newPriceFilter[1] = query.get('maxPrice');
      setPriceFilter(newPriceFilter);
    } else {
      setPriceFilter(['', '']);
    }
    if (query.has('category')) {
      setSelectedCategory(query.get('category'));
    } else {
      setSelectedCategory('All');
    }
    if (query.has('conditions')) {
      if (query.get('conditions') === '') {
        setSelectedConditions([]);
      } else {
        const conditionsArr = query.get('conditions').split(',');
        setSelectedConditions(conditionsArr);
      }
    } else {
      setSelectedConditions([]);
    }
    const fetchData = async () => {
      const searchParams = {
        params: {
          title: query.get('title'),
          ...(query.has('minPrice') && { minPrice: query.get('minPrice') }),
          ...(query.has('maxPrice') && { maxPrice: query.get('maxPrice') }),
          ...(query.has('category') && { category: query.get('category') }),
          ...(query.has('conditions') && {
            conditions: query.get('conditions'),
          }),
        },
      };
      const res = await axios.get(
        'http://localhost:8080/api/filter',
        searchParams
      );
      const posts = res.data.posts;
      setPostArr(posts);
      setLoading(false);
    };
    fetchData();
  }, [
    query.get('title'),
    query.get('minPrice'),
    query.get('maxPrice'),
    query.get('category'),
    query.get('conditions'),
  ]);

  const handleFilter = async ({ field, newVal }) => {
    switch (field) {
      case 'price':
        query.set('minPrice', priceFilter[0]);
        query.set('maxPrice', priceFilter[1]);
        break;
      case 'conditions':
        query.set('conditions', newVal.join(','));
        break;
      case 'clear':
        query.delete('minPrice');
        query.delete('maxPrice');
        query.delete('conditions');
        query.delete('category');
        break;
      default:
        query.set(field, newVal);
    }
    history.push(`/results?${query.toString()}`);
  };

  return (
    <div id="resultsContainer">
      <div id="sideBar">
        <Paper variant="outlined">
          <div className="sideBarContainer">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Select by category
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: selectedCategory === 'All' ? 'bold' : '',
                paddingBottom: '3px',
              }}
              className="link"
              onClick={() => {
                handleFilter({ field: 'category', newVal: 'All' });
              }}
            >
              All categories
            </Typography>
            {categories.map((cat, index) => (
              <Typography
                variant="body2"
                key={`cat-${index}`}
                sx={{
                  paddingBottom: '3px',
                  fontWeight: selectedCategory === cat ? 'bold' : '',
                }}
                className="link"
                onClick={() => {
                  handleFilter({ field: 'category', newVal: cat });
                }}
              >
                {cat}
              </Typography>
            ))}
          </div>
          <div className="sideBarContainer">
            <div className="sameRow">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Filters
              </Typography>
              <Typography
                variant="subtitle2"
                color="#1976D2"
                className="link"
                onClick={() => {
                  handleFilter({ field: 'clear', newVal: null });
                }}
              >
                Clear all filters
              </Typography>
            </div>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Price range
            </Typography>
            <div className="sameRow">
              <TextField
                type="number"
                placeholder="Min"
                value={priceFilter[0]}
                onChange={(e) => {
                  const newPriceFilter = [...priceFilter];
                  newPriceFilter[0] = e.target.value;
                  setPriceFilter(newPriceFilter);
                }}
              />
              <Typography variant="subtitle2">to</Typography>
              <TextField
                type="number"
                placeholder="Max"
                value={priceFilter[1]}
                onChange={(e) => {
                  const newPriceFilter = [...priceFilter];
                  newPriceFilter[1] = e.target.value;
                  setPriceFilter(newPriceFilter);
                }}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  handleFilter({ field: 'price', newVal: priceFilter });
                }}
              >
                Go
              </Button>
            </div>
          </div>
          <div className="sideBarContainer">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Condition
            </Typography>
            <FormGroup>
              {conditions.map((condition, index) => (
                <FormControlLabel
                  key={`condi-${index}`}
                  control={
                    <Checkbox
                      checked={selectedConditions.includes(condition)}
                      onClick={() => {
                        let newConditions;
                        if (selectedConditions.includes(condition)) {
                          newConditions = selectedConditions.filter((con) => {
                            return con !== condition;
                          });
                        } else {
                          newConditions = [...selectedConditions];
                          newConditions.push(condition);
                        }
                        handleFilter({
                          field: 'conditions',
                          newVal: newConditions,
                        });
                      }}
                    />
                  }
                  label={condition}
                />
              ))}
            </FormGroup>
          </div>
        </Paper>
        <br />
      </div>
      <div id="results">
        <Typography gutterBottom variant="h5" color="#1976d2">
          <Box sx={{ fontWeight: 'bold', m: 1 }}>{title}</Box>
        </Typography>
        <Spinner display={loading} />
        {!loading && postArr.length === 0 && (
          <Typography gutterBottom variant="body1">
            No result
          </Typography>
        )}
        <ItemContainer postArr={postArr} />
      </div>
    </div>
  );
}
