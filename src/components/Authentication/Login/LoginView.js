// react imports
import React, { useState, useEffect } from 'react';

// third party imports
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, Grid, Paper, IconButton, InputAdornment, Avatar, Divider } from '@mui/material';
import { Link as Linked, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import GoogleButton from 'react-google-button';

// internal imports
import { handleClickShowPassword, handleMouseDownPassword } from '../../../utilityFunctions';
import { useUserAuth } from '../../../context/UserAuthContext';

//  styles import
import { paperStyle, btnStyleLogin, createNewAccount_btn_style, createNewAccount_link_style, forgotten_account_link_style, dividerStyle } from '../../../Styles';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const LoginView = () => {
    // const { appState } = useGlobalContext();
    const { appState, login, googleSignIn } = useUserAuth()
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(true)
    const [load, setLoad] = useState(false)
    const navigate = useNavigate();
    const handleGoogleSignin = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/")
        } catch (err) {
            setError(err.message)
            alert(err.message)
        }
    }


    const validate = values => {

        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const errors = {
        };


        if (!values.email) {
            errors.email = 'Required'
        } else if (!values.email.match(mailformat)) {
            errors.email = 'Invalid email address'
        }

        if (!values.password) {
            errors.password = 'Required'
        }
        return errors;
    }


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,

        onSubmit: async (values) => {
            setError('');
            setLoad(true)
            try {
                await login(values.email, values.password)
                navigate('/')
            } catch (err) {
                setError(err.message)
                setLoad(false)
            }
        }
    })


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
        <Paper elevation={appState.mobileView ? 0 : 10} style={{ ...paperStyle, height: '90vh', backgroundColor: '#fff' }}>
            <Grid align='center'>
                <Avatar style={{ backgroundColor: '#1bbd7e' }}><LockOutlinedIcon /></Avatar>
                <h2 >Log in</h2>
            </Grid>
            <form onSubmit={formik.handleSubmit} noValidate>
                <TextField id="email" name="email" label="Email address" variant="outlined" onBlur={formik.handleBlur} error={formik.touched.email && formik.errors.email ? true : false} helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''} sx={{ m: 1, width: '35ch', outlineColor: 'blue' }} onChange={formik.handleChange} required />
                <TextField
                    label="Password"
                    id="password"
                    name="password"
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && formik.errors.password ? true : false} helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                    sx={{ m: 1, width: '35ch', outlineColor: 'blue' }}
                    type={showPassword ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"> <IconButton aria-label='toggle password visibility' onClick={() => handleClickShowPassword(setShowPassword, showPassword)
                        } onMouseDown={(event) => handleMouseDownPassword(event)} edge='end'>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton></InputAdornment>,
                    }}
                    variant="outlined"
                    required />

                {load ? <LoadingButton loading variant="contained" style={{ width: '94%', marginTop: '10px', marginLeft: '10px' }}>
                    Submit
                </LoadingButton> : <Button type='submit' variant='contained' style={formik.isValid && formik.touched.email ? btnStyleLogin : { ...btnStyleLogin, backgroundColor: 'grey', color: '#fff' }} disabled={formik.isValid && formik.touched.email ? false : true} fullWidth>Log in</Button>
                }


            </form>
            <GoogleButton style={{ width: '94%', marginTop: '10px', marginLeft: '10px', marginBottom: '20px' }} className='g-btn' type='dark' onClick={handleGoogleSignin} />
            <Linked align='center' to='#' style={forgotten_account_link_style} >Forgotten account?</Linked>
            <Divider style={dividerStyle}>or</Divider>

            <Linked to='/signup' style={createNewAccount_link_style}> <Button type='submit' variant='contained' style={createNewAccount_btn_style}>Create New Account</Button></Linked>

        </Paper>
        {error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>}

    </>
}



export default LoginView;