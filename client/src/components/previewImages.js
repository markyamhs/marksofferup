import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, Typography, IconButton } from '@mui/material';
import './previewImages.scss';

export default function PreviewImages({
  thumbnail,
  setThumbnail,
  selectedFiles,
  setSelectedFiles,
}) {
  const [preview, setPreview] = useState([]);
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

  return (
    <Grid item xs={12}>
      <Button variant="outlined" component="label">
        Add image(s) *
        <input
          type="file"
          accept="image/*"
          hidden
          name="thumbnail"
          onChange={(e)=>{
            if (!e.target.files || e.target.files.length === 0) {
              return;
            }
            const newFilesArr = [...selectedFiles];
            for (let i = 0; i < e.target.files.length; i++) {
              newFilesArr.push(e.target.files[i]);
            }
            setSelectedFiles(newFilesArr);
          }}
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
                    'previewImg' + (thumbnail === index ? ' thumbnail' : '')
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
  );
}
