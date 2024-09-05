import React, { useRef } from 'react';
import BookCard from '../components/bookCard';
import { useLoaderData, useNavigate } from 'react-router-dom';

export async function loader({ request }) {

    const url = new URL(request.url)
    
    const bookGenre = url.searchParams.get("bookGenre")
    const sort = url.searchParams.get('sort')
    const price = url.searchParams.get('price')

    const queryParams = new URLSearchParams();
    
    if(bookGenre) queryParams.append('bookGenre', bookGenre)
    if(sort) queryParams.append('sort', sort)
    if(price) queryParams.append('price', price)
    
    const bookRouteResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/books?${queryParams.toString()}`)
    const books = await bookRouteResponse.json()

    const autherRouteResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/authers`)
    const authers = await autherRouteResponse.json()
    
    return {books , authers}
}

function Books(props) {
    const { books, authers } = useLoaderData()

    const navigat = useNavigate()

    const bookByGenreRef = useRef(null)
    const favoriteSortRef = useRef(null)
    const priceSortRef = useRef(null)

    const filterSort = () => {
        // const sort = favoriteSortRef.current.value
        const bookGenre = bookByGenreRef.current.value; // Get the current bookGenre value
        const price = priceSortRef.current.value; // Get the current bookGenre value
        
        navigat(`/books?bookGenre=${bookGenre}&price=${price}`);
    }
    
    return (
        <main className='pt-28 pb-12'>
            <section className="container mx-auto">
                <div className='flex flex-row justify-between py-10 p-3'>
                    <h1 className='text-3xl font-medium'>Available books</h1>
                    <div className='flex flex-row p-0 m-0 gap-1'>
                        <select onChange={filterSort} ref={priceSortRef} className=' border-2 border-gray-950' name="price" id="price">
                            <option value="">Price</option>
                            <option value="-price">high to low</option>
                            <option value="price">low to high</option>
                            <option value="-rating">By rating</option>
                        </select>
                        <select onChange={filterSort} ref={bookByGenreRef} className=' border-2 border-gray-950' name="bookGenre" id="bookGenre">
                            <option value="">All</option>
                            <option value="66d6a294b88167b47b8b20ab">nonfiction</option>
                            <option value="66d6a234b88167b47b8b20a9">fiction</option>
                        </select>
                        {/* <select onChange={filterSort} ref={favoriteSortRef} className=' border-2 border-gray-950' name="sort" id="sort">
                            <option value="">popular</option>
                            
                        </select> */}
                    </div>
                </div>
                <div className='flex flex-row justify-evenly flex-wrap gap-8 pt-6 '>
                    {
                        books.map( book => {
                            let bookAuter;
                            authers.map( auther => {
                                if( auther._id === book.auther) bookAuter = auther.name 
                            })
                            return <BookCard key={book._id} book={book} bookAuther={bookAuter}/>
                        })
                    }
                </div>
            </section>
        </main>
    );
}

export default Books;