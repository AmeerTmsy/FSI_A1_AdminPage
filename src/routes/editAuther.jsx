import axios from 'axios';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLoaderData } from 'react-router-dom';


export async function loader({ params }) {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/authers/${params.autherId}`)
    const auther = response.data.auther
    return { auther}
}

function EditAuther(props) {

    const loggedIn = useSelector(state => state.login.loggedIn)

    const { auther } = useLoaderData()

    const nameRef = useRef(null)
    const imageRef = useRef(null)
    const bioRef = useRef(null)

    const editingAuther = (event) => {
        event.preventDefault()
        const editedAuther = {
            name : nameRef.current.value,
            image : imageRef.current.value,
            bio : bioRef.current.value
        }

        axios.patch(`${import.meta.env.VITE_API_BASE_URL}/authers/${auther._id}`, editedAuther)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

    return (
        <main className='pt-28'>
            <section className='container mx-auto'>
                <h1 className='text-3xl font-bold text-indigo-600 mb-6'>Edit Author</h1>
                {
                    loggedIn ?
                    <form onSubmit={editingAuther} className='flex flex-col items-start'>
                        <div className='w-full my-5 '>
                            <label htmlFor="name" className='font-bold'>Name</label>
                            <input required type="text" ref={nameRef} defaultValue={auther.name} name="name" id="name" className='border-2 w-full py-2 border-x-stone-950 rounded-md' />
                        </div>
                        <div className='w-full my-5 '>
                            <label htmlFor="image" className='font-bold'>Image Url</label>
                            <input required type="text" ref={imageRef} defaultValue={auther.image} name="image" id="image" className='border-2 w-full py-2 border-x-stone-950 rounded-md' />
                        </div>
                        <div className='w-full my-5 '>
                            <label htmlFor="bio" className='font-bold'>Bio</label>
                            <textarea required name="bio" ref={bioRef} defaultValue={auther.bio} id="bio" className='border-2 w-full py-2 border-x-stone-950 rounded-md' rows={6}></textarea>
                        </div>
                        
                        <div className='w-full my-5 '>
                            <button type="submit" className='border-3 w-full py-3 text-xl bg-blue-600 border-x-stone-950 rounded-md'>submit</button>
                        </div>
                        
                    </form>
                    :
                    <div className='mx-3'>
                        <h2>Oops!</h2>
                        <h2>You need to log in to edit an Author. <Link className='text-blue-600 underline' to={'/login'}>log in</Link></h2>
                    </div>
                }
            </section>
        </main>
    );
}

export default EditAuther;