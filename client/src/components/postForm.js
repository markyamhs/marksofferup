import React, { useContext } from 'react';
import { AppContext } from '../appContext';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Grid,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types'; 

export default function PostForm({
  handleChange,
  formFields,
  emailValidStatus,
}) {
  const { categories, conditions } = useContext(AppContext);
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="number"
          id="price"
          name="price"
          label="Price"
          fullWidth
          variant="standard"
          onChange={handleChange}
          value={formFields.price || ''}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="condition-label">Condition</InputLabel>
          <Select
            id="condition"
            name="condition"
            label="Condition"
            onChange={handleChange}
            value={formFields.condition || ''}
          >
            {conditions &&
              conditions.map((c, i) => (
                <MenuItem value={c || ''} key={`condition-${i}`}>
                  {c}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            id="category"
            name="category"
            label="Category"
            onChange={handleChange}
            value={formFields.category || ''}
          >
            {categories &&
              categories.map((c, i) => (
                <MenuItem value={c || ''} key={`cat-${i}`}>
                  {c}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="description"
          name="description"
          label="Description of your item"
          multiline
          rows={6}
          fullWidth
          variant="standard"
          onChange={handleChange}
          value={formFields.description || ''}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="fullName"
          name="sellerName"
          label="Full name"
          fullWidth
          variant="standard"
          onChange={handleChange}
          value={formFields.sellerName || ''}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="email"
          name="sellerEmail"
          label="Your email"
          fullWidth
          autoComplete="email"
          variant="standard"
          error={!emailValidStatus}
          helperText={emailValidStatus ? '' : 'Incorrect format'}
          onChange={handleChange}
          value={formFields.sellerEmail || ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="locatedCity"
          name="locatedCity"
          label="City"
          fullWidth
          autoComplete="shipping address-level2"
          variant="standard"
          onChange={handleChange}
          value={formFields.locatedCity || ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="locatedState"
          name="locatedState"
          label="State"
          fullWidth
          variant="standard"
          onChange={handleChange}
          value={formFields.locatedState || ''}
        />
      </Grid>
    </>
  );
}

PostForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  emailValidStatus: PropTypes.bool,
  formFields: PropTypes.shape({
    price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    locatedCity: PropTypes.string,
    locatedState: PropTypes.string,
    condition: PropTypes.string,
    category: PropTypes.string,
    sellerName: PropTypes.string,
    sellerEmail: PropTypes.string,
    description: PropTypes.string,
  })
}