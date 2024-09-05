import axios from 'axios';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

export async function loader() {

    const authersRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/authers`)
    const genresRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/genres`)

    const authers = authersRes.data
    const genres = genresRes.data
    
    return { authers, genres };
}

function AddBook(props) {
    
    const loggedIn = useSelector(state => state.login.loggedIn)
    const navigate = useNavigate()

    const { authers, genres } = useLoaderData()

    const nameRef = useRef(null)
    const thumbnailRef = useRef(null)
    const ratingRef = useRef(null)
    const priceRef = useRef(null)
    const discriptionRef = useRef(null)
    const genreRef = useRef(null)
    const autherRef = useRef(null)

    const addingBook = ( event ) => {
        event.preventDefault()
        
        const bookData = {
            name : nameRef.current.value,
            thumbnail : thumbnailRef.current.value,
            rating : ratingRef.current.value,
            price : priceRef.current.value,
            discription : discriptionRef.current.value,
            genreTitle : genreRef.current.value,
            auther : autherRef.current.value
        }
        
        // console.log(bookData)
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/books`, bookData)
        .then(response => {
            console.log(response)
            navigate('/books')
        })
        .catch(error => console.log(error))

    }

    return (
        <main className='pt-28'>
            <section className='container mx-auto'>
                <h1 className='text-3xl font-bold text-indigo-600 mb-6'>Adding book</h1>
                {
                    loggedIn ? 
                    <form onSubmit={addingBook} className='flex flex-col items-start'>
                        <div className='w-full my-5 '>
                            <label htmlFor="name" className='font-bold'>Name</label>
                            <input required type="text" ref={nameRef} name="name" id="name" className='border-2 w-full py-2 border-x-stone-950 rounded-md' />
                        </div>
                        <div className='w-full my-5 '>
                            <label htmlFor="thumbnail" className='font-bold'>Thumbnail Url</label>
                            <input required type="text" ref={thumbnailRef} name="thumbnail" id="thumbnail" className='border-2 w-full py-2 border-x-stone-950 rounded-md' />
                        </div>
                        <div className='w-full my-5 '>
                            <label htmlFor="rating" className='font-bold'>Rating</label>
                            <input  required
                                type="number" 
                                ref={ratingRef} 
                                min={0} 
                                max={5} 
                                step={0.1} 
                                name="rating" 
                                id="rating" 
                                className='border-2 w-full py-2 border-x-stone-950 rounded-md' 
                                onInput={(e) => {
                                    if (e.target.value > 5) e.target.value = 5;
                                    if (e.target.value < 0) e.target.value = 0;
                                }}
                            />
                            <label htmlFor="">a number between 0-6</label>
                        </div>
                        <div className='w-full my-5 '>
                            <label htmlFor="price" className='font-bold'>Price ₹.</label>
                            <input required type="number" ref={priceRef} min={0} name="price" id="price" className='border-2 w-full py-2 border-x-stone-950 rounded-md' />
                        </div>
                        <div className='w-full my-5 '>
                            <label htmlFor="discription" className='font-bold'>Discription</label>
                            <textarea required name="discription" ref={discriptionRef} id="discription" className='border-2 w-full py-2 border-x-stone-950 rounded-md' rows={6}></textarea>
                        </div>
                        <div className='w-full my-5 '>
                            <div>
                                <label htmlFor="bookGenre" className='font-bold text-gray-700'>Book Type -</label>
                                <select  name="bookGenre" id="bookGenre" ref={genreRef} className='font-medium w-36'>
                                    {genres.map(genre => (
                                        <option key={genre._id} value={genre._id}>
                                        {genre.genreTitle}
                                        </option>
                                    ))}
                                </select>
                                {/* <span>if not listed books genre! <Link to={'/addGenre'} className='text-red-600 underline'>add genre</Link></span> */}
                            </div>
                            <div>
                                <label htmlFor="auther" className='font-bold text-gray-700'>Auther -</label>
                                <select name="auther" id="auther" ref={autherRef} className='font-medium'>
                                    {authers.map(auther => (
                                        <option key={auther._id} value={auther._id}>
                                        {auther.name}
                                        </option>
                                    ))}
                                </select>
                                <span>if not listed books author! <Link to={'/addAuther'} className='text-red-600 underline'>add author first</Link></span>
                            </div>
                        </div>
                        
                        <div className='w-full my-5 '>
                            <button type="submit" className='border-3 w-full py-3 text-xl bg-blue-600 border-x-stone-950 rounded-md'>submit</button>
                        </div>
                        
                    </form> 
                    :
                    <div className='mx-3'>
                        <h2>Oops!</h2>
                        <h2>You need to log in to add an Book. <Link className='text-blue-600 underline' to={'/login'}>log in</Link></h2>
                    </div>
                }
            </section>
        </main>
    );
}

export default AddBook;