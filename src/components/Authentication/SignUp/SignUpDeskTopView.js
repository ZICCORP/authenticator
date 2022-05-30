// react imports
import React, { useState, useEffect } from 'react';

// Third party imports
import { Link as Linked, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Grid, IconButton, InputAdornment, Divider, Paper, Typography, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import { collection, addDoc } from "firebase/firestore";


// Internal imports
import { handleClickShowPassword, handleMouseDownPassword, validate } from '../../../utilityFunctions';
import { desktop_signup_grid_style, desktop_mobile_signup_btnStyle, desktop_signup_paperStyle, signup_logo_style, create_new_account_text_style, its_quick_and_easy_text_style, signup_form_style, signup_textfield_style, already_have_account_Link_style } from '../../../Styles';
import { useUserAuth } from '../../../context/UserAuthContext';
import { db } from '../../../firebase';




const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUpDeskTopView = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(true)
    const [load, setLoad] = useState(false)
    const { signup } = useUserAuth();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            password: '',
            confirmPassword: '',

        },
        validate,
        onSubmit: async (values) => {

            setError('');
            setLoad(true);
            try {
                await signup(values.email, values.password)
                await addDoc(collection(db, "users"), {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNum: values.phoneNum,
                });
                navigate('/signin')
            } catch (err) {
                setError(err.message)
                setLoad(false)
            }
        }
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    useEffect(() => {
        if (error) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [error])



    return <>
        <Grid container spacing={2} style={desktop_signup_grid_style}>
            <Grid item xs={12} align='center'>
                <Typography variant='h4' component='div' style={signup_logo_style}>{props.appName}</Typography>
            </Grid>
            <Grid item xs={12} >
                <Paper elevation={10} style={desktop_signup_paperStyle} >
                    <Grid align='center'>
                        <Typography variant='h4' component='h1' style={create_new_account_text_style}>Create a new account</Typography>
                        <Typography variant='h4' component='h2' style={its_quick_and_easy_text_style}>It's quick and easy</Typography>

                    </Grid>
                    <Divider />
                    <form noValidate style={signup_form_style} onSubmit={formik.handleSubmit}>
                        <div>

                            <TextField label='First name' id='firstName' name="firstName" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.firstName && formik.errors.firstName ? true : false} helperText={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ''} required />
                            <TextField style={{ marginLeft: '20px' }} label='Last name' id='lastName' name='lastName' onBlur={formik.handleBlur} onChange={formik.handleChange} error={formik.touched.lastName && formik.errors.lastName ? true : false} helperText={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ''} required />
                        </div>

                        <div style={{ marginTop: '20px' }}>

                            <TextField label="Mobile number" id="phoneNum" name="phoneNum" style={signup_textfield_style} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.phoneNum && formik.errors.phoneNum ? true : false} helperText={formik.touched.phoneNum && formik.errors.phoneNum ? formik.errors.phoneNum : ''} required />
                        </div>
                        <div>
                            <TextField id="email" name="email" style={signup_textfield_style} type="email" label="Email address" variant="outlined" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && formik.errors.email ? true : false} helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''} required />
                        </div>

                        <div>

                            <TextField
                                label="Password"
                                id="password"
                                name="password"
                                style={signup_textfield_style}
                                type={showPassword ? 'text' : 'password'}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && formik.errors.password ? true : false} helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                                onChange={formik.handleChange}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"> <IconButton aria-label='toggle password visibility' onClick={() => handleClickShowPassword(setShowPassword, showPassword)
                                    } onMouseDown={(event) => handleMouseDownPassword(event)} edge='end'>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton></InputAdornment>,
                                }}
                                variant="outlined"
                                required />
                        </div>
                        <div>
                            <TextField label="Comfirm password" id="confirmPassword" name='confirmPassword' style={signup_textfield_style} type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false} helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ''} required />
                        </div>

                        {load ? <LoadingButton loading variant="contained" style={{ width: '94%', marginTop: '10px', marginLeft: '10px' }}>
                            Submit
                        </LoadingButton> : <Button type='submit' variant='contained' fullWidth style={!formik.isValid || !formik.touched.firstName ? { ...desktop_mobile_signup_btnStyle, backgroundColor: 'grey', color: 'white' } : desktop_mobile_signup_btnStyle} disabled={formik.errors.firstName || !formik.touched.firstName || formik.errors.lastName ? true : false}>Sign in</Button>}
                        <Linked to='/signin' style={already_have_account_Link_style}>Already have an account?</Linked>
                    </form>


                </Paper>
                {error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '80%' }}>
                        {error}
                    </Alert>
                </Snackbar>}
            </Grid>

        </Grid>
    </>
}

export default SignUpDeskTopView;