// react imports
import React, { useState } from 'react';

// Third party imports
import { Link as Linked } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Box, Grid, Paper, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import { useFormik } from 'formik'

// Internal imports
import { handleMouseDownPassword, handleClickShowPassword, validate } from '../../../utilityFunctions';

// styles imports
import { desktop_mobile_signup_btnStyle, mobile_signup_paperStyle, mobile_signup_box_style, already_have_account_Link_style, mobile_signup_textfield } from '../../../Styles';


const SignUpMobileView = (props) => {

    const [showPassword, setShowPassword] = useState(false);


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
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        }
    });



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


                        <Button type='submit' variant='contained' style={!formik.isValid || !formik.touched.firstName ? { ...desktop_mobile_signup_btnStyle, backgroundColor: 'grey', color: 'white' } : desktop_mobile_signup_btnStyle} disabled={formik.errors.firstName || !formik.touched.firstName || formik.errors.lastName ? true : false} fullWidth>Sign up</Button>
                        <Linked to='/signin' style={{ ...already_have_account_Link_style, marginLeft: '50px' }}>Already have an account?</Linked>

                    </form>
                </Paper>
            </Grid>


        </Grid>

    </>

}

export default SignUpMobileView;