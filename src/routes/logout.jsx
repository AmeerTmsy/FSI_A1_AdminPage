import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeLoginStatus } from '../features/login/loginSlice';

function Logout(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include', // Ensure cookies are sent with the request
            });

            if (response.ok) {
                // Redirect to the login page
                dispatch(changeLoginStatus({loggedIn: false, user: null}))
                navigate('/login');
                // window.location.reload();
                
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <main className='container mx-auto pt-28'>
            <h2 className='text-3xl font-bold pb-2'>Logout</h2>
            <span>Do you want to logout?</span> 
            <div className='pt-10'>
                <button id='logout' onClick={handleLogout} className='rounded-full bg-red-600 px-10 py-2'>
                    Logout
                </button>
            </div>
        </main>
    );
}

export default Logout;