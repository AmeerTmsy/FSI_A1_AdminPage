import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from "react-router-dom";
import { changeLoginStatus } from '../features/login/loginSlice';

function Root(props) {
    const loggedIn = useSelector(state => state.login.loggedIn)
    const user = useSelector(state => state.login.user)

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/verify`, {withCredentials: true})
        .then(response => {
            // console.log(response.data)
            dispatch(changeLoginStatus({loggedIn: true, user: response.data}))
        })
        .catch(error => {
            dispatch(changeLoginStatus({loggedIn: false, user: null}))
        })
    }, [])

    return (
        <>
            <header className='flex flex-row justify-between p-6 shadow-lg shadow-indigo-500/50 fixed w-full bg-slate-300'>
                <a href="/"><h1 className='text-xl font-medium'>Library</h1></a>
                <div className='menu-button'>
                    <div className='font-medium text-2xl px-2 py-1 bg-slate-200 hover:bg-slate-400 rounded-full'><i className="ri-skip-down-line"></i></div>
                    <div className=' drop-down flex flex-col gap-4 w-screen h-screen bg-black'>
                        <nav className='pt-2'>
                            <ul className='flex flex-col justify-between text-base font-normal gap-4'>
                                <li>
                                    <Link to={"/"}><span className='text-black pl-1'>|</span> Home</Link>
                                </li>
                                <li>
                                    <Link to="/books"><span className='text-black pl-1'>|</span> Books</Link>
                                </li>
                                <li>
                                    <Link to="/authers"><span className='text-black pl-1'>|</span> Authers</Link>
                                </li>
                                <li>
                                    <Link to={"/addBook"}><span className='text-black pl-1'>|</span> Add Book</Link>
                                </li>
                                <li>
                                    <Link to="/addAuther"><span className='text-black pl-1'>|</span> Add Author</Link>
                                </li>
                                {
                                    loggedIn ? <li><Link to="/logout"><span className='text-black pl-1'>|</span> Log out</Link></li> 
                                    : 
                                    <li><Link to="/login"><span className='text-black pl-1'>|</span> Log in</Link></li>
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className='flex flex-row gap-4 nav-links'>
                    <nav>
                        <ul className='flex flex-row justify-between text-base font-normal '>
                            <li>
                                <Link to={"/"}>Home<span className='text-teal-700 px-2'>|</span></Link>
                            </li>
                            <li>
                                <Link to="/books">Books<span className='text-teal-700 px-2'>|</span></Link>
                            </li>
                            <li>
                                <Link to="/authers">Authers<span className='text-teal-700 px-2'>|</span></Link>
                            </li>
                            <li>
                                <Link to={"/addBook"}>Add Book<span className='text-teal-700 px-2'>|</span></Link>
                            </li>
                            <li>
                                <Link to="/addAuther">Add Author<span className='text-teal-700 px-2'>|</span></Link>
                            </li>
                            {
                                loggedIn ? <li><Link to="/logout">Log out</Link></li> 
                                : 
                                <li><Link to="/login">Log in</Link></li>
                            }
                        </ul>
                    </nav>
                </div>
                { loggedIn && <div className='nav-links flex flex-row justify-center items-center bg-slate-400 rounded-full  w-7 h-7 mr-3 text-center'>
                    <span className='font-medium '>{user.name.charAt(0)}</span>
                </div>}
            </header>
            <Outlet />
            <footer>
            </footer>
        </>
    );
}



export default Root;