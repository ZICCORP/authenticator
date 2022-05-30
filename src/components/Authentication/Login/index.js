// react imports
import React from 'react';

// third party imports
import { Grid } from '@mui/material';

// internal imports

import LoginView from './LoginView';
//  styles imports
import { gridStyle } from '../../../Styles';




const Login = () => {

    return <>

        <Grid container style={gridStyle} spacing={2}>

            <Grid item xs={12}>
                <LoginView />
            </Grid>

        </Grid>

    </>
}



export default Login;