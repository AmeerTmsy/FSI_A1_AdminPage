import axios from 'axios';
import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

export async function loader(params) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/books/${params.params.bookId}`)
    const bookResponse = await response.json()
    const book = bookResponse.book

    const authersResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/authers`)
    const authers = await authersResponse.json()
    
    return { book, authers }
}

function Book(props) {

    const navigate = useNavigate()

    const { book, authers } = useLoaderData()

    const deletingBook = () =>{
        let text ='';
        if (confirm(`Do you really want to delete the !${book.name}`) == true) {
            axios.delete(`${import.meta.env.VITE_API_BASE_URL}/books/${book._id}`)
            navigate('/books')
          } else {
            text = "You canceled";
          }
        console.log(text)
    }
    
    return (
        <main  className='pt-28'>
            <section className='grid md:grid-cols-2'>
                <div className='p-7 pb-4 w-1/2'>
                    <img className='w-full object-cover object-center' src={book.thumbnail} alt={`image of ${book.name}`} />
                </div>
                <div className='p-7 flex flex-col justify-center'>
                    <h2 className='text-2xl font-bold pb-8'>{book.name}</h2>
                    <p>{book.discription}</p>
                    {
                        authers.map(auther => {
                            if(book.auther === auther._id) {
                                return <Link key={auther._id} to={`/authers/${auther._id}`}><span className='pt-3 font-semibold'><i className="ri-profile-line text-xl"> {auther.name} </i></span></Link>
                            }
                        })
                    }
                    <div className='mt-3'>
                        <Link className='bg-blue-600 py-2 px-4 rounded-md' to={`/editBook/${book._id}`}>Edit Book</Link>
                        <button className='bg-red-500 py-2 px-4 rounded-md ml-2' onClick={deletingBook}>Delete Book</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Book;