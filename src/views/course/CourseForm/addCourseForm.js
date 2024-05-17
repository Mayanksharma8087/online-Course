import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import React from 'react';
import * as Yup from 'yup';
import { Typography, FormControl, InputLabel, FormHelperText, OutlinedInput, Box, Button } from '@mui/material';
import { useState } from 'react';
import { apiMethod } from 'service/service';

function CourseForm({ setIsOpen }) {
  const scriptedRef = useScriptRef();

  // const [imageUrl, setImageUrl] = useState();
  const [image, setImage] = useState();

  //   const convertBase64 = (file) => {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         resolve(reader.result);
  //       };
  //       reader.onerror = (error) => {
  //         reject(error);
  //       };
  //     });
  //   };

  // console.log(imageUrl);

  // const changeImageHandler = (e) => {
  //     setImage(e.target.files[0]);
  //     convertBase64(e.target.files[0]).then((res) => {
  //         setImageUrl(res);
  //     });
  // };

  return (
    <Box sx={{ width: '38%', margin: '30px auto', p: 5, bgcolor: 'white', overflow: 'scroll', maxHeight: 'calc(100% - 70px)' }}>
      <Box>
        <Typography component={'h1'} variant="h2">
          Add Course
        </Typography>
      </Box>
      <Formik
        initialValues={{
          image: '',
          name: '',
          description: '',
          author: '',
          price: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          image: Yup.string().required('Select Image'),
          name: Yup.string().required('course name is required'),
          description: Yup.string().required('course description is required'),
          author: Yup.string().required('course author name is required'),
          price: Yup.string().required('course price is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              const formData = new FormData();
              formData.append('image', image);
              formData.append('name', values.name);
              formData.append('description', values.description);
              formData.append('author', values.author);
              formData.append('price', values.price);
              apiMethod
                .createCourse('/createCourse', formData)
                .then((res) => {
                    console.log(res)
                  if (res.status == 201) {
                    setIsOpen(false)
                    window.location.reload(true)
                  }
                })
                .catch((err) => console.error(err));
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, isSubmitting, handleSubmit, touched, values,setFieldValue }) => (
          <>
            {/* {imageUrl ? (
                            <Box>
                                <img width="50%" src={imageUrl} alt="courseImage" />
                            </Box>
                        ) : null} */}

            <form noValidate onSubmit={handleSubmit} style={{ marginTop: '40px' }}>
              <FormControl error={Boolean(errors.image)}>
                <OutlinedInput
                  id="outlined-adornment-email-login"
                  type="file"
                  
                  name="image"
                  onBlur={handleBlur}
                  onChange={(e)=>{
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    setImage(file)
                    reader.onload = ()=>{
                      setFieldValue("image",reader.result)
                    }
                  }}
                  label="Image"
                  inputProps={{}}
                />
                {errors.image && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.image}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl error={Boolean(touched.name && errors.name)} sx={{ mb: 3, width: '100%', mt: 3 }}>
                <InputLabel htmlFor="outlined-adornment-password-login">Course Name</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-login"
                  type={'text'}
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="name"
                  inputProps={{}}
                />
                {touched.name && errors.name && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.name}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl error={Boolean(touched.description && errors.description)} sx={{ mb: 3, width: '100%' }}>
                <InputLabel htmlFor="outlined-adornment-password-login">Descrfiption</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-login"
                  type={'text'}
                  value={values.description}
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="description"
                  inputProps={{}}
                />
                {touched.description && errors.description && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.description}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl error={Boolean(touched.author && errors.author)} sx={{ mb: 3, width: '100%' }}>
                <InputLabel htmlFor="outlined-adornment-password-login">Author</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-login"
                  type={'text'}
                  value={values.author}
                  name="author"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="author"
                  inputProps={{}}
                />
                {touched.author && errors.author && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.author}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl error={Boolean(touched.price && errors.price)} sx={{ mb: 3, width: '100%' }}>
                <InputLabel htmlFor="outlined-adornment-password-login">Price</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-login"
                  type={'text'}
                  value={values.price}
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="price"
                  inputProps={{}}
                />
                {touched.price && errors.price && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.price}
                  </FormHelperText>
                )}
              </FormControl>

              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
              {/* <ButtonGroup fullWidth sx={{ mt: 2, pb: 5 }}> */}
              {/* <AnimateButton> */}
              <Button type="submit" disabled={isSubmitting} variant="contained" color="secondary">
                Add Course
              </Button>
              <Button onClick={() => setIsOpen(false)} disabled={isSubmitting} type="button" variant="outlined" color="secondary">
                Cancel
              </Button>
              {/* </AnimateButton> */}
              {/* </ButtonGroup> */}
            </form>
          </>
        )}
      </Formik>
    </Box>
  );
}

export default CourseForm;
