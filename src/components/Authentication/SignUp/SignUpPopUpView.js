// react imports
import React, { useState } from 'react';

// Third party imports
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Button, Box, Dialog, DialogTitle, IconButton, Typography, DialogContent, DialogActions, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, TextField } from '@mui/material';

// Internal imports
import { useGlobalContext } from '../../App';
import { colorStyle, gender_label_text_color, signup_formControl_style, signup_textfield_style, popupview_signup_btn, popview_its_quick_n_easy_text_style, signup_logo_style } from '../../../Styles';







const SignupDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const SignupDialogTitle = (props) => {
    const { children, onClose, ...other } = props

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

SignupDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


const SignUpPopUpView = () => {
    const { openPopupView, handleClickClosePopupView } = useGlobalContext()
    const [date, setDate] = useState(new Date());




    return <>
        <SignupDialog onClose={handleClickClosePopupView} aria-labelledby="signup-dialog-title" open={openPopupView} scroll='body'>
            <SignupDialogTitle id="signup-dialog-title" onClose={handleClickClosePopupView}>
                <Typography variant='h4' component='div' style={signup_logo_style}>Sign Up</Typography>
                <Typography variant='p' component='div' style={popview_its_quick_n_easy_text_style}>It's quick and easy.</Typography>
            </SignupDialogTitle>
            <DialogContent dividers>
                <Box component='form' noValidate={false} sx={{ '& .MuiTextField-root': { m: 1, } }}>
                    <div>
                        <TextField label='First name' id='firstname' />
                        <TextField label='Surname' />
                    </div>
                    <div>
                        <TextField label="Mobile number" id="mobilenumber" style={signup_textfield_style} />
                    </div>
                    <div>
                        <TextField label="New password" id="newpassword" style={signup_textfield_style} type='password' />
                    </div>
                    <div>
                        <TextField label="Comfirm password" id="comfirmpassword" style={signup_textfield_style} type='password' />
                    </div>
                    <div>

                        <LocalizationProvider dateAdapter={AdapterDateFns} >

                            <DatePicker
                                disableFuture
                                label="Date of birth"
                                openTo='year'
                                views={['year', 'month', 'day']}
                                onChange={(newDate) => { setDate(newDate) }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>


                    </div>
                    <div>
                        <FormControl style={signup_formControl_style}>
                            <FormLabel id='gender' style={gender_label_text_color}>Gender</FormLabel>
                            <RadioGroup row aria-labelledby='gender-selector' defaultValue="female" name='gender group'>
                                <FormControlLabel value='female' control={<Radio style={colorStyle} />} label='Female' />
                                <FormControlLabel value='male' control={<Radio style={colorStyle} />} label='Male' />
                            </RadioGroup>
                        </FormControl>
                    </div>

                </Box>
                <DialogActions>
                    <Button variant='contained' style={popupview_signup_btn} onClick={handleClickClosePopupView}>Sign Up</Button>
                </DialogActions>
            </DialogContent>

        </SignupDialog>


    </>
}
export default SignUpPopUpView;