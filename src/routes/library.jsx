import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import BookCard from '../components/bookCard';
import AutherCard from '../components/autherCard';
import axios from 'axios';

export async function loader(params) {
    const bookRouteResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/books`)
    const books = bookRouteResponse.data
    
    const autherRouteResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/authers`)
    const authers = autherRouteResponse.data

    return {books , authers}
}

function Library(props) {

    const { books, authers } = useLoaderData()

    const BookAndAuthers = authers.map(auther => {
        // Find a book by the current author's ID
        const book = books.find(book => book.auther === auther._id);
        return {
            auther,
            book: book || null // Include the book if found, otherwise null
        };
    });

    let homeAuthers = BookAndAuthers.map(a=> a.auther)
    let homeBooks = BookAndAuthers.map(a=> a.book)

    return (
        <main className='rewall pt-20'>
            <section className="homeImgHight bg-[url('https://res.cloudinary.com/dhs5i1k5f/image/upload/v1725108410/Entri/forLibrary/sylvia-yang-_ar2ENzmqb0-unsplash_b815bj.jpg')]">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-indigo-600 mb-4">Welcome to the Library</h1>
                    <p className="text-2xl font-semibold">Explore a world of knowledge with our curated collection of books and authors.</p>
                </div>
            </section>
            <section className='pt-10 pb-14 text-center'>
                <h2 className='font-bold text-2xl mb-2'>We have got the book for you</h2>
                <a href="#home-book-section" className='font-medium text-2xl px-2 py-1 hover:bg-slate-200 rounded-full'><i className="ri-skip-down-line"></i></a>
            </section>
            <section id="home-book-section" className='pt-10 pb-14 text-center bg-slate-300'>
                <h1 className='text-3xl font-medium py-10 p-3'>Books Making Waves</h1>
                <div className='flex flex-row justify-evenly flex-wrap gap-8 pt-6 '>
                    {
                        homeBooks.map( book => {
                            let bookAuter;
                            authers.map( auther => {
                                if( auther._id === book.auther) bookAuter = auther.name 
                            })
                            return <BookCard key={book._id} book={book} bookAuther={bookAuter}/>           
                        })
                    }
                </div>
            </section>
            <section className='pt-10 pb-14 text-center bg-slate-400'>
                <h1 className='text-3xl font-medium py-10 p-3'>Notable Names in Literature</h1>
                <div className='flex flex-row justify-evenly flex-wrap gap-8 pt-6 '>
                    {
                        homeAuthers.map( auther => {
                            return <AutherCard key={auther._id} auther={auther} fromAutherPage={false}/>           
                        })
                    }
                </div>
            </section>
            <section className='pt-10 pb-14 text-center bg-slate-400'>
                <h1 className='text-2xl font-medium py-10 p-3'>Notable Names in Literature</h1>
            </section>
            <Footer></Footer>
        </main>
    );
}


const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <footer className="py-4 bg-gray-800 text-white text-center">
            <p>&copy; {currentYear} Library. All rights reserved.</p>
        </footer>
    );
};

export default Library;