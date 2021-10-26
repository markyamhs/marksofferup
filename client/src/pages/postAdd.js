import React, { useReducer, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../appContext';
import api from '../api';
import {
  Paper,
  Container,
  Button,
  Grid,
  Typography,
  TextField,
} from '@mui/material';
import PostForm from '../components/postForm';
import PreviewImages from '../components/previewImages';
import { validateEmail } from '../util/validator';

const PostAdd = () => {
  const [formFields, dispatch] = useReducer(
    (curFormFields, newFieldInput) => ({
      ...curFormFields,
      ...newFieldInput,
    }),
    {}
  );
  //form fields are fetched from the backend
  const { initialFormFields } = useContext(AppContext);
  useEffect(() => {
    dispatch(initialFormFields);
  }, [initialFormFields]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [thumbnail, setThumbnail] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [emailValidStatus, setEmailValidStatus] = useState(true);
  const history = useHistory();
  const handleChange = (e) => {
    dispatch({ [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setEmailValidStatus(true);
  }, [formFields]);

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
                value={formFields.title || ''}
              />
            </Grid>
            <PreviewImages
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />
            <PostForm
              handleChange={handleChange}
              formFields={formFields}
              emailValidStatus={emailValidStatus}
            />
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
