// react imports
import React, { useState } from 'react';

// third party imports
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, Grid, Paper, IconButton, InputAdornment, Avatar, Divider } from '@mui/material';
import { Link as Linked } from 'react-router-dom';
import { useFormik } from 'formik';

// internal imports
import { handleClickShowPassword, handleMouseDownPassword } from '../../../utilityFunctions';
import { useGlobalContext } from '../../App';
//  styles import
import { paperStyle, btnStyleLogin, createNewAccount_btn_style, createNewAccount_link_style, forgotten_account_link_style, dividerStyle } from '../../../Styles';




const LoginView = () => {
    const { appState } = useGlobalContext();
    const [showPassword, setShowPassword] = useState(false);



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

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        }
    })

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


                <Button type='submit' variant='contained' style={formik.isValid && formik.touched.email ? btnStyleLogin : { ...btnStyleLogin, backgroundColor: 'grey', color: '#fff' }} disabled={formik.isValid && formik.touched.email ? false : true} fullWidth>Log in</Button>
            </form>

            <Linked align='center' to='#' style={forgotten_account_link_style} >Forgotten account?</Linked>
            <Divider style={dividerStyle}>or</Divider>

            <Linked to='/signup' style={createNewAccount_link_style}> <Button type='submit' variant='contained' style={createNewAccount_btn_style}>Create New Account</Button></Linked>

        </Paper>

    </>
}



export default LoginView;