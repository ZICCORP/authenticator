// react imports
import React from 'react';

// Internal components imports
// import { useGlobalContext } from '../../App';
import SignUpMobileView from './SignUpMobileView';
import SignUpDeskTopView from './SignUpDeskTopView';
import { useUserAuth } from '../../../context/UserAuthContext';




const SignUpView = (props) => {

    const { appState } = useUserAuth();

    return <>
        {appState.mobileView ? <SignUpMobileView appName={props.appName} /> : <SignUpDeskTopView appName={props.appName} />}
    </>
}


export default SignUpView;


