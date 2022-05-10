// react imports
import React from 'react';

// third party imports

import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

// internal imports

import LoginView from './LoginView';
//  styles imports
import { gridStyle } from '../../../Styles';




const Login = () => {

    return <>

        <Grid container style={gridStyle} spacing={2}>

            <Grid item xs={12}>
                <Typography variant='h4' component='h1' align='center' style={{ color: '#1bbd7e', fontWeight: 'bold' }}>Messenger</Typography>
                <LoginView />
            </Grid>

        </Grid>

    </>
}



export default Login;