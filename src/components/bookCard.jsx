import React from 'react';
import { Link } from 'react-router-dom';
import StarCard from './starCard';

function BookCard(props) {
    const book = props.book
    const bookAuther = props.bookAuther
    const fromAutherPage = props.fromAutherPage
    
    return (
        <article className='bookcard'>
            <Link to={`/books/${book._id}`}>
            <img className='bookImage aspect-[3/4] object-cover w-full' src={book.thumbnail} alt="" />
            <h3 className='font-medium text-1xl pt-3'>{book.name}</h3>
            <h4 className='font-medium text-1xl pt-3'> <StarCard rating={book.rating} /> </h4>
            <h3 className='font-medium text-1xl pt-3'>₹ {book.price}.00</h3>
            </Link>
            <span>{fromAutherPage ? "" : bookAuther}</span>
        </article>
    );
}

export default BookCard;