import React, { useReducer, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../appContext';
import './postAdd.scss';
import api from '../api';
import {
  Paper,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  Grid,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import { validateEmail } from '../util/validator';

  //form fields are fetched from the backend
  const { initialFormFields } = useContext(AppContext);
  useEffect(() => {
    dispatch(initialFormFields);
  }, [initialFormFields]);

const PostAdd = () => {
  const { categories, conditions } = useContext(AppContext);
  const [formFields, dispatch] = useReducer(reducer, initialFormFields);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [thumbnail, setThumbnail] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [emailValidStatus, setEmailValidStatus] = useState(true);
  const history = useHistory();
  const handleChange = (e) => {
    dispatch({ [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!selectedFiles) {
      setPreview([]);
      return;
    }
    const objectUrls = selectedFiles.map((f) => URL.createObjectURL(f));
    setPreview(objectUrls);

    // free memory when ever this component is unmounted
    return () => {
      objectUrls.forEach((objectUrl) => {
        URL.revokeObjectURL(objectUrl);
      });
    };
  }, [selectedFiles]);

  useEffect(() => {
    setEmailValidStatus(true);
  }, [formFields]);

  const handleSelectFiles = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const newFilesArr = [...selectedFiles];
    for (let i = 0; i < e.target.files.length; i++) {
      newFilesArr.push(e.target.files[i]);
    }
    setSelectedFiles(newFilesArr);
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length < 1) {
      alert('Please select at least 1 image for your item!');
      setSubmitting(false);
      return;
    }
    if (!validateEmail(formFields['sellerEmail'])) {
      setEmailValidStatus(false);
      alert('Incorrect email format. Please re-input.');
      setSubmitting(false);
      return;
    }
    const formData = new FormData();
    for (let ff in formFields) {
      formData.append(ff, formFields[ff]);
    }
    selectedFiles.forEach((sf) => formData.append('images', sf));
    formData.append('thumbnail', thumbnail);
    try {
      const res = await api.post('/addPost', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      history.push(`/details/${res.data._id}`);
    } catch (e) {
      console.log(e);
      alert('Internal server error. Please try again.');
      setSubmitting(false);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h5" align="center">
            Post your item
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                name="title"
                label="Title of your item"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={formFields.title}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label">
                Add image(s) *
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  name="thumbnail"
                  onChange={handleSelectFiles}
                  multiple
                />
              </Button>
              {preview && preview.length > 0 && (
                <div>
                  <Typography variant="h6">
                    Please also select a thumbnail image.
                  </Typography>
                  <div className="previewImgContainer">
                    {preview.map((url, index) => (
                      <>
                        <div
                          style={{ backgroundImage: 'url(' + url + ')' }}
                          key={`image-${index}`}
                          className={
                            'previewImg' +
                            (thumbnail === index ? ' thumbnail' : '')
                          }
                          onClick={(e) => {
                            setThumbnail(index);
                          }}
                        ></div>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          key={`delete-image-${index}`}
                          onClick={(e) => {
                            const newArr = [...selectedFiles];
                            newArr.splice(index, 1);
                            setSelectedFiles(newArr);
                          }}
                        >
                          <DeleteIcon
                            key={`delete-icon-image-${index}`}
                            fontSize="inherit"
                          />
                        </IconButton>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </Grid>
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
                value={formFields.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
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
                  value={formFields.condition}
                >
                  {conditions &&
                    conditions.map((c, i) => (
                      <MenuItem value={c} key={`condition-${i}`}>
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
                  //labelId="p-category"
                  id="category"
                  name="category"
                  label="Category"
                  onChange={handleChange}
                  value={formFields.category}
                >
                  {categories &&
                    categories.map((c, i) => (
                      <MenuItem value={c} key={`cat-${i}`}>
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
                value={formFields.description}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="fullName"
                name="sellerName"
                label="Full name"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={formFields.sellerName}
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
                value={formFields.sellerEmail}
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
                value={formFields.locatedCity}
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
                value={formFields.locatedState}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            type="submit"
            disabled={submitting}
            sx={{ margin: '20px 0px' }}
          >
            Submit
          </Button>
        </Paper>
      </Container>
    </form>
  );
};

export default PostAdd;
