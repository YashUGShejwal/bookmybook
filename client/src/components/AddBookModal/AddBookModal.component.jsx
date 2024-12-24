import {
  MenuItem,
  Modal,
  Select,
  Slide,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Box,
} from '@mui/material';
import React, { useState, useCallback } from 'react';
import { CustomButton } from '../../globals/styles';
import { ModalContainer } from './AddBookModal.styles';
import { useDropzone } from 'react-dropzone';
import { useSnackbar } from 'notistack';
import axiosInstance from '../../utils/axiosInstance';
const AddBookModal = ({ state, toggleModal }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    name: '',
    isbn: '',
    author: '',
    rentPrice: 0,
    stock: 0,
  });
  const [imageToUpload, setImageToUpload] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    console.log(data);
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('isbn', data.isbn);
    formData.append('author', data.author);
    formData.append('rentPrice', data.rentPrice);
    formData.append('stock', data.stock);
    formData.append('image', imageToUpload);

    submitFun(formData);
  };

  const submitFun = async (data) => {
    try {
      const res = await axiosInstance.post('/books/addSingleBook', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      enqueueSnackbar(res.data?.message || 'Request successfully!', {
        variant: 'success',
      });
      toggleModal();
      if (res.status != 200) {
        enqueueSnackbar(res.data?.message || 'Some error occurred!', {
          variant: 'error',
        });
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    //console.log(acceptedFiles);
    setImageToUpload(acceptedFiles[0]);
  }, []);

  const { getRootProps, isDragActive, getInputProps } = useDropzone({ onDrop });

  return (
    <Modal open={state} onClose={toggleModal}>
      <Slide direction="up" in={state}>
        <ModalContainer>
          <Typography sx={{ fontSize: '1.2em', fontWeight: 600 }}>
            ADD BOOK
          </Typography>
          <TextField
            name="name"
            label="Book Name"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="isbn"
            label="ISBN"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="author"
            label="Author"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="rentPrice"
            label="Rent Price"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="stock"
            label="Stock"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
          <Box
            sx={{
              border: isDragActive
                ? '2px dashed #109ece'
                : '2px dashed #a4a4a4',
              width: '100%',
              padding: '55px 20px',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            drag and drop the image here!
          </Box>

          <CustomButton onClick={handleSubmit}>ADD</CustomButton>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default AddBookModal;
