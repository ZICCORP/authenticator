import React from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { Button } from '@mui/material';

const Home = () => {
    const { user, logout } = useUserAuth()
    console.log(user)

    const handleLogOut = async () => {
        try {
            await logout()
        } catch (err) {
            console.log(err.message);
        }
    }
    return <>
        <h1>
            Hello Welcome
            <br />
            {user && user.email}
        </h1>
        <Button variant='contained' fullWidth onClick={handleLogOut}>Log out</Button>

    </>
}

export default Home;
