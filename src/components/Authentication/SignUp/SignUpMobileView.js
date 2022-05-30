// react imports
import React, { useState, useEffect } from 'react';

// Third party imports
import { Link as Linked, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Box, Grid, Paper, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { collection, addDoc } from "firebase/firestore";

// Internal imports
import { handleMouseDownPassword, handleClickShowPassword, validate } from '../../../utilityFunctions';
import { useUserAuth } from '../../../context/UserAuthContext';
import { db } from '../../../firebase';


// styles imports
import { desktop_mobile_signup_btnStyle, mobile_signup_paperStyle, mobile_signup_box_style, already_have_account_Link_style, mobile_signup_textfield } from '../../../Styles';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUpMobileView = (props) => {

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
        <Box sx={{ flexGrow: 1 }} style={mobile_signup_box_style}>
            <Typography align='center' variant='h6' component='h1' sx={{ flexGrow: 1 }}>Join {props.appName}</Typography>

        </Box>

        <Grid container spacing={2}>

            <Grid item xs={12}>
                <Paper elevation={10} style={mobile_signup_paperStyle}>
                    <form noValidate onSubmit={formik.handleSubmit} >
                        <TextField style={mobile_signup_textfield} label='First name' id='firstName' name="firstName" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.firstName && formik.errors.firstName ? true : false} helperText={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ''} value={formik.values.firstName} required fullWidth />



                        <TextField style={mobile_signup_textfield} label='Last name' id='lastName' name='lastName' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastName} error={formik.touched.lastName && formik.errors.lastName ? true : false} helperText={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ''} required fullWidth />



                        <TextField label="Mobile number" id="phoneNum" name="phoneNum" style={mobile_signup_textfield} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.phoneNum && formik.errors.phoneNum ? true : false} helperText={formik.touched.phoneNum && formik.errors.phoneNum ? formik.errors.phoneNum : ''} value={formik.values.phoneNum} required fullWidth />

                        <TextField id="email" name="email" style={mobile_signup_textfield} type="email" label="Email address" variant="outlined" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && formik.errors.email ? true : false} helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''} value={formik.values.email} required fullWidth />

                        <TextField
                            style={mobile_signup_textfield}
                            label="Password"
                            id="password"
                            name="password"
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
                            required fullWidth />


                        <TextField style={mobile_signup_textfield} label="Comfirm password" id="confirmPassword" name='confirmPassword' type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false} helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ''} required fullWidth />


                        {load ? <LoadingButton loading variant="contained" style={{ width: '94%', marginTop: '10px', marginLeft: '10px' }}>
                            Submit
                        </LoadingButton> :
                            <Button type='submit' variant='contained' style={!formik.isValid || !formik.touched.firstName ? { ...desktop_mobile_signup_btnStyle, backgroundColor: 'grey', color: 'white' } : desktop_mobile_signup_btnStyle} disabled={formik.errors.firstName || !formik.touched.firstName || formik.errors.lastName ? true : false} fullWidth>Sign up</Button>}


                        <Linked to='/signin' style={{ ...already_have_account_Link_style, marginLeft: '50px' }}>Already have an account?</Linked>

                    </form>
                    {error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ height: '200px', marginTop: '1px', marginLeft: '10px', marginRight: '10px', marginBottom: '-10px' }}>
                        <Alert onClose={handleClose} severity="error" >
                            {error}
                        </Alert>
                    </Snackbar>}
                </Paper>

            </Grid>


        </Grid>

    </>

}

export default SignUpMobileView;