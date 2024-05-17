import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  //   Checkbox,
  FormControl,
  //   FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
  //   Stack,
  //   Typography
} from '@mui/material';
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { apiMethod } from 'service/service';
import useScriptRef from 'hooks/useScriptRef';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

function AccountSetting() {
  const [message, setMessage] = useState('');
  const scriptedRef = useScriptRef();
  const [showPassword, setShowPassword] = useState(true);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container sx={{ width: 500 }}>
      <h1>Change Password</h1>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string().max(255).required('old Password is required'),
          newPassword: Yup.string().max(255).required('New Password is required'),
          confirmPassword: Yup.string()
            .label('confirm password')
            .required()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              let passwords = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
              };
              let getUserId = localStorage.getItem('id');
              apiMethod
                .changepassword(`/changepassword/${getUserId}`, passwords)
                .then((res) => {
                  console.log(res);
                  if (res.response) {
                    setMessage(res.response.data.message);
                  } else {
                    setMessage(res.data.message);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={Boolean(touched.oldPassword && errors.oldPassword)} sx={{ mt: 5 }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Old Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="password"
                value={values.oldPassword}
                name="oldPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Old Password"
                inputProps={{}}
              />
              {touched.oldPassword && errors.oldPassword && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.oldPassword}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.newPassword && errors.newPassword)} sx={{ mt: 5 }}>
              <InputLabel htmlFor="outlined-adornment-password-login">New Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword? 'text' : 'password'}
                value={values.newPassword}
                name="newPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
                inputProps={{}}
              />
              {touched.newPassword && errors.newPassword && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.newPassword}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.confirmPassword && errors.confirmPassword)} sx={{ mt: 5 }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword? "text":'password'}
                value={values.confirmPassword}
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                       
                       {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                inputProps={{}}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>

            {/* <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack> */}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 4 }}>
              {/* <AnimateButton> */}
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Change Password
              </Button>
              {/* </AnimateButton> */}
            </Box>
            <Typography component="body5" variant="h5">
              {message}
            </Typography>
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default AccountSetting;
